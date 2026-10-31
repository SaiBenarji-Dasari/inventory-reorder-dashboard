/**
 * ============================================================================
 * SMARTFLOW ANALYTICS - ENTERPRISE INVENTORY & SAFETY STOCK PLATFORM
 * Core Reactive State Engine, Authentication, Multi-View SPA & Analytics
 * ============================================================================
 */

// Global Application State
const state = {
  currentUser: null, // { name, email, role, avatar }
  currentView: "overview",
  
  // Suppliers Master
  suppliers: [
    { id: 1, name: "Northwind Labs", leadTime: 12, riskScore: 72, country: "USA", email: "orders@northwindlabs.com" },
    { id: 2, name: "Boxline Logistics Co", leadTime: 7, riskScore: 34, country: "Canada", email: "support@boxlineco.com" },
    { id: 3, name: "ForgePro Industrial", leadTime: 15, riskScore: 84, country: "Germany", email: "procurement@forgepro.de" },
    { id: 4, name: "PrintOps Supplies", leadTime: 4, riskScore: 20, country: "USA", email: "sales@printops.com" },
    { id: 5, name: "SecureWear Safety Ltd", leadTime: 9, riskScore: 61, country: "UK", email: "accounts@securewear.co.uk" },
    { id: 6, name: "Apex Microelectronics", leadTime: 18, riskScore: 78, country: "Taiwan", email: "supply@apexmicro.tw" },
    { id: 7, name: "Titan Fasteners Corp", leadTime: 10, riskScore: 45, country: "USA", email: "service@titanfasteners.com" }
  ],

  // Products & Real-time Stock Snapshots
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

  // Inbound Replenishment Purchase Orders
  purchaseOrders: [
    { poId: 1, poNumber: "PO-2026-001", productId: 1, sku: "ELE-001", name: "Industrial Sensor X12", supplier: "Northwind Labs", orderDate: "2026-10-20", expectedDate: "2026-11-01", orderedQty: 30, receivedQty: 0, status: "Pending", totalCost: 3600.00 },
    { poId: 2, poNumber: "PO-2026-002", productId: 2, sku: "PKG-002", name: "Heavy-Duty Packing Tape Roll", supplier: "Boxline Logistics Co", orderDate: "2026-10-15", expectedDate: "2026-10-22", orderedQty: 40, receivedQty: 40, status: "Received", totalCost: 740.00 },
    { poId: 3, poNumber: "PO-2026-003", productId: 3, sku: "HDW-003", name: "Grade-8 Steel Fasteners Set", supplier: "ForgePro Industrial", orderDate: "2026-10-25", expectedDate: "2026-11-09", orderedQty: 35, receivedQty: 0, status: "In-Transit", totalCost: 1470.00 },
    { poId: 4, poNumber: "PO-2026-004", productId: 4, sku: "OFF-004", name: "Thermal Barcode Label Stock", supplier: "PrintOps Supplies", orderDate: "2026-10-10", expectedDate: "2026-10-14", orderedQty: 50, receivedQty: 50, status: "Received", totalCost: 625.00 },
    { poId: 5, poNumber: "PO-2026-005", productId: 6, sku: "ELE-006", name: "Microcontroller Dev Board V4", supplier: "Apex Microelectronics", orderDate: "2026-10-22", expectedDate: "2026-11-09", orderedQty: 40, receivedQty: 0, status: "Pending", totalCost: 1800.00 },
    { poId: 6, poNumber: "PO-2026-006", productId: 11, sku: "ELE-011", name: "Lithium-Ion Battery Pack 24V", supplier: "Apex Microelectronics", orderDate: "2026-10-26", expectedDate: "2026-11-13", orderedQty: 25, receivedQty: 0, status: "In-Transit", totalCost: 4625.00 },
    { poId: 7, poNumber: "PO-2026-007", productId: 16, sku: "ELE-016", name: "Optical Proximity Switch M18", supplier: "Northwind Labs", orderDate: "2026-10-29", expectedDate: "2026-11-10", orderedQty: 30, receivedQty: 0, status: "Pending", totalCost: 2550.00 }
  ],

  filters: {
    search: "",
    category: "All",
    supplier: "All",
    status: "All"
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

// ============================================================================
// 1. AUTHENTICATION & SESSION MANAGEMENT
// ============================================================================

function switchAuthTab(tab) {
  const isLogin = tab === 'login';
  document.getElementById("tabBtnLogin").classList.toggle("active", isLogin);
  document.getElementById("tabBtnRegister").classList.toggle("active", !isLogin);
  document.getElementById("loginForm").style.display = isLogin ? "block" : "none";
  document.getElementById("registerForm").style.display = !isLogin ? "block" : "none";
}

function quickDemoLogin(roleKey) {
  const demoUsers = {
    admin: {
      name: "Sai Benarji",
      email: "director@smartflow.io",
      role: "Supply Chain Director (Admin)",
      avatar: "SB"
    },
    procurement: {
      name: "Elena Rostova",
      email: "elena@smartflow.io",
      role: "Procurement Specialist",
      avatar: "ER"
    },
    warehouse: {
      name: "Marcus Vance",
      email: "marcus@smartflow.io",
      role: "Warehouse Operations Lead",
      avatar: "MV"
    }
  };

  const user = demoUsers[roleKey] || demoUsers.admin;
  authenticateUser(user);
}

function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value.trim();
  const name = email.split("@")[0].replace(".", " ");
  const formattedName = name.charAt(0).toUpperCase() + name.slice(1);
  const avatar = formattedName.substring(0, 2).toUpperCase();

  const user = {
    name: formattedName || "Enterprise User",
    email: email,
    role: "Supply Chain Director (Admin)",
    avatar: avatar
  };

  authenticateUser(user);
}

function handleRegister(e) {
  e.preventDefault();
  const name = document.getElementById("regName").value.trim();
  const email = document.getElementById("regEmail").value.trim();
  const role = document.getElementById("regRole").value;
  const initials = name.split(" ").map(w => w[0]).join("").substring(0, 2).toUpperCase() || "US";

  const user = {
    name: name,
    email: email,
    role: role,
    avatar: initials
  };

  authenticateUser(user);
}

function authenticateUser(user) {
  state.currentUser = user;
  localStorage.setItem("smartflow_session", JSON.stringify(user));

  // Update UI user profile elements
  document.getElementById("sidebarUserName").textContent = user.name;
  document.getElementById("sidebarUserRole").textContent = user.role.split(" ")[0];
  document.getElementById("sidebarAvatar").textContent = user.avatar;

  // Transition screen
  document.getElementById("authView").style.display = "none";
  document.getElementById("appShell").style.display = "flex";

  showToast(`Welcome back, ${user.name}! Connected with ${user.role} privileges.`, "success");

  // Initialize and populate components
  refreshAllData();
  switchView("overview");
}

function handleLogout() {
  state.currentUser = null;
  localStorage.removeItem("smartflow_session");
  document.getElementById("appShell").style.display = "none";
  document.getElementById("authView").style.display = "flex";
  showToast("You have been securely signed out.", "info");
}

// ============================================================================
// 2. MULTI-VIEW SPA NAVIGATION
// ============================================================================

function switchView(viewName) {
  state.currentView = viewName;

  // View sections
  const viewMap = {
    overview: "viewOverview",
    inventory: "viewInventory",
    orders: "viewOrders",
    simulator: "viewSimulator",
    suppliers: "viewSuppliers"
  };

  const breadcrumbMap = {
    overview: "Overview Dashboard",
    inventory: "Inventory Catalog & Stock Ledger",
    orders: "Inbound Purchase Orders & Pipeline",
    simulator: "Safety Stock & ROP Simulator",
    suppliers: "Supplier Vulnerability & Performance"
  };

  // Toggle view containers
  document.querySelectorAll(".view-section").forEach(el => el.classList.remove("active"));
  const targetView = document.getElementById(viewMap[viewName]);
  if (targetView) targetView.classList.add("active");

  // Toggle sidebar active item
  document.querySelectorAll(".nav-item").forEach(el => el.classList.remove("active"));
  const navBtn = document.getElementById(`nav${viewName.charAt(0).toUpperCase() + viewName.slice(1)}`);
  if (navBtn) navBtn.classList.add("active");

  // Update Breadcrumb
  document.getElementById("headerBreadcrumb").textContent = breadcrumbMap[viewName] || "Dashboard";

  // Trigger view-specific renders
  if (viewName === "overview") {
    setTimeout(updateCharts, 50);
  } else if (viewName === "inventory") {
    renderInventoryTable();
  } else if (viewName === "orders") {
    renderPurchaseOrdersTable();
  } else if (viewName === "suppliers") {
    renderSuppliersGrid();
  } else if (viewName === "simulator") {
    calculateSimulation();
  }
}

// ============================================================================
// 3. MATHEMATICAL LOGIC & METRICS ENGINE
// ============================================================================

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

// ============================================================================
// 4. KPI & DASHBOARD CALCULATIONS
// ============================================================================

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

  // Update Alert Banner
  const alertBanner = document.getElementById("urgentAlertBanner");
  const alertTitle = document.getElementById("bannerAlertTitle");
  if (criticalCount > 0) {
    alertBanner.style.display = "flex";
    alertTitle.textContent = `Critical Stock Alert: ${criticalCount} SKUs Breached Safety Stock Threshold`;
  } else {
    alertBanner.style.display = "none";
  }

  // Update Notifications
  updateNotifications(criticalCount);
}

function updateNotifications(criticalCount) {
  const notifBadge = document.getElementById("notifBadgeCount");
  const notifCountText = document.getElementById("notifCountText");
  const notifList = document.getElementById("notifList");

  notifBadge.textContent = criticalCount;
  notifCountText.textContent = `${criticalCount} Urgent Alerts`;

  const criticalItems = state.products.filter(p => getStockStatus(p) === "Critical");
  notifList.innerHTML = criticalItems.map(item => `
    <div class="notif-item unread" style="cursor: pointer;" onclick="switchView('inventory'); filterBySearch('${item.sku}');">
      <span style="font-size: 1.1rem;">🚨</span>
      <div>
        <strong style="display:block; color:var(--text-main);">${item.sku} - ${item.name}</strong>
        <span style="color:var(--danger); font-size:0.75rem;">Only ${item.onHand} units left (Safety Stock: ${item.safetyStock})</span>
      </div>
    </div>
  `).join("") || `<div style="padding: 1rem; text-align: center; color: var(--text-muted); font-size: 0.8rem;">No critical stock violations.</div>`;

  // Update Sidebar PO Badge
  const activePOs = state.purchaseOrders.filter(po => po.status !== "Received").length;
  document.getElementById("sidebarPOBadge").textContent = `${activePOs} Active`;
}

function toggleNotifications() {
  const dd = document.getElementById("notifDropdown");
  dd.classList.toggle("show");
}

// Close notifications when clicked outside
document.addEventListener("click", (e) => {
  const dd = document.getElementById("notifDropdown");
  const bell = document.querySelector(".notif-bell-btn");
  if (dd && bell && !dd.contains(e.target) && !bell.contains(e.target)) {
    dd.classList.remove("show");
  }
});

// ============================================================================
// 5. INVENTORY TABLE RENDERING & FILTERING
// ============================================================================

function filterByStatusPill(status) {
  state.filters.status = status;
  document.querySelectorAll(".status-pill").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.status === status);
  });
  renderInventoryTable();
}

function filterBySearch(sku) {
  state.filters.search = sku;
  document.getElementById("searchInput").value = sku;
  renderInventoryTable();
}

function getFilteredProducts() {
  return state.products.filter(item => {
    const term = state.filters.search.toLowerCase().trim();
    const matchSearch = !term || 
      item.name.toLowerCase().includes(term) || 
      item.sku.toLowerCase().includes(term) ||
      item.category.toLowerCase().includes(term);

    const matchCategory = state.filters.category === "All" || item.category === state.filters.category;
    const matchSupplier = state.filters.supplier === "All" || item.supplier === state.filters.supplier;
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
    if (col === "name") return a.name.localeCompare(b.name) * dir;
    if (col === "onHand") return (a.onHand - b.onHand) * dir;
    if (col === "daysOfCover") return (calculateDaysOfCover(a) - calculateDaysOfCover(b)) * dir;
    if (col === "value") return ((a.onHand * a.unitCost) - (b.onHand * b.unitCost)) * dir;
    return 0;
  });
}

function renderInventoryTable() {
  const tbody = document.getElementById("inventoryTableBody");
  if (!tbody) return;

  const filtered = getFilteredProducts();

  if (filtered.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="9" style="text-align: center; padding: 3rem; color: var(--text-muted);">
          No products found matching the criteria.
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = filtered.map(item => {
    const status = getStockStatus(item);
    const daysCover = calculateDaysOfCover(item);
    const invValue = item.onHand * item.unitCost;

    let badgeClass = "badge-healthy";
    if (status === "Critical") badgeClass = "badge-critical";
    else if (status === "Reorder Needed") badgeClass = "badge-warning";
    else if (status === "Overstock") badgeClass = "badge-overstock";

    const progressPct = Math.min(100, Math.round((item.onHand / (item.reorderPoint * 1.5)) * 100));
    let progressColor = "var(--success)";
    if (status === "Critical") progressColor = "var(--danger)";
    else if (status === "Reorder Needed") progressColor = "var(--warning)";
    else if (status === "Overstock") progressColor = "var(--violet)";

    return `
      <tr>
        <td>
          <span class="item-name">${item.name}</span>
          <span class="item-sku">${item.sku}</span>
        </td>
        <td><span style="font-size:0.8rem; font-weight:600;">${item.category}</span></td>
        <td>
          <div style="display:flex; flex-direction:column;">
            <span style="font-weight:700;">${item.supplier}</span>
            <span style="font-size:0.75rem; color:var(--text-muted);">${item.leadTime} days lead time</span>
          </div>
        </td>
        <td><strong style="font-size:1rem;">${item.onHand}</strong></td>
        <td style="color:var(--text-muted); font-size:0.8rem;">
          ${item.safetyStock} <span style="opacity:0.5;">/</span> ${item.reorderPoint}
        </td>
        <td>
          <div class="runway-wrap">
            <span style="font-weight:700; font-size:0.8rem;">${daysCover} days</span>
            <div class="runway-bar-bg">
              <div class="runway-bar-fill" style="width: ${progressPct}%; background: ${progressColor};"></div>
            </div>
          </div>
        </td>
        <td><strong>${formatCurrency(invValue)}</strong></td>
        <td>
          <span class="badge ${badgeClass}">
            <span class="badge-dot"></span>
            ${status}
          </span>
        </td>
        <td style="text-align: right;">
          <div style="display:inline-flex; gap:0.4rem;">
            <button class="btn btn-outline btn-sm" onclick="openAdjustModal(${item.id})" title="Manual Audit / Recount">
              Adjust
            </button>
            <button class="btn btn-primary btn-sm" onclick="openOrderModal(${item.id})" title="Issue Replenishment PO">
              Reorder
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join("");

  document.getElementById("tableSummaryCount").textContent = `Showing ${filtered.length} of ${state.products.length} products`;
}

// ============================================================================
// 6. PURCHASE ORDERS TABLE & LOGIC
// ============================================================================

function renderPurchaseOrdersTable() {
  const tbody = document.getElementById("purchaseOrdersTableBody");
  if (!tbody) return;

  tbody.innerHTML = state.purchaseOrders.map(po => {
    let statusClass = "badge-pending";
    if (po.status === "In-Transit") statusClass = "badge-transit";
    if (po.status === "Received") statusClass = "badge-received";

    return `
      <tr>
        <td><span class="item-sku">${po.poNumber}</span></td>
        <td>
          <strong class="item-name">${po.name}</strong>
          <span class="item-sku">${po.sku}</span>
        </td>
        <td>${po.supplier}</td>
        <td>${po.orderDate}</td>
        <td><strong>${po.expectedDate}</strong></td>
        <td>${po.orderedQty} units</td>
        <td>
          <span class="badge ${statusClass}">
            <span class="badge-dot"></span>
            ${po.status}
          </span>
        </td>
        <td><strong>${formatCurrency(po.totalCost)}</strong></td>
        <td style="text-align: right;">
          ${po.status !== "Received" ? `
            <button class="btn btn-outline btn-sm" onclick="receivePurchaseOrder(${po.poId})">
              ✅ Receive Batch
            </button>
          ` : `<span style="font-size:0.75rem; color:var(--success); font-weight:700;">Fulfilled</span>`}
        </td>
      </tr>
    `;
  }).join("");
}

function receivePurchaseOrder(poId) {
  const po = state.purchaseOrders.find(p => p.poId === poId);
  if (!po) return;

  po.status = "Received";
  po.receivedQty = po.orderedQty;

  // Add stock to product
  const product = state.products.find(p => p.id === po.productId);
  if (product) {
    product.onHand += po.orderedQty;
  }

  refreshAllData();
  renderPurchaseOrdersTable();
  showToast(`Receipt confirmed for ${po.poNumber}: +${po.orderedQty} units added to stock of ${product ? product.sku : 'SKU'}!`, "success");
}

// ============================================================================
// 7. SUPPLIER RISK MATRIX CARDS
// ============================================================================

function renderSuppliersGrid() {
  const container = document.getElementById("supplierCardsGrid");
  if (!container) return;

  container.innerHTML = state.suppliers.map(sup => {
    const productsSupplied = state.products.filter(p => p.supplierId === sup.id);
    const totalExposure = productsSupplied.reduce((acc, p) => acc + (p.onHand * p.unitCost), 0);
    const criticalCount = productsSupplied.filter(p => getStockStatus(p) === "Critical").length;

    let scoreClass = "score-low";
    let scoreLabel = "Low Risk";
    if (sup.riskScore >= 75) { scoreClass = "score-high"; scoreLabel = "High Risk"; }
    else if (sup.riskScore >= 50) { scoreClass = "score-medium"; scoreLabel = "Moderate Risk"; }

    return `
      <div class="supplier-card">
        <div class="supplier-card-header">
          <div>
            <h3 class="supplier-name">${sup.name}</h3>
            <span class="supplier-country">📍 ${sup.country} &bull; ${sup.email}</span>
          </div>
          <span class="supplier-score-pill ${scoreClass}">${sup.riskScore}/100 &bull; ${scoreLabel}</span>
        </div>

        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.5rem; background: var(--surface-alt); padding: 0.75rem; border-radius: var(--radius-sm); text-align: center;">
          <div>
            <span style="font-size: 0.7rem; color: var(--text-muted); display: block;">Lead Time</span>
            <strong style="font-size: 0.95rem;">${sup.leadTime} days</strong>
          </div>
          <div>
            <span style="font-size: 0.7rem; color: var(--text-muted); display: block;">SKUs Supplied</span>
            <strong style="font-size: 0.95rem;">${productsSupplied.length}</strong>
          </div>
          <div>
            <span style="font-size: 0.7rem; color: var(--text-muted); display: block;">Exposure Value</span>
            <strong style="font-size: 0.95rem;">${formatCurrency(totalExposure)}</strong>
          </div>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-subtle); padding-top: 0.75rem;">
          <span style="font-size: 0.75rem; color: ${criticalCount > 0 ? 'var(--danger)' : 'var(--text-muted)'}; font-weight: 600;">
            ${criticalCount > 0 ? `🚨 ${criticalCount} items in critical deficit` : `✅ All supplied items healthy`}
          </span>
          <button class="btn btn-outline btn-sm" onclick="showToast('Contacting ${sup.email}...', 'info')">
            ✉️ Contact Supplier
          </button>
        </div>
      </div>
    `;
  }).join("");
}

// ============================================================================
// 8. VISUAL ANALYTICS (CHART.JS)
// ============================================================================

function initCharts() {
  const ctxStock = document.getElementById("chartStockOverview");
  const ctxCat = document.getElementById("chartCategoryValuation");
  if (!ctxStock || !ctxCat) return;

  const topItems = state.products.slice(0, 10);

  state.charts.stockOverview = new Chart(ctxStock.getContext("2d"), {
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
          borderRadius: 6
        },
        {
          label: "Safety Stock Buffer",
          data: topItems.map(p => p.safetyStock),
          backgroundColor: "#fecaca",
          borderDash: [4, 4],
          type: "line",
          borderColor: "#dc2626",
          pointRadius: 4
        },
        {
          label: "Reorder Point (ROP)",
          data: topItems.map(p => p.reorderPoint),
          backgroundColor: "#fde68a",
          type: "line",
          borderColor: "#d97706",
          pointRadius: 4
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: "top", labels: { boxWidth: 12, font: { family: 'Plus Jakarta Sans', size: 11, weight: 600 } } },
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

  const categoryMap = {};
  state.products.forEach(p => {
    categoryMap[p.category] = (categoryMap[p.category] || 0) + (p.onHand * p.unitCost);
  });

  state.charts.categoryValuation = new Chart(ctxCat.getContext("2d"), {
    type: "doughnut",
    data: {
      labels: Object.keys(categoryMap),
      datasets: [{
        data: Object.values(categoryMap),
        backgroundColor: ["#3b82f6", "#10b981", "#f59e0b", "#8b5cf6", "#06b6d4"],
        borderWidth: 2,
        borderColor: "#ffffff"
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: "bottom", labels: { boxWidth: 10, font: { family: 'Plus Jakarta Sans', size: 11, weight: 600 } } },
        tooltip: {
          callbacks: {
            label: (ctx) => ` ${ctx.label}: ${formatCurrency(ctx.parsed)}`
          }
        }
      },
      cutout: "68%"
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

// ============================================================================
// 9. MODALS & MUTATION ACTIONS
// ============================================================================

function openOrderModal(productId) {
  const item = state.products.find(p => p.id === productId) || state.products[0];
  if (!item) return;

  const recQty = calculateRecommendedOrder(item) || Math.max(10, item.safetyStock);
  const deliveryDays = item.leadTime;
  const expectedDate = new Date();
  expectedDate.setDate(expectedDate.getDate() + deliveryDays);

  document.getElementById("modalPOProductId").value = item.id;
  document.getElementById("modalPOProductName").textContent = `${item.sku} - ${item.name}`;
  document.getElementById("modalPOSupplier").textContent = `${item.supplier} (${item.leadTime} days lead time)`;
  document.getElementById("modalPOCurrentStock").textContent = `${item.onHand} units on hand (Safety Stock: ${item.safetyStock})`;
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

  const expected = new Date();
  expected.setDate(expected.getDate() + item.leadTime);

  const newPO = {
    poId: state.purchaseOrders.length + 1,
    poNumber: `PO-2026-${String(state.purchaseOrders.length + 1).padStart(3, '0')}`,
    productId: item.id,
    sku: item.sku,
    name: item.name,
    supplier: item.supplier,
    orderDate: new Date().toISOString().slice(0, 10),
    expectedDate: expected.toISOString().slice(0, 10),
    orderedQty: qty,
    receivedQty: 0,
    status: "Pending",
    totalCost: qty * item.unitCost
  };

  state.purchaseOrders.unshift(newPO);
  closeModal("orderModalOverlay");
  refreshAllData();
  renderPurchaseOrdersTable();
  showToast(`PO ${newPO.poNumber} issued for ${qty} units of ${item.sku}. Vendor notified!`, "success");
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

  refreshAllData();
  closeModal("adjustModalOverlay");
  showToast(`Stock updated for ${item.sku}: ${oldQty} → ${newQty} (${reason})`, "info");
}

function openAddProductModal() {
  const supSelect = document.getElementById("newSupplier");
  supSelect.innerHTML = state.suppliers.map(s => `<option value="${s.id}">${s.name} (${s.leadTime}d lead)</option>`).join("");
  openModal("addProductModalOverlay");
}

function submitNewProduct() {
  const sku = document.getElementById("newSku").value.trim().toUpperCase();
  const name = document.getElementById("newName").value.trim();
  const category = document.getElementById("newCategory").value;
  const supplierId = parseInt(document.getElementById("newSupplier").value);
  const supplierObj = state.suppliers.find(s => s.id === supplierId);
  const unitCost = parseFloat(document.getElementById("newCost").value) || 20;
  const onHand = parseInt(document.getElementById("newOnHand").value) || 0;
  const avgDaily = parseFloat(document.getElementById("newAvgDaily").value) || 2;
  const safetyStock = parseInt(document.getElementById("newSafety").value) || 10;

  if (!sku || !name) {
    showToast("Please provide SKU and Product Name.", "danger");
    return;
  }

  // Auto-calculate Reorder Point: (Avg Daily * Lead Time) + Safety Stock
  const leadTime = supplierObj ? supplierObj.leadTime : 10;
  const reorderPoint = Math.round((avgDaily * leadTime) + safetyStock);

  const newProduct = {
    id: state.products.length + 1,
    sku: sku,
    name: name,
    category: category,
    supplier: supplierObj ? supplierObj.name : "Custom Vendor",
    supplierId: supplierId,
    leadTime: leadTime,
    riskScore: supplierObj ? supplierObj.riskScore : 50,
    unitCost: unitCost,
    onHand: onHand,
    reorderPoint: reorderPoint,
    safetyStock: safetyStock,
    avgDailySales: avgDaily,
    maxDailySales: avgDaily * 1.8
  };

  state.products.push(newProduct);
  populateFilters();
  refreshAllData();
  closeModal("addProductModalOverlay");
  showToast(`SKU ${sku} registered successfully with ROP: ${reorderPoint}!`, "success");
}

function calculateSimulation() {
  const avgSales = parseFloat(document.getElementById("calcAvgSales").value) || 0;
  const maxSales = parseFloat(document.getElementById("calcMaxSales").value) || 0;
  const avgLead = parseFloat(document.getElementById("calcAvgLead").value) || 0;
  const maxLead = parseFloat(document.getElementById("calcMaxLead").value) || 0;

  const baselineLeadDemand = avgSales * avgLead;
  const maxDemand = maxSales * maxLead;
  const calculatedSafetyStock = Math.max(0, Math.round(maxDemand - baselineLeadDemand));
  const calculatedROP = Math.round(baselineLeadDemand + calculatedSafetyStock);

  document.getElementById("resSafetyStock").textContent = `${calculatedSafetyStock} units`;
  document.getElementById("resROP").textContent = `${calculatedROP} units`;
  document.getElementById("resLeadDemand").textContent = `${Math.round(baselineLeadDemand)} units`;
}

function openModal(id) { document.getElementById(id).classList.add("open"); }
function closeModal(id) { document.getElementById(id).classList.remove("open"); }

function showToast(message, type = "info") {
  const rack = document.getElementById("toastRack");
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span>${message}</span>`;
  rack.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(10px)";
    toast.style.transition = "all 0.25s ease";
    setTimeout(() => toast.remove(), 250);
  }, 4000);
}

// ============================================================================
// 10. CSV EXPORT & REFRESH HELPERS
// ============================================================================

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
  link.setAttribute("download", `smartflow_inventory_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  showToast(`Exported ${filtered.length} products to CSV.`, "success");
}

function populateFilters() {
  const categories = ["All", ...new Set(state.products.map(p => p.category))];
  const suppliers = ["All", ...new Set(state.products.map(p => p.supplier))];

  const catSelect = document.getElementById("filterCategory");
  if (catSelect) catSelect.innerHTML = categories.map(c => `<option value="${c}">${c}</option>`).join("");

  const supSelect = document.getElementById("filterSupplier");
  if (supSelect) supSelect.innerHTML = suppliers.map(s => `<option value="${s}">${s}</option>`).join("");
}

function refreshAllData() {
  updateKPIs();
  renderInventoryTable();
  updateCharts();
}

// ============================================================================
// 11. BOOTSTRAPPING
// ============================================================================

document.addEventListener("DOMContentLoaded", () => {
  populateFilters();

  // Search input
  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      state.filters.search = e.target.value;
      renderInventoryTable();
    });
  }

  // Filter dropdowns
  const catFilter = document.getElementById("filterCategory");
  if (catFilter) {
    catFilter.addEventListener("change", (e) => {
      state.filters.category = e.target.value;
      renderInventoryTable();
    });
  }

  const supFilter = document.getElementById("filterSupplier");
  if (supFilter) {
    supFilter.addEventListener("change", (e) => {
      state.filters.supplier = e.target.value;
      renderInventoryTable();
    });
  }

  // Status pills
  document.querySelectorAll(".status-pill").forEach(pill => {
    pill.addEventListener("click", () => {
      filterByStatusPill(pill.dataset.status);
    });
  });

  // Sort dropdown
  const sortSelect = document.getElementById("selectSort");
  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      state.sorting.column = e.target.value;
      renderInventoryTable();
    });
  }

  // PO Order Qty input
  const orderQtyInput = document.getElementById("modalPOOrderQty");
  if (orderQtyInput) {
    orderQtyInput.addEventListener("input", (e) => {
      const productId = parseInt(document.getElementById("modalPOProductId").value);
      const item = state.products.find(p => p.id === productId);
      if (item) {
        updatePOCostEstimate(item.unitCost, parseInt(e.target.value) || 0);
      }
    });
  }

  // Check persisted session
  const savedSession = localStorage.getItem("smartflow_session");
  if (savedSession) {
    try {
      const user = JSON.parse(savedSession);
      authenticateUser(user);
    } catch (e) {
      localStorage.removeItem("smartflow_session");
    }
  } else {
    // Show auth screen
    document.getElementById("authView").style.display = "flex";
    document.getElementById("appShell").style.display = "none";
  }

  initCharts();
});
