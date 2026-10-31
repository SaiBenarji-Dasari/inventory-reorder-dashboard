-- =============================================================================
-- INVENTORY REORDER & SAFETY STOCK ANALYTICS DATABASE SCHEMA
-- Compatible with Microsoft SQL Server / Azure SQL / PostgreSQL
-- =============================================================================

-- Step 1: Create Database
IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = 'InventoryDashboardDB')
BEGIN
    CREATE DATABASE InventoryDashboardDB;
END;
GO

USE InventoryDashboardDB;
GO

-- Step 2: Drop Tables If Exists (clean teardown for idempotent execution)
IF OBJECT_ID('dbo.FactSales', 'U') IS NOT NULL DROP TABLE dbo.FactSales;
IF OBJECT_ID('dbo.FactPurchaseOrder', 'U') IS NOT NULL DROP TABLE dbo.FactPurchaseOrder;
IF OBJECT_ID('dbo.FactInventory', 'U') IS NOT NULL DROP TABLE dbo.FactInventory;
IF OBJECT_ID('dbo.DimProduct', 'U') IS NOT NULL DROP TABLE dbo.DimProduct;
IF OBJECT_ID('dbo.DimSupplier', 'U') IS NOT NULL DROP TABLE dbo.DimSupplier;
GO

-- Step 3: Dimension Tables

-- 3.1 Supplier Dimension
CREATE TABLE dbo.DimSupplier (
    SupplierID INT IDENTITY(1,1) PRIMARY KEY,
    SupplierName NVARCHAR(200) NOT NULL,
    LeadTimeDays INT NOT NULL CHECK (LeadTimeDays > 0),
    RiskScore INT NOT NULL CHECK (RiskScore BETWEEN 0 AND 100), -- 0 = Lowest Risk, 100 = Severe Risk
    ContactEmail NVARCHAR(150) NULL,
    Country NVARCHAR(100) NOT NULL DEFAULT 'USA',
    CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME()
);
GO

-- 3.2 Product Dimension
CREATE TABLE dbo.DimProduct (
    ProductID INT IDENTITY(1,1) PRIMARY KEY,
    SKU NVARCHAR(50) NOT NULL UNIQUE,
    ProductName NVARCHAR(200) NOT NULL,
    Category NVARCHAR(100) NOT NULL,
    SupplierID INT NOT NULL,
    UnitCost DECIMAL(12,2) NOT NULL CHECK (UnitCost >= 0),
    ReorderPoint INT NOT NULL CHECK (ReorderPoint >= 0),
    SafetyStock INT NOT NULL CHECK (SafetyStock >= 0),
    AvgDailySales DECIMAL(8,2) NOT NULL DEFAULT 1.00 CHECK (AvgDailySales >= 0),
    MaxDailySales DECIMAL(8,2) NOT NULL DEFAULT 2.00 CHECK (MaxDailySales >= 0),
    CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    CONSTRAINT FK_DimProduct_Supplier FOREIGN KEY (SupplierID) 
        REFERENCES dbo.DimSupplier(SupplierID)
);
GO

-- Step 4: Fact Tables

-- 4.1 Daily Inventory Snapshot Fact
CREATE TABLE dbo.FactInventory (
    InventoryID INT IDENTITY(1,1) PRIMARY KEY,
    ProductID INT NOT NULL,
    InventoryDate DATE NOT NULL,
    OnHandQty INT NOT NULL CHECK (OnHandQty >= 0),
    ReservedQty INT NOT NULL DEFAULT 0 CHECK (ReservedQty >= 0),
    AvailableQty AS (OnHandQty - ReservedQty) PERSISTED,
    ReceivedQty INT NOT NULL DEFAULT 0,
    IssuedQty INT NOT NULL DEFAULT 0,
    AdjustedQty INT NOT NULL DEFAULT 0,
    LastUpdated DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    CONSTRAINT FK_FactInventory_Product FOREIGN KEY (ProductID) 
        REFERENCES dbo.DimProduct(ProductID),
    CONSTRAINT UQ_Product_Date UNIQUE (ProductID, InventoryDate)
);
GO

-- 4.2 Sales Transaction Fact
CREATE TABLE dbo.FactSales (
    SalesID INT IDENTITY(1,1) PRIMARY KEY,
    ProductID INT NOT NULL,
    SalesDate DATE NOT NULL,
    SalesQty INT NOT NULL CHECK (SalesQty > 0),
    UnitPrice DECIMAL(12,2) NOT NULL,
    TotalRevenue AS (SalesQty * UnitPrice) PERSISTED,
    CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    CONSTRAINT FK_FactSales_Product FOREIGN KEY (ProductID) 
        REFERENCES dbo.DimProduct(ProductID)
);
GO

-- 4.3 Purchase Order Replenishment Fact
CREATE TABLE dbo.FactPurchaseOrder (
    POID INT IDENTITY(1,1) PRIMARY KEY,
    PONumber NVARCHAR(50) NOT NULL UNIQUE,
    ProductID INT NOT NULL,
    SupplierID INT NOT NULL,
    OrderDate DATE NOT NULL,
    ExpectedDate DATE NOT NULL,
    OrderedQty INT NOT NULL CHECK (OrderedQty > 0),
    ReceivedQty INT NOT NULL DEFAULT 0 CHECK (ReceivedQty >= 0),
    Status NVARCHAR(50) NOT NULL DEFAULT 'Pending' 
        CHECK (Status IN ('Draft', 'Pending', 'In-Transit', 'Received', 'Cancelled')),
    TotalCost DECIMAL(12,2) NOT NULL,
    CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    CONSTRAINT FK_FactPO_Product FOREIGN KEY (ProductID) 
        REFERENCES dbo.DimProduct(ProductID),
    CONSTRAINT FK_FactPO_Supplier FOREIGN KEY (SupplierID) 
        REFERENCES dbo.DimSupplier(SupplierID)
);
GO

-- Step 5: Indexes for Analytical Query Performance
CREATE NONCLUSTERED INDEX IX_FactInventory_Date_Product 
    ON dbo.FactInventory(InventoryDate, ProductID) 
    INCLUDE (OnHandQty, AvailableQty);

CREATE NONCLUSTERED INDEX IX_DimProduct_Category 
    ON dbo.DimProduct(Category) 
    INCLUDE (UnitCost, ReorderPoint, SafetyStock, AvgDailySales);

CREATE NONCLUSTERED INDEX IX_FactSales_Date 
    ON dbo.FactSales(SalesDate, ProductID) 
    INCLUDE (SalesQty);
GO

-- Step 6: Analytical Views for Power BI / Reporting

CREATE OR ALTER VIEW dbo.vw_InventoryHealthStatus AS
SELECT 
    p.ProductID,
    p.SKU,
    p.ProductName,
    p.Category,
    s.SupplierName,
    s.LeadTimeDays,
    s.RiskScore AS SupplierRiskScore,
    f.OnHandQty,
    f.ReservedQty,
    f.AvailableQty,
    p.ReorderPoint,
    p.SafetyStock,
    p.AvgDailySales,
    p.UnitCost,
    (f.OnHandQty * p.UnitCost) AS InventoryValue,
    CASE
        WHEN f.OnHandQty <= p.SafetyStock THEN 'Critical'
        WHEN f.OnHandQty <= p.ReorderPoint THEN 'Reorder Needed'
        WHEN f.OnHandQty > (p.ReorderPoint * 1.5) THEN 'Overstock'
        ELSE 'Healthy'
    END AS StockStatus,
    CASE 
        WHEN f.OnHandQty <= p.ReorderPoint THEN (p.ReorderPoint - f.OnHandQty + p.SafetyStock)
        ELSE 0 
    END AS RecommendedOrderQty,
    CASE 
        WHEN f.OnHandQty < p.SafetyStock THEN (p.SafetyStock - f.OnHandQty)
        ELSE 0 
    END AS SafetyStockDeficit,
    CAST(f.OnHandQty / NULLIF(p.AvgDailySales, 0) AS DECIMAL(10,1)) AS DaysOfCover,
    f.InventoryDate
FROM dbo.FactInventory f
JOIN dbo.DimProduct p ON f.ProductID = p.ProductID
JOIN dbo.DimSupplier s ON p.SupplierID = s.SupplierID
WHERE f.InventoryDate = (SELECT MAX(InventoryDate) FROM dbo.FactInventory);
GO

