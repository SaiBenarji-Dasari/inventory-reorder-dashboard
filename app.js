/**
 * ============================================================================
 * SMART INVENTORY REORDER & SAFETY STOCK ANALYTICS DASHBOARD
 * Core Reactive Application & Business Logic Engine
 * ============================================================================
 */

// Global State
const state = {
  products: [
    { id: 1, sku: "ELE-001", name: "Industrial Sensor X12", category: "Electronics", supplier: "Northwind Labs", supplierId: 1, leadTime: 12, riskScore: 72, unitCost: 120.00, onHand: 16, reorderPoint: 30, safetyStock: 18, avgDailySales: 2.5, maxDailySales: 5.0 },
    { id: 2, sku: "PKG-002", name: "Heavy-Duty Packing Tape Roll", category: "Packaging", supplier: "Boxline Logistics Co", supplierId: 2, leadTime: 7, riskScore: 34, unitCost: 18.50, onHand: 42, reorderPoint: 38, safetyStock: 22, avgDailySales: 5.0, maxDailySales: 9.0 },
    { id: 3, sku: "HDW-003", name: "Grade-8 Steel Fasteners Set", category: "Hardware", supplier: "ForgePro Industrial", supplierId: 3, leadTime: 15, riskScore: 84, unitCost: 42.00, onHand: 12, reorderPoint: 28, safetyStock: 16, avgDailySales: 3.0, maxDailySales: 6.0 },
    { id: 4, sku: "OFF-004", name: "Thermal Barcode Label Stock", category: "Office Supplies", supplier: "PrintOps Supplies", supplierId: 4, leadTime: 4, riskScore: 20, unitCost: 12.50, onHand: 76, reorderPoint: 40, safetyStock: 25, avgDailySales: 8.0, maxDailySales: 14.0 },
    { id: 5, sku: "SFT-005", name: "Kevlar Reinforced Safety Gloves", category: "Safety", supplier: "SecureWear Safety Ltd", supplierId: 5, leadTime: 9, riskScore: 61, unitCost: 16.00, onHand: 24, reorderPoint: 28, safetyStock: 18, avgDailySales: 4.2, maxDailySales: 7.5 },
    { id: 6, sku: "ELE-006", name: "Microcontroller Dev Board V4", category: "Electronics", supplier: "Apex Microelectronics", supplierId: 6, leadTime: 18, riskScore: 78, unitCost: 45.00, onHand: 19, reorderPoint: 35, safetyStock: 20, avgDailySales: 3.5, maxDailySales: 7.0 },
    { id: 7, sku: "PKG-007", name: "Corrugated Shipping Boxes (L)", category: "Packaging", supplier: "Boxline Logistics Co", supplierId: 2, leadTime: 7, riskScore: 34, unitCost: 3.20, onHand: 115, reorderPoint: 120, safetyStock: 70, avgDailySales: 18.0, maxDailySales: 30.0 },
    { id: 8, sku: "HDW-008", name: "Pneumatic Quick-Connect Coupler", category: "Hardware", supplier: "Titan Fasteners Corp", supplierId: 7, leadTime: 10, riskScore: 45, unitCost: 24.50, onHand: 22, reorderPoint: 25, safetyStock: 14, avgDailySales: 2.8, maxDailySales: 5.5 },
    { id: 9, sku: "SFT-009", name: "Anti-Fog Polycarbonate Goggles", category: "Safety", supplier: "SecureWear Safety Ltd", supplierId: 5, leadTime: 9, riskScore: 61, unitCost: 14.00, onHand: 82, reorderPoint: 45, safetyStock: 25, avgDailySales: 5.5, maxDailySales: 10.0 },
    { id: 10, sku: "OFF-010", name: "Heavy Duty Industrial Stapler", category: "Office Supplies", supplier: "PrintOps Supplies", supplierId: 4, leadTime: 4, riskScore: 20, unitCost: 29.99, onHand: 28, reorderPoint: 15, safetyStock: 8, avgDailySales: 1.2, maxDailySales: 3.0 },
    { id: 11, sku: "ELE-011", name: "Lithium-Ion Battery Pack 24V", category: "Electronics", supplier: "Apex Microelectronics", supplierId: 6, leadTime: 18, riskScore: 78, unitCost: 185.00, onHand: 10, reorderPoint: 22, safetyStock: 12, avgDailySales: 1.8, maxDailySales: 4.0 },
    { id: 12, sku: "HDW-012", name: "Stainless Metric Hex Nut Assortment", category: "Hardware", supplier: "ForgePro Industrial", supplierId: 3, leadTime: 15, riskScore: 84, unitCost: 38.00, onHand: 45, reorderPoint: 30, safetyStock: 15, avgDailySales: 3.2, maxDailySales: 6.0 },
    { id: 13, sku: "SFT-013", name: "Class-2 Hi-Vis Safety Vest", category: "Safety", supplier: "SecureWear Safety Ltd", supplierId: 5, leadTime: 9, riskScore: 61, unitCost: 22.00, onHand: 34, reorderPoint: 50, safetyStock: 30, avgDailySales: 6.0, maxDailySales: 11.0 },
    { id: 14, sku: "PKG-014", name: "Bubble Wrap Cushioning (500ft)", category: "Packaging", supplier: "Boxline Logistics Co", supplierId: 2, leadTime: 7, riskScore: 34, unitCost: 48.00, onHand: 18, reorderPoint: 20, safetyStock: 10, avgDailySales: 2.0, maxDailySales: 4.5 },
    { id: 15, sku: "OFF-015", name: "Direct Thermal Transfer Ribbon", category: "Office Supplies", supplier: "PrintOps Supplies", supplierId: 4, leadTime: 4, riskScore: 20, unitCost: 19.50, onHand: 68, reorderPoint: 35, safetyStock: 20, avgDailySales: 4.0, maxDailySales: 8.0 },
    { id: 16, sku: "ELE-016", name: "Optical Proximity Switch M18", category: "Electronics", supplier: "Northwind Labs", supplierId: 1, leadTime: 12, riskScore: 72, unitCost: 85.00, onHand: 14, reorderPoint: 25, safetyStock: 15, avgDailySales: 2.0, maxDailySales: 4.0 },
    { id: 17, sku: "HDW-017", name: "Precision Torque Wrench 1/2\"", category: "Hardware", supplier: "Titan Fasteners Corp", supplierId: 7, leadTime: 10, riskScore: 45, unitCost: 95.00, onHand: 25, reorderPoint: 12, safetyStock: 6, avgDailySales: 0.8, maxDailySales: 2.0 },
    { id: 18, sku: "SFT-018", name: "Organic Vapor Respirator Cartridge", category: "Safety", supplier: "SecureWear Safety Ltd", supplierId: 5, leadTime: 9, riskScore: 61, unitCost: 34.00, onHand: 32, reorderPoint: 40, safetyStock: 24, avgDailySales: 4.5, maxDailySales: 8.0 },
    { id: 19, sku: "PKG-019", name: "Stretch Wrap Film 80 Gauge", category: "Packaging", supplier: "Boxline Logistics Co", supplierId: 2, leadTime: 7, riskScore: 34, unitCost: 26.50, onHand: 95, reorderPoint: 45, safetyStock: 28, avgDailySales: 5.0, maxDailySales: 9.0 },
    { id: 20, sku: "ELE-020", name: "Din-Rail Switched Power Supply 24V", category: "Electronics", supplier: "Northwind Labs", supplierId: 1, leadTime: 12, riskScore: 72, unitCost: 110.00, onHand: 17, reorderPoint: 18, safetyStock: 10, avgDailySales: 1.5, maxDailySales: 3.5 }
  ],
  filters: {
    search: "",
    category: "All",
    status: "All",
    supplier: "All"
  },
  sorting: {
    column: "status",
    direction: "asc"
  },
  charts: {
    stockOverview: null,
    categoryValuation: null
  }
};

// ----------------------------------------------------------------------------
// Mathematical & Business Logic Helpers
// ----------------------------------------------------------------------------

function getStockStatus(item) {
  if (item.onHand <= item.safetyStock) return "Critical";
  if (item.onHand <= item.reorderPoint) return "Reorder Needed";
  if (item.onHand > item.reorderPoint * 1.5) return "Overstock";
  return "Healthy";
}

function calculateDaysOfCover(item) {
  if (!item.avgDailySales || item.avgDailySales <= 0) return 999;
  return Number((item.onHand / item.avgDailySales).toFixed(1));
}

function calculateRecommendedOrder(item) {
  if (item.onHand <= item.reorderPoint) {
    return Math.max(0, item.reorderPoint - item.onHand + item.safetyStock);
  }
  return 0;
}

function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount);
}

// ----------------------------------------------------------------------------
// KPI Calculation & DOM Updates
// ----------------------------------------------------------------------------

function updateKPIs() {
  const totalUnits = state.products.reduce((acc, p) => acc + p.onHand, 0);
  const totalValue = state.products.reduce((acc, p) => acc + (p.onHand * p.unitCost), 0);
  
  let criticalCount = 0;
  let reorderCount = 0;
  let overstockCount = 0;
  let healthyCount = 0;
  let totalDaysCover = 0;

  state.products.forEach(p => {
    const status = getStockStatus(p);
    if (status === "Critical") criticalCount++;
    if (status === "Reorder Needed") reorderCount++;
    if (status === "Overstock") overstockCount++;
    if (status === "Healthy") healthyCount++;
    totalDaysCover += calculateDaysOfCover(p);
  });

  const avgDaysCover = (totalDaysCover / state.products.length).toFixed(1);

  document.getElementById("kpiTotalUnits").textContent = totalUnits.toLocaleString();
  document.getElementById("kpiTotalValue").textContent = formatCurrency(totalValue);
  document.getElementById("kpiCriticalCount").textContent = criticalCount;
  document.getElementById("kpiReorderCount").textContent = reorderCount;
  document.getElementById("kpiOverstockCount").textContent = overstockCount;
  document.getElementById("kpiAvgDaysCover").textContent = `${avgDaysCover} d`;

  // Status breakdown summary
  const summaryEl = document.getElementById("tableSummaryCount");
  if (summaryEl) {
    summaryEl.textContent = `Showing ${getFilteredProducts().length} of ${state.products.length} products`;
  }
}

// ----------------------------------------------------------------------------
// Filtering & Sorting Engine
// ----------------------------------------------------------------------------

function getFilteredProducts() {
  return state.products.filter(item => {
    // Search Filter
    const term = state.filters.search.toLowerCase().trim();
    const matchSearch = !term || 
      item.name.toLowerCase().includes(term) || 
      item.sku.toLowerCase().includes(term) ||
      item.category.toLowerCase().includes(term);

    // Category Filter
    const matchCategory = state.filters.category === "All" || item.category === state.filters.category;

    // Supplier Filter
    const matchSupplier = state.filters.supplier === "All" || item.supplier === state.filters.supplier;

    // Status Filter
    const status = getStockStatus(item);
    const matchStatus = state.filters.status === "All" || status === state.filters.status;

    return matchSearch && matchCategory && matchSupplier && matchStatus;
  }).sort((a, b) => {
    const col = state.sorting.column;
    const dir = state.sorting.direction === "asc" ? 1 : -1;

    if (col === "status") {
      const rank = { "Critical": 1, "Reorder Needed": 2, "Healthy": 3, "Overstock": 4 };
      return (rank[getStockStatus(a)] - rank[getStockStatus(b)]) * dir;
    }
    if (col === "name") {
      return a.name.localeCompare(b.name) * dir;
    }
    if (col === "onHand") {
      return (a.onHand - b.onHand) * dir;
    }
    if (col === "daysOfCover") {
      return (calculateDaysOfCover(a) - calculateDaysOfCover(b)) * dir;
    }
    if (col === "value") {
      return ((a.onHand * a.unitCost) - (b.onHand * b.unitCost)) * dir;
    }
    return 0;
  });
}

// ----------------------------------------------------------------------------
// Table Rendering
// ----------------------------------------------------------------------------

function renderTable() {
  const tbody = document.getElementById("inventoryTableBody");
  const filtered = getFilteredProducts();

  if (filtered.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="9" style="text-align: center; padding: 2.5rem; color: var(--text-muted);">
          No products matched the current search and filter criteria.
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = filtered.map(item => {
    const status = getStockStatus(item);
    const daysCover = calculateDaysOfCover(item);
    const recOrder = calculateRecommendedOrder(item);
    const invValue = item.onHand * item.unitCost;

    let badgeClass = "badge-healthy";
    if (status === "Critical") badgeClass = "badge-critical";
    else if (status === "Reorder Needed") badgeClass = "badge-warning";
    else if (status === "Overstock") badgeClass = "badge-overstock";

    // Progress bar percent relative to Reorder Point
    const progressPct = Math.min(100, Math.round((item.onHand / (item.reorderPoint * 1.5)) * 100));
    let progressColor = "var(--success)";
    if (status === "Critical") progressColor = "var(--danger)";
    else if (status === "Reorder Needed") progressColor = "var(--warning)";
    else if (status === "Overstock") progressColor = "var(--purple)";

    return `
      <tr>
        <td>
          <div class="product-cell">
            <span class="product-name">${item.name}</span>
            <span class="product-sku">${item.sku}</span>
          </div>
        </td>
        <td><span style="font-size:0.8rem; font-weight:500;">${item.category}</span></td>
        <td>
          <div style="display:flex; flex-direction:column;">
            <span style="font-weight:600;">${item.supplier}</span>
            <span style="font-size:0.75rem; color:var(--text-muted);">${item.leadTime} days lead time</span>
          </div>
        </td>
        <td>
          <strong style="font-size:0.95rem;">${item.onHand}</strong>
        </td>
        <td style="color:var(--text-muted);">${item.safetyStock} / ${item.reorderPoint}</td>
        <td>
          <div class="coverage-cell">
            <span style="font-weight:600; font-size:0.8rem;">${daysCover} days</span>
            <div class="progress-bar-bg">
              <div class="progress-bar-fill" style="width: ${progressPct}%; background: ${progressColor};"></div>
            </div>
          </div>
        </td>
        <td>${formatCurrency(invValue)}</td>
        <td>
          <span class="badge ${badgeClass}">
            <span class="badge-dot"></span>
            ${status}
          </span>
        </td>
        <td style="text-align: right;">
          <div style="display:inline-flex; gap:0.4rem;">
            <button class="btn btn-outline btn-sm" onclick="openAdjustModal(${item.id})" title="Adjust stock">
              Adjust
            </button>
            <button class="btn btn-primary btn-sm" onclick="openOrderModal(${item.id})" title="Trigger Reorder">
              Reorder
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join("");
}

// ----------------------------------------------------------------------------
// Chart.js Visualizations
// ----------------------------------------------------------------------------

function initCharts() {
  // Chart 1: Stock Level vs Reorder Point vs Safety Stock
  const ctxStock = document.getElementById("chartStockOverview").getContext("2d");
  const topItems = state.products.slice(0, 10);

  state.charts.stockOverview = new Chart(ctxStock, {
    type: "bar",
    data: {
      labels: topItems.map(p => p.sku),
      datasets: [
        {
          label: "Current On-Hand",
          data: topItems.map(p => p.onHand),
          backgroundColor: topItems.map(p => {
            const st = getStockStatus(p);
            if (st === "Critical") return "#ef4444";
            if (st === "Reorder Needed") return "#f59e0b";
            if (st === "Overstock") return "#8b5cf6";
            return "#10b981";
          }),
          borderRadius: 4
        },
        {
          label: "Safety Stock Buffer",
          data: topItems.map(p => p.safetyStock),
          backgroundColor: "#fecaca",
          borderDash: [4, 4],
          type: "line",
          borderColor: "#dc2626",
          pointRadius: 3
        },
        {
          label: "Reorder Point (ROP)",
          data: topItems.map(p => p.reorderPoint),
          backgroundColor: "#fde68a",
          type: "line",
          borderColor: "#d97706",
          pointRadius: 3
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: "top", labels: { boxWidth: 12, font: { size: 11 } } },
        tooltip: {
          callbacks: {
            title: (items) => {
              const idx = items[0].dataIndex;
              return `${topItems[idx].sku} - ${topItems[idx].name}`;
            }
          }
        }
      },
      scales: {
        y: { beginAtZero: true, grid: { color: "#f1f5f9" } },
        x: { grid: { display: false } }
      }
    }
  });

  // Chart 2: Inventory Value by Category
  const ctxCategory = document.getElementById("chartCategoryValuation").getContext("2d");
  const categoryMap = {};
  state.products.forEach(p => {
    categoryMap[p.category] = (categoryMap[p.category] || 0) + (p.onHand * p.unitCost);
  });

  state.charts.categoryValuation = new Chart(ctxCategory, {
    type: "doughnut",
    data: {
      labels: Object.keys(categoryMap),
      datasets: [{
        data: Object.values(categoryMap),
        backgroundColor: ["#2563eb", "#10b981", "#f59e0b", "#8b5cf6", "#06b6d4"],
        borderWidth: 2,
        borderColor: "#ffffff"
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: "bottom", labels: { boxWidth: 10, font: { size: 11 } } },
        tooltip: {
          callbacks: {
            label: (ctx) => ` ${ctx.label}: ${formatCurrency(ctx.parsed)}`
          }
        }
      },
      cutout: "65%"
    }
  });
}

function updateCharts() {
  if (!state.charts.stockOverview || !state.charts.categoryValuation) return;

  const topItems = state.products.slice(0, 10);
  state.charts.stockOverview.data.labels = topItems.map(p => p.sku);
  state.charts.stockOverview.data.datasets[0].data = topItems.map(p => p.onHand);
  state.charts.stockOverview.data.datasets[0].backgroundColor = topItems.map(p => {
    const st = getStockStatus(p);
    if (st === "Critical") return "#ef4444";
    if (st === "Reorder Needed") return "#f59e0b";
    if (st === "Overstock") return "#8b5cf6";
    return "#10b981";
  });
  state.charts.stockOverview.data.datasets[1].data = topItems.map(p => p.safetyStock);
  state.charts.stockOverview.data.datasets[2].data = topItems.map(p => p.reorderPoint);
  state.charts.stockOverview.update();

  const categoryMap = {};
  state.products.forEach(p => {
    categoryMap[p.category] = (categoryMap[p.category] || 0) + (p.onHand * p.unitCost);
  });
  state.charts.categoryValuation.data.labels = Object.keys(categoryMap);
  state.charts.categoryValuation.data.datasets[0].data = Object.values(categoryMap);
  state.charts.categoryValuation.update();
}

// ----------------------------------------------------------------------------
// Modals & Interactive Actions
// ----------------------------------------------------------------------------

function openOrderModal(productId) {
  const item = state.products.find(p => p.id === productId);
  if (!item) return;

  const recQty = calculateRecommendedOrder(item) || Math.max(10, item.safetyStock);
  const deliveryDays = item.leadTime;
  const expectedDate = new Date();
  expectedDate.setDate(expectedDate.getDate() + deliveryDays);

  document.getElementById("modalPOProductId").value = item.id;
  document.getElementById("modalPOProductName").textContent = `${item.sku} - ${item.name}`;
  document.getElementById("modalPOSupplier").textContent = `${item.supplier} (${item.leadTime} days lead time)`;
  document.getElementById("modalPOCurrentStock").textContent = `${item.onHand} units (Safety Stock: ${item.safetyStock})`;
  document.getElementById("modalPOOrderQty").value = recQty;
  document.getElementById("modalPOArrivalDate").textContent = expectedDate.toLocaleDateString();
  
  updatePOCostEstimate(item.unitCost, recQty);
  openModal("orderModalOverlay");
}

function updatePOCostEstimate(unitCost, qty) {
  const total = unitCost * qty;
  document.getElementById("modalPOTotalCost").textContent = formatCurrency(total);
}

function submitPurchaseOrder() {
  const productId = parseInt(document.getElementById("modalPOProductId").value);
  const qty = parseInt(document.getElementById("modalPOOrderQty").value);
  const item = state.products.find(p => p.id === productId);

  if (!item || isNaN(qty) || qty <= 0) {
    showToast("Please enter a valid order quantity.", "danger");
    return;
  }

  closeModal("orderModalOverlay");
  showToast(`Replenishment PO generated for ${qty} units of ${item.sku}. Supplier notified!`, "success");
}

function openAdjustModal(productId) {
  const item = state.products.find(p => p.id === productId);
  if (!item) return;

  document.getElementById("modalAdjProductId").value = item.id;
  document.getElementById("modalAdjProductName").textContent = `${item.sku} - ${item.name}`;
  document.getElementById("modalAdjCurrentOnHand").textContent = `${item.onHand} units`;
  document.getElementById("modalAdjNewQty").value = item.onHand;

  openModal("adjustModalOverlay");
}

function submitStockAdjustment() {
  const productId = parseInt(document.getElementById("modalAdjProductId").value);
  const newQty = parseInt(document.getElementById("modalAdjNewQty").value);
  const reason = document.getElementById("modalAdjReason").value;
  const item = state.products.find(p => p.id === productId);

  if (!item || isNaN(newQty) || newQty < 0) {
    showToast("Invalid quantity specified.", "danger");
    return;
  }

  const oldQty = item.onHand;
  item.onHand = newQty;

  updateKPIs();
  renderTable();
  updateCharts();
  closeModal("adjustModalOverlay");

  showToast(`Updated stock for ${item.sku}: ${oldQty} → ${newQty} (${reason})`, "info");
}

function openCalcModal() {
  openModal("calcModalOverlay");
  calculateSimulation();
}

function calculateSimulation() {
  const avgSales = parseFloat(document.getElementById("calcAvgSales").value) || 0;
  const maxSales = parseFloat(document.getElementById("calcMaxSales").value) || 0;
  const avgLead = parseFloat(document.getElementById("calcAvgLead").value) || 0;
  const maxLead = parseFloat(document.getElementById("calcMaxLead").value) || 0;

  // Formula: Safety Stock = (Max Daily Usage * Max Lead Time) - (Avg Daily Usage * Avg Lead Time)
  const baselineDemandDuringLead = avgSales * avgLead;
  const maxDemandDuringMaxLead = maxSales * maxLead;
  const calculatedSafetyStock = Math.max(0, Math.round(maxDemandDuringMaxLead - baselineDemandDuringLead));
  
  // Reorder Point = (Avg Daily Sales * Lead Time) + Safety Stock
  const calculatedROP = Math.round(baselineDemandDuringLead + calculatedSafetyStock);

  document.getElementById("resSafetyStock").textContent = `${calculatedSafetyStock} units`;
  document.getElementById("resROP").textContent = `${calculatedROP} units`;
  document.getElementById("resLeadDemand").textContent = `${Math.round(baselineDemandDuringLead)} units`;
}

function openModal(modalId) {
  document.getElementById(modalId).classList.add("active");
}

function closeModal(modalId) {
  document.getElementById(modalId).classList.remove("active");
}

function showToast(message, type = "info") {
  const container = document.getElementById("toastContainer");
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(10px)";
    toast.style.transition = "all 0.25s ease";
    setTimeout(() => toast.remove(), 250);
  }, 4000);
}

// ----------------------------------------------------------------------------
// CSV Data Export Engine
// ----------------------------------------------------------------------------

function exportToCSV() {
  const filtered = getFilteredProducts();
  const headers = ["SKU", "Product Name", "Category", "Supplier", "Lead Time Days", "Unit Cost", "On Hand", "Safety Stock", "Reorder Point", "Days of Cover", "Inventory Value", "Stock Status", "Recommended Order Qty"];
  
  const rows = filtered.map(p => [
    `"${p.sku}"`,
    `"${p.name.replace(/"/g, '""')}"`,
    `"${p.category}"`,
    `"${p.supplier}"`,
    p.leadTime,
    p.unitCost.toFixed(2),
    p.onHand,
    p.safetyStock,
    p.reorderPoint,
    calculateDaysOfCover(p),
    (p.onHand * p.unitCost).toFixed(2),
    `"${getStockStatus(p)}"`,
    calculateRecommendedOrder(p)
  ]);

  const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `inventory_reorder_report_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  showToast(`Exported ${filtered.length} products to CSV.`, "success");
}

// ----------------------------------------------------------------------------
// Event Listeners & Bootstrapping
// ----------------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {
  // Populate category & supplier filters dynamically
  const categories = ["All", ...new Set(state.products.map(p => p.category))];
  const suppliers = ["All", ...new Set(state.products.map(p => p.supplier))];

  const catSelect = document.getElementById("filterCategory");
  catSelect.innerHTML = categories.map(c => `<option value="${c}">${c}</option>`).join("");

  const supSelect = document.getElementById("filterSupplier");
  supSelect.innerHTML = suppliers.map(s => `<option value="${s}">${s}</option>`).join("");

  // Search input
  document.getElementById("searchInput").addEventListener("input", (e) => {
    state.filters.search = e.target.value;
    renderTable();
  });

  // Filter selects
  catSelect.addEventListener("change", (e) => {
    state.filters.category = e.target.value;
    renderTable();
  });

  supSelect.addEventListener("change", (e) => {
    state.filters.supplier = e.target.value;
    renderTable();
  });

  // Status pills
  document.querySelectorAll(".pill-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".pill-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      state.filters.status = btn.dataset.status;
      renderTable();
    });
  });

  // Sort dropdown
  document.getElementById("selectSort").addEventListener("change", (e) => {
    state.sorting.column = e.target.value;
    renderTable();
  });

  // PO qty changes
  document.getElementById("modalPOOrderQty").addEventListener("input", (e) => {
    const productId = parseInt(document.getElementById("modalPOProductId").value);
    const item = state.products.find(p => p.id === productId);
    if (item) {
      updatePOCostEstimate(item.unitCost, parseInt(e.target.value) || 0);
    }
  });

  // Initial Render
  updateKPIs();
  renderTable();
  initCharts();
});

