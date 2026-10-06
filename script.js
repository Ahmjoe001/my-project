/* TailorDesk keeps its records in this browser. Export a backup regularly. */
(() => {
  'use strict';

  // Keep the established keys so existing customer, order, and appearance data remains available.
  const STORAGE_KEY = 'jcrafts-data-v1';
  const THEME_KEY = 'jcrafts-theme';
  const APPEARANCE_KEY = 'jcrafts-appearance-v1';
  const BRAND_NAME = 'TailorDesk';
  const BRAND_TAGLINE = 'Your Tailoring Business, Organized.';
  const THEME_OPTIONS = ['black', 'white', 'red', 'green', 'blue', 'ash'];
  const userName = 'Joel';
  const GREETING_TYPE_DELAY = 105;
  const GREETING_DELETE_DELAY = 58;
  const GREETING_HOLD_DELAY = 1500;
  const WELCOME_HOLD_DELAY = 1700;
  const MEASUREMENT_FIELDS = ['Shoulder', 'Chest', 'Waist', 'Hip', 'Sleeve', 'Shirt Length', 'Trouser Length', 'Thigh', 'Knee', 'Ankle', 'Neck', 'Other'];
  const ICONS = {
    grid: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
    users: '<path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="10" cy="7" r="4"/><path d="M20 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
    scissors: '<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M20 4 8.12 15.88M14.47 14.48 20 20M8.12 8.12 12 12"/>',
    ruler: '<path d="m21.3 8.7-6-6a1 1 0 0 0-1.4 0l-11 11a1 1 0 0 0 0 1.4l6 6a1 1 0 0 0 1.4 0l11-11a1 1 0 0 0 0-1.4Z"/><path d="m7.5 10.5 2 2m1-5 2 2m1-5 2 2m-8 9 2 2"/>',
    image: '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/>',
    wallet: '<rect x="3" y="5" width="18" height="15" rx="2"/><path d="M3 8h18M16 14h.01M3 5l14-2"/>',
    settings: '<circle cx="12" cy="12" r="3"/><path d="m19.4 15 .1.1 1.4 1.1-1.4 2.4-1.7-.7a8 8 0 0 1-1.6.9l-.3 1.8h-2.8l-.3-1.8a8 8 0 0 1-1.6-.9l-1.7.7-1.4-2.4 1.4-1.1a7 7 0 0 1 0-1.9l-1.4-1.1 1.4-2.4 1.7.7a8 8 0 0 1 1.6-.9l.3-1.8h2.8l.3 1.8a8 8 0 0 1 1.6.9l1.7-.7 1.4 2.4-1.4 1.1a7 7 0 0 1 0 1.9Z"/>',
    menu: '<path d="M4 6h16M4 12h16M4 18h16"/>', bell: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/>',
    plus: '<path d="M12 5v14M5 12h14"/>', 'arrow-right': '<path d="M5 12h14m-7-7 7 7-7 7"/>', calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 11h18"/>',
    'calendar-check': '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 11h18m5 4 2 2 4-4"/>', search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>', download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4m4-5 5 5 5-5m-5 5V3"/>',
    upload: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4m12-7-3-3-3 3m3-3v12"/>', check: '<path d="m5 12 4 4L19 6"/>', camera: '<path d="M14 5h-4l-2 3H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2h-4l-2-3Z"/><circle cx="12" cy="13" r="3"/>',
    x: '<path d="m18 6-12 12M6 6l12 12"/>', trash: '<path d="M3 6h18m-2 0-.9 14H5.9L5 6m4 0V4h6v2m-5 4v6m4-6v6"/>', edit: '<path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z"/>', printer: '<path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><path d="M6 14h12v8H6z"/>',
    receipt: '<path d="M4 3v18l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V3l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"/><path d="M8 8h8m-8 4h8m-8 4h5"/>', clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>', phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7l.5 2.8a2 2 0 0 1-.6 1.9L7.7 9.7a16 16 0 0 0 6.6 6.6l1.3-1.3a2 2 0 0 1 1.9-.6l2.8.5a2 2 0 0 1 1.7 2Z"/>',
    store: '<path d="m3 9 1-6h16l1 6M5 9v12h14V9M3 9a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0M9 21v-7h6v7"/>', 'sun-moon': '<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2m10-10h-2M4 12H2m17.1-7.1-1.4 1.4M6.3 17.7l-1.4 1.4m14.2 0-1.4-1.4M6.3 6.3 4.9 4.9"/>', sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2m10-10h-2M4 12H2m17.1-7.1-1.4 1.4M6.3 17.7l-1.4 1.4m14.2 0-1.4-1.4M6.3 6.3 4.9 4.9"/>', moon: '<path d="M20.9 13A9 9 0 0 1 11 3.1 9 9 0 1 0 20.9 13Z"/>', database: '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.7 4 3 9 3s9-1.3 9-3V5M3 12c0 1.7 4 3 9 3s9-1.3 9-3"/>',
    banknote: '<rect x="2" y="5" width="20" height="14" rx="2"/><circle cx="12" cy="12" r="3"/><path d="M6 9h.01M18 15h.01"/>',
  };

  const freshData = () => ({ version: 1, orders: [], customers: [], payments: [], gallery: [], nextOrderNumber: 1, settings: { businessName: BRAND_NAME, brandName: BRAND_NAME, phone: '', address: '' } });
  let data = loadData();
  let appearance = loadAppearancePreferences();
  let greetingRunId = 0;
  let orderPhoto = '';
  let galleryPhoto = '';
  let orderCustomMeasurements = {};
  let editorCustomMeasurements = {};
  let activeCustomer = '';

  function loadData() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
      if (!saved || typeof saved !== 'object') return freshData();
      const restored = { ...freshData(), ...saved, orders: Array.isArray(saved.orders) ? saved.orders : [], customers: Array.isArray(saved.customers) ? saved.customers : [], payments: Array.isArray(saved.payments) ? saved.payments : [], gallery: Array.isArray(saved.gallery) ? saved.gallery : [], settings: { ...freshData().settings, ...(saved.settings || {}) } };
      if (String(restored.settings.businessName).trim().toLowerCase() === 'prestige tailoring house') {
        restored.settings.businessName = BRAND_NAME;
      }
      if (['j crafts', "the tailor's notebook", "tailor's notebook"].includes(String(restored.settings.brandName || '').trim().toLowerCase())) {
        restored.settings.brandName = BRAND_NAME;
      }
      restored.orders = restored.orders.map(order => {
        const customer = restored.customers.find(item => item.id === order.customerId);
        return { ...order, customerName: order.customerName || order.name || customer?.name || '', phone: order.phone || customer?.phone || '', email: order.email || customer?.email || '', address: order.address || customer?.address || '' };
      });
      return restored;
    } catch (error) {
      console.warn('TailorDesk data could not be read:', error);
      return freshData();
    }
  }

  function loadAppearancePreferences() {
    try {
      const saved = JSON.parse(localStorage.getItem(APPEARANCE_KEY) || 'null') || {};
      const legacyMode = localStorage.getItem(THEME_KEY) === 'dark' ? 'dark' : 'light';
      return {
        theme: THEME_OPTIONS.includes(saved.theme) ? saved.theme : 'green',
        mode: ['light', 'dark'].includes(saved.mode) ? saved.mode : legacyMode,
      };
    } catch (error) {
      console.warn('TailorDesk appearance preferences could not be read:', error);
      return { theme: 'green', mode: 'light' };
    }
  }

  function saveData(message = '') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      renderAll();
      if (message) toast(message);
      return true;
    } catch (error) {
      console.error('TailorDesk data could not be saved:', error);
      toast('Could not save. The browser may be out of storage; remove a large photo or download a backup.', true);
      return false;
    }
  }

  function icon(name) {
    return `<svg viewBox="0 0 24 24" fill="none" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ICONS.check}</svg>`;
  }

  function brandLogo() {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3 8.5 7.5a5 5 0 0 0 7 7L20 10M12 3l3 3m-3-3-2 4m1.2 3.8L6 16a3 3 0 0 0 4.2 4.2l5.2-5.2M15 6l3-3m-3 3 3 3"/></svg>';
  }

  function paintIcons(root = document) {
    root.querySelectorAll('[data-icon]').forEach(node => { node.innerHTML = icon(node.dataset.icon); });
  }

  function escapeHtml(value = '') {
    return String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
  }

  function safeImage(value) {
    return typeof value === 'string' && /^data:image\/(?:jpeg|png|webp|gif);base64,/i.test(value) ? value : '';
  }

  function money(value) {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(Number(value) || 0);
  }

  function localDateInput(date = new Date()) {
    const offset = date.getTimezoneOffset() * 60000;
    return new Date(date.getTime() - offset).toISOString().slice(0, 10);
  }

  function localDateTimeInput(date = new Date()) {
    const offset = date.getTimezoneOffset() * 60000;
    return new Date(date.getTime() - offset).toISOString().slice(0, 16);
  }

  function parseDate(value) {
    if (!value) return null;
    const date = new Date(value.length === 10 ? `${value}T00:00:00` : value);
    return Number.isNaN(date.getTime()) ? null : date;
  }

  function formatDate(value, options = { day: 'numeric', month: 'short', year: 'numeric' }) {
    const date = parseDate(value);
    return date ? new Intl.DateTimeFormat('en-NG', options).format(date) : 'Not set';
  }

  function timeLeft(value) {
    const date = parseDate(value);
    if (!date) return 'Date not set';
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);
    const days = Math.round((date - today) / 86400000);
    if (days < 0) return `${Math.abs(days)} day${days === -1 ? '' : 's'} overdue`;
    if (days === 0) return 'Due today';
    if (days === 1) return 'Collection tomorrow';
    if (days <= 7) return `In ${days} days`;
    return `In ${days} days`;
  }

  function initials(name = '') {
    return name.trim().split(/\s+/).slice(0, 2).map(part => part.charAt(0)).join('').toUpperCase() || 'JC';
  }

  function safeId() {
    return globalThis.crypto?.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  }

  function orderPayments(orderId) {
    return data.payments.filter(payment => payment.orderId === orderId);
  }

  function paidAmount(order) {
    return orderPayments(order.id).reduce((sum, payment) => sum + (Number(payment.amount) || 0), 0);
  }

  function balance(order) {
    return Math.max(0, Number(order.total || 0) - paidAmount(order));
  }

  function paymentStatus(order) {
    const paid = paidAmount(order);
    if (balance(order) <= 0) return 'Fully Paid';
    return paid > 0 ? 'Partially Paid' : 'Not Paid';
  }

  function statusClass(status) {
    return `status-${String(status).toLowerCase().replace(/\s+/g, '-')}`;
  }

  function paymentClass(status) {
    return `payment-${String(status).toLowerCase().replace(/\s+/g, '-')}`;
  }

  function statusBadge(status) {
    return `<span class="status-badge ${statusClass(status)}">${escapeHtml(status)}</span>`;
  }

  function paymentBadge(status) {
    return `<span class="payment-badge ${paymentClass(status)}">${escapeHtml(status)}</span>`;
  }

  function getCustomer(customerId) {
    return data.customers.find(customer => customer.id === customerId);
  }

  function customerOrders(customerId) {
    return data.orders.filter(order => order.customerId === customerId).sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)));
  }

  function toast(message, isError = false) {
    const region = document.getElementById('toast-region');
    const node = document.createElement('div');
    node.className = `toast${isError ? ' error' : ''}`;
    node.innerHTML = `${icon(isError ? 'x' : 'check')}<span>${escapeHtml(message)}</span>`;
    region.append(node);
    window.setTimeout(() => node.remove(), 3600);
  }

  function openOverlay(id) {
    const overlay = document.getElementById(id);
    if (!overlay) return;
    overlay.hidden = false;
    document.body.classList.add('modal-open');
    const focusTarget = overlay.querySelector('input:not([type="hidden"]), button, select, textarea');
    if (focusTarget) window.setTimeout(() => focusTarget.focus(), 30);
  }

  function closeOverlay(id) {
    const overlay = document.getElementById(id);
    if (overlay) overlay.hidden = true;
    if (!document.querySelector('.overlay:not([hidden])')) document.body.classList.remove('modal-open');
  }

  function greetingIsActive(runId) {
    return runId === greetingRunId && document.getElementById('view-dashboard').classList.contains('active');
  }

  function wait(milliseconds) {
    return new Promise(resolve => window.setTimeout(resolve, milliseconds));
  }

  function currentTimeGreeting() {
    const hour = new Date().getHours();
    const salutation = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
    return `${salutation}, ${userName}`;
  }

  // Reveal and erase one character at a time; a run token cleanly stops animation off-dashboard.
  async function typeGreeting(text, runId) {
    const target = document.getElementById('greeting-text');
    for (let index = 1; index <= text.length; index += 1) {
      if (!greetingIsActive(runId)) return false;
      target.textContent = text.slice(0, index);
      await wait(GREETING_TYPE_DELAY);
    }
    return greetingIsActive(runId);
  }

  async function eraseGreeting(text, runId) {
    const target = document.getElementById('greeting-text');
    // Backspace from the end so each completed phrase clears naturally from right to left.
    for (let length = text.length - 1; length >= 0; length -= 1) {
      if (!greetingIsActive(runId)) return false;
      target.textContent = text.slice(0, length);
      await wait(GREETING_DELETE_DELAY);
    }
    return greetingIsActive(runId);
  }

  async function runGreetingAnimation(runId) {
    const welcome = `Welcome to ${BRAND_NAME}`;
    while (greetingIsActive(runId)) {
      const greeting = currentTimeGreeting();
      if (!await typeGreeting(greeting, runId)) return;
      await wait(GREETING_HOLD_DELAY);
      if (!greetingIsActive(runId) || !await eraseGreeting(greeting, runId)) return;
      if (!await typeGreeting(welcome, runId)) return;
      await wait(WELCOME_HOLD_DELAY);
      if (!greetingIsActive(runId) || !await eraseGreeting(welcome, runId)) return;
    }
  }

  function startGreetingAnimation() {
    greetingRunId += 1;
    document.getElementById('greeting-text').textContent = '';
    runGreetingAnimation(greetingRunId);
  }

  function stopGreetingAnimation() {
    greetingRunId += 1;
  }

  function setView(view) {
    const section = document.getElementById(`view-${view}`);
    if (!section) return;
    document.querySelectorAll('.view-section').forEach(node => node.classList.toggle('active', node === section));
    document.querySelectorAll('.nav-link[data-view]').forEach(node => node.classList.toggle('active', node.dataset.view === view));
    const nav = document.querySelector(`.nav-link[data-view="${view}"]`);
    document.getElementById('breadcrumb-current').textContent = nav ? nav.textContent.trim() : 'Dashboard';
    document.getElementById('sidebar').classList.remove('open');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (view === 'payments') renderPayments();
    if (view === 'dashboard') startGreetingAnimation();
    else stopGreetingAnimation();
  }

  function renderDashboard() {
    const active = data.orders.filter(order => ['Received', 'In Progress', 'Ready'].includes(order.status));
    const completed = data.orders.filter(order => order.status === 'Collected').length;
    const ready = data.orders.filter(order => order.status === 'Ready').length;
    const totalReceived = data.payments.reduce((sum, payment) => sum + Number(payment.amount || 0), 0);
    const outstanding = data.orders.filter(order => !['Cancelled', 'Collected'].includes(order.status)).reduce((sum, order) => sum + balance(order), 0);
    const metrics = [
      ['Total customers', data.customers.length, 'In your customer book', 'users'],
      ['Active orders', active.length, 'Currently in the workroom', 'scissors'],
      ['Completed orders', completed, 'Ready and collected', 'check'],
      ['Ready for collection', ready, 'Waiting for their owner', 'calendar-check'],
      ['Amount received', money(totalReceived), 'Across all recorded payments', 'banknote'],
      ['Outstanding balance', money(outstanding), 'On active orders', 'wallet'],
    ];
    document.getElementById('metric-grid').innerHTML = metrics.map(([label, value, caption, iconName]) => `<article class="metric-card"><div class="metric-top"><span>${label}</span><span class="metric-icon">${icon(iconName)}</span></div><div class="metric-value${typeof value === 'string' && value.startsWith('₦') ? ' money' : ''}">${escapeHtml(value)}</div><div class="metric-foot">${caption}</div></article>`).join('');

    const latest = [...data.orders].sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt))).slice(0, 5);
    const tbody = document.getElementById('recent-orders-body');
    tbody.innerHTML = latest.map(order => `<tr data-order="${escapeHtml(order.id)}"><td><div class="primary-cell"><strong>${escapeHtml(order.customerName)}</strong><small class="order-ref">${escapeHtml(order.orderNumber)}</small></div></td><td><div class="primary-cell"><strong>${escapeHtml(order.type)}</strong><small class="secondary-cell">${escapeHtml(order.style)}</small></div></td><td>${statusBadge(order.status)}</td><td><div class="money-cell">${money(order.total)}<small>${money(balance(order))} due</small></div></td><td>${escapeHtml(formatDate(order.collectionDate, { day: 'numeric', month: 'short' }))}</td></tr>`).join('');
    document.getElementById('recent-empty').hidden = latest.length > 0;

    const upcoming = data.orders.filter(order => !['Collected', 'Cancelled'].includes(order.status) && order.collectionDate).map(order => ({ order, date: parseDate(order.collectionDate) })).filter(item => item.date).sort((a, b) => a.date - b.date);
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const reminders = upcoming.filter(item => (item.date - today) / 86400000 <= 7).slice(0, 5);
    document.getElementById('dashboard-collections').innerHTML = reminders.map(({ order, date }) => {
      const overdue = date < today;
      return `<div class="collection-item" data-order="${escapeHtml(order.id)}"><span class="date-tile"><small>${escapeHtml(date.toLocaleDateString('en-NG', { month: 'short' }))}</small><strong>${date.getDate()}</strong></span><span class="collection-info"><strong>${escapeHtml(order.customerName)}’s ${escapeHtml(order.type)}</strong><small>${escapeHtml(order.orderNumber)} · ${escapeHtml(order.status)}</small></span><span class="collection-when${overdue ? ' overdue' : ''}">${escapeHtml(timeLeft(order.collectionDate))}</span></div>`;
    }).join('');
    document.getElementById('collections-empty').hidden = reminders.length > 0;
    const dueCount = upcoming.filter(item => (item.date - today) / 86400000 <= 7).length;
    document.getElementById('notification-dot').hidden = dueCount === 0;
  }

  function renderCustomers() {
    const query = document.getElementById('customer-search').value.trim().toLowerCase();
    const customers = [...data.customers].sort((a, b) => a.name.localeCompare(b.name)).filter(customer => `${customer.name} ${customer.phone} ${customer.email || ''}`.toLowerCase().includes(query));
    document.getElementById('customer-count').textContent = `${customers.length} customer${customers.length === 1 ? '' : 's'}`;
    const target = document.getElementById('customer-grid');
    if (!customers.length) {
      target.innerHTML = `<div class="empty-state" style="grid-column:1/-1"><span class="empty-icon">${icon('users')}</span><strong>${data.customers.length ? 'No customers found' : 'No customers yet'}</strong><p>${data.customers.length ? 'Try a different name or phone number.' : 'Add an order to create your first customer record.'}</p>${data.customers.length ? '' : '<button class="button button-outline" data-action="new-order">Add your first customer</button>'}</div>`;
      return;
    }
    target.innerHTML = customers.map(customer => {
      const orders = customerOrders(customer.id);
      const last = orders[0];
      const due = orders.reduce((sum, order) => sum + (['Cancelled', 'Collected'].includes(order.status) ? 0 : balance(order)), 0);
      return `<article class="customer-card" data-customer="${escapeHtml(customer.id)}"><div class="customer-card-top"><span class="customer-avatar">${escapeHtml(initials(customer.name))}</span><span><strong>${escapeHtml(customer.name)}</strong><small>${escapeHtml(customer.phone)}</small></span></div><div class="customer-card-stats"><div class="customer-stat"><small>Orders</small><strong>${orders.length} order${orders.length === 1 ? '' : 's'}</strong></div><div class="customer-stat"><small>Last order</small><strong>${last ? escapeHtml(formatDate(last.createdAt)) : 'No orders'}</strong></div><div class="customer-stat"><small>Outstanding</small><strong class="${due ? 'due' : ''}">${money(due)}</strong></div><div class="customer-stat"><small>Measurements</small><strong>${Object.values(customer.measurements || {}).filter(Boolean).length} saved</strong></div></div></article>`;
    }).join('');
  }

  function filteredOrders() {
    const query = document.getElementById('order-search').value.trim().toLowerCase();
    const filter = document.getElementById('order-filter').value;
    const sort = document.getElementById('order-sort').value;
    const orders = data.orders.filter(order => {
      const customer = getCustomer(order.customerId);
      const searchable = `${order.orderNumber} ${order.customerName} ${order.phone} ${customer?.phone || ''} ${order.type} ${order.style} ${order.status}`.toLowerCase();
      if (query && !searchable.includes(query)) return false;
      if (filter === 'Unpaid') return paymentStatus(order) === 'Not Paid';
      if (filter === 'Partially Paid') return paymentStatus(order) === 'Partially Paid';
      return filter === 'All' || order.status === filter;
    });
    const comparators = {
      newest: (a, b) => String(b.createdAt).localeCompare(String(a.createdAt)),
      oldest: (a, b) => String(a.createdAt).localeCompare(String(b.createdAt)),
      collection: (a, b) => String(a.collectionDate).localeCompare(String(b.collectionDate)),
      amount: (a, b) => Number(b.total) - Number(a.total),
      customer: (a, b) => a.customerName.localeCompare(b.customerName),
    };
    return orders.sort(comparators[sort]);
  }

  function renderOrders() {
    const orders = filteredOrders();
    document.getElementById('orders-body').innerHTML = orders.map(order => `<tr data-order="${escapeHtml(order.id)}"><td><div class="primary-cell"><strong>${escapeHtml(order.customerName)}</strong><small class="order-ref">${escapeHtml(order.orderNumber)} · ${escapeHtml(order.phone)}</small></div></td><td><div class="primary-cell"><strong>${escapeHtml(order.type)} × ${escapeHtml(order.quantity)}</strong><small class="secondary-cell">${escapeHtml(order.style)}</small></div></td><td>${statusBadge(order.status)}</td><td><div class="primary-cell"><strong>${money(order.total)}</strong><small class="secondary-cell">${money(balance(order))} due · ${escapeHtml(paymentStatus(order))}</small></div></td><td>${escapeHtml(formatDate(order.collectionDate, { day: 'numeric', month: 'short', year: 'numeric' }))}</td><td><button class="icon-button row-open" data-order="${escapeHtml(order.id)}" aria-label="Open order">${icon('arrow-right')}</button></td></tr>`).join('');
    document.getElementById('orders-empty').hidden = orders.length > 0;
    document.getElementById('orders-body').parentElement.parentElement.hidden = orders.length === 0;
  }

  function renderMeasurements() {
    const query = document.getElementById('measurement-search').value.trim().toLowerCase();
    const customers = data.customers.filter(customer => Object.values(customer.measurements || {}).some(Boolean) && `${customer.name} ${customer.phone}`.toLowerCase().includes(query));
    document.getElementById('measurement-count').textContent = `${customers.length} record${customers.length === 1 ? '' : 's'}`;
    const target = document.getElementById('measurement-grid');
    if (!customers.length) {
      target.innerHTML = `<div class="empty-state" style="grid-column:1/-1"><span class="empty-icon">${icon('ruler')}</span><strong>${data.customers.length ? 'No saved measurements found' : 'No measurements yet'}</strong><p>${data.customers.length ? 'Measurements you add to an order will appear here.' : 'Measurements are saved alongside a customer’s first order.'}</p>${data.customers.length ? '<button class="button button-outline" data-action="new-order">Add measurements</button>' : ''}</div>`;
      return;
    }
    target.innerHTML = customers.map(customer => {
      const values = Object.entries(customer.measurements || {}).filter(([, value]) => value);
      return `<article class="measurement-card"><div class="measurement-card-head"><span><strong>${escapeHtml(customer.name)}</strong><small>${escapeHtml(customer.phone)}</small></span><button class="text-button" data-edit-measurements="${escapeHtml(customer.id)}">${icon('edit')} Edit</button></div><div class="measurement-values">${values.map(([name, value]) => `<span class="measurement-value"><small>${escapeHtml(name)}</small><strong>${escapeHtml(value)}</strong></span>`).join('')}</div></article>`;
    }).join('');
  }

  function renderGallery() {
    const target = document.getElementById('gallery-grid');
    const items = [...data.gallery].sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)));
    target.innerHTML = items.map(item => `<article class="gallery-card"><img class="gallery-image" src="${safeImage(item.photo)}" alt="${escapeHtml(item.title)}" loading="lazy"><div class="gallery-card-copy"><p class="eyebrow">${escapeHtml(item.type || 'MADE TO MEASURE')}</p><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.description || 'Crafted with care in the tailoring studio.')}</p><div class="gallery-card-bottom"><span>${escapeHtml(formatDate(item.createdAt))}</span><button data-delete-gallery="${escapeHtml(item.id)}" aria-label="Remove ${escapeHtml(item.title)}">${icon('trash')}</button></div></div></article>`).join('');
    document.getElementById('gallery-empty').hidden = items.length > 0;
    target.hidden = items.length === 0;
  }

  function renderPayments() {
    const received = data.payments.reduce((sum, payment) => sum + Number(payment.amount || 0), 0);
    const outstanding = data.orders.filter(order => !['Cancelled', 'Collected'].includes(order.status)).reduce((sum, order) => sum + balance(order), 0);
    const fullyPaid = data.orders.filter(order => paymentStatus(order) === 'Fully Paid').length;
    document.getElementById('payment-summary').innerHTML = `<div class="payment-total accent"><small>Total received</small><strong>${money(received)}</strong></div><div class="payment-total warning"><small>Outstanding on active orders</small><strong>${money(outstanding)}</strong></div><div class="payment-total"><small>Fully paid orders</small><strong>${fullyPaid}</strong></div>`;
    const payments = [...data.payments].sort((a, b) => String(b.date).localeCompare(String(a.date)));
    document.getElementById('payments-body').innerHTML = payments.map(payment => {
      const order = data.orders.find(item => item.id === payment.orderId);
      return `<tr data-order="${escapeHtml(payment.orderId)}"><td>${escapeHtml(formatDate(payment.date, { day: 'numeric', month: 'short', year: 'numeric' }))}</td><td><div class="primary-cell"><strong>${escapeHtml(order?.customerName || 'Deleted order')}</strong><small class="order-ref">${escapeHtml(order?.orderNumber || payment.orderNumber || '')}</small></div></td><td>${escapeHtml(payment.method || 'Cash')}</td><td class="money-cell">${money(payment.amount)}</td></tr>`;
    }).join('');
    document.getElementById('payments-empty').hidden = payments.length > 0;
    document.getElementById('payments-body').parentElement.parentElement.hidden = payments.length === 0;
  }

  function renderAppearanceControls() {
    document.querySelectorAll('[data-theme-option]').forEach(button => {
      const selected = button.dataset.themeOption === appearance.theme;
      button.classList.toggle('is-selected', selected);
      button.setAttribute('aria-pressed', String(selected));
    });
    document.querySelectorAll('[data-mode-option]').forEach(button => {
      const selected = button.dataset.modeOption === appearance.mode;
      button.classList.toggle('is-selected', selected);
      button.setAttribute('aria-pressed', String(selected));
    });
  }

  // Apply both preferences through body attributes/classes so CSS variables theme the whole app.
  function applyAppearance(persist = true) {
    document.body.dataset.theme = appearance.theme;
    document.body.classList.toggle('dark', appearance.mode === 'dark');
    renderAppearanceControls();
    if (!persist) return;
    try {
      localStorage.setItem(APPEARANCE_KEY, JSON.stringify(appearance));
    } catch (error) {
      toast('Appearance changed, but could not be saved in this browser.', true);
    }
  }

  function renderSettings() {
    const form = document.getElementById('settings-form');
    Object.entries(data.settings).forEach(([key, value]) => {
      const input = form.elements.namedItem(key);
      if (input && document.activeElement !== input) input.value = value || '';
    });
    renderAppearanceControls();
  }

  function renderAll() {
    renderDashboard();
    renderCustomers();
    renderOrders();
    renderMeasurements();
    renderGallery();
    renderPayments();
    renderSettings();
  }

  function initializeMeasurementInputs(containerId, values = {}) {
    const container = document.getElementById(containerId);
    container.innerHTML = MEASUREMENT_FIELDS.map(field => `<label>${escapeHtml(field)}<input data-measurement="${escapeHtml(field)}" value="${escapeHtml(values[field] || '')}" placeholder="e.g. 38 in"></label>`).join('');
  }

  function readMeasurements(containerId, custom = {}) {
    const values = {};
    document.querySelectorAll(`#${containerId} [data-measurement]`).forEach(input => {
      if (input.value.trim()) values[input.dataset.measurement] = input.value.trim();
    });
    return { ...values, ...custom };
  }

  function renderCustomTags(containerId, measurements, onRemove) {
    const root = document.getElementById(containerId);
    const custom = Object.entries(measurements).filter(([key]) => !MEASUREMENT_FIELDS.includes(key));
    root.innerHTML = custom.map(([name, value]) => `<span class="custom-tag">${escapeHtml(name)}: ${escapeHtml(value)}<button type="button" data-remove-measurement="${escapeHtml(name)}" aria-label="Remove ${escapeHtml(name)}">${icon('x')}</button></span>`).join('');
    root.querySelectorAll('[data-remove-measurement]').forEach(button => button.addEventListener('click', () => onRemove(button.dataset.removeMeasurement)));
  }

  function removeCustomMeasurement(map, name, containerId) {
    delete map[name];
    renderCustomTags(containerId, map, removedName => removeCustomMeasurement(map, removedName, containerId));
  }

  function addCustomMeasurement(nameInputId, valueInputId, map, containerId, removeCallback) {
    const nameInput = document.getElementById(nameInputId);
    const valueInput = document.getElementById(valueInputId);
    const name = nameInput.value.trim();
    const value = valueInput.value.trim();
    if (!name || !value) return toast('Enter both a measurement name and value.', true);
    if (MEASUREMENT_FIELDS.some(field => field.toLowerCase() === name.toLowerCase())) return toast('Use the standard field for that measurement.', true);
    map[name] = value;
    nameInput.value = '';
    valueInput.value = '';
    renderCustomTags(containerId, map, removeCallback);
  }

  function openOrderForm(orderId = '', customerId = '') {
    const form = document.getElementById('order-form');
    form.reset();
    orderCustomMeasurements = {};
    orderPhoto = '';
    document.getElementById('order-photo-preview').hidden = true;
    document.getElementById('order-error').hidden = true;
    const order = orderId ? data.orders.find(item => item.id === orderId) : null;
    const customer = order ? getCustomer(order.customerId) : getCustomer(customerId);
    document.getElementById('order-modal-title').textContent = order ? `Edit ${order.orderNumber}` : 'Add new order';
    form.elements.namedItem('orderId').value = order?.id || '';
    form.elements.namedItem('customerId').value = order?.customerId || customer?.id || '';
    form.elements.namedItem('customerName').value = order?.customerName || customer?.name || '';
    form.elements.namedItem('phone').value = order?.phone || customer?.phone || '';
    form.elements.namedItem('email').value = order?.email || customer?.email || '';
    form.elements.namedItem('address').value = order?.address || customer?.address || '';
    form.elements.namedItem('type').value = order?.type || '';
    form.elements.namedItem('quantity').value = order?.quantity || 1;
    form.elements.namedItem('style').value = order?.style || '';
    form.elements.namedItem('instructions').value = order?.instructions || '';
    form.elements.namedItem('total').value = order?.total ?? '';
    form.elements.namedItem('paidNow').value = 0;
    form.elements.namedItem('paidNow').parentElement.hidden = Boolean(order);
    form.elements.namedItem('receivedDate').value = order?.receivedDate || localDateInput();
    form.elements.namedItem('expectedDate').value = order?.expectedDate || '';
    form.elements.namedItem('collectionDate').value = order?.collectionDate || localDateTimeInput(new Date(Date.now() + 7 * 86400000));
    form.elements.namedItem('status').value = order?.status || 'Received';
    orderPhoto = order?.photo || '';
    const measurements = order?.measurements || customer?.measurements || {};
    initializeMeasurementInputs('measurement-inputs', measurements);
    orderCustomMeasurements = Object.fromEntries(Object.entries(measurements).filter(([key]) => !MEASUREMENT_FIELDS.includes(key)));
    renderCustomTags('custom-measurement-tags', orderCustomMeasurements, name => removeCustomMeasurement(orderCustomMeasurements, name, 'custom-measurement-tags'));
    if (orderPhoto) showPhotoPreview('order-photo-preview', orderPhoto, () => { orderPhoto = ''; document.getElementById('order-photo-preview').hidden = true; });
    updateBalancePreview();
    openOverlay('order-overlay');
  }

  function updateBalancePreview() {
    const total = Number(document.querySelector('#order-form [name="total"]').value) || 0;
    const paidNow = Number(document.querySelector('#order-form [name="paidNow"]').value) || 0;
    const editOrder = data.orders.find(order => order.id === document.querySelector('#order-form [name="orderId"]').value);
    const paid = (editOrder ? paidAmount(editOrder) : 0) + paidNow;
    const remaining = Math.max(0, total - paid);
    const status = remaining === 0 ? 'Fully paid' : paid > 0 ? 'Partially paid' : 'Not paid';
    document.getElementById('balance-preview').textContent = money(remaining);
    document.getElementById('payment-status-preview').textContent = status;
  }

  function showPhotoPreview(containerId, image, remove) {
    const container = document.getElementById(containerId);
    container.innerHTML = `<img src="${safeImage(image)}" alt="Selected clothing photo"><button type="button" aria-label="Remove photo">${icon('x')}</button>`;
    container.hidden = false;
    container.querySelector('button').addEventListener('click', remove);
  }

  function compressImage(file) {
    return new Promise((resolve, reject) => {
      if (!file || !file.type.startsWith('image/')) return reject(new Error('Choose a valid image file.'));
      if (file.size > 10 * 1024 * 1024) return reject(new Error('Choose an image smaller than 10 MB.'));
      const reader = new FileReader();
      reader.onerror = () => reject(new Error('The image could not be read.'));
      reader.onload = () => {
        const image = new Image();
        image.onerror = () => reject(new Error('The image could not be opened.'));
        image.onload = () => {
          const maxSide = 1200;
          const scale = Math.min(1, maxSide / Math.max(image.width, image.height));
          const canvas = document.createElement('canvas');
          canvas.width = Math.max(1, Math.round(image.width * scale));
          canvas.height = Math.max(1, Math.round(image.height * scale));
          const context = canvas.getContext('2d');
          if (!context) return reject(new Error('Image compression is not available in this browser.'));
          context.drawImage(image, 0, 0, canvas.width, canvas.height);
          resolve(canvas.toDataURL('image/jpeg', .78));
        };
        image.src = reader.result;
      };
      reader.readAsDataURL(file);
    });
  }

  function normalizePhone(phone = '') {
    return String(phone).replace(/\D/g, '').replace(/^234/, '0');
  }

  function findCustomerByPhone(phone) {
    const normalized = normalizePhone(phone);
    return normalized ? data.customers.find(customer => normalizePhone(customer.phone) === normalized) : undefined;
  }

  function upsertCustomer(fields, customerId, measurements) {
    let customer = customerId ? getCustomer(customerId) : null;
    if (!customer) customer = findCustomerByPhone(fields.phone);
    if (customer) {
      const updates = { ...fields };
      if (!updates.email) updates.email = customer.email || '';
      if (!updates.address) updates.address = customer.address || '';
      Object.assign(customer, updates, { measurements: { ...(customer.measurements || {}), ...measurements }, updatedAt: new Date().toISOString() });
    } else {
      customer = { id: safeId(), ...fields, measurements, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
      data.customers.push(customer);
    }
    return customer;
  }

  function nextOrderNumber() {
    const highest = data.orders.reduce((max, order) => Math.max(max, Number(String(order.orderNumber || '').match(/(\d+)$/)?.[1]) || 0), 0);
    const number = Math.max(Number(data.nextOrderNumber) || 1, highest + 1);
    data.nextOrderNumber = number + 1;
    return `JCH-${String(number).padStart(4, '0')}`;
  }

  async function submitOrder(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const fields = Object.fromEntries(new FormData(form).entries());
    const error = document.getElementById('order-error');
    const fail = message => { error.textContent = message; error.hidden = false; };
    const total = Number(fields.total);
    const paidNow = Number(fields.paidNow || 0);
    if (!fields.customerName.trim() || !fields.phone.trim()) return fail('Add the customer name and phone number to continue.');
    if (!Number.isFinite(total) || total < 0 || !Number.isFinite(paidNow) || paidNow < 0) return fail('Enter valid amounts for the total price and payment.');
    const existing = data.orders.find(order => order.id === fields.orderId);
    const alreadyPaid = existing ? paidAmount(existing) : 0;
    if (total < alreadyPaid + paidNow) return fail(`The total cannot be less than the ${money(alreadyPaid + paidNow)} already paid.`);
    if (paidNow > total) return fail('The amount paid cannot be greater than the total price.');
    const collection = parseDate(fields.collectionDate);
    if (!collection) return fail('Choose a valid collection date and time.');
    if (fields.expectedDate && !parseDate(fields.expectedDate)) return fail('Choose a valid expected completion date.');
    const submitButton = form.querySelector('[type="submit"]');
    submitButton.disabled = true;
    try {
      const measurements = readMeasurements('measurement-inputs', orderCustomMeasurements);
      const customerFields = { name: fields.customerName.trim(), phone: fields.phone.trim(), email: fields.email.trim(), address: fields.address.trim() };
      const customer = upsertCustomer(customerFields, fields.customerId, measurements);
      if (existing) {
        Object.assign(existing, { customerName: customerFields.name, phone: customerFields.phone, email: customerFields.email, address: customerFields.address, customerId: customer.id, type: fields.type, style: fields.style.trim(), instructions: fields.instructions.trim(), quantity: Number(fields.quantity), total, receivedDate: fields.receivedDate, expectedDate: fields.expectedDate, collectionDate: fields.collectionDate, status: fields.status, measurements, photo: orderPhoto, updatedAt: new Date().toISOString() });
      } else {
        const order = { id: safeId(), orderNumber: nextOrderNumber(), customerId: customer.id, customerName: customerFields.name, phone: customerFields.phone, email: customerFields.email, address: customerFields.address, type: fields.type, style: fields.style.trim(), instructions: fields.instructions.trim(), quantity: Number(fields.quantity), total, receivedDate: fields.receivedDate, expectedDate: fields.expectedDate, collectionDate: fields.collectionDate, status: fields.status, measurements, photo: orderPhoto, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
        data.orders.push(order);
        if (paidNow > 0) data.payments.push({ id: safeId(), orderId: order.id, orderNumber: order.orderNumber, amount: paidNow, method: 'Cash', date: new Date().toISOString() });
      }
      const wasEdit = Boolean(existing);
      if (!saveData(wasEdit ? 'Order updated.' : 'Order successfully saved.')) return;
      closeOverlay('order-overlay');
    } catch (saveError) {
      console.error(saveError);
      fail('This order could not be saved. Download a backup or try a smaller photo.');
    } finally {
      submitButton.disabled = false;
    }
  }

  function openOrderDetails(orderId) {
    const order = data.orders.find(item => item.id === orderId);
    if (!order) return;
    const paid = paidAmount(order);
    const customer = getCustomer(order.customerId);
    const measurements = Object.entries(order.measurements || {}).filter(([, value]) => value);
    const payments = orderPayments(order.id).sort((a, b) => String(a.date).localeCompare(String(b.date)));
    const target = document.getElementById('detail-content');
    target.innerHTML = `${safeImage(order.photo) ? `<img class="detail-photo" src="${safeImage(order.photo)}" alt="${escapeHtml(order.type)} clothing for ${escapeHtml(order.customerName)}">` : ''}<div class="detail-inner"><div class="receipt-brand"><strong>${escapeHtml(data.settings.businessName)}</strong><span>${escapeHtml(data.settings.brandName)}</span><small>${escapeHtml(data.settings.phone)}${data.settings.address ? ` · ${escapeHtml(data.settings.address)}` : ''}</small></div><div class="detail-title-row"><div><p class="eyebrow">${escapeHtml(order.type.toUpperCase())} · ${escapeHtml(order.quantity)} PIECE${Number(order.quantity) === 1 ? '' : 'S'}</p><h2 id="detail-title">${escapeHtml(order.customerName)}</h2><p>${escapeHtml(order.phone)}${order.email ? ` · ${escapeHtml(order.email)}` : ''}</p></div><span class="detail-id">${escapeHtml(order.orderNumber)}</span></div><div class="detail-badges">${statusBadge(order.status)}${paymentBadge(paymentStatus(order))}</div><div class="detail-section-title">The garment</div><div class="detail-grid"><div class="detail-field"><small>Clothing type</small><strong>${escapeHtml(order.type)}</strong></div><div class="detail-field"><small>Quantity</small><strong>${escapeHtml(order.quantity)}</strong></div><div class="detail-field field-wide"><small>Style / design</small><strong>${escapeHtml(order.style)}</strong></div><div class="detail-field field-wide"><small>Special instructions</small><strong>${order.instructions ? escapeHtml(order.instructions) : 'None recorded'}</strong></div></div><div class="detail-section-title">Dates & payment</div><div class="detail-grid"><div class="detail-field"><small>Date received</small><strong>${escapeHtml(formatDate(order.receivedDate))}</strong></div><div class="detail-field"><small>Expected completion</small><strong>${escapeHtml(formatDate(order.expectedDate))}</strong></div><div class="detail-field"><small>Collection date</small><strong>${escapeHtml(formatDate(order.collectionDate, { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: '2-digit' }))}</strong></div><div class="detail-field"><small>Total price</small><strong>${money(order.total)}</strong></div><div class="detail-field"><small>Amount paid</small><strong>${money(paid)}</strong></div><div class="detail-field"><small>Remaining balance</small><strong>${money(balance(order))}</strong></div><div class="detail-field"><small>Payment status</small><strong>${escapeHtml(paymentStatus(order))}</strong></div><div class="detail-field"><small>Customer address</small><strong>${escapeHtml(order.address || customer?.address || 'Not provided')}</strong></div></div>${measurements.length ? `<div class="detail-section-title">Measurements</div><div class="detail-grid">${measurements.map(([name, value]) => `<div class="detail-field"><small>${escapeHtml(name)}</small><strong>${escapeHtml(value)}</strong></div>`).join('')}</div>` : ''}${payments.length ? `<div class="detail-section-title">Payment history</div><div class="detail-grid">${payments.map(payment => `<div class="detail-field"><small>${escapeHtml(formatDate(payment.date))} · ${escapeHtml(payment.method || 'Cash')}</small><strong>${money(payment.amount)}</strong></div>`).join('')}</div>` : ''}<div class="detail-actions"><button class="button button-outline" data-edit-order="${escapeHtml(order.id)}">${icon('edit')} Edit</button><button class="button button-outline" data-add-payment="${escapeHtml(order.id)}">${icon('banknote')} Add payment</button>${order.status !== 'Ready' && order.status !== 'Collected' && order.status !== 'Cancelled' ? `<button class="button button-outline" data-mark-ready="${escapeHtml(order.id)}">${icon('check')} Mark ready</button>` : ''}${order.status !== 'Collected' && order.status !== 'Cancelled' ? `<button class="button button-outline" data-mark-collected="${escapeHtml(order.id)}">${icon('check')} Mark collected</button>` : ''}<button class="button button-outline" data-print-receipt="${escapeHtml(order.id)}">${icon('printer')} Print receipt</button><button class="button button-danger" data-delete-order="${escapeHtml(order.id)}">${icon('trash')} Delete</button>${customer ? `<button class="button button-quiet" data-open-customer="${escapeHtml(customer.id)}">Customer record</button>` : ''}</div></div>`;
    const receiptBrand = target.querySelector('.receipt-brand');
    const savedSignature = String(data.settings.brandName || '').trim();
    const businessName = String(data.settings.businessName || '').trim();
    const studioDetails = [
      savedSignature && savedSignature !== BRAND_NAME ? savedSignature : '',
      businessName !== BRAND_NAME ? businessName : '',
      data.settings.phone,
      data.settings.address,
    ].filter(Boolean).map(escapeHtml).join(' · ');
    receiptBrand.innerHTML = `<span class="receipt-logo">${brandLogo()}</span><strong>${BRAND_NAME}</strong><span>${BRAND_TAGLINE}</span>${studioDetails ? `<small>${studioDetails}</small>` : ''}`;
    openOverlay('detail-overlay');
  }

  function openCustomerDetails(customerId) {
    const customer = getCustomer(customerId);
    if (!customer) return;
    const orders = customerOrders(customer.id);
    const measurements = Object.entries(customer.measurements || {}).filter(([, value]) => value);
    document.getElementById('detail-content').innerHTML = `<div class="detail-inner"><div class="detail-title-row"><div><p class="eyebrow">CUSTOMER RECORD</p><h2 id="detail-title">${escapeHtml(customer.name)}</h2><p>${escapeHtml(customer.phone)}${customer.email ? ` · ${escapeHtml(customer.email)}` : ''}</p></div><span class="customer-avatar">${escapeHtml(initials(customer.name))}</span></div><div class="detail-section-title">Customer details</div><div class="detail-grid"><div class="detail-field"><small>Phone number</small><strong>${escapeHtml(customer.phone)}</strong></div><div class="detail-field"><small>Email</small><strong>${escapeHtml(customer.email || 'Not provided')}</strong></div><div class="detail-field field-wide"><small>Address</small><strong>${escapeHtml(customer.address || 'Not provided')}</strong></div><div class="detail-field"><small>Total orders</small><strong>${orders.length}</strong></div><div class="detail-field"><small>Outstanding balance</small><strong>${money(orders.reduce((sum, order) => sum + (['Cancelled', 'Collected'].includes(order.status) ? 0 : balance(order)), 0))}</strong></div></div><div class="detail-section-title">Saved measurements</div>${measurements.length ? `<div class="detail-grid">${measurements.map(([name, value]) => `<div class="detail-field"><small>${escapeHtml(name)}</small><strong>${escapeHtml(value)}</strong></div>`).join('')}</div>` : '<p class="detail-instructions">No measurements saved yet.</p>'}<div class="detail-section-title">Order history</div>${orders.length ? `<div class="detail-grid">${orders.map(order => `<div class="detail-field"><small>${escapeHtml(order.orderNumber)} · ${escapeHtml(formatDate(order.createdAt))}</small><strong><button class="text-button" data-order="${escapeHtml(order.id)}">${escapeHtml(order.type)} · ${escapeHtml(order.style)}</button></strong><span>${statusBadge(order.status)}</span></div>`).join('')}</div>` : '<p class="detail-instructions">No orders yet.</p>'}<div class="detail-actions"><button class="button button-primary" data-action="order-for-customer" data-customer-id="${escapeHtml(customer.id)}">${icon('plus')} New order</button><button class="button button-outline" data-edit-customer-measurements="${escapeHtml(customer.id)}">${icon('ruler')} Edit measurements</button><button class="button button-danger" data-delete-customer="${escapeHtml(customer.id)}">${icon('trash')} Delete customer</button></div></div>`;
    openOverlay('detail-overlay');
  }

  function openPaymentForm(orderId) {
    const order = data.orders.find(item => item.id === orderId);
    if (!order) return;
    if (balance(order) <= 0) return toast('This order is already fully paid.');
    const form = document.getElementById('payment-form');
    form.reset();
    form.elements.namedItem('orderId').value = order.id;
    form.elements.namedItem('amount').max = balance(order).toFixed(2);
    document.getElementById('payment-order-label').textContent = `${order.orderNumber} · ${order.customerName} · ${money(balance(order))} remaining`;
    document.getElementById('payment-error').hidden = true;
    closeOverlay('detail-overlay');
    openOverlay('payment-overlay');
  }

  function openMeasurementEditor(customerId) {
    const customer = getCustomer(customerId);
    if (!customer) return;
    activeCustomer = customerId;
    const form = document.getElementById('measurement-form');
    form.reset();
    form.elements.namedItem('customerId').value = customer.id;
    document.getElementById('measurement-customer-name').textContent = customer.name;
    document.getElementById('measurement-error').hidden = true;
    initializeMeasurementInputs('measurement-editor-inputs', customer.measurements || {});
    editorCustomMeasurements = Object.fromEntries(Object.entries(customer.measurements || {}).filter(([key]) => !MEASUREMENT_FIELDS.includes(key)));
    renderCustomTags('editor-custom-tags', editorCustomMeasurements, name => removeCustomMeasurement(editorCustomMeasurements, name, 'editor-custom-tags'));
    openOverlay('measurement-overlay');
  }

  function printReceipt(orderId) {
    closeOverlay('detail-overlay');
    openOrderDetails(orderId);
    document.body.classList.add('printing-receipt');
    window.setTimeout(() => window.print(), 100);
    window.addEventListener('afterprint', () => {
      document.body.classList.remove('printing-receipt');
      closeOverlay('detail-overlay');
    }, { once: true });
  }

  function csvCell(value) {
    let text = String(value ?? '');
    if (/^[=+@\-]/.test(text)) text = `'${text}`;
    return `"${text.replace(/"/g, '""')}"`;
  }

  function downloadBlob(content, filename, type) {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.append(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  function exportOrdersCsv() {
    const columns = ['Order ID', 'Customer name', 'Phone', 'Email', 'Address', 'Clothing type', 'Style', 'Instructions', 'Quantity', 'Status', 'Total (NGN)', 'Amount paid (NGN)', 'Balance (NGN)', 'Payment status', 'Date received', 'Expected completion', 'Collection date'];
    const rows = data.orders.map(order => [order.orderNumber, order.customerName, order.phone, order.email, order.address, order.type, order.style, order.instructions, order.quantity, order.status, order.total, paidAmount(order), balance(order), paymentStatus(order), order.receivedDate, order.expectedDate, order.collectionDate]);
    downloadBlob([columns, ...rows].map(row => row.map(csvCell).join(',')).join('\r\n'), 'j-crafts-orders.csv', 'text/csv;charset=utf-8');
    toast('Orders exported to CSV.');
  }

  function exportPaymentsCsv() {
    const columns = ['Date', 'Order ID', 'Customer name', 'Phone', 'Payment method', 'Amount received (NGN)'];
    const rows = data.payments.map(payment => {
      const order = data.orders.find(item => item.id === payment.orderId);
      return [payment.date, order?.orderNumber || payment.orderNumber, order?.customerName || '', order?.phone || '', payment.method, payment.amount];
    });
    downloadBlob([columns, ...rows].map(row => row.map(csvCell).join(',')).join('\r\n'), 'j-crafts-payments.csv', 'text/csv;charset=utf-8');
    toast('Payments exported to CSV.');
  }

  function backupData() {
    downloadBlob(JSON.stringify({ ...data, exportedAt: new Date().toISOString() }, null, 2), `j-crafts-backup-${localDateInput()}.json`, 'application/json');
    toast('Backup downloaded.');
  }

  async function restoreData(file) {
    if (!file) return;
    try {
      const restored = JSON.parse(await file.text());
      if (!restored || !Array.isArray(restored.orders) || !Array.isArray(restored.customers) || !Array.isArray(restored.payments) || !Array.isArray(restored.gallery)) throw new Error('This file is not a TailorDesk backup.');
      const approved = window.confirm('Restore this backup? Current records will be replaced.');
      if (!approved) return;
      data = { ...freshData(), ...restored, settings: { ...freshData().settings, ...(restored.settings || {}) } };
      if (saveData('Backup restored.')) closeAllOverlays();
    } catch (error) {
      toast(error.message || 'The backup could not be restored.', true);
    }
  }

  function closeAllOverlays() {
    document.querySelectorAll('.overlay').forEach(overlay => { overlay.hidden = true; });
    document.body.classList.remove('modal-open');
  }

  function removeOrder(orderId) {
    const order = data.orders.find(item => item.id === orderId);
    if (!order || !window.confirm(`Are you sure you want to delete this record?\n\n${order.orderNumber} · ${order.customerName}\nIts payment history will also be removed.`)) return;
    data.orders = data.orders.filter(item => item.id !== orderId);
    data.payments = data.payments.filter(payment => payment.orderId !== orderId);
    if (saveData('Order deleted.')) closeOverlay('detail-overlay');
  }

  function removeCustomer(customerId) {
    const customer = getCustomer(customerId);
    if (!customer || !window.confirm(`Are you sure you want to delete this record?\n\n${customer.name}\nAll of their orders and payment history will also be removed.`)) return;
    const orderIds = data.orders.filter(order => order.customerId === customerId).map(order => order.id);
    data.customers = data.customers.filter(item => item.id !== customerId);
    data.orders = data.orders.filter(order => order.customerId !== customerId);
    data.payments = data.payments.filter(payment => !orderIds.includes(payment.orderId));
    if (saveData('Customer and linked records deleted.')) closeOverlay('detail-overlay');
  }

  function setOrderStatus(orderId, status) {
    const order = data.orders.find(item => item.id === orderId);
    if (!order) return;
    order.status = status;
    order.updatedAt = new Date().toISOString();
    if (saveData(status === 'Ready' ? 'Order marked ready for collection.' : 'Order marked collected.')) openOrderDetails(orderId);
  }

  function bindEvents() {
    document.querySelectorAll('.nav-link[data-view]').forEach(button => button.addEventListener('click', () => setView(button.dataset.view)));
    document.querySelector('.brand').addEventListener('click', event => { event.preventDefault(); setView('dashboard'); });
    document.querySelectorAll('[data-go]').forEach(button => button.addEventListener('click', () => setView(button.dataset.go)));
    document.getElementById('add-order-button').addEventListener('click', () => openOrderForm());
    document.getElementById('add-gallery-button').addEventListener('click', () => { document.getElementById('gallery-form').reset(); galleryPhoto = ''; document.getElementById('gallery-photo-preview').hidden = true; document.getElementById('gallery-error').hidden = true; openOverlay('gallery-overlay'); });
    document.getElementById('mobile-menu').addEventListener('click', () => document.getElementById('sidebar').classList.toggle('open'));
    document.getElementById('notification-button').addEventListener('click', () => { setView('dashboard'); document.querySelector('.collection-panel').scrollIntoView({ behavior: 'smooth', block: 'center' }); });
    document.getElementById('customer-search').addEventListener('input', renderCustomers);
    document.getElementById('measurement-search').addEventListener('input', renderMeasurements);
    document.getElementById('order-search').addEventListener('input', renderOrders);
    document.getElementById('order-filter').addEventListener('change', renderOrders);
    document.getElementById('order-sort').addEventListener('change', renderOrders);
    document.getElementById('export-csv').addEventListener('click', exportOrdersCsv);
    document.getElementById('payments-export').addEventListener('click', exportPaymentsCsv);
    document.getElementById('order-form').addEventListener('submit', submitOrder);
    document.querySelector('#order-form [name="total"]').addEventListener('input', updateBalancePreview);
    document.querySelector('#order-form [name="paidNow"]').addEventListener('input', updateBalancePreview);
    document.querySelector('#order-form [name="phone"]').addEventListener('change', event => {
      const customer = findCustomerByPhone(event.target.value);
      if (!customer) return;
      const form = document.getElementById('order-form');
      form.elements.namedItem('customerId').value = customer.id;
      if (!form.elements.namedItem('customerName').value) form.elements.namedItem('customerName').value = customer.name;
      if (!form.elements.namedItem('email').value) form.elements.namedItem('email').value = customer.email || '';
      if (!form.elements.namedItem('address').value) form.elements.namedItem('address').value = customer.address || '';
      initializeMeasurementInputs('measurement-inputs', customer.measurements || {});
      orderCustomMeasurements = Object.fromEntries(Object.entries(customer.measurements || {}).filter(([key]) => !MEASUREMENT_FIELDS.includes(key)));
      renderCustomTags('custom-measurement-tags', orderCustomMeasurements, name => removeCustomMeasurement(orderCustomMeasurements, name, 'custom-measurement-tags'));
    });
    document.getElementById('order-form').elements.namedItem('photo').addEventListener('change', async event => {
      const file = event.target.files[0];
      if (!file) return;
      try { orderPhoto = await compressImage(file); showPhotoPreview('order-photo-preview', orderPhoto, () => { orderPhoto = ''; document.getElementById('order-photo-preview').hidden = true; event.target.value = ''; }); }
      catch (error) { toast(error.message, true); event.target.value = ''; }
    });
    document.getElementById('add-custom-measurement').addEventListener('click', () => addCustomMeasurement('custom-measurement-name', 'custom-measurement-value', orderCustomMeasurements, 'custom-measurement-tags', name => removeCustomMeasurement(orderCustomMeasurements, name, 'custom-measurement-tags')));
    document.getElementById('measurement-form').addEventListener('submit', event => {
      event.preventDefault();
      const customer = getCustomer(event.currentTarget.elements.namedItem('customerId').value);
      if (!customer) return;
      customer.measurements = readMeasurements('measurement-editor-inputs', editorCustomMeasurements);
      customer.updatedAt = new Date().toISOString();
      if (saveData('Measurements saved.')) closeOverlay('measurement-overlay');
    });
    document.getElementById('editor-add-custom').addEventListener('click', () => addCustomMeasurement('editor-custom-name', 'editor-custom-value', editorCustomMeasurements, 'editor-custom-tags', name => removeCustomMeasurement(editorCustomMeasurements, name, 'editor-custom-tags')));
    document.getElementById('payment-form').addEventListener('submit', event => {
      event.preventDefault();
      const form = event.currentTarget;
      const order = data.orders.find(item => item.id === form.elements.namedItem('orderId').value);
      const amount = Number(form.elements.namedItem('amount').value);
      const error = document.getElementById('payment-error');
      if (!order || !Number.isFinite(amount) || amount <= 0) { error.textContent = 'Enter a payment amount greater than zero.'; error.hidden = false; return; }
      if (amount > balance(order)) { error.textContent = `This order has only ${money(balance(order))} remaining.`; error.hidden = false; return; }
      data.payments.push({ id: safeId(), orderId: order.id, orderNumber: order.orderNumber, amount, method: form.elements.namedItem('method').value, date: new Date().toISOString() });
      if (saveData('Payment recorded.')) closeOverlay('payment-overlay');
    });
    document.getElementById('gallery-form').elements.namedItem('photo').addEventListener('change', async event => {
      const file = event.target.files[0];
      if (!file) return;
      try { galleryPhoto = await compressImage(file); showPhotoPreview('gallery-photo-preview', galleryPhoto, () => { galleryPhoto = ''; document.getElementById('gallery-photo-preview').hidden = true; event.target.value = ''; }); }
      catch (error) { toast(error.message, true); event.target.value = ''; }
    });
    document.getElementById('gallery-form').addEventListener('submit', event => {
      event.preventDefault();
      const form = event.currentTarget;
      const fields = Object.fromEntries(new FormData(form).entries());
      if (!galleryPhoto) { const error = document.getElementById('gallery-error'); error.textContent = 'Choose a photo of the finished piece.'; error.hidden = false; return; }
      data.gallery.push({ id: safeId(), title: fields.title.trim(), type: fields.type, description: fields.description.trim(), photo: galleryPhoto, createdAt: new Date().toISOString() });
      if (saveData('Piece added to the gallery.')) closeOverlay('gallery-overlay');
    });
    document.getElementById('settings-form').addEventListener('submit', event => {
      event.preventDefault();
      const form = event.currentTarget;
      data.settings = Object.fromEntries(['businessName', 'brandName', 'phone', 'address'].map(key => [key, form.elements.namedItem(key).value.trim()]));
      saveData('Studio details saved.');
    });
    document.querySelectorAll('[data-theme-option]').forEach(button => button.addEventListener('click', () => {
      appearance.theme = button.dataset.themeOption;
      applyAppearance();
    }));
    document.querySelectorAll('[data-mode-option]').forEach(button => button.addEventListener('click', () => {
      appearance.mode = button.dataset.modeOption;
      applyAppearance();
    }));
    document.getElementById('backup-button').addEventListener('click', backupData);
    document.getElementById('restore-input').addEventListener('change', event => { restoreData(event.target.files[0]); event.target.value = ''; });
    document.getElementById('clear-data-button').addEventListener('click', () => {
      if (!window.confirm('Clear all TailorDesk customers, orders, payments, measurements, photos, and settings? This cannot be undone. Download a backup first if needed.')) return;
      data = freshData();
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(THEME_KEY);
      localStorage.removeItem(APPEARANCE_KEY);
      appearance = { theme: 'green', mode: 'light' };
      applyAppearance(false);
      renderAll();
      toast('All app data has been cleared.');
    });
    document.querySelectorAll('[data-close]').forEach(button => button.addEventListener('click', () => closeOverlay(button.dataset.close)));
    document.querySelectorAll('.overlay').forEach(overlay => overlay.addEventListener('click', event => { if (event.target === overlay) closeOverlay(overlay.id); }));
    document.addEventListener('keydown', event => { if (event.key === 'Escape') closeAllOverlays(); });
    document.addEventListener('click', event => {
      const action = event.target.closest('[data-action]');
      if (action?.dataset.action === 'new-order') openOrderForm();
      if (action?.dataset.action === 'new-gallery') document.getElementById('add-gallery-button').click();
      if (action?.dataset.action === 'order-for-customer') openOrderForm('', action.dataset.customerId);
      const row = event.target.closest('[data-order]');
      if (row && !event.target.closest('button[data-delete-gallery]')) openOrderDetails(row.dataset.order);
      const customer = event.target.closest('[data-customer]');
      if (customer) openCustomerDetails(customer.dataset.customer);
      const editOrder = event.target.closest('[data-edit-order]');
      if (editOrder) { closeOverlay('detail-overlay'); openOrderForm(editOrder.dataset.editOrder); }
      const addPayment = event.target.closest('[data-add-payment]');
      if (addPayment) openPaymentForm(addPayment.dataset.addPayment);
      const ready = event.target.closest('[data-mark-ready]');
      if (ready) setOrderStatus(ready.dataset.markReady, 'Ready');
      const collected = event.target.closest('[data-mark-collected]');
      if (collected) setOrderStatus(collected.dataset.markCollected, 'Collected');
      const deleteOrder = event.target.closest('[data-delete-order]');
      if (deleteOrder) removeOrder(deleteOrder.dataset.deleteOrder);
      const deleteCustomer = event.target.closest('[data-delete-customer]');
      if (deleteCustomer) removeCustomer(deleteCustomer.dataset.deleteCustomer);
      const editMeasurements = event.target.closest('[data-edit-measurements], [data-edit-customer-measurements]');
      if (editMeasurements) { closeOverlay('detail-overlay'); openMeasurementEditor(editMeasurements.dataset.editMeasurements || editMeasurements.dataset.editCustomerMeasurements); }
      const deleteGallery = event.target.closest('[data-delete-gallery]');
      if (deleteGallery) {
        const item = data.gallery.find(entry => entry.id === deleteGallery.dataset.deleteGallery);
        if (item && window.confirm(`Are you sure you want to delete this record?\n\n${item.title}`)) { data.gallery = data.gallery.filter(entry => entry.id !== item.id); saveData('Gallery piece removed.'); }
      }
      const print = event.target.closest('[data-print-receipt]');
      if (print) printReceipt(print.dataset.printReceipt);
      const customerRecord = event.target.closest('[data-open-customer]');
      if (customerRecord) openCustomerDetails(customerRecord.dataset.openCustomer);
      if (document.getElementById('sidebar').classList.contains('open') && !event.target.closest('#sidebar') && !event.target.closest('#mobile-menu')) document.getElementById('sidebar').classList.remove('open');
    });
    window.addEventListener('afterprint', () => document.body.classList.remove('printing-receipt'));
    window.addEventListener('storage', event => { if (event.key === STORAGE_KEY) { data = loadData(); renderAll(); } });
  }

  function initialize() {
    paintIcons();
    document.getElementById('current-year').textContent = new Date().getFullYear();
    document.getElementById('today-label').textContent = new Intl.DateTimeFormat('en-NG', { weekday: 'long', day: 'numeric', month: 'long' }).format(new Date()).toUpperCase();
    initializeMeasurementInputs('measurement-inputs');
    initializeMeasurementInputs('measurement-editor-inputs');
    applyAppearance(false);
    bindEvents();
    renderAll();
    startGreetingAnimation();
  }

  initialize();
})();
