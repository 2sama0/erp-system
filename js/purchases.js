// تهيئة صفحة المشتريات
document.addEventListener('DOMContentLoaded', function() {
    // التحقق من حالة المصادقة
    if (!checkAuthStatus()) {
        window.location.href = 'login.html';
        return;
    }
    
    // تهيئة العناصر
    initPurchasesPage();
    
    // تحميل البيانات
    loadPurchasesData();
    
    // تهيئة الأحداث
    initPurchasesEvents();
});

// تهيئة صفحة المشتريات
function initPurchasesPage() {
    // تحديث التاريخ
    updateDate();
    
    // تهيئة القائمة الجانبية
    initSidebar();
    
    // تهيئة التبويبات
    initPurchasesTabs();
    
    // تهيئة البحث
    initPurchasesSearch();
    
    // تهيئة التصفية
    initPurchaseFilters();
}

// تحديث التاريخ
function updateDate() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateElement = document.getElementById('currentDate');
    if (dateElement) {
        dateElement.textContent = now.toLocaleDateString('ar-SA', options);
    }
}

// تهيئة تبويبات المشتريات
function initPurchasesTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // إزالة النشاط من جميع الأزرار
            tabButtons.forEach(btn => btn.classList.remove('active'));
            
            // إخفاء جميع المحتويات
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // إضافة النشاط للزر المختار
            this.classList.add('active');
            
            // إظهار المحتوى المختار
            const targetPane = document.getElementById(`${tabId}-tab`);
            if (targetPane) {
                targetPane.classList.add('active');
                
                // تحميل بيانات التبويب عند النقر
                switch(tabId) {
                    case 'orders':
                        loadPurchaseOrders();
                        break;
                    case 'invoices':
                        loadPurchaseInvoices();
                        break;
                    case 'payments':
                        loadSupplierPayments();
                        break;
                    case 'analysis':
                        loadPurchaseAnalysis();
                        break;
                }
            }
        });
    });
}

// تحميل بيانات المشتريات
function loadPurchasesData() {
    // تحميل طلبات الشراء
    loadPurchaseOrders();
    
    // تحميل الفواتير
    loadPurchaseInvoices();
    
    // تحميل الدفعات
    loadSupplierPayments();
}

// تحميل طلبات الشراء
function loadPurchaseOrders() {
    // في التطبيق الحقيقي، هنا ستكون استدعاء API
    
    // بيانات تجريبية
    const purchaseOrders = [
        {
            id: 'PO-2024-0015',
            supplier: 'السيارات المتميزة',
            date: '2024-01-15',
            deliveryDate: '2024-01-25',
            products: ['سيارة BMW X5 2024 (2)', 'سيارة مرسيدس GLC 2024 (1)'],
            total: 660000,
            paid: 330000,
            status: 'ordered',
            statusText: 'تم الطلب'
        },
        {
            id: 'PO-2024-0014',
            supplier: 'مورد الاكسسوارات',
            date: '2024-01-14',
            deliveryDate: '2024-01-18',
            products: ['إطارات 18 بوصة (20)', 'زيت محرك 5W-30 (50)'],
            total: 45000,
            paid: 0,
            status: 'pending',
            statusText: 'معلق'
        },
        {
            id: 'PO-2024-0013',
            supplier: 'وكيل السيارات',
            date: '2024-01-13',
            deliveryDate: '2024-01-20',
            products: ['سيارة تويوتا كامري 2024 (3)'],
            total: 360000,
            paid: 360000,
            status: 'received',
            statusText: 'تم الاستلام'
        },
        {
            id: 'PO-2024-0012',
            supplier: 'مورد قطع الغيار',
            date: '2024-01-12',
            deliveryDate: '2024-01-17',
            products: ['قطع غيار مرسيدس (مجموعة)', 'فلاتر هواء (30)'],
            total: 85000,
            paid: 42500,
            status: 'ordered',
            statusText: 'تم الطلب'
        },
        {
            id: 'PO-2024-0011',
            supplier: 'السيارات المتميزة',
            date: '2024-01-10',
            deliveryDate: '2024-01-15',
            products: ['سيارة هونداي توسان 2024 (2)'],
            total: 220000,
            paid: 0,
            status: 'cancelled',
            statusText: 'ملغي'
        },
        {
            id: 'PO-2024-0010',
            supplier: 'مورد الاكسسوارات',
            date: '2024-01-08',
            deliveryDate: '2024-01-12',
            products: ['سماعات سيارات (10)', 'أنظمة ملاحة (5)'],
            total: 55000,
            paid: 55000,
            status: 'received',
            statusText: 'تم الاستلام'
        },
        {
            id: 'PO-2024-0009',
            supplier: 'وكيل السيارات',
            date: '2024-01-05',
            deliveryDate: '2024-01-10',
            products: ['سيارة كيا سبورتاج 2024 (2)'],
            total: 260000,
            paid: 130000,
            status: 'ordered',
            statusText: 'تم الطلب'
        },
        {
            id: 'PO-2024-0008',
            supplier: 'مورد قطع الغيار',
            date: '2024-01-03',
            deliveryDate: '2024-01-08',
            products: ['بطاريات سيارات (15)', 'إطارات احتياطية (10)'],
            total: 35000,
            paid: 35000,
            status: 'received',
            statusText: 'تم الاستلام'
        }
    ];
    
    renderPurchaseOrdersTable(purchaseOrders);
}

// عرض جدول طلبات الشراء
function renderPurchaseOrdersTable(orders) {
    const tableBody = document.querySelector('#purchaseOrdersTable tbody');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    orders.forEach(order => {
        const row = document.createElement('tr');
        
        // حساب نسبة الدفع
        const paymentPercentage = Math.round((order.paid / order.total) * 100);
        
        row.innerHTML = `
            <td>
                <a href="#" class="order-link" onclick="viewPurchaseOrder('${order.id}')">
                    ${order.id}
                </a>
            </td>
            <td>${order.supplier}</td>
            <td>${order.date}</td>
            <td>${order.deliveryDate}</td>
            <td>
                <div class="products-list">
                    ${order.products.map(product => `
                        <span class="product-badge">${product}</span>
                    `).join('')}
                </div>
            </td>
            <td>${utils.formatCurrency(order.total)}</td>
            <td>
                <div class="payment-info">
                    <span>${utils.formatCurrency(order.paid)}</span>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${paymentPercentage}%"></div>
                    </div>
                </div>
            </td>
            <td>
                <span class="status-badge ${order.status}">
                    ${order.statusText}
                </span>
            </td>
            <td>
                <div class="action-buttons">
                    <button class="action-btn view" onclick="viewPurchaseOrder('${order.id}')">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="action-btn edit" onclick="editPurchaseOrder('${order.id}')">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="action-btn receive" onclick="receiveOrder('${order.id}')">
                        <i class="fas fa-check-circle"></i>
                    </button>
                    <button class="action-btn delete" onclick="deletePurchaseOrder('${order.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
}

// تهيئة البحث
function initPurchasesSearch() {
    const searchInput = document.getElementById('purchaseSearch');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', function() {
        searchPurchaseOrders(this.value);
    });
}

// البحث في طلبات الشراء
function searchPurchaseOrders(searchTerm) {
    console.log('البحث في طلبات الشراء:', searchTerm);
    // في التطبيق الحقيقي، هنا ستكون استدعاء API
}

// تهيئة التصفية
function initPurchaseFilters() {
    const supplierFilter = document.getElementById('supplierFilter');
    const statusFilter = document.getElementById('statusFilter');
    
    if (supplierFilter) {
        supplierFilter.addEventListener('change', applyPurchaseFilters);
    }
    
    if (statusFilter) {
        statusFilter.addEventListener('change', applyPurchaseFilters);
    }
}

// تطبيق التصفية
function applyPurchaseFilters() {
    const supplier = document.getElementById('supplierFilter').value;
    const status = document.getElementById('statusFilter').value;
    
    console.log('تطبيق تصفية المشتريات:', { supplier, status });
    // في التطبيق الحقيقي، هنا ستكون استدعاء API
}

// فتح نموذج طلب شراء جديد
function openNewPurchaseOrder() {
    const modal = document.getElementById('purchaseOrderModal');
    const modalBody = modal.querySelector('.modal-body');
    
    modalBody.innerHTML = `
        <form id="purchaseOrderForm" onsubmit="savePurchaseOrder(event)">
            <div class="form-tabs">
                <button type="button" class="form-tab active" data-tab="basic">البيانات الأساسية</button>
                <button type="button" class="form-tab" data-tab="products">المنتجات</button>
                <button type="button" class="form-tab" data-tab="shipping">الشحن والتسليم</button>
                <button type="button" class="form-tab" data-tab="payment">الدفع والشروط</button>
            </div>
            
            <div class="form-tab-content active" id="basic-tab">
                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label>المورد <span class="required">*</span></label>
                            <select class="form-control" id="supplier" required>
                                <option value="">اختر المورد</option>
                                <option value="1">السيارات المتميزة</option>
                                <option value="2">مورد الاكسسوارات</option>
                                <option value="3">وكيل السيارات</option>
                                <option value="4">مورد قطع الغيار</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label>رقم طلب الشراء</label>
                            <input type="text" class="form-control" id="poNumber" 
                                   value="PO-${Date.now().toString().slice(-6)}" readonly>
                        </div>
                    </div>
                </div>
                
                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label>تاريخ الطلب <span class="required">*</span></label>
                            <input type="date" class="form-control" id="orderDate" required 
                                   value="${new Date().toISOString().split('T')[0]}">
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label>تاريخ التسليم المتوقع</label>
                            <input type="date" class="form-control" id="deliveryDate">
                        </div>
                    </div>
                </div>
                
                <div class="form-group">
                    <label>ملاحظات للمورد</label>
                    <textarea class="form-control" id="supplierNotes" rows="3"></textarea>
                </div>
            </div>
            
            <div class="form-tab-content" id="products-tab">
                <div class="product-selection-section">
                    <div class="section-header">
                        <h5>إضافة المنتجات</h5>
                        <button type="button" class="btn btn-outline btn-sm" onclick="addProductRow()">
                            <i class="fas fa-plus"></i>
                            إضافة منتج
                        </button>
                    </div>
                    
                    <div class="table-responsive">
                        <table class="data-table" id="productsTable">
                            <thead>
                                <tr>
                                    <th>المنتج</th>
                                    <th>الكمية</th>
                                    <th>سعر الوحدة</th>
                                    <th>الخصم</th>
                                    <th>الضريبة</th>
                                    <th>الإجمالي</th>
                                    <th>الإجراء</th>
                                </tr>
                            </thead>
                            <tbody id="productsTableBody">
                                <tr>
                                    <td>
                                        <select class="form-control product-select" onchange="updateProductPrice(this)">
                                            <option value="">اختر المنتج</option>
                                            <option value="1">سيارة BMW X5 2024</option>
                                            <option value="2">سيارة مرسيدس GLC 2024</option>
                                            <option value="3">سيارة تويوتا كامري 2024</option>
                                            <option value="4">إطارات 18 بوصة</option>
                                        </select>
                                    </td>
                                    <td>
                                        <input type="number" class="form-control quantity" value="1" 
                                               min="1" onchange="calculateRowTotal(this)">
                                    </td>
                                    <td>
                                        <input type="number" class="form-control unit-price" 
                                               placeholder="0.00" onchange="calculateRowTotal(this)">
                                    </td>
                                    <td>
                                        <input type="number" class="form-control discount" 
                                               placeholder="0.00" onchange="calculateRowTotal(this)">
                                    </td>
                                    <td>
                                        <input type="number" class="form-control tax" 
                                               placeholder="0.00" onchange="calculateRowTotal(this)">
                                    </td>
                                    <td>
                                        <input type="text" class="form-control total" 
                                               placeholder="0.00" readonly>
                                    </td>
                                    <td>
                                        <button type="button" class="btn btn-danger btn-sm" onclick="removeProductRow(this)">
                                            <i class="fas fa-times"></i>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colspan="5" class="text-end"><strong>المجموع:</strong></td>
                                    <td><strong id="productsTotal">0.00</strong></td>
                                    <td></td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>
            
            <div class="form-tab-content" id="shipping-tab">
                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label>عنوان التسليم</label>
                            <textarea class="form-control" id="deliveryAddress" rows="3"></textarea>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label>طريقة الشحن</label>
                            <select class="form-control" id="shippingMethod">
                                <option value="">اختر طريقة الشحن</option>
                                <option value="pickup">استلام من المورد</option>
                                <option value="delivery">توصيل للمخزن</option>
                                <option value="third-party">شركة شحن خارجية</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label>تكلفة الشحن</label>
                            <input type="number" class="form-control" id="shippingCost" 
                                   placeholder="0.00" onchange="calculateOrderTotal()">
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="form-tab-content" id="payment-tab">
                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label>شروط الدفع</label>
                            <select class="form-control" id="paymentTerms">
                                <option value="net30">صافي 30 يوم</option>
                                <option value="net60">صافي 60 يوم</option>
                                <option value="advance">دفع مقدّم</option>
                                <option value="partial">دفع جزئي</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label>نسبة الدفعة المقدمة</label>
                            <input type="number" class="form-control" id="advancePercentage" 
                                   placeholder="0" min="0" max="100">
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label>ملخص الطلب</label>
                            <table class="summary-table">
                                <tr>
                                    <th>مجموع المنتجات:</th>
                                    <td id="summaryProducts">0.00</td>
                                </tr>
                                <tr>
                                    <th>تكلفة الشحن:</th>
                                    <td id="summaryShipping">0.00</td>
                                </tr>
                                <tr>
                                    <th>الضريبة:</th>
                                    <td id="summaryTax">0.00</td>
                                </tr>
                                <tr class="total-row">
                                    <th>الإجمالي النهائي:</th>
                                    <td id="summaryTotal">0.00</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="form-actions">
                <button type="button" class="btn btn-outline" onclick="closePurchaseOrderModal()">
                    إلغاء
                </button>
                <button type="submit" class="btn btn-primary">
                    <i class="fas fa-save"></i>
                    حفظ طلب الشراء
                </button>
            </div>
        </form>
    `;
    
    modal.style.display = 'flex';
    
    // تهيئة تبويبات النموذج
    initPurchaseOrderTabs();
    
    // إضافة صف منتج افتراضي
    addProductRow();
}

// تهيئة تبويبات طلب الشراء
function initPurchaseOrderTabs() {
    const formTabs = document.querySelectorAll('.form-tab');
    const formTabContents = document.querySelectorAll('.form-tab-content');
    
    formTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // إزالة النشاط من جميع الأزرار
            formTabs.forEach(t => t.classList.remove('active'));
            
            // إخفاء جميع المحتويات
            formTabContents.forEach(c => c.classList.remove('active'));
            
            // إضافة النشاط للزر المختار
            this.classList.add('active');
            
            // إظهار المحتوى المختار
            const targetContent = document.getElementById(`${tabId}-tab`);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}

// إضافة صف منتج جديد
function addProductRow() {
    const tableBody = document.getElementById('productsTableBody');
    const row = document.createElement('tr');
    
    row.innerHTML = `
        <td>
            <select class="form-control product-select" onchange="updateProductPrice(this)">
                <option value="">اختر المنتج</option>
                <option value="1">سيارة BMW X5 2024</option>
                <option value="2">سيارة مرسيدس GLC 2024</option>
                <option value="3">سيارة تويوتا كامري 2024</option>
                <option value="4">إطارات 18 بوصة</option>
            </select>
        </td>
        <td>
            <input type="number" class="form-control quantity" value="1" 
                   min="1" onchange="calculateRowTotal(this)">
        </td>
        <td>
            <input type="number" class="form-control unit-price" 
                   placeholder="0.00" onchange="calculateRowTotal(this)">
        </td>
        <td>
            <input type="number" class="form-control discount" 
                   placeholder="0.00" onchange="calculateRowTotal(this)">
        </td>
        <td>
            <input type="number" class="form-control tax" 
                   placeholder="0.00" onchange="calculateRowTotal(this)">
        </td>
        <td>
            <input type="text" class="form-control total" 
                   placeholder="0.00" readonly>
        </td>
        <td>
            <button type="button" class="btn btn-danger btn-sm" onclick="removeProductRow(this)">
                <i class="fas fa-times"></i>
            </button>
        </td>
    `;
    
    tableBody.appendChild(row);
    calculateOrderTotal();
}

// تحديث سعر المنتج
function updateProductPrice(selectElement) {
    const prices = {
        '1': 240000, // BMW X5
        '2': 180000, // Mercedes GLC
        '3': 120000, // Toyota Camry
        '4': 1200    // Tires
    };
    
    const price = prices[selectElement.value] || 0;
    const row = selectElement.closest('tr');
    const unitPriceInput = row.querySelector('.unit-price');
    
    unitPriceInput.value = price;
    calculateRowTotal(selectElement);
}

// حساب المجموع للصف
function calculateRowTotal(element) {
    const row = element.closest('tr');
    const quantity = parseFloat(row.querySelector('.quantity').value) || 0;
    const unitPrice = parseFloat(row.querySelector('.unit-price').value) || 0;
    const discount = parseFloat(row.querySelector('.discount').value) || 0;
    const tax = parseFloat(row.querySelector('.tax').value) || 0;
    
    const subtotal = quantity * unitPrice;
    const discountAmount = subtotal * (discount / 100);
    const taxAmount = subtotal * (tax / 100);
    const total = subtotal - discountAmount + taxAmount;
    
    row.querySelector('.total').value = total.toFixed(2);
    calculateOrderTotal();
}

// حساب المجموع الكلي للطلب
function calculateOrderTotal() {
    let productsTotal = 0;
    let taxTotal = 0;
    
    document.querySelectorAll('#productsTableBody tr').forEach(row => {
        const total = parseFloat(row.querySelector('.total').value) || 0;
        productsTotal += total;
        
        const tax = parseFloat(row.querySelector('.tax').value) || 0;
        const unitPrice = parseFloat(row.querySelector('.unit-price').value) || 0;
        const quantity = parseFloat(row.querySelector('.quantity').value) || 0;
        taxTotal += (unitPrice * quantity * tax / 100);
    });
    
    const shippingCost = parseFloat(document.getElementById('shippingCost').value) || 0;
    const orderTotal = productsTotal + shippingCost;
    
    // تحديث الملخص
    document.getElementById('productsTotal').textContent = utils.formatCurrency(productsTotal);
    document.getElementById('summaryProducts').textContent = utils.formatCurrency(productsTotal);
    document.getElementById('summaryShipping').textContent = utils.formatCurrency(shippingCost);
    document.getElementById('summaryTax').textContent = utils.formatCurrency(taxTotal);
    document.getElementById('summaryTotal').textContent = utils.formatCurrency(orderTotal);
}

// إزالة صف منتج
function removeProductRow(button) {
    const row = button.closest('tr');
    row.remove();
    calculateOrderTotal();
}

// حفظ طلب الشراء
function savePurchaseOrder(event) {
    event.preventDefault();
    
    const orderData = {
        number: document.getElementById('poNumber').value,
        supplier: document.getElementById('supplier').value,
        date: document.getElementById('orderDate').value,
        deliveryDate: document.getElementById('deliveryDate').value,
        shippingMethod: document.getElementById('shippingMethod').value,
        shippingCost: parseFloat(document.getElementById('shippingCost').value) || 0,
        paymentTerms: document.getElementById('paymentTerms').value,
        advancePercentage: parseFloat(document.getElementById('advancePercentage').value) || 0,
        notes: document.getElementById('supplierNotes').value,
        products: [],
        total: parseFloat(document.getElementById('summaryTotal').textContent.replace(/[^0-9.-]+/g, '')) || 0
    };
    
    // جمع بيانات المنتجات
    document.querySelectorAll('#productsTableBody tr').forEach(row => {
        const product = {
            productId: row.querySelector('.product-select').value,
            productName: row.querySelector('.product-select').selectedOptions[0].text,
            quantity: parseFloat(row.querySelector('.quantity').value) || 0,
            unitPrice: parseFloat(row.querySelector('.unit-price').value) || 0,
            discount: parseFloat(row.querySelector('.discount').value) || 0,
            tax: parseFloat(row.querySelector('.tax').value) || 0,
            total: parseFloat(row.querySelector('.total').value) || 0
        };
        
        orderData.products.push(product);
    });
    
    console.log('حفظ طلب الشراء:', orderData);
    
    // في التطبيق الحقيقي، هنا ستكون إرسال البيانات إلى الخادم
    
    utils.showNotification('تم حفظ طلب الشراء بنجاح', 'success');
    closePurchaseOrderModal();
    loadPurchaseOrders();
}

// إغلاق نموذج طلب الشراء
function closePurchaseOrderModal() {
    document.getElementById('purchaseOrderModal').style.display = 'none';
}

// تحميل فواتير المشتريات
function loadPurchaseInvoices() {
    // بيانات تجريبية
    const invoices = [
        {
            id: 'INV-2024-0015',
            supplier: 'السيارات المتميزة',
            invoiceDate: '2024-01-15',
            dueDate: '2024-02-14',
            total: 660000,
            paid: 330000,
            remaining: 330000,
            status: 'partial'
        },
        {
            id: 'INV-2024-0014',
            supplier: 'مورد الاكسسوارات',
            invoiceDate: '2024-01-10',
            dueDate: '2024-02-09',
            total: 45000,
            paid: 0,
            remaining: 45000,
            status: 'unpaid'
        },
        {
            id: 'INV-2024-0013',
            supplier: 'وكيل السيارات',
            invoiceDate: '2024-01-05',
            dueDate: '2024-02-04',
            total: 360000,
            paid: 360000,
            remaining: 0,
            status: 'paid'
        },
        {
            id: 'INV-2024-0012',
            supplier: 'مورد قطع الغيار',
            invoiceDate: '2024-01-01',
            dueDate: '2024-01-31',
            total: 85000,
            paid: 85000,
            remaining: 0,
            status: 'paid'
        }
    ];
    
    renderPurchaseInvoicesTable(invoices);
}

// عرض جدول فواتير المشتريات
function renderPurchaseInvoicesTable(invoices) {
    const tableBody = document.querySelector('#purchaseInvoicesTable tbody');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    invoices.forEach(invoice => {
        const row = document.createElement('tr');
        
        // تحديد حالة الفاتورة
        let statusText, statusClass;
        if (invoice.status === 'paid') {
            statusText = 'مدفوعة';
            statusClass = 'completed';
        } else if (invoice.status === 'partial') {
            statusText = 'مدفوعة جزئياً';
            statusClass = 'warning';
        } else {
            statusText = 'غير مدفوعة';
            statusClass = 'danger';
            
            // التحقق من تاريخ الاستحقاق
            const dueDate = new Date(invoice.dueDate);
            const today = new Date();
            if (dueDate < today) {
                statusText = 'متأخرة';
                statusClass = 'danger';
            }
        }
        
        row.innerHTML = `
            <td>
                <a href="#" class="invoice-link" onclick="viewPurchaseInvoice('${invoice.id}')">
                    ${invoice.id}
                </a>
            </td>
            <td>${invoice.supplier}</td>
            <td>${invoice.invoiceDate}</td>
            <td class="${new Date(invoice.dueDate) < new Date() ? 'text-danger' : ''}">
                ${invoice.dueDate}
            </td>
            <td>${utils.formatCurrency(invoice.total)}</td>
            <td>${utils.formatCurrency(invoice.paid)}</td>
            <td>${utils.formatCurrency(invoice.remaining)}</td>
            <td>
                <span class="status-badge ${statusClass}">${statusText}</span>
            </td>
            <td>
                <div class="action-buttons">
                    <button class="action-btn view" onclick="viewPurchaseInvoice('${invoice.id}')">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="action-btn pay" onclick="payInvoice('${invoice.id}')">
                        <i class="fas fa-money-bill-wave"></i>
                    </button>
                    <button class="action-btn print" onclick="printInvoice('${invoice.id}')">
                        <i class="fas fa-print"></i>
                    </button>
                </div>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
}

// تحميل دفعات الموردين
function loadSupplierPayments() {
    // بيانات تجريبية
    const payments = [
        {
            id: 'PAY-2024-0015',
            supplier: 'السيارات المتميزة',
            invoiceId: 'INV-2024-0015',
            date: '2024-01-15',
            amount: 330000,
            method: 'تحويل بنكي',
            status: 'completed',
            user: 'أحمد السليم'
        },
        {
            id: 'PAY-2024-0014',
            supplier: 'وكيل السيارات',
            invoiceId: 'INV-2024-0013',
            date: '2024-01-10',
            amount: 360000,
            method: 'شيك',
            status: 'pending',
            user: 'محمد أحمد'
        },
        {
            id: 'PAY-2024-0013',
            supplier: 'مورد قطع الغيار',
            invoiceId: 'INV-2024-0012',
            date: '2024-01-05',
            amount: 85000,
            method: 'نقدي',
            status: 'completed',
            user: 'فهد خالد'
        },
        {
            id: 'PAY-2024-0012',
            supplier: 'مورد الاكسسوارات',
            invoiceId: 'INV-2024-0010',
            date: '2024-01-01',
            amount: 55000,
            method: 'تحويل بنكي',
            status: 'completed',
            user: 'سارة عبدالله'
        }
    ];
    
    renderSupplierPaymentsTable(payments);
}

// عرض جدول دفعات الموردين
function renderSupplierPaymentsTable(payments) {
    const tableBody = document.querySelector('#supplierPaymentsTable tbody');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    payments.forEach(payment => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${payment.id}</td>
            <td>${payment.supplier}</td>
            <td>
                <a href="#" class="invoice-link" onclick="viewPurchaseInvoice('${payment.invoiceId}')">
                    ${payment.invoiceId}
                </a>
            </td>
            <td>${payment.date}</td>
            <td>${utils.formatCurrency(payment.amount)}</td>
            <td>
                <span class="payment-method">${payment.method}</span>
            </td>
            <td>
                <span class="status-badge ${payment.status}">
                    ${payment.status === 'completed' ? 'مكتمل' : 'قيد المعالجة'}
                </span>
            </td>
            <td>${payment.user}</td>
            <td>
                <div class="action-buttons">
                    <button class="action-btn view" onclick="viewPayment('${payment.id}')">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="action-btn receipt" onclick="printReceipt('${payment.id}')">
                        <i class="fas fa-receipt"></i>
                    </button>
                </div>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
}

// تحميل تحليل المشتريات
function loadPurchaseAnalysis() {
    // إنشاء المخططات
    renderSupplierChart();
    renderMonthlyPurchaseChart();
    loadTopProducts();
}

// إنشاء مخطط الموردين
function renderSupplierChart() {
    const canvas = document.getElementById('supplierChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const chart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['السيارات المتميزة', 'وكيل السيارات', 'مورد الاكسسوارات', 'مورد قطع الغيار'],
            datasets: [{
                data: [660000, 360000, 100000, 120000],
                backgroundColor: [
                    '#3498db',
                    '#2ecc71',
                    '#f39c12',
                    '#9b59b6'
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    rtl: true,
                    labels: {
                        font: {
                            family: 'Cairo'
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.label || '';
                            if (label) {
                                label += ': ';
                            }
                            label += utils.formatCurrency(context.raw);
                            return label;
                        }
                    }
                }
            }
        }
    });
}

// إنشاء مخطط المشتريات الشهرية
function renderMonthlyPurchaseChart() {
    const canvas = document.getElementById('monthlyPurchaseChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['أكتوبر', 'نوفمبر', 'ديسمبر', 'يناير'],
            datasets: [{
                label: 'قيمة المشتريات',
                data: [1200000, 1450000, 1650000, 1850000],
                borderColor: '#e74c3c',
                backgroundColor: 'rgba(231, 76, 60, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return utils.formatNumber(value / 1000000) + ' مليون';
                        }
                    }
                }
            }
        }
    });
}

// تحميل أفضل المنتجات شراءً
function loadTopProducts() {
    const products = [
        { name: 'سيارة تويوتا كامري 2024', quantity: 15, total: 1800000, avgPrice: 120000, lastPurchase: '2024-01-13' },
        { name: 'سيارة BMW X5 2024', quantity: 8, total: 1920000, avgPrice: 240000, lastPurchase: '2024-01-15' },
        { name: 'سيارة مرسيدس GLC 2024', quantity: 6, total: 1080000, avgPrice: 180000, lastPurchase: '2024-01-14' },
        { name: 'إطارات 18 بوصة', quantity: 200, total: 240000, avgPrice: 1200, lastPurchase: '2024-01-14' },
        { name: 'زيت محرك 5W-30', quantity: 150, total: 37500, avgPrice: 250, lastPurchase: '2024-01-08' }
    ];
    
    renderTopProductsTable(products);
}

// عرض جدول أفضل المنتجات شراءً
function renderTopProductsTable(products) {
    const tableBody = document.querySelector('#topProductsTable tbody');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    products.forEach((product, index) => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>
                <span class="product-rank">${index + 1}</span>
                ${product.name}
            </td>
            <td>${product.quantity}</td>
            <td>${utils.formatCurrency(product.total)}</td>
            <td>${utils.formatCurrency(product.avgPrice)}</td>
            <td>${product.lastPurchase}</td>
        `;
        
        tableBody.appendChild(row);
    });
}

// عرض طلب الشراء
function viewPurchaseOrder(orderId) {
    console.log('عرض طلب الشراء:', orderId);
    // في التطبيق الحقيقي، هنا ستكون فتح صفحة تفاصيل الطلب
}

// تحرير طلب الشراء
function editPurchaseOrder(orderId) {
    console.log('تحرير طلب الشراء:', orderId);
    // في التطبيق الحقيقي، هنا ستكون فتح نموذج التحرير
}

// استلام الطلب
function receiveOrder(orderId) {
    if (confirm('هل تريد تأكيد استلام هذا الطلب؟')) {
        console.log('استلام الطلب:', orderId);
        // في التطبيق الحقيقي، هنا ستكون استدعاء API
        utils.showNotification('تم تأكيد استلام الطلب', 'success');
        loadPurchaseOrders();
    }
}

// حذف طلب الشراء
function deletePurchaseOrder(orderId) {
    if (confirm('هل أنت متأكد من حذف هذا الطلب؟')) {
        console.log('حذف طلب الشراء:', orderId);
        // في التطبيق الحقيقي، هنا ستكون استدعاء API للحذف
        utils.showNotification('تم حذف طلب الشراء بنجاح', 'success');
        loadPurchaseOrders();
    }
}

// عرض فاتورة المشتريات
function viewPurchaseInvoice(invoiceId) {
    console.log('عرض فاتورة المشتريات:', invoiceId);
    // في التطبيق الحقيقي، هنا ستكون فتح صفحة الفاتورة
}

// دفع الفاتورة
function payInvoice(invoiceId) {
    console.log('دفع الفاتورة:', invoiceId);
    // في التطبيق الحقيقي، هنا ستكون فتح نموذج الدفع
}

// طباعة الفاتورة
function printInvoice(invoiceId) {
    utils.showNotification(`جاري طباعة فاتورة ${invoiceId}...`, 'info');
    // في التطبيق الحقيقي، هنا ستكون استدعاء API للطباعة
}

// عرض الدفعة
function viewPayment(paymentId) {
    console.log('عرض الدفعة:', paymentId);
    // في التطبيق الحقيقي، هنا ستكون فتح صفحة تفاصيل الدفعة
}

// طباعة إيصال الدفع
function printReceipt(paymentId) {
    utils.showNotification(`جاري طباعة إيصال الدفع ${paymentId}...`, 'info');
    // في التطبيق الحقيقي، هنا ستكون استدعاء API للطباعة
}

// فتح فاتورة مشتريات جديدة
function openNewPurchaseInvoice() {
    utils.showNotification('فتح نموذج فاتورة مشتريات جديدة', 'info');
    // في التطبيق الحقيقي، هنا ستكون فتح نموذج الفاتورة
}

// فتح نموذج تسجيل دفعة جديدة
function openNewPayment() {
    utils.showNotification('فتح نموذج تسجيل دفعة جديدة', 'info');
    // في التطبيق الحقيقي، هنا ستكون فتح نموذج الدفع
}

// فتح الفواتير غير المدفوعة
function openUnpaidInvoices() {
    utils.showNotification('عرض الفواتير غير المدفوعة', 'info');
    // في التطبيق الحقيقي، هنا ستكون تصفية الجدول
}

// تصدير بيانات المشتريات
function exportPurchaseData() {
    utils.showNotification('جاري تصدير بيانات المشتريات...', 'info');
    // في التطبيق الحقيقي، هنا ستكون استدعاء API للتصدير
}