// تهيئة صفحة المبيعات
document.addEventListener('DOMContentLoaded', function() {
    // التحقق من حالة المصادقة
    if (!checkAuthStatus()) {
        window.location.href = 'login.html';
        return;
    }
    
    // تهيئة العناصر
    initSalesPage();
    
    // تحميل بيانات الطلبات
    loadSalesOrders();
    
    // تهيئة الأحداث
    initSalesEvents();
});

// تهيئة صفحة المبيعات
function initSalesPage() {
    // تحديث التاريخ
    updateDate();
    
    // تهيئة القائمة الجانبية
    initSidebar();
    
    // تهيئة البحث
    initSalesSearch();
    
    // تهيئة التصفية
    initFilters();
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

// تحميل بيانات طلبات البيع
function loadSalesOrders() {
    // في التطبيق الحقيقي، هنا ستكون استدعاء API
    
    // بيانات تجريبية
    const orders = [
        {
            id: 'ORD-2024-0015',
            customer: 'محمد أحمد',
            date: '2024-01-15',
            products: ['سيارة BMW X5 2024', 'جلد حماية'],
            total: 250000,
            paid: 250000,
            remaining: 0,
            paymentMethod: 'نقدي',
            status: 'completed',
            statusText: 'مكتمل'
        },
        {
            id: 'ORD-2024-0014',
            customer: 'شركة النجاح',
            date: '2024-01-14',
            products: ['سيارة مرسيدس GLC 2024'],
            total: 180000,
            paid: 90000,
            remaining: 90000,
            paymentMethod: 'تمويل',
            status: 'processing',
            statusText: 'قيد التنفيذ'
        },
        {
            id: 'ORD-2024-0013',
            customer: 'عبدالله سعيد',
            date: '2024-01-13',
            products: ['سيارة تويوتا كامري 2024', 'إطارات إضافية'],
            total: 320000,
            paid: 32000,
            remaining: 288000,
            paymentMethod: 'تمويل',
            status: 'financing',
            statusText: 'تحت التمويل'
        },
        {
            id: 'ORD-2024-0012',
            customer: 'فهد خالد',
            date: '2024-01-12',
            products: ['اكسسوارات سيارات'],
            total: 95000,
            paid: 0,
            remaining: 95000,
            paymentMethod: 'نقدي',
            status: 'pending',
            statusText: 'معلق'
        },
        {
            id: 'ORD-2024-0011',
            customer: 'أحمد محمد',
            date: '2024-01-11',
            products: ['سيارة هونداي توسان 2024'],
            total: 450000,
            paid: 0,
            remaining: 450000,
            paymentMethod: 'تمويل',
            status: 'cancelled',
            statusText: 'ملغي'
        },
        {
            id: 'ORD-2024-0010',
            customer: 'سارة عبدالله',
            date: '2024-01-10',
            products: ['سيارة كيا سبورتاج 2024', 'خدمة نانو سيراميك'],
            total: 220000,
            paid: 220000,
            remaining: 0,
            paymentMethod: 'نقدي',
            status: 'completed',
            statusText: 'مكتمل'
        },
        {
            id: 'ORD-2024-0009',
            customer: 'خالد محمد',
            date: '2024-01-09',
            products: ['سيارة نيسان باترول 2024'],
            total: 380000,
            paid: 38000,
            remaining: 342000,
            paymentMethod: 'تمويل',
            status: 'processing',
            statusText: 'قيد التنفيذ'
        },
        {
            id: 'ORD-2024-0008',
            customer: 'عمر أحمد',
            date: '2024-01-08',
            products: ['قطع غيار سيارات'],
            total: 75000,
            paid: 75000,
            remaining: 0,
            paymentMethod: 'نقدي',
            status: 'completed',
            statusText: 'مكتمل'
        },
        {
            id: 'ORD-2024-0007',
            customer: 'ناصر سليمان',
            date: '2024-01-07',
            products: ['سيارة شيفروليه 2024'],
            total: 190000,
            paid: 0,
            remaining: 190000,
            paymentMethod: 'نقدي',
            status: 'pending',
            statusText: 'معلق'
        },
        {
            id: 'ORD-2024-0006',
            customer: 'يوسف علي',
            date: '2024-01-06',
            products: ['سيارة بي ام دبليو X3 2024'],
            total: 280000,
            paid: 140000,
            remaining: 140000,
            paymentMethod: 'تمويل',
            status: 'financing',
            statusText: 'تحت التمويل'
        }
    ];
    
    renderSalesTable(orders);
}

// عرض جدول طلبات البيع
function renderSalesTable(orders) {
    const tableBody = document.querySelector('#salesTable tbody');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    orders.forEach(order => {
        const row = document.createElement('tr');
        
        // حساب نسبة الدفع
        const paymentPercentage = Math.round((order.paid / order.total) * 100);
        
        row.innerHTML = `
            <td>
                <input type="checkbox" class="order-checkbox" value="${order.id}">
            </td>
            <td>
                <a href="#" class="order-link" onclick="viewOrderDetails('${order.id}')">
                    ${order.id}
                </a>
            </td>
            <td>${order.customer}</td>
            <td>${order.date}</td>
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
                <span class="payment-method ${order.paymentMethod}">
                    ${order.paymentMethod === 'نقدي' ? 'نقدي' : 'تمويل'}
                </span>
            </td>
            <td>
                <span class="status-badge ${order.status}">${order.statusText}</span>
            </td>
            <td>
                <div class="action-buttons">
                    <button class="action-btn view" onclick="viewOrderDetails('${order.id}')">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="action-btn edit" onclick="editOrder('${order.id}')">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="action-btn print" onclick="printOrder('${order.id}')">
                        <i class="fas fa-print"></i>
                    </button>
                    <button class="action-btn delete" onclick="deleteOrder('${order.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
    
    updatePaginationInfo();
}

// تهيئة البحث
function initSalesSearch() {
    const searchInput = document.getElementById('orderSearch');
    if (!searchInput) return;
    
    let searchTimeout;
    
    searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        
        searchTimeout = setTimeout(() => {
            searchOrders(this.value);
        }, 300);
    });
}

// البحث في الطلبات
function searchOrders(searchTerm) {
    console.log('البحث عن:', searchTerm);
    // في التطبيق الحقيقي، هنا ستكون استدعاء API
}

// تهيئة التصفية
function initFilters() {
    const statusFilter = document.getElementById('statusFilter');
    const dateFilter = document.getElementById('dateFilter');
    
    if (statusFilter) {
        statusFilter.addEventListener('change', applyFilters);
    }
    
    if (dateFilter) {
        dateFilter.addEventListener('change', applyFilters);
    }
}

// تطبيق التصفية
function applyFilters() {
    const status = document.getElementById('statusFilter').value;
    const date = document.getElementById('dateFilter').value;
    
    console.log('تطبيق التصفية:', { status, date });
    // في التطبيق الحقيقي، هنا ستكون استدعاء API
}

// إعادة تعيين التصفية
function resetFilters() {
    document.getElementById('statusFilter').value = '';
    document.getElementById('dateFilter').value = '';
    applyFilters();
}

// تحديث معلومات الترقيم
function updatePaginationInfo() {
    // في التطبيق الحقيقي، هنا ستكون حساب الترقيم من البيانات
}

// عرض تفاصيل الطلب
function viewOrderDetails(orderId) {
    // في التطبيق الحقيقي، هنا ستكون استدعاء API
    
    const orderDetails = {
        id: orderId,
        customer: 'محمد أحمد',
        customerPhone: '0551234567',
        customerEmail: 'mohammed@example.com',
        date: '2024-01-15',
        deliveryDate: '2024-01-20',
        products: [
            { name: 'سيارة BMW X5 2024', price: 240000, quantity: 1, total: 240000 },
            { name: 'جلد حماية', price: 10000, quantity: 1, total: 10000 }
        ],
        services: [
            { name: 'خدمة التوصيل', price: 0 },
            { name: 'تركيب الاكسسوارات', price: 0 }
        ],
        subtotal: 250000,
        discount: 0,
        tax: 0,
        total: 250000,
        paid: 250000,
        remaining: 0,
        paymentMethod: 'نقدي',
        status: 'completed',
        notes: 'العميل يفضل اللون الأسود'
    };
    
    renderOrderDetails(orderDetails);
    document.getElementById('orderDetailsCard').style.display = 'block';
}

// عرض تفاصيل الطلب
function renderOrderDetails(order) {
    const content = document.getElementById('orderDetailsContent');
    if (!content) return;
    
    let productsHTML = '';
    order.products.forEach(product => {
        productsHTML += `
            <tr>
                <td>${product.name}</td>
                <td>${utils.formatCurrency(product.price)}</td>
                <td>${product.quantity}</td>
                <td>${utils.formatCurrency(product.total)}</td>
            </tr>
        `;
    });
    
    content.innerHTML = `
        <div class="order-details-container">
            <div class="row">
                <div class="col-md-6">
                    <div class="detail-section">
                        <h4>معلومات العميل</h4>
                        <table class="details-table">
                            <tr>
                                <th>اسم العميل:</th>
                                <td>${order.customer}</td>
                            </tr>
                            <tr>
                                <th>رقم الهاتف:</th>
                                <td>${order.customerPhone}</td>
                            </tr>
                            <tr>
                                <th>البريد الإلكتروني:</th>
                                <td>${order.customerEmail}</td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="detail-section">
                        <h4>معلومات الطلب</h4>
                        <table class="details-table">
                            <tr>
                                <th>رقم الطلب:</th>
                                <td>${order.id}</td>
                            </tr>
                            <tr>
                                <th>تاريخ الطلب:</th>
                                <td>${order.date}</td>
                            </tr>
                            <tr>
                                <th>تاريخ التسليم:</th>
                                <td>${order.deliveryDate}</td>
                            </tr>
                            <tr>
                                <th>طريقة الدفع:</th>
                                <td><span class="payment-method">${order.paymentMethod}</span></td>
                            </tr>
                            <tr>
                                <th>الحالة:</th>
                                <td><span class="status-badge ${order.status}">${order.status === 'completed' ? 'مكتمل' : 'قيد التنفيذ'}</span></td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
            
            <div class="detail-section">
                <h4>المنتجات والخدمات</h4>
                <table class="products-table">
                    <thead>
                        <tr>
                            <th>المنتج/الخدمة</th>
                            <th>السعر</th>
                            <th>الكمية</th>
                            <th>الإجمالي</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${productsHTML}
                    </tbody>
                </table>
                
                ${order.services.length > 0 ? `
                    <h5>الخدمات الإضافية:</h5>
                    <ul class="services-list">
                        ${order.services.map(service => `
                            <li>${service.name} - ${service.price === 0 ? 'مجاناً' : utils.formatCurrency(service.price)}</li>
                        `).join('')}
                    </ul>
                ` : ''}
            </div>
            
            <div class="detail-section">
                <h4>الملخص المالي</h4>
                <table class="summary-table">
                    <tr>
                        <th>المجموع الفرعي:</th>
                        <td>${utils.formatCurrency(order.subtotal)}</td>
                    </tr>
                    <tr>
                        <th>الخصم:</th>
                        <td>${utils.formatCurrency(order.discount)}</td>
                    </tr>
                    <tr>
                        <th>الضريبة:</th>
                        <td>${utils.formatCurrency(order.tax)}</td>
                    </tr>
                    <tr class="total-row">
                        <th>الإجمالي النهائي:</th>
                        <td>${utils.formatCurrency(order.total)}</td>
                    </tr>
                    <tr>
                        <th>المبلغ المدفوع:</th>
                        <td>${utils.formatCurrency(order.paid)}</td>
                    </tr>
                    <tr>
                        <th>المبلغ المتبقي:</th>
                        <td>${utils.formatCurrency(order.remaining)}</td>
                    </tr>
                </table>
            </div>
            
            ${order.notes ? `
                <div class="detail-section">
                    <h4>ملاحظات</h4>
                    <div class="notes-box">
                        ${order.notes}
                    </div>
                </div>
            ` : ''}
        </div>
    `;
}

// إغلاق تفاصيل الطلب
function closeOrderDetails() {
    document.getElementById('orderDetailsCard').style.display = 'none';
}

// فتح نموذج طلب جديد
function openNewOrderModal() {
    const modal = document.getElementById('newOrderModal');
    const modalBody = modal.querySelector('.modal-body');
    
    modalBody.innerHTML = `
        <div class="new-order-form">
            <!-- اختيار العميل -->
            <div class="form-section">
                <h4>اختيار العميل</h4>
                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label>البحث عن عميل</label>
                            <div class="input-with-button">
                                <input type="text" id="customerSearch" class="form-control" placeholder="ابحث باسم العميل أو رقم الهاتف">
                                <button class="btn btn-outline" onclick="searchCustomer()">
                                    <i class="fas fa-search"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label>أو إنشاء عميل جديد</label>
                            <button class="btn btn-outline btn-block" onclick="createNewCustomer()">
                                <i class="fas fa-user-plus"></i>
                                عميل جديد
                            </button>
                        </div>
                    </div>
                </div>
                
                <div id="customerResults" class="customer-results" style="display: none;">
                    <!-- سيتم ملؤه بالنتائج -->
                </div>
            </div>
            
            <!-- إضافة المنتجات -->
            <div class="form-section">
                <h4>إضافة المنتجات</h4>
                <div class="product-selection">
                    <div class="product-search">
                        <input type="text" id="productSearch" class="form-control" placeholder="ابحث عن منتج...">
                        <button class="btn btn-primary" onclick="searchProduct()">
                            <i class="fas fa-search"></i>
                        </button>
                    </div>
                    
                    <div id="productList" class="product-list">
                        <!-- سيتم ملؤه بالمنتجات -->
                    </div>
                    
                    <div id="selectedProducts" class="selected-products">
                        <h5>المنتجات المختارة</h5>
                        <table class="selected-products-table">
                            <thead>
                                <tr>
                                    <th>المنتج</th>
                                    <th>السعر</th>
                                    <th>الكمية</th>
                                    <th>الإجمالي</th>
                                    <th>إجراء</th>
                                </tr>
                            </thead>
                            <tbody id="selectedProductsBody">
                                <!-- سيتم ملؤه -->
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            
            <!-- الخدمات الإضافية -->
            <div class="form-section">
                <h4>الخدمات الإضافية</h4>
                <div class="services-checkboxes">
                    <label class="checkbox-label">
                        <input type="checkbox" name="services" value="جلد حماية">
                        <span>جلد حماية (+10,000 ر.س)</span>
                    </label>
                    <label class="checkbox-label">
                        <input type="checkbox" name="services" value="نانو سيراميك">
                        <span>نانو سيراميك (+15,000 ر.س)</span>
                    </label>
                    <label class="checkbox-label">
                        <input type="checkbox" name="services" value="تأمين شامل">
                        <span>تأمين شامل (+20,000 ر.س)</span>
                    </label>
                </div>
            </div>
            
            <!-- طريقة الدفع -->
            <div class="form-section">
                <h4>طريقة الدفع</h4>
                <div class="payment-method-selection">
                    <div class="payment-options">
                        <label class="payment-option">
                            <input type="radio" name="paymentMethod" value="cash" checked>
                            <div class="option-card">
                                <i class="fas fa-money-bill-wave"></i>
                                <span>نقدي</span>
                            </div>
                        </label>
                        <label class="payment-option">
                            <input type="radio" name="paymentMethod" value="financing">
                            <div class="option-card">
                                <i class="fas fa-file-contract"></i>
                                <span>تمويل</span>
                            </div>
                        </label>
                    </div>
                    
                    <!-- تفاصيل التمويل (تظهر فقط عند اختيار التمويل) -->
                    <div id="financingDetails" class="financing-details" style="display: none;">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>البنك</label>
                                    <select class="form-control" id="bankSelect">
                                        <option value="">اختر البنك</option>
                                        <option value="الراجحي">الراجحي</option>
                                        <option value="الأهلي">الأهلي</option>
                                        <option value="سامبا">سامبا</option>
                                        <option value="البلاد">البلاد</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>الدفعة الأولى</label>
                                    <input type="number" id="downPayment" class="form-control" placeholder="المبلغ">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- الملخص -->
            <div class="form-section">
                <h4>ملخص الطلب</h4>
                <div class="order-summary">
                    <table class="summary-table">
                        <tr>
                            <th>مجموع المنتجات:</th>
                            <td id="productsTotal">0 ر.س</td>
                        </tr>
                        <tr>
                            <th>الخدمات الإضافية:</th>
                            <td id="servicesTotal">0 ر.س</td>
                        </tr>
                        <tr>
                            <th>الخصم:</th>
                            <td>
                                <input type="number" id="discountAmount" class="form-control-sm" placeholder="0" onchange="calculateTotal()">
                            </td>
                        </tr>
                        <tr class="total-row">
                            <th>الإجمالي النهائي:</th>
                            <td id="finalTotal">0 ر.س</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    `;
    
    modal.style.display = 'flex';
    
    // إضافة مستمعات الأحداث
    initNewOrderEvents();
}

// تهيئة أحداث نموذج الطلب الجديد
function initNewOrderEvents() {
    // إظهار/إخفاء تفاصيل التمويل
    const financingRadio = document.querySelector('input[value="financing"]');
    const cashRadio = document.querySelector('input[value="cash"]');
    const financingDetails = document.getElementById('financingDetails');
    
    if (financingRadio && financingDetails) {
        financingRadio.addEventListener('change', function() {
            if (this.checked) {
                financingDetails.style.display = 'block';
            }
        });
        
        cashRadio.addEventListener('change', function() {
            if (this.checked) {
                financingDetails.style.display = 'none';
            }
        });
    }
    
    // تحديث الحساب عند تغيير الخدمات
    const serviceCheckboxes = document.querySelectorAll('input[name="services"]');
    serviceCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', calculateTotal);
    });
}

// إغلاق نموذج الطلب الجديد
function closeNewOrderModal() {
    document.getElementById('newOrderModal').style.display = 'none';
}

// حساب المجموع الكلي
function calculateTotal() {
    // في التطبيق الحقيقي، هنا ستكون حسابات مفصلة
    const productsTotal = 0; // مجموع المنتجات المختارة
    let servicesTotal = 0;
    
    // حساب الخدمات
    document.querySelectorAll('input[name="services"]:checked').forEach(checkbox => {
        if (checkbox.value === 'جلد حماية') servicesTotal += 10000;
        if (checkbox.value === 'نانو سيراميك') servicesTotal += 15000;
        if (checkbox.value === 'تأمين شامل') servicesTotal += 20000;
    });
    
    const discount = parseFloat(document.getElementById('discountAmount').value) || 0;
    const finalTotal = productsTotal + servicesTotal - discount;
    
    document.getElementById('servicesTotal').textContent = utils.formatCurrency(servicesTotal);
    document.getElementById('finalTotal').textContent = utils.formatCurrency(finalTotal);
}

// حفظ الطلب الجديد
function saveNewOrder() {
    // في التطبيق الحقيقي، هنا ستكون إرسال البيانات إلى الخادم
    
    const orderData = {
        customer: 'محمد أحمد', // البيانات من النموذج
        products: [], // المنتجات المختارة
        services: [], // الخدمات المختارة
        paymentMethod: document.querySelector('input[name="paymentMethod"]:checked').value,
        total: 250000, // المجموع النهائي
        notes: '' // أي ملاحظات
    };
    
    console.log('حفظ الطلب:', orderData);
    
    // إظهار إشعار النجاح
    utils.showNotification('تم حفظ الطلب بنجاح', 'success');
    
    // إغلاق النموذج
    closeNewOrderModal();
    
    // تحديث الجدول
    loadSalesOrders();
}

// تحرير الطلب
function editOrder(orderId) {
    console.log('تحرير الطلب:', orderId);
    // في التطبيق الحقيقي، هنا ستكون فتح نموذج التحرير
}

// طباعة الطلب
function printOrder(orderId) {
    console.log('طباعة الطلب:', orderId);
    // في التطبيق الحقيقي، هنا ستكون استدعاء API للطباعة
    utils.showNotification('جاري طباعة فاتورة الطلب', 'info');
}

// حذف الطلب
function deleteOrder(orderId) {
    if (confirm(`هل أنت متأكد من حذف الطلب ${orderId}؟`)) {
        console.log('حذف الطلب:', orderId);
        // في التطبيق الحقيقي، هنا ستكون استدعاء API للحذف
        utils.showNotification('تم حذف الطلب بنجاح', 'success');
        loadSalesOrders();
    }
}

// تصدير بيانات المبيعات
function exportSalesData() {
    // في التطبيق الحقيقي، هنا ستكون استدعاء API لتصدير البيانات
    utils.showNotification('جاري تصدير بيانات المبيعات...', 'info');
    
    setTimeout(() => {
        utils.showNotification('تم تصدير البيانات بنجاح', 'success');
    }, 2000);
}

// تحديث الجدول
function refreshTable() {
    loadSalesOrders();
    utils.showNotification('تم تحديث البيانات', 'success');
}

// البحث عن عميل
function searchCustomer() {
    const searchTerm = document.getElementById('customerSearch').value;
    if (!searchTerm) return;
    
    // في التطبيق الحقيقي، هنا ستكون استدعاء API
    
    const customers = [
        { id: 1, name: 'محمد أحمد', phone: '0551234567', email: 'mohammed@example.com' },
        { id: 2, name: 'أحمد محمد', phone: '0557654321', email: 'ahmed@example.com' },
        { id: 3, name: 'عبدالله سعيد', phone: '0551112233', email: 'abdullah@example.com' }
    ];
    
    const resultsDiv = document.getElementById('customerResults');
    resultsDiv.style.display = 'block';
    
    let html = '<div class="customers-list">';
    customers.forEach(customer => {
        html += `
            <div class="customer-item" onclick="selectCustomer(${customer.id}, '${customer.name}')">
                <div class="customer-info">
                    <h5>${customer.name}</h5>
                    <p>${customer.phone}</p>
                </div>
                <button class="btn btn-outline btn-sm">اختيار</button>
            </div>
        `;
    });
    html += '</div>';
    
    resultsDiv.innerHTML = html;
}

// اختيار عميل
function selectCustomer(id, name) {
    document.getElementById('customerSearch').value = name;
    document.getElementById('customerResults').style.display = 'none';
}

// إنشاء عميل جديد
function createNewCustomer() {
    // في التطبيق الحقيقي، هنا ستكون فتح نموذج إنشاء عميل جديد
    utils.showNotification('فتح نموذج إنشاء عميل جديد', 'info');
}

// البحث عن منتج
function searchProduct() {
    const searchTerm = document.getElementById('productSearch').value;
    if (!searchTerm) return;
    
    // في التطبيق الحقيقي، هنا ستكون استدعاء API
    
    const products = [
        { id: 1, name: 'سيارة BMW X5 2024', price: 240000, stock: 5 },
        { id: 2, name: 'سيارة مرسيدس GLC 2024', price: 180000, stock: 3 },
        { id: 3, name: 'سيارة تويوتا كامري 2024', price: 120000, stock: 8 }
    ];
    
    const productList = document.getElementById('productList');
    let html = '<div class="products-grid">';
    
    products.forEach(product => {
        html += `
            <div class="product-card">
                <div class="product-info">
                    <h5>${product.name}</h5>
                    <p class="price">${utils.formatCurrency(product.price)}</p>
                    <p class="stock">المخزون: ${product.stock}</p>
                </div>
                <button class="btn btn-primary btn-sm" onclick="addProductToOrder(${product.id}, '${product.name}', ${product.price})">
                    إضافة
                </button>
            </div>
        `;
    });
    html += '</div>';
    
    productList.innerHTML = html;
}

// إضافة منتج إلى الطلب
function addProductToOrder(id, name, price) {
    const tableBody = document.getElementById('selectedProductsBody');
    
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${name}</td>
        <td>${utils.formatCurrency(price)}</td>
        <td>
            <input type="number" class="form-control-sm quantity-input" value="1" min="1" 
                   onchange="updateProductTotal(this, ${price})">
        </td>
        <td class="product-total">${utils.formatCurrency(price)}</td>
        <td>
            <button class="btn btn-danger btn-sm" onclick="removeProduct(this)">
                <i class="fas fa-times"></i>
            </button>
        </td>
    `;
    
    tableBody.appendChild(row);
    
    // عرض جدول المنتجات المختارة إذا كان مخفياً
    document.getElementById('selectedProducts').style.display = 'block';
    
    // تحديث المجموع
    calculateTotal();
}

// تحديث المجموع الجزئي للمنتج
function updateProductTotal(input, price) {
    const quantity = parseInt(input.value) || 1;
    const total = price * quantity;
    const totalCell = input.closest('tr').querySelector('.product-total');
    totalCell.textContent = utils.formatCurrency(total);
    calculateTotal();
}

// إزالة منتج من الطلب
function removeProduct(button) {
    const row = button.closest('tr');
    row.remove();
    
    // إخفاء جدول المنتجات المختارة إذا لم يكن هناك منتجات
    const tableBody = document.getElementById('selectedProductsBody');
    if (tableBody.children.length === 0) {
        document.getElementById('selectedProducts').style.display = 'none';
    }
    
    calculateTotal();
}