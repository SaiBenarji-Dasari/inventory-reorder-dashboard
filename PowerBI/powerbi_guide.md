# Power BI Dashboard Setup & Visual Specification Guide

## 1. Data Model & Star Schema Configuration
Import the 5 CSV files from the `/Data` directory (`suppliers.csv`, `products.csv`, `inventory.csv`, `sales.csv`, `purchase_orders.csv`) into Power BI Desktop.

### Relationships (1-to-Many, Single Direction)
- `DimSupplier[SupplierID]` **(1) ─── (*) $\to$** `DimProduct[SupplierID]`
- `DimSupplier[SupplierID]` **(1) ─── (*) $\to$** `FactPurchaseOrder[SupplierID]`
- `DimProduct[ProductID]` **(1) ─── (*) $\to$** `FactInventory[ProductID]`
- `DimProduct[ProductID]` **(1) ─── (*) $\to$** `FactSales[ProductID]`
- `DimProduct[ProductID]` **(1) ─── (*) $\to$** `FactPurchaseOrder[ProductID]`

---

## 2. Recommended Report Pages & Layout

### Page 1: Executive Inventory Health Overview
- **Header:** Title, Date Refresh indicator, Slicers for `Category` and `Stock Status`.
- **Top Metric Cards (KPI Band):**
  1. `Total Inventory Value` (Formatted as Currency `$#,##0`)
  2. `Total Units On Hand` (Formatted as Integer `#,##0`)
  3. `Critical Stock Count` (Red accent card, alert icon)
  4. `Reorder Alert Count` (Amber accent card)
  5. `Average Days of Cover` (Formatted as `0.0` days)
- **Visual 1 (Donut Chart - Left):**
  - Legend: `Stock Status Dynamic`
  - Values: `Distinct Count of ProductID`
  - Colors: Critical (`#EF4444`), Reorder Needed (`#F59E0B`), Healthy (`#10B981`), Overstock (`#8B5CF6`).
- **Visual 2 (Clustered Column Chart - Center):**
  - X-Axis: `DimProduct[Category]`
  - Y-Axis: `Total Inventory Value`, `Total Units On Hand`
- **Visual 3 (Matrix / Table - Bottom):**
  - Columns: `SKU`, `ProductName`, `Category`, `OnHandQty`, `SafetyStock`, `ReorderPoint`, `Stock Status Dynamic`, `RecommendedOrderQty`, `Days of Cover`.
  - Conditional Formatting: Background color on `Stock Status Dynamic` based on `[Status Color Hex]`.

### Page 2: Reorder & Safety Stock Risk Deep Dive
- **Visual 1 (Bar Chart):** Top 10 products with lowest Days of Cover (Horizontal bar, sorted ascending).
- **Visual 2 (Scatter Plot):**
  - X-Axis: `DimSupplier[LeadTimeDays]`
  - Y-Axis: `DimSupplier[RiskScore]`
  - Size: `Total Inventory Value`
  - Details: `DimSupplier[SupplierName]`
- **Visual 3 (Table):** Inbound Replenishment Pipeline (`FactPurchaseOrder[PONumber]`, `ExpectedDate`, `Pending Units`, `TotalCost`, `Status`).

---

## 3. Power Query M-Code Transformation Tip
When loading `inventory.csv`, ensure `InventoryDate` is parsed as `Date` data type, and currency columns in `products.csv` (`UnitCost`) are cast to `Fixed Decimal Number` (`Currency`).

