// تهيئة صفحة المخزون
document.addEventListener('DOMContentLoaded', function() {
    // التحقق من حالة المصادقة
    if (!checkAuthStatus()) {
        window.location.href = 'login.html';
        return;
    }
    
    // تهيئة العناصر
    initInventoryPage();
    
    // تحميل البيانات
    loadInventoryData();
    
    // تهيئة الأحداث
    initInventoryEvents();
});

// تهيئة صفحة المخزون
function initInventoryPage() {
    // تحديث التاريخ
    updateDate();
    
    // تهيئة القائمة الجانبية
    initSidebar();
    
    // تهيئة التبويبات
    initTabs();
    
    // تهيئة البحث
    initInventorySearch();
    
    // تهيئة نموذج التصنيفات
    initCategoryForm();
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

// تهيئة التبويبات
function initTabs() {
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
            }
        });
    });
}

// تحميل بيانات المخزون
function loadInventoryData() {
    // في التطبيق الحقيقي، هنا ستكون استدعاء API
    
    // بيانات تجريبية للمنتجات
    const products = [
        {
            id: 1,
            image: 'assets/images/car1.jpg',
            name: 'سيارة BMW X5 2024',
            category: 'سيارات',
            stock: 5,
            minStock: 10,
            purchasePrice: 220000,
            sellingPrice: 240000,
            status: 'low'
        },
        {
            id: 2,
            image: 'assets/images/car2.jpg',
            name: 'سيارة مرسيدس GLC 2024',
            category: 'سيارات',
            stock: 3,
            minStock: 5,
            purchasePrice: 160000,
            sellingPrice: 180000,
            status: 'low'
        },
        {
            id: 3,
            image: 'assets/images/car3.jpg',
            name: 'سيارة تويوتا كامري 2024',
            category: 'سيارات',
            stock: 12,
            minStock: 8,
            purchasePrice: 110000,
            sellingPrice: 120000,
            status: 'high'
        },
        {
            id: 4,
            image: 'assets/images/accessory1.jpg',
            name: 'إطارات 18 بوصة - بريدجستون',
            category: 'اكسسوارات',
            stock: 15,
            minStock: 20,
            purchasePrice: 800,
            sellingPrice: 1200,
            status: 'medium'
        },
        {
            id: 5,
            image: 'assets/images/accessory2.jpg',
            name: 'زيت محرك 5W-30',
            category: 'قطع غيار',
            stock: 45,
            minStock: 30,
            purchasePrice: 150,
            sellingPrice: 250,
            status: 'high'
        },
        {
            id: 6,
            image: 'assets/images/service1.jpg',
            name: 'خدمة جلد حماية',
            category: 'خدمات',
            stock: -1, // خدمات لا يوجد لها مخزون
            minStock: -1,
            purchasePrice: 5000,
            sellingPrice: 10000,
            status: 'service'
        }
    ];
    
    renderInventoryTable(products);
    
    // تحميل التصنيفات
    loadCategories();
    
    // تحميل المخازن
    loadWarehouses();
    
    // تحميل حركة المخزون
    loadInventoryMovements();
}

// عرض جدول المنتجات
function renderInventoryTable(products) {
    const tableBody = document.querySelector('#inventoryTable tbody');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    products.forEach(product => {
        const row = document.createElement('tr');
        
        // تحديد حالة المخزون
        let statusText, statusClass;
        if (product.status === 'low') {
            statusText = 'منخفض';
            statusClass = 'danger';
        } else if (product.status === 'medium') {
            statusText = 'متوسط';
            statusClass = 'warning';
        } else if (product.status === 'high') {
            statusText = 'جيد';
            statusClass = 'success';
        } else if (product.status === 'service') {
            statusText = 'خدمة';
            statusClass = 'info';
        }
        
        // حساب نسبة المخزون
        const stockPercentage = product.minStock > 0 ? 
            Math.round((product.stock / product.minStock) * 100) : 100;
        
        row.innerHTML = `
            <td>
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}" 
                         onerror="this.src='assets/images/default-product.jpg'">
                </div>
            </td>
            <td>
                <div class="product-info">
                    <h5 class="product-name">${product.name}</h5>
                    <p class="product-code">#PROD-${String(product.id).padStart(4, '0')}</p>
                </div>
            </td>
            <td>
                <span class="category-badge ${product.category === 'سيارات' ? 'cars' : product.category === 'اكسسوارات' ? 'accessories' : product.category === 'قطع غيار' ? 'parts' : 'services'}">
                    ${product.category}
                </span>
            </td>
            <td>
                <div class="stock-info">
                    <span class="stock-quantity">${product.stock >= 0 ? product.stock : 'غير محدد'}</span>
                    ${product.minStock > 0 ? `
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${Math.min(stockPercentage, 100)}%"></div>
                        </div>
                    ` : ''}
                </div>
            </td>
            <td>${product.minStock > 0 ? product.minStock : '-'}</td>
            <td>${utils.formatCurrency(product.purchasePrice)}</td>
            <td>${utils.formatCurrency(product.sellingPrice)}</td>
            <td>
                <span class="status-badge ${statusClass}">${statusText}</span>
            </td>
            <td>
                <div class="action-buttons">
                    <button class="action-btn view" onclick="viewProduct(${product.id})">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="action-btn edit" onclick="editProduct(${product.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="action-btn stock" onclick="adjustStock(${product.id})">
                        <i class="fas fa-boxes"></i>
                    </button>
                    <button class="action-btn delete" onclick="deleteProduct(${product.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
}

// تهيئة البحث
function initInventorySearch() {
    const searchInput = document.getElementById('productSearch');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', function() {
        searchProducts(this.value);
    });
}

// البحث في المنتجات
function searchProducts(searchTerm) {
    console.log('البحث عن:', searchTerm);
    // في التطبيق الحقيقي، هنا ستكون استدعاء API
}

// تطبيق التصفية
function applyInventoryFilters() {
    const category = document.getElementById('categoryFilter').value;
    const stockLevel = document.getElementById('stockFilter').value;
    
    console.log('تطبيق التصفية:', { category, stockLevel });
    // في التطبيق الحقيقي، هنا ستكون استدعاء API
}

// تصدير بيانات المخزون
function exportInventory() {
    // في التطبيق الحقيقي، هنا ستكون استدعاء API لتصدير البيانات
    utils.showNotification('جاري تصدير بيانات المخزون...', 'info');
    
    setTimeout(() => {
        utils.showNotification('تم تصدير البيانات بنجاح', 'success');
    }, 2000);
}

// فتح نموذج منتج جديد
function openNewProductModal() {
    const modal = document.getElementById('productModal');
    const modalTitle = modal.querySelector('#productModalTitle');
    const modalBody = modal.querySelector('.modal-body');
    
    modalTitle.textContent = 'منتج جديد';
    
    modalBody.innerHTML = `
        <form id="productForm" onsubmit="saveProduct(event)">
            <div class="form-tabs">
                <button type="button" class="form-tab active" data-tab="basic">البيانات الأساسية</button>
                <button type="button" class="form-tab" data-tab="pricing">الأسعار والمخزون</button>
                <button type="button" class="form-tab" data-tab="details">تفاصيل إضافية</button>
            </div>
            
            <div class="form-tab-content active" id="basic-tab">
                <div class="row">
                    <div class="col-md-8">
                        <div class="form-group">
                            <label>اسم المنتج <span class="required">*</span></label>
                            <input type="text" class="form-control" id="productName" required>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label>كود المنتج</label>
                            <input type="text" class="form-control" id="productCode" 
                                   value="PROD-${Date.now().toString().slice(-6)}" readonly>
                        </div>
                    </div>
                </div>
                
                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label>التصنيف <span class="required">*</span></label>
                            <select class="form-control" id="productCategory" required>
                                <option value="">اختر التصنيف</option>
                                <option value="cars">سيارات</option>
                                <option value="accessories">اكسسوارات</option>
                                <option value="parts">قطع غيار</option>
                                <option value="services">خدمات</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label>النوع الفرعي</label>
                            <select class="form-control" id="productSubCategory">
                                <option value="">اختر النوع الفرعي</option>
                                <!-- سيتم ملؤه بناءً على التصنيف -->
                            </select>
                        </div>
                    </div>
                </div>
                
                <div class="form-group">
                    <label>الوصف</label>
                    <textarea class="form-control" id="productDescription" rows="3"></textarea>
                </div>
            </div>
            
            <div class="form-tab-content" id="pricing-tab">
                <div class="row">
                    <div class="col-md-4">
                        <div class="form-group">
                            <label>سعر الشراء <span class="required">*</span></label>
                            <input type="number" class="form-control" id="purchasePrice" required min="0" step="0.01">
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label>سعر البيع <span class="required">*</span></label>
                            <input type="number" class="form-control" id="sellingPrice" required min="0" step="0.01">
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label>سعر البيع بعد الخصم</label>
                            <input type="number" class="form-control" id="discountPrice" min="0" step="0.01">
                        </div>
                    </div>
                </div>
                
                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label>الكمية في المخزون</label>
                            <input type="number" class="form-control" id="stockQuantity" min="0">
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label>الحد الأدنى للمخزون</label>
                            <input type="number" class="form-control" id="minStock" min="0">
                        </div>
                    </div>
                </div>
                
                <div class="form-group">
                    <label>موقع المنتج في المخزن</label>
                    <input type="text" class="form-control" id="productLocation" placeholder="مثال: رف A-15">
                </div>
            </div>
            
            <div class="form-tab-content" id="details-tab">
                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label>الماركة</label>
                            <input type="text" class="form-control" id="productBrand">
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label>الموديل</label>
                            <input type="text" class="form-control" id="productModel">
                        </div>
                    </div>
                </div>
                
                <div class="row">
                    <div class="col-md-4">
                        <div class="form-group">
                            <label>السنة</label>
                            <input type="number" class="form-control" id="productYear" min="2000" max="2024">
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label>اللون</label>
                            <input type="text" class="form-control" id="productColor">
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label>رقم الشاصي (للسيارات)</label>
                            <input type="text" class="form-control" id="chassisNumber">
                        </div>
                    </div>
                </div>
                
                <div class="form-group">
                    <label>المواصفات التقنية</label>
                    <textarea class="form-control" id="productSpecs" rows="4" placeholder="أدخل المواصفات التقنية للمنتج..."></textarea>
                </div>
            </div>
            
            <div class="form-actions">
                <button type="button" class="btn btn-outline" onclick="closeProductModal()">
                    إلغاء
                </button>
                <button type="submit" class="btn btn-primary">
                    <i class="fas fa-save"></i>
                    حفظ المنتج
                </button>
            </div>
        </form>
    `;
    
    modal.style.display = 'flex';
    
    // تهيئة تبويبات النموذج
    initFormTabs();
    
    // تهيئة الأحداث
    initProductFormEvents();
}

// تهيئة تبويبات نموذج المنتج
function initFormTabs() {
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

// تهيئة أحداث نموذج المنتج
function initProductFormEvents() {
    // تحديث الأنواع الفرعية بناءً على التصنيف
    const categorySelect = document.getElementById('productCategory');
    const subCategorySelect = document.getElementById('productSubCategory');
    
    if (categorySelect && subCategorySelect) {
        categorySelect.addEventListener('change', function() {
            updateSubCategories(this.value);
        });
    }
}

// تحديث الأنواع الفرعية
function updateSubCategories(category) {
    const subCategorySelect = document.getElementById('productSubCategory');
    if (!subCategorySelect) return;
    
    subCategorySelect.innerHTML = '<option value="">اختر النوع الفرعي</option>';
    
    const subCategories = {
        cars: ['سيدان', 'كروس أوفر', 'دفع رباعي', 'رياضية', 'عائلية'],
        accessories: ['إطارات', 'سماعات', 'أنظمة ملاحة', 'زينة داخلية', 'زينة خارجية'],
        parts: ['محرك', 'نظام فرامل', 'نظام تبريد', 'كهرباء', 'تعليق'],
        services: ['صيانة', 'تلميع', 'تأمين', 'تمويل', 'تسجيل']
    };
    
    if (subCategories[category]) {
        subCategories[category].forEach(subCat => {
            const option = document.createElement('option');
            option.value = subCat;
            option.textContent = subCat;
            subCategorySelect.appendChild(option);
        });
    }
}

// حفظ المنتج
function saveProduct(event) {
    event.preventDefault();
    
    const productData = {
        name: document.getElementById('productName').value,
        code: document.getElementById('productCode').value,
        category: document.getElementById('productCategory').value,
        subCategory: document.getElementById('productSubCategory').value,
        description: document.getElementById('productDescription').value,
        purchasePrice: parseFloat(document.getElementById('purchasePrice').value),
        sellingPrice: parseFloat(document.getElementById('sellingPrice').value),
        discountPrice: parseFloat(document.getElementById('discountPrice').value) || null,
        stock: parseInt(document.getElementById('stockQuantity').value) || 0,
        minStock: parseInt(document.getElementById('minStock').value) || 0,
        location: document.getElementById('productLocation').value,
        brand: document.getElementById('productBrand').value,
        model: document.getElementById('productModel').value,
        year: document.getElementById('productYear').value,
        color: document.getElementById('productColor').value,
        chassisNumber: document.getElementById('chassisNumber').value,
        specifications: document.getElementById('productSpecs').value
    };
    
    console.log('حفظ المنتج:', productData);
    
    // في التطبيق الحقيقي، هنا ستكون إرسال البيانات إلى الخادم
    
    utils.showNotification('تم حفظ المنتج بنجاح', 'success');
    closeProductModal();
    loadInventoryData();
}

// إغلاق نموذج المنتج
function closeProductModal() {
    document.getElementById('productModal').style.display = 'none';
}

// عرض تفاصيل المنتج
function viewProduct(productId) {
    console.log('عرض المنتج:', productId);
    // في التطبيق الحقيقي، هنا ستكون فتح صفحة تفاصيل المنتج
}

// تحرير المنتج
function editProduct(productId) {
    console.log('تحرير المنتج:', productId);
    // في التطبيق الحقيقي، هنا ستكون فتح نموذج التحرير مع بيانات المنتج
}

// تعديل المخزون
function adjustStock(productId) {
    console.log('تعديل مخزون المنتج:', productId);
    // في التطبيق الحقيقي، هنا ستكون فتح نموذج تعديل المخزون
}

// حذف المنتج
function deleteProduct(productId) {
    if (confirm('هل أنت متأكد من حذف هذا المنتج؟')) {
        console.log('حذف المنتج:', productId);
        // في التطبيق الحقيقي، هنا ستكون استدعاء API للحذف
        utils.showNotification('تم حذف المنتج بنجاح', 'success');
        loadInventoryData();
    }
}

// تهيئة نموذج التصنيفات
function initCategoryForm() {
    const form = document.getElementById('categoryForm');
    if (!form) return;
    
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        saveCategory();
    });
}

// حفظ التصنيف
function saveCategory() {
    const categoryData = {
        name: document.getElementById('categoryName').value,
        parent: document.getElementById('parentCategory').value,
        description: document.getElementById('categoryDescription').value
    };
    
    console.log('حفظ التصنيف:', categoryData);
    utils.showNotification('تم حفظ التصنيف بنجاح', 'success');
    document.getElementById('categoryForm').reset();
    loadCategories();
}

// تحميل التصنيفات
function loadCategories() {
    // بيانات تجريبية
    const categories = [
        { id: 1, name: 'سيارات', parent: null, products: 25 },
        { id: 2, name: 'اكسسوارات', parent: null, products: 150 },
        { id: 3, name: 'قطع غيار', parent: null, products: 450 },
        { id: 4, name: 'خدمات', parent: null, products: 15 },
        { id: 5, name: 'سيدان', parent: 'سيارات', products: 10 },
        { id: 6, name: 'كروس أوفر', parent: 'سيارات', products: 8 },
        { id: 7, name: 'إطارات', parent: 'اكسسوارات', products: 45 }
    ];
    
    renderCategoriesTree(categories);
}

// عرض شجرة التصنيفات
function renderCategoriesTree(categories) {
    const container = document.getElementById('categoriesTree');
    if (!container) return;
    
    let html = '<ul class="categories-list">';
    
    // التصنيفات الرئيسية
    categories.filter(cat => !cat.parent).forEach(category => {
        html += `
            <li class="category-item">
                <div class="category-header">
                    <span class="category-name">${category.name}</span>
                    <span class="category-count">(${category.products} منتج)</span>
                    <div class="category-actions">
                        <button class="btn btn-sm btn-outline" onclick="editCategory(${category.id})">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-sm btn-danger" onclick="deleteCategory(${category.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
        `;
        
        // التصنيفات الفرعية
        const subCategories = categories.filter(cat => cat.parent === category.name);
        if (subCategories.length > 0) {
            html += '<ul class="sub-categories">';
            subCategories.forEach(subCat => {
                html += `
                    <li class="sub-category-item">
                        <span class="category-name">${subCat.name}</span>
                        <span class="category-count">(${subCat.products} منتج)</span>
                        <div class="category-actions">
                            <button class="btn btn-sm btn-outline" onclick="editCategory(${subCat.id})">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="btn btn-sm btn-danger" onclick="deleteCategory(${subCat.id})">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </li>
                `;
            });
            html += '</ul>';
        }
        
        html += '</li>';
    });
    
    html += '</ul>';
    container.innerHTML = html;
}

// تحرير التصنيف
function editCategory(categoryId) {
    console.log('تحرير التصنيف:', categoryId);
}

// حذف التصنيف
function deleteCategory(categoryId) {
    if (confirm('هل أنت متأكد من حذف هذا التصنيف؟')) {
        console.log('حذف التصنيف:', categoryId);
        utils.showNotification('تم حذف التصنيف بنجاح', 'success');
        loadCategories();
    }
}

// تحميل المخازن
function loadWarehouses() {
    const warehouses = [
        { id: 1, name: 'المخزن الرئيسي', location: 'الرياض - حي العليا', capacity: 100, used: 75, manager: 'أحمد السليم' },
        { id: 2, name: 'مخزن السيارات', location: 'الرياض - حي النخيل', capacity: 50, used: 25, manager: 'محمد أحمد' },
        { id: 3, name: 'مخزن الاكسسوارات', location: 'الرياض - حي السليمانية', capacity: 200, used: 150, manager: 'فهد خالد' }
    ];
    
    renderWarehousesGrid(warehouses);
}

// عرض شبكة المخازن
function renderWarehousesGrid(warehouses) {
    const container = document.getElementById('warehousesGrid');
    if (!container) return;
    
    let html = '<div class="warehouses-cards">';
    
    warehouses.forEach(warehouse => {
        const usagePercentage = Math.round((warehouse.used / warehouse.capacity) * 100);
        
        html += `
            <div class="warehouse-card">
                <div class="warehouse-header">
                    <h4>${warehouse.name}</h4>
                    <span class="warehouse-location">${warehouse.location}</span>
                </div>
                <div class="warehouse-body">
                    <div class="warehouse-stats">
                        <div class="stat-item">
                            <span class="stat-label">السعة:</span>
                            <span class="stat-value">${warehouse.capacity}</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">المستخدم:</span>
                            <span class="stat-value">${warehouse.used}</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">المتبقي:</span>
                            <span class="stat-value">${warehouse.capacity - warehouse.used}</span>
                        </div>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${usagePercentage}%"></div>
                    </div>
                    <div class="warehouse-manager">
                        <i class="fas fa-user"></i>
                        <span>${warehouse.manager}</span>
                    </div>
                </div>
                <div class="warehouse-footer">
                    <button class="btn btn-outline btn-sm" onclick="viewWarehouse(${warehouse.id})">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn btn-outline btn-sm" onclick="editWarehouse(${warehouse.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-outline btn-sm" onclick="warehouseReport(${warehouse.id})">
                        <i class="fas fa-chart-bar"></i>
                    </button>
                </div>
            </div>
        `;
    });
    
    html += '</div>';
    container.innerHTML = html;
}

// تحميل حركة المخزون
function loadInventoryMovements() {
    const movements = [
        { id: 1, date: '2024-01-15', type: 'بيع', product: 'سيارة BMW X5', quantity: -1, warehouse: 'المخزن الرئيسي', value: 240000, user: 'أحمد السليم' },
        { id: 2, date: '2024-01-14', type: 'شراء', product: 'سيارة مرسيدس GLC', quantity: 2, warehouse: 'مخزن السيارات', value: 320000, user: 'محمد أحمد' },
        { id: 3, date: '2024-01-13', type: 'تعديل', product: 'إطارات 18 بوصة', quantity: 5, warehouse: 'مخزن الاكسسوارات', value: 6000, user: 'فهد خالد' },
        { id: 4, date: '2024-01-12', type: 'تحويل', product: 'زيت محرك', quantity: -10, warehouse: 'المخزن الرئيسي', value: 1500, user: 'أحمد السليم' }
    ];
    
    renderMovementsTable(movements);
}

// عرض جدول حركة المخزون
function renderMovementsTable(movements) {
    const tableBody = document.querySelector('#movementsTable tbody');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    movements.forEach(movement => {
        const row = document.createElement('tr');
        
        const typeClass = movement.type === 'بيع' ? 'sale' : 
                         movement.type === 'شراء' ? 'purchase' : 
                         movement.type === 'تعديل' ? 'adjustment' : 'transfer';
        
        row.innerHTML = `
            <td>#MOV-${String(movement.id).padStart(4, '0')}</td>
            <td>${movement.date}</td>
            <td><span class="movement-type ${typeClass}">${movement.type}</span></td>
            <td>${movement.product}</td>
            <td>
                <span class="quantity ${movement.quantity > 0 ? 'positive' : 'negative'}">
                    ${movement.quantity > 0 ? '+' : ''}${movement.quantity}
                </span>
            </td>
            <td>${movement.warehouse}</td>
            <td>${utils.formatCurrency(movement.value)}</td>
            <td>${movement.user}</td>
            <td>
                <button class="btn btn-outline btn-sm" onclick="viewMovement(${movement.id})">
                    <i class="fas fa-eye"></i>
                </button>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
}

// إنشاء تقرير
function generateReport() {
    const startDate = document.getElementById('reportStartDate').value;
    const endDate = document.getElementById('reportEndDate').value;
    
    console.log('إنشاء تقرير من', startDate, 'إلى', endDate);
    
    // في التطبيق الحقيقي، هنا ستكون استدعاء API
    
    utils.showNotification('جاري إنشاء التقرير...', 'info');
    
    setTimeout(() => {
        renderInventoryChart();
        utils.showNotification('تم إنشاء التقرير بنجاح', 'success');
    }, 1500);
}

// عرض مخطط المخزون
function renderInventoryChart() {
    const canvas = document.getElementById('inventoryChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['سيارات', 'اكسسوارات', 'قطع غيار', 'خدمات'],
            datasets: [{
                label: 'قيمة المخزون',
                data: [4500000, 1500000, 1200000, 800000],
                backgroundColor: [
                    '#3498db',
                    '#2ecc71',
                    '#f39c12',
                    '#9b59b6'
                ],
                borderColor: [
                    '#2980b9',
                    '#27ae60',
                    '#d68910',
                    '#8e44ad'
                ],
                borderWidth: 1
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