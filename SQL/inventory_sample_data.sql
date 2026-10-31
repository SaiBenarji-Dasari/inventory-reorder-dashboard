-- =============================================================================
-- INVENTORY REORDER & SAFETY STOCK SAMPLE DATA INGESTION
-- =============================================================================

USE InventoryDashboardDB;
GO

SET NOCOUNT ON;

-- 1. DimSupplier
SET IDENTITY_INSERT dbo.DimSupplier ON;
INSERT INTO dbo.DimSupplier (SupplierID, SupplierName, LeadTimeDays, RiskScore, ContactEmail, Country) VALUES
(1, 'Northwind Labs', 12, 72, 'orders@northwindlabs.com', 'USA'),
(2, 'Boxline Logistics Co', 7, 34, 'support@boxlineco.com', 'Canada'),
(3, 'ForgePro Industrial', 15, 84, 'procurement@forgepro.de', 'Germany'),
(4, 'PrintOps Supplies', 4, 20, 'sales@printops.com', 'USA'),
(5, 'SecureWear Safety Ltd', 9, 61, 'accounts@securewear.co.uk', 'UK'),
(6, 'Apex Microelectronics', 18, 78, 'supply@apexmicro.tw', 'Taiwan'),
(7, 'Titan Fasteners Corp', 10, 45, 'service@titanfasteners.com', 'USA');
SET IDENTITY_INSERT dbo.DimSupplier OFF;
GO

-- 2. DimProduct
SET IDENTITY_INSERT dbo.DimProduct ON;
INSERT INTO dbo.DimProduct (ProductID, SKU, ProductName, Category, SupplierID, UnitCost, ReorderPoint, SafetyStock, AvgDailySales, MaxDailySales) VALUES
(1, 'ELE-001', 'Industrial Sensor X12', 'Electronics', 1, 120.00, 30, 18, 2.50, 5.00),
(2, 'PKG-002', 'Heavy-Duty Packing Tape Roll', 'Packaging', 2, 18.50, 38, 22, 5.00, 9.00),
(3, 'HDW-003', 'Grade-8 Steel Fasteners Set', 'Hardware', 3, 42.00, 28, 16, 3.00, 6.00),
(4, 'OFF-004', 'Thermal Barcode Label Stock', 'Office Supplies', 4, 12.50, 40, 25, 8.00, 14.00),
(5, 'SFT-005', 'Kevlar Reinforced Safety Gloves', 'Safety', 5, 16.00, 28, 18, 4.20, 7.50),
(6, 'ELE-006', 'Microcontroller Dev Board V4', 'Electronics', 6, 45.00, 35, 20, 3.50, 7.00),
(7, 'PKG-007', 'Corrugated Shipping Boxes (L)', 'Packaging', 2, 3.20, 120, 70, 18.00, 30.00),
(8, 'HDW-008', 'Pneumatic Quick-Connect Coupler', 'Hardware', 7, 24.50, 25, 14, 2.80, 5.50),
(9, 'SFT-009', 'Anti-Fog Polycarbonate Goggles', 'Safety', 5, 14.00, 45, 25, 5.50, 10.00),
(10, 'OFF-010', 'Heavy Duty Industrial Stapler', 'Office Supplies', 4, 29.99, 15, 8, 1.20, 3.00),
(11, 'ELE-011', 'Lithium-Ion Battery Pack 24V', 'Electronics', 6, 185.00, 22, 12, 1.80, 4.00),
(12, 'HDW-012', 'Stainless Metric Hex Nut Assortment', 'Hardware', 3, 38.00, 30, 15, 3.20, 6.00),
(13, 'SFT-013', 'Class-2 Hi-Vis Safety Vest', 'Safety', 5, 22.00, 50, 30, 6.00, 11.00),
(14, 'PKG-014', 'Bubble Wrap Cushioning (500ft)', 'Packaging', 2, 48.00, 20, 10, 2.00, 4.50),
(15, 'OFF-015', 'Direct Thermal Transfer Ribbon', 'Office Supplies', 4, 19.50, 35, 20, 4.00, 8.00),
(16, 'ELE-016', 'Optical Proximity Switch M18', 'Electronics', 1, 85.00, 25, 15, 2.00, 4.00),
(17, 'HDW-017', 'Precision Torque Wrench 1/2"', 'Hardware', 7, 95.00, 12, 6, 0.80, 2.00),
(18, 'SFT-018', 'Organic Vapor Respirator Cartridge', 'Safety', 5, 34.00, 40, 24, 4.50, 8.00),
(19, 'PKG-019', 'Stretch Wrap Film 80 Gauge', 'Packaging', 2, 26.50, 45, 28, 5.00, 9.00),
(20, 'ELE-020', 'Din-Rail Switched Power Supply 24V', 'Electronics', 1, 110.00, 18, 10, 1.50, 3.50);
SET IDENTITY_INSERT dbo.DimProduct OFF;
GO

-- 3. FactInventory (Current Snapshot)
SET IDENTITY_INSERT dbo.FactInventory ON;
INSERT INTO dbo.FactInventory (InventoryID, ProductID, InventoryDate, OnHandQty, ReservedQty, ReceivedQty, IssuedQty, AdjustedQty) VALUES
(1, 1, '2026-10-31', 16, 2, 0, 12, 0),
(2, 2, '2026-10-31', 42, 4, 0, 8, 0),
(3, 3, '2026-10-31', 12, 0, 0, 15, 0),
(4, 4, '2026-10-31', 76, 6, 0, 6, 0),
(5, 5, '2026-10-31', 24, 3, 0, 10, 0),
(6, 6, '2026-10-31', 19, 2, 0, 8, 0),
(7, 7, '2026-10-31', 115, 10, 0, 25, 0),
(8, 8, '2026-10-31', 22, 2, 0, 5, 0),
(9, 9, '2026-10-31', 82, 5, 0, 14, 0),
(10, 10, '2026-10-31', 28, 0, 0, 2, 0),
(11, 11, '2026-10-31', 10, 1, 0, 4, 0),
(12, 12, '2026-10-31', 45, 5, 0, 9, 0),
(13, 13, '2026-10-31', 34, 4, 0, 16, 0),
(14, 14, '2026-10-31', 18, 2, 0, 3, 0),
(15, 15, '2026-10-31', 68, 6, 0, 11, 0),
(16, 16, '2026-10-31', 14, 1, 0, 5, 0),
(17, 17, '2026-10-31', 25, 0, 0, 1, 0),
(18, 18, '2026-10-31', 32, 3, 0, 12, 0),
(19, 19, '2026-10-31', 95, 8, 0, 15, 0),
(20, 20, '2026-10-31', 17, 2, 0, 4, 0);
SET IDENTITY_INSERT dbo.FactInventory OFF;
GO

-- 4. FactSales
SET IDENTITY_INSERT dbo.FactSales ON;
INSERT INTO dbo.FactSales (SalesID, ProductID, SalesDate, SalesQty, UnitPrice) VALUES
(1, 1, '2026-10-18', 3, 150.00),
(2, 1, '2026-10-22', 2, 150.00),
(3, 1, '2026-10-28', 4, 150.00),
(4, 2, '2026-10-15', 10, 24.00),
(5, 2, '2026-10-25', 8, 24.00),
(6, 3, '2026-10-19', 5, 55.00),
(7, 3, '2026-10-27', 7, 55.00),
(8, 4, '2026-10-14', 16, 18.00),
(9, 4, '2026-10-23', 12, 18.00),
(10, 5, '2026-10-16', 6, 22.00),
(11, 5, '2026-10-26', 9, 22.00),
(12, 6, '2026-10-17', 4, 62.00),
(13, 6, '2026-10-29', 5, 62.00),
(14, 7, '2026-10-20', 35, 4.50),
(15, 7, '2026-10-30', 28, 4.50),
(16, 8, '2026-10-21', 5, 32.00),
(17, 9, '2026-10-15', 12, 20.00),
(18, 10, '2026-10-10', 2, 40.00),
(19, 11, '2026-10-24', 3, 240.00),
(20, 12, '2026-10-22', 8, 52.00),
(21, 13, '2026-10-18', 14, 30.00),
(22, 14, '2026-10-19', 3, 65.00),
(23, 15, '2026-10-20', 7, 28.00),
(24, 16, '2026-10-26', 4, 115.00),
(25, 17, '2026-10-12', 1, 135.00),
(26, 18, '2026-10-27', 8, 48.00),
(27, 19, '2026-10-25', 11, 38.00),
(28, 20, '2026-10-28', 3, 155.00);
SET IDENTITY_INSERT dbo.FactSales OFF;
GO

-- 5. FactPurchaseOrder
SET IDENTITY_INSERT dbo.FactPurchaseOrder ON;
INSERT INTO dbo.FactPurchaseOrder (POID, PONumber, ProductID, SupplierID, OrderDate, ExpectedDate, OrderedQty, ReceivedQty, Status, TotalCost) VALUES
(1, 'PO-2026-001', 1, 1, '2026-10-20', '2026-11-01', 30, 0, 'Pending', 3600.00),
(2, 'PO-2026-002', 2, 2, '2026-10-15', '2026-10-22', 40, 40, 'Received', 740.00),
(3, 'PO-2026-003', 3, 3, '2026-10-25', '2026-11-09', 35, 0, 'In-Transit', 1470.00),
(4, 'PO-2026-004', 4, 4, '2026-10-10', '2026-10-14', 50, 50, 'Received', 625.00),
(5, 'PO-2026-005', 6, 6, '2026-10-22', '2026-11-09', 40, 0, 'Pending', 1800.00),
(6, 'PO-2026-006', 11, 6, '2026-10-26', '2026-11-13', 25, 0, 'In-Transit', 4625.00),
(7, 'PO-2026-007', 13, 5, '2026-10-28', '2026-11-06', 50, 0, 'Pending', 1100.00),
(8, 'PO-2026-008', 16, 1, '2026-10-29', '2026-11-10', 30, 0, 'Pending', 2550.00),
(9, 'PO-2026-009', 8, 7, '2026-10-18', '2026-10-28', 30, 30, 'Received', 735.00),
(10, 'PO-2026-010', 5, 5, '2026-10-24', '2026-11-02', 30, 0, 'In-Transit', 480.00);
SET IDENTITY_INSERT dbo.FactPurchaseOrder OFF;
GO

