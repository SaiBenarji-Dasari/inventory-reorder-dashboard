# Smart Inventory Reorder & Safety Stock Analytics Dashboard

[![Live Demo](https://img.shields.io/badge/Live_Demo-GitHub_Pages-2563eb?style=for-the-badge&logo=github)](https://saibenarji-dasari.github.io/inventory-reorder-dashboard/)
[![GitHub Repo](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github)](https://github.com/SaiBenarji-Dasari/inventory-reorder-dashboard)
[![License: MIT](https://img.shields.io/badge/License-MIT-success?style=for-the-badge)](https://opensource.org/licenses/MIT)

> **Enterprise Decision Support System for Inventory Health, Replenishment Automation, and Stock-Out Prevention.**

---

## 🌐 Live Deployment
The interactive analytics application is publicly deployed and live:

👉 **[https://saibenarji-dasari.github.io/inventory-reorder-dashboard/](https://saibenarji-dasari.github.io/inventory-reorder-dashboard/)**

- **Hosting Platform:** GitHub Pages
- **Client Runtime:** Pure Vanilla HTML5, CSS3, JavaScript & Chart.js (Zero installation required)
- **Status:** Active & Production-Ready

### 🔐 Live Demo Authentication & Test Logins
The application includes a built-in enterprise authentication portal with role-based access control.
You can register a custom account via the **Create Account** tab or click any **1-Click Demo Login**:
- 👑 **Supply Chain Director (Admin):** `director@smartflow.io` / `demo1234`
- 💼 **Procurement Specialist:** `elena@smartflow.io` / `demo1234`
- 📦 **Warehouse Operations Lead:** `marcus@smartflow.io` / `demo1234`

> [!TIP]
> **Browser Cache Notice:** If your browser previously cached an earlier version, perform a hard refresh (`Ctrl + Shift + R` on Windows/Linux or `Cmd + Shift + R` on Mac) to load the latest release immediately.

---

## 1. Project Overview & Business Value
Supply chain and warehouse operations face constant pressure between two opposing risks:
1. **Stock-Outs (Under-Stocking):** Result in lost revenue, broken SLA commitments, and high-cost emergency freight shipments.
2. **Excess Inventory (Over-Stocking):** Ties up working capital, inflates holding/insurance costs, and incurs inventory obsolescence.

This project delivers a multi-platform Business Intelligence & Operational Analytics suite:
- **Interactive Web Application:** Real-time dashboard with dynamic KPIs, Chart.js visualizations, stock adjustment audits, and PO replenishment modals.
- **Data Warehouse & Analytical SQL Layer:** Production-grade relational schema, realistic snapshot data, and 9 executive SQL queries.
- **Power BI Intelligence Model:** Star schema modeling, production DAX measures library, and visual layout blueprints.
- **Excel Decision Model:** Tabular datasets with pivot-ready structures and replenishment formulas.

---

## 2. Directory Structure

```text
inventory-reorder-dashboard/
├── index.html                   # Interactive browser dashboard UI
├── styles.css                   # Enterprise design system & responsive layout
├── app.js                       # State engine, Chart.js integration, modals, CSV export
├── server.ps1                   # Local PowerShell HTTP web server
├── README.md                    # System documentation & deployment guide
├── .gitignore                   # Ignore rules for temp & system files
│
├── SQL/
│   ├── inventory_db_schema.sql  # DDL schema (Tables, Indexes, Constraints, Analytical Views)
│   ├── inventory_sample_data.sql# 20 Products, 7 Suppliers, Snapshots & PO data
│   └── inventory_queries.sql    # 9 Advanced SQL analytical queries (KPIs, ABC analysis, DoC)
│
├── PowerBI/
│   ├── powerbi_measures.dax     # Full DAX measures library
│   └── powerbi_guide.md         # Star schema relationships, visual layout specifications
│
└── Data/
    ├── suppliers.csv            # Vendor master data with lead times & risk scores
    ├── products.csv             # Product master catalog with cost, ROP, safety stock
    ├── inventory.csv            # Warehouse stock snapshots (on-hand, reserved, available)
    ├── sales.csv                # Historical daily sales transactions
    └── purchase_orders.csv      # Replenishment purchase orders pipeline
```

---

## 3. Core Mathematical Formulations

### Reorder Point ($ROP$)
The inventory balance that triggers a new purchase order:
$$ROP = (d_{\text{avg}} \times L_{\text{avg}}) + SS$$
- $d_{\text{avg}}$: Average Daily Usage / Sales
- $L_{\text{avg}}$: Vendor Lead Time (Days)
- $SS$: Safety Stock Buffer

### Safety Stock ($SS$)
Buffer inventory held against demand volatility and supplier lead-time delays:
$$SS = (d_{\max} \times L_{\max}) - (d_{\text{avg}} \times L_{\text{avg}})$$

### Days of Cover ($DoC$)
Operational runway before current stock reaches zero at average depletion rate:
$$DoC = \frac{\text{On-Hand Quantity}}{d_{\text{avg}}}$$

### Inventory Status State Machine
| Stock Health Tier | Mathematical Condition | Recommended Action |
| :--- | :--- | :--- |
| **🚨 Critical** | $\text{OnHand} \le \text{SafetyStock}$ | Emergency replenishment / Expedited order |
| **⚠️ Reorder Needed** | $\text{OnHand} \le ROP \text{ and } \text{OnHand} > SS$ | Issue standard Purchase Order |
| **✅ Healthy** | $ROP < \text{OnHand} \le 1.5 \times ROP$ | Maintain normal operations |
| **📦 Overstock** | $\text{OnHand} > 1.5 \times ROP$ | Review procurement cycles / Discount or bundle |

---

## 4. How to Run & Use the Deliverables

### A. Run the Interactive Web Dashboard
**Online:**  
Visit the deployed application at **[https://saibenarji-dasari.github.io/inventory-reorder-dashboard/](https://saibenarji-dasari.github.io/inventory-reorder-dashboard/)**

**Locally:**
1. Navigate to the project folder:
   ```bash
   cd inventory-reorder-dashboard
   ```
2. Double-click `index.html` to open directly in your browser.
3. Or start the included lightweight server:
   ```powershell
   .\server.ps1 -Port 8080
   ```
   and open `http://localhost:8080/`.

### B. Execute the SQL Database Scripts
1. Open **SQL Server Management Studio (SSMS)** or **Azure Data Studio**.
2. Run `SQL/inventory_db_schema.sql` to generate `InventoryDashboardDB`, tables, constraints, and views.
3. Run `SQL/inventory_sample_data.sql` to populate dimensions and facts.
4. Execute `SQL/inventory_queries.sql` to generate executive KPI reports.

### C. Import into Power BI
1. Open **Power BI Desktop**.
2. Click **Get Data > Text/CSV** and load all 5 files from the `Data/` folder.
3. Configure star schema relationships following `PowerBI/powerbi_guide.md`.
4. Import DAX measures from `PowerBI/powerbi_measures.dax`.
5. Arrange dashboard visuals as outlined in `PowerBI/powerbi_guide.md`.

### D. Use in Microsoft Excel
1. Open Excel and navigate to **Data > Get Data > From Text/CSV**.
2. Import the 5 CSV files into individual worksheet tabs (`Suppliers`, `Products`, `Inventory`, `Sales`, `PurchaseOrders`).
3. Add a `Dashboard` tab and create Pivot Tables and Pivot Charts using the formulas specified in the guide.
