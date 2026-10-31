-- =============================================================================
-- INVENTORY REORDER & SAFETY STOCK ANALYTICAL QUERY SUITE
-- =============================================================================

USE InventoryDashboardDB;
GO

-- -----------------------------------------------------------------------------
-- Query 1: Executive KPI Summary
-- -----------------------------------------------------------------------------
SELECT 
    COUNT(DISTINCT p.ProductID) AS TotalSKUs,
    SUM(f.OnHandQty) AS TotalUnitsOnHand,
    SUM(f.OnHandQty * p.UnitCost) AS TotalInventoryValue,
    SUM(CASE WHEN f.OnHandQty <= p.SafetyStock THEN 1 ELSE 0 END) AS CriticalStockItems,
    SUM(CASE WHEN f.OnHandQty <= p.ReorderPoint THEN 1 ELSE 0 END) AS TotalReorderAlerts,
    SUM(CASE WHEN f.OnHandQty > (p.ReorderPoint * 1.5) THEN 1 ELSE 0 END) AS OverstockItems,
    CAST(AVG(f.OnHandQty / NULLIF(p.AvgDailySales, 0)) AS DECIMAL(10,1)) AS AvgDaysOfCover,
    CAST(
        (SUM(CASE WHEN f.OnHandQty <= p.SafetyStock THEN 1.0 ELSE 0.0 END) / COUNT(p.ProductID)) * 100.0 
        AS DECIMAL(5,2)
    ) AS StockOutRiskRatePct
FROM dbo.FactInventory f
JOIN dbo.DimProduct p ON f.ProductID = p.ProductID
WHERE f.InventoryDate = (SELECT MAX(InventoryDate) FROM dbo.FactInventory);
GO

-- -----------------------------------------------------------------------------
-- Query 2: Product Inventory Health Classification & Recommended Replenishment
-- -----------------------------------------------------------------------------
SELECT 
    p.SKU,
    p.ProductName,
    p.Category,
    f.OnHandQty,
    p.SafetyStock,
    p.ReorderPoint,
    p.AvgDailySales,
    CAST(f.OnHandQty / NULLIF(p.AvgDailySales, 0) AS DECIMAL(10,1)) AS DaysOfCover,
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
        WHEN f.OnHandQty <= p.ReorderPoint THEN (p.ReorderPoint - f.OnHandQty + p.SafetyStock) * p.UnitCost
        ELSE 0 
    END AS EstimatedReplenishmentCost
FROM dbo.FactInventory f
JOIN dbo.DimProduct p ON f.ProductID = p.ProductID
WHERE f.InventoryDate = (SELECT MAX(InventoryDate) FROM dbo.FactInventory)
ORDER BY 
    CASE 
        WHEN f.OnHandQty <= p.SafetyStock THEN 1
        WHEN f.OnHandQty <= p.ReorderPoint THEN 2
        WHEN f.OnHandQty > (p.ReorderPoint * 1.5) THEN 4
        ELSE 3
    END,
    f.OnHandQty ASC;
GO

-- -----------------------------------------------------------------------------
-- Query 3: Prioritized Reorder Alert Queue with Supplier Lead Times
-- -----------------------------------------------------------------------------
SELECT 
    p.SKU,
    p.ProductName,
    p.Category,
    s.SupplierName,
    s.LeadTimeDays,
    s.RiskScore AS SupplierRisk,
    f.OnHandQty,
    p.SafetyStock,
    p.ReorderPoint,
    (p.ReorderPoint - f.OnHandQty) AS BasicShortfall,
    (p.ReorderPoint - f.OnHandQty + p.SafetyStock) AS TargetOrderQty,
    ((p.ReorderPoint - f.OnHandQty + p.SafetyStock) * p.UnitCost) AS OrderCapitalRequired,
    CAST(f.OnHandQty / NULLIF(p.AvgDailySales, 0) AS DECIMAL(10,1)) AS DaysRunwayLeft
FROM dbo.FactInventory f
JOIN dbo.DimProduct p ON f.ProductID = p.ProductID
JOIN dbo.DimSupplier s ON p.SupplierID = s.SupplierID
WHERE f.InventoryDate = (SELECT MAX(InventoryDate) FROM dbo.FactInventory)
  AND f.OnHandQty <= p.ReorderPoint
ORDER BY 
    CASE WHEN f.OnHandQty <= p.SafetyStock THEN 0 ELSE 1 END,
    DaysRunwayLeft ASC;
GO

-- -----------------------------------------------------------------------------
-- Query 4: Safety Stock Deficit & High-Exposure SKUs
-- -----------------------------------------------------------------------------
SELECT 
    p.SKU,
    p.ProductName,
    p.Category,
    f.OnHandQty,
    p.SafetyStock,
    (p.SafetyStock - f.OnHandQty) AS SafetyStockDeficitUnits,
    CAST(((p.SafetyStock - f.OnHandQty) * 100.0 / NULLIF(p.SafetyStock, 0)) AS DECIMAL(5,1)) AS DeficitSeverityPct,
    s.SupplierName,
    s.LeadTimeDays
FROM dbo.FactInventory f
JOIN dbo.DimProduct p ON f.ProductID = p.ProductID
JOIN dbo.DimSupplier s ON p.SupplierID = s.SupplierID
WHERE f.InventoryDate = (SELECT MAX(InventoryDate) FROM dbo.FactInventory)
  AND f.OnHandQty < p.SafetyStock
ORDER BY SafetyStockDeficitUnits DESC;
GO

-- -----------------------------------------------------------------------------
-- Query 5: Category-Level Working Capital & Stock Health Breakdown
-- -----------------------------------------------------------------------------
SELECT 
    p.Category,
    COUNT(p.ProductID) AS ProductCount,
    SUM(f.OnHandQty) AS TotalUnitsOnHand,
    SUM(f.OnHandQty * p.UnitCost) AS TotalInventoryValue,
    CAST(AVG(f.OnHandQty * p.UnitCost) AS DECIMAL(12,2)) AS AvgValuePerSKU,
    SUM(CASE WHEN f.OnHandQty <= p.SafetyStock THEN 1 ELSE 0 END) AS CriticalItems,
    SUM(CASE WHEN f.OnHandQty <= p.ReorderPoint THEN 1 ELSE 0 END) AS ReorderAlerts,
    SUM(CASE WHEN f.OnHandQty > (p.ReorderPoint * 1.5) THEN 1 ELSE 0 END) AS OverstockItems
FROM dbo.FactInventory f
JOIN dbo.DimProduct p ON f.ProductID = p.ProductID
WHERE f.InventoryDate = (SELECT MAX(InventoryDate) FROM dbo.FactInventory)
GROUP BY p.Category
ORDER BY TotalInventoryValue DESC;
GO

-- -----------------------------------------------------------------------------
-- Query 6: Days of Cover Ranking & Stock-Out Vulnerability
-- -----------------------------------------------------------------------------
SELECT 
    p.SKU,
    p.ProductName,
    p.Category,
    f.OnHandQty,
    p.AvgDailySales,
    CAST(f.OnHandQty / NULLIF(p.AvgDailySales, 0) AS DECIMAL(10,1)) AS DaysOfCover,
    s.LeadTimeDays,
    CASE 
        WHEN (f.OnHandQty / NULLIF(p.AvgDailySales, 0)) < s.LeadTimeDays THEN 'STOCKOUT IMMINENT BEFORE REORDER CAN ARRIVE'
        WHEN (f.OnHandQty / NULLIF(p.AvgDailySales, 0)) <= 5.0 THEN 'HIGH VULNERABILITY'
        ELSE 'MANAGEABLE'
    END AS RiskFlag
FROM dbo.FactInventory f
JOIN dbo.DimProduct p ON f.ProductID = p.ProductID
JOIN dbo.DimSupplier s ON p.SupplierID = s.SupplierID
WHERE f.InventoryDate = (SELECT MAX(InventoryDate) FROM dbo.FactInventory)
ORDER BY DaysOfCover ASC;
GO

-- -----------------------------------------------------------------------------
-- Query 7: Supplier Dependency & Vulnerability Matrix
-- -----------------------------------------------------------------------------
SELECT 
    s.SupplierName,
    s.Country,
    s.LeadTimeDays,
    s.RiskScore,
    CASE 
        WHEN s.RiskScore >= 75 THEN 'High Risk'
        WHEN s.RiskScore >= 50 THEN 'Moderate Risk'
        ELSE 'Low Risk'
    END AS RiskCategory,
    COUNT(p.ProductID) AS ActiveProductsSupplied,
    SUM(f.OnHandQty) AS TotalUnitsOnHand,
    SUM(f.OnHandQty * p.UnitCost) AS TotalExposureValue,
    SUM(CASE WHEN f.OnHandQty <= p.ReorderPoint THEN 1 ELSE 0 END) AS PendingReorderItems
FROM dbo.DimSupplier s
LEFT JOIN dbo.DimProduct p ON s.SupplierID = p.SupplierID
LEFT JOIN dbo.FactInventory f ON p.ProductID = f.ProductID 
    AND f.InventoryDate = (SELECT MAX(InventoryDate) FROM dbo.FactInventory)
GROUP BY s.SupplierName, s.Country, s.LeadTimeDays, s.RiskScore
ORDER BY s.RiskScore DESC;
GO

-- -----------------------------------------------------------------------------
-- Query 8: Inbound Purchase Orders & Pending Replenishments
-- -----------------------------------------------------------------------------
SELECT 
    po.PONumber,
    p.SKU,
    p.ProductName,
    s.SupplierName,
    po.OrderDate,
    po.ExpectedDate,
    DATEDIFF(day, GETDATE(), po.ExpectedDate) AS DaysUntilExpectedArrival,
    po.OrderedQty,
    po.ReceivedQty,
    (po.OrderedQty - po.ReceivedQty) AS PendingQty,
    po.Status,
    po.TotalCost
FROM dbo.FactPurchaseOrder po
JOIN dbo.DimProduct p ON po.ProductID = p.ProductID
JOIN dbo.DimSupplier s ON po.SupplierID = s.SupplierID
WHERE po.Status IN ('Pending', 'In-Transit')
ORDER BY po.ExpectedDate ASC;
GO

-- -----------------------------------------------------------------------------
-- Query 9: ABC Inventory Valuation Analysis (Pareto Classification)
-- -----------------------------------------------------------------------------
WITH ProductValuation AS (
    SELECT 
        p.ProductID,
        p.SKU,
        p.ProductName,
        p.Category,
        (f.OnHandQty * p.UnitCost) AS InventoryValuation,
        SUM(f.OnHandQty * p.UnitCost) OVER() AS TotalPortfolioValuation
    FROM dbo.FactInventory f
    JOIN dbo.DimProduct p ON f.ProductID = p.ProductID
    WHERE f.InventoryDate = (SELECT MAX(InventoryDate) FROM dbo.FactInventory)
),
CumulativeCalculation AS (
    SELECT 
        pv.*,
        CAST((pv.InventoryValuation / pv.TotalPortfolioValuation) * 100.0 AS DECIMAL(5,2)) AS ValuationSharePct,
        CAST(
            SUM(pv.InventoryValuation) OVER(ORDER BY pv.InventoryValuation DESC ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) 
            / pv.TotalPortfolioValuation * 100.0 
            AS DECIMAL(5,2)
        ) AS CumulativeSharePct
    FROM ProductValuation pv
)
SELECT 
    SKU,
    ProductName,
    Category,
    InventoryValuation,
    ValuationSharePct,
    CumulativeSharePct,
    CASE 
        WHEN CumulativeSharePct <= 70.0 THEN 'A (Top Value Driver)'
        WHEN CumulativeSharePct <= 90.0 THEN 'B (Moderate Value)'
        ELSE 'C (Low Value / High Volume)'
    END AS ABC_Class
FROM CumulativeCalculation
ORDER BY InventoryValuation DESC;
GO

