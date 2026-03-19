// تهيئة لوحة التحكم
document.addEventListener('DOMContentLoaded', function() {
    // التحقق من حالة المصادقة
    if (!checkAuthStatus()) {
        window.location.href = 'login.html';
        return;
    }
    
    // تهيئة عناصر لوحة التحكم
    initDashboard();
    
    // تحميل بيانات المستخدم
    loadUserData();
    
    // تهيئة التاريخ والوقت
    initDateTime();
    
    // تهيئة المخططات
    initCharts();
    
    // تهيئة التقويم
    initCalendar();
    
    // تهيئة الأحداث
    initDashboardEvents();
});

// تهيئة لوحة التحكم
function initDashboard() {
    // تهيئة القائمة الجانبية للأجهزة المحمولة
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.querySelector('.sidebar');
    
    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('active');
            this.querySelector('i').classList.toggle('fa-bars');
            this.querySelector('i').classList.toggle('fa-times');
        });
    }
    
    // تهيئة الإشعارات
    initNotifications();
    
    // تهيئة البحث
    initSearch();
    
    // تهيئة الإجراءات السريعة
    initQuickActions();
    
    // تحديث الإحصائيات
    updateStats();
}

// تحميل بيانات المستخدم
function loadUserData() {
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    
    if (userData.username) {
        document.getElementById('userName').textContent = userData.fullName || userData.username;
        document.getElementById('userRole').textContent = getRoleName(userData.role);
    }
}

// الحصول على اسم الدور بالعربية
function getRoleName(role) {
    const roles = {
        'admin': 'مدير النظام',
        'sales': 'موظف مبيعات',
        'accounting': 'موظف حسابات',
        'inventory': 'موظف مخزون',
        'purchases': 'موظف مشتريات'
    };
    
    return roles[role] || 'مستخدم';
}

// تهيئة التاريخ والوقت
function initDateTime() {
    function updateDateTime() {
        const now = new Date();
        
        // تحديث التاريخ
        const dateElement = document.getElementById('currentDate');
        if (dateElement) {
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            dateElement.textContent = now.toLocaleDateString('ar-SA', options);
        }
        
        // تحديث الوقت
        const timeElement = document.getElementById('currentTime');
        if (timeElement) {
            const timeOptions = { hour: 'numeric', minute: 'numeric', hour12: true };
            const timeString = now.toLocaleTimeString('ar-SA', timeOptions);
            timeElement.textContent = timeString;
        }
    }
    
    // تحديث فوري
    updateDateTime();
    
    // تحديث كل دقيقة
    setInterval(updateDateTime, 60000);
}

// تهيئة الإشعارات
function initNotifications() {
    const notificationBtn = document.getElementById('notificationBtn');
    const notificationDropdown = document.getElementById('notificationDropdown');
    
    if (notificationBtn && notificationDropdown) {
        notificationBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            notificationDropdown.style.display = 
                notificationDropdown.style.display === 'block' ? 'none' : 'block';
        });
        
        // إغلاق القائمة عند النقر خارجها
        document.addEventListener('click', function(e) {
            if (!notificationBtn.contains(e.target) && !notificationDropdown.contains(e.target)) {
                notificationDropdown.style.display = 'none';
            }
        });
        
        // تعليم الكل كمقروء
        const markAllReadBtn = notificationDropdown.querySelector('.mark-all-read');
        if (markAllReadBtn) {
            markAllReadBtn.addEventListener('click', function() {
                const unreadItems = notificationDropdown.querySelectorAll('.notification-item.unread');
                unreadItems.forEach(item => {
                    item.classList.remove('unread');
                });
                
                // إخفاء عداد الإشعارات
                const notificationCount = notificationBtn.querySelector('.notification-count');
                if (notificationCount) {
                    notificationCount.style.display = 'none';
                }
                
                // إظهار إشعار
                showNotification('تم تعليم جميع الإشعارات كمقروءة', 'success');
            });
        }
    }
}

// تهيئة البحث
function initSearch() {
    const searchInput = document.getElementById('globalSearch');
    if (!searchInput) return;
    
    let searchTimeout;
    
    searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        
        const searchTerm = this.value.trim();
        if (searchTerm.length < 2) return;
        
        searchTimeout = setTimeout(() => {
            performGlobalSearch(searchTerm);
        }, 500);
    });
    
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performGlobalSearch(this.value.trim());
        }
    });
}

// البحث الشامل
function performGlobalSearch(searchTerm) {
    // في التطبيق الحقيقي، هنا ستكون استدعاء API
    console.log('البحث عن:', searchTerm);
    
    // محاكاة نتائج البحث
    const searchResults = [
        { type: 'عميل', name: 'محمد أحمد', id: 'CUST-001', link: 'customers.html?id=1' },
        { type: 'منتج', name: 'سيارة BMW X5', id: 'PROD-005', link: 'inventory.html?id=5' },
        { type: 'طلب', name: 'طلب بيع #ORD-2024-0015', id: 'ORD-0015', link: 'sales.html?id=15' }
    ];
    
    // عرض نتائج البحث
    showSearchResults(searchResults);
}

// عرض نتائج البحث
function showSearchResults(results) {
    // إنصراف قائمة النتائج
    let resultsContainer = document.querySelector('.search-results');
    
    if (!resultsContainer) {
        resultsContainer = document.createElement('div');
        resultsContainer.className = 'search-results';
        resultsContainer.style.cssText = `
            position: absolute;
            top: 100%;
            right: 0;
            width: 300px;
            background: white;
            border-radius: 8px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            z-index: 1000;
            display: none;
        `;
        
        document.querySelector('.search-box').appendChild(resultsContainer);
    }
    
    if (results.length === 0) {
        resultsContainer.innerHTML = '<div class="no-results">لا توجد نتائج</div>';
    } else {
        let html = `
            <div class="search-results-header">
                <h4>نتائج البحث</h4>
            </div>
            <div class="search-results-list">
        `;
        
        results.forEach(result => {
            html += `
                <a href="${result.link}" class="search-result-item">
                    <div class="result-type">${result.type}</div>
                    <div class="result-content">
                        <div class="result-name">${result.name}</div>
                        <div class="result-id">${result.id}</div>
                    </div>
                </a>
            `;
        });
        
        html += '</div>';
        resultsContainer.innerHTML = html;
    }
    
    resultsContainer.style.display = 'block';
    
    // إغلاق النتائج عند النقر خارجها
    setTimeout(() => {
        document.addEventListener('click', function closeResults(e) {
            if (!e.target.closest('.search-box')) {
                resultsContainer.style.display = 'none';
                document.removeEventListener('click', closeResults);
            }
        });
    }, 100);
}

// تهيئة الإجراءات السريعة
function initQuickActions() {
    const quickActionsBtn = document.querySelector('.quick-actions-btn');
    const quickActionsMenu = document.querySelector('.quick-actions-menu');
    
    if (quickActionsBtn && quickActionsMenu) {
        quickActionsBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            quickActionsMenu.style.display = 
                quickActionsMenu.style.display === 'block' ? 'none' : 'block';
        });
        
        // إغلاق القائمة عند النقر خارجها
        document.addEventListener('click', function() {
            quickActionsMenu.style.display = 'none';
        });
    }
}

// تحديث الإحصائيات
function updateStats() {
    // في التطبيق الحقيقي، هنا ستكون استدعاء API
    setTimeout(() => {
        // محاكاة بيانات الإحصائيات
        const dailySales = Math.floor(Math.random() * 50000) + 20000;
        const lowStock = Math.floor(Math.random() * 10) + 1;
        
        document.getElementById('dailySales').textContent = utils.formatNumber(dailySales);
        document.getElementById('lowStock').textContent = lowStock;
    }, 1000);
}

// تهيئة المخططات
function initCharts() {
    // مخطط المبيعات الشهرية
    const salesChartCanvas = document.getElementById('salesChart');
    if (salesChartCanvas) {
        const ctx = salesChartCanvas.getContext('2d');
        const salesChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو'],
                datasets: [{
                    label: 'المبيعات',
                    data: [1200000, 1900000, 1500000, 1800000, 2200000, 2450000],
                    borderColor: '#3498db',
                    backgroundColor: 'rgba(52, 152, 219, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
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
        
        // إضافة فلتر للمخطط
        const salesFilter = salesChartCanvas.closest('.chart-card').querySelector('.chart-filter');
        if (salesFilter) {
            salesFilter.addEventListener('change', function() {
                // في التطبيق الحقيقي، هنا ستكون استدعاء API لجلب بيانات مختلفة
                console.log('تغيير الفلتر إلى:', this.value);
            });
        }
    }
    
    // مخطط توزيع المنتجات
    const productChartCanvas = document.getElementById('productDistributionChart');
    if (productChartCanvas) {
        const ctx = productChartCanvas.getContext('2d');
        const productChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['سيارات', 'اكسسوارات', 'خدمات', 'قطع غيار'],
                datasets: [{
                    data: [65, 15, 10, 10],
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
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        rtl: true,
                        labels: {
                            font: {
                                family: 'Cairo'
                            }
                        }
                    }
                }
            }
        });
    }
    
    // مخطط التدفق النقدي
    const cashFlowChartCanvas = document.getElementById('cashFlowChart');
    if (cashFlowChartCanvas) {
        const ctx = cashFlowChartCanvas.getContext('2d');
        const cashFlowChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['الأسبوع 1', 'الأسبوع 2', 'الأسبوع 3', 'الأسبوع 4'],
                datasets: [
                    {
                        label: 'الإيرادات',
                        data: [800000, 950000, 1100000, 1200000],
                        backgroundColor: '#2ecc71',
                        borderColor: '#2ecc71',
                        borderWidth: 1
                    },
                    {
                        label: 'المصاريف',
                        data: [600000, 700000, 850000, 900000],
                        backgroundColor: '#e74c3c',
                        borderColor: '#e74c3c',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        rtl: true,
                        labels: {
                            font: {
                                family: 'Cairo'
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return utils.formatNumber(value / 1000) + ' ألف';
                            }
                        }
                    }
                }
            }
        });
    }
    
    // مخطط أفضل العملاء
    const customersChartCanvas = document.getElementById('topCustomersChart');
    if (customersChartCanvas) {
        const ctx = customersChartCanvas.getContext('2d');
        const customersChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['محمد أحمد', 'شركة النجاح', 'عبدالله سعيد', 'فهد خالد', 'أحمد محمد'],
                datasets: [{
                    label: 'قيمة المشتريات',
                    data: [450000, 320000, 280000, 220000, 180000],
                    backgroundColor: '#9b59b6',
                    borderColor: '#9b59b6',
                    borderWidth: 1
                }]
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    x: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return utils.formatNumber(value / 1000) + ' ألف';
                            }
                        }
                    }
                }
            }
        });
    }
}

// تهيئة التقويم
function initCalendar() {
    const calendarGrid = document.getElementById('calendarGrid');
    if (!calendarGrid) return;
    
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    
    // أسماء الأيام
    const daysOfWeek = ['أحد', 'اثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت'];
    
    // أسماء الشهور
    const months = [
        'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
        'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
    ];
    
    // عرض أسماء الأيام
    daysOfWeek.forEach(day => {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        dayElement.textContent = day;
        calendarGrid.appendChild(dayElement);
    });
    
    // الحصول على أول يوم في الشهر
    const firstDay = new Date(currentYear, currentMonth, 1);
    const startingDay = firstDay.getDay(); // 0 = الأحد
    
    // الحصول على عدد الأيام في الشهر
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    
    // تعبئة الأيام الفارغة قبل بداية الشهر
    for (let i = 0; i < startingDay; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'calendar-date';
        calendarGrid.appendChild(emptyDay);
    }
    
    // تعبئة أيام الشهر
    for (let day = 1; day <= daysInMonth; day++) {
        const dateElement = document.createElement('div');
        dateElement.className = 'calendar-date';
        dateElement.textContent = day;
        
        // تمييز اليوم الحالي
        if (day === now.getDate() && currentMonth === now.getMonth() && currentYear === now.getFullYear()) {
            dateElement.classList.add('today');
        }
        
        // تمييز الأيام التي بها فعاليات
        const events = [15, 18, 20, 25];
        if (events.includes(day)) {
            dateElement.classList.add('event');
            dateElement.title = 'هناك فعاليات في هذا اليوم';
        }
        
        calendarGrid.appendChild(dateElement);
    }
    
    // تحديث اسم الشهر الحالي
    const currentMonthElement = document.querySelector('.current-month');
    if (currentMonthElement) {
        currentMonthElement.textContent = `${months[currentMonth]} ${currentYear}`;
    }
    
    // إضافة أحداث التنقل
    const prevBtn = document.querySelector('.nav-btn.prev');
    const nextBtn = document.querySelector('.nav-btn.next');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            // التنقل للشهر السابق
            console.log('الشهر السابق');
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            // التنقل للشهر التالي
            console.log('الشهر التالي');
        });
    }
}

// تهيئة أحداث لوحة التحكم
function initDashboardEvents() {
    // تسجيل الخروج
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            if (confirm('هل أنت متأكد من تسجيل الخروج؟')) {
                logout();
            }
        });
    }
    
    // تحديث البيانات
    const refreshBtn = document.querySelector('.refresh-btn');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', function() {
            updateDashboardData();
        });
    }
    
    // تحديث الإحصائيات عند تغيير الفترة
    const periodSelect = document.querySelector('.period-select');
    if (periodSelect) {
        periodSelect.addEventListener('change', function() {
            updateStatsByPeriod(this.value);
        });
    }
    
    // إضافة مستمعات الأحداث للجداول
    initTableEvents();
}

// تحديث بيانات لوحة التحكم
function updateDashboardData() {
    // إظهار حالة التحميل
    showLoading(true);
    
    // محاكاة تحديث البيانات
    setTimeout(() => {
        // تحديث الإحصائيات
        updateStats();
        
        // إعادة رسم المخططات
        initCharts();
        
        // إظهار إشعار النجاح
        showNotification('تم تحديث البيانات بنجاح', 'success');
        
        // إخفاء حالة التحميل
        showLoading(false);
    }, 1500);
}

// تحديث الإحصائيات حسب الفترة
function updateStatsByPeriod(period) {
    // في التطبيق الحقيقي، هنا ستكون استدعاء API
    console.log('تحديث الإحصائيات للفترة:', period);
    
    // محاكاة بيانات مختلفة حسب الفترة
    const periodStats = {
        today: { dailySales: 25430, lowStock: 3 },
        week: { dailySales: 178210, lowStock: 5 },
        month: { dailySales: 2450000, lowStock: 12 }
    };
    
    const stats = periodStats[period] || periodStats.today;
    
    document.getElementById('dailySales').textContent = utils.formatNumber(stats.dailySales);
    document.getElementById('lowStock').textContent = stats.lowStock;
}

// تهيئة أحداث الجداول
function initTableEvents() {
    // أزرار العرض في جدول الطلبات
    const viewButtons = document.querySelectorAll('.action-btn.view');
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const orderId = this.closest('tr').querySelector('td:first-child').textContent;
            viewOrderDetails(orderId);
        });
    });
    
    // أزرار الطباعة
    const printButtons = document.querySelectorAll('.action-btn.print');
    printButtons.forEach(button => {
        button.addEventListener('click', function() {
            const orderId = this.closest('tr').querySelector('td:first-child').textContent;
            printOrder(orderId);
        });
    });
    
    // أزرار طلب الشراء
    const orderButtons = document.querySelectorAll('.action-btn.order');
    orderButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productName = this.closest('tr').querySelector('td:first-child').textContent;
            createPurchaseOrder(productName);
        });
    });
}

// عرض تفاصيل الطلب
function viewOrderDetails(orderId) {
    // في التطبيق الحقيقي، هنا ستكون استدعاء API
    console.log('عرض تفاصيل الطلب:', orderId);
    
    // توجيه إلى صفحة تفاصيل الطلب
    window.location.href = `order-details.html?id=${orderId.replace('#', '')}`;
}

// طباعة الطلب
function printOrder(orderId) {
    // في التطبيق الحقيقي، هنا ستكون استدعاء API لطباعة الفاتورة
    console.log('طباعة الطلب:', orderId);
    
    showNotification(`جاري طباعة فاتورة ${orderId}`, 'info');
}

// إنشاء طلب شراء
function createPurchaseOrder(productName) {
    // في التطبيق الحقيقي، هنا ستكون فتح نموذج طلب شراء
    console.log('إنشاء طلب شراء لـ:', productName);
    
    showNotification(`فتح نموذج طلب شراء لـ ${productName}`, 'info');
    
    // في التطبيق الكامل، هنا ستكون توجيه إلى صفحة إنشاء طلب شراء
    // window.location.href = `new-purchase.html?product=${encodeURIComponent(productName)}`;
}

// إظهار إشعار
function showNotification(message, type = 'info') {
    utils.showNotification(message, type);
}

// إظهار/إخفاء حالة التحميل
function showLoading(show) {
    const loadingElement = document.querySelector('.loading-overlay');
    
    if (show) {
        if (!loadingElement) {
            const overlay = document.createElement('div');
            overlay.className = 'loading-overlay';
            overlay.style.cssText = `
                position: fixed;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
                background: rgba(255, 255, 255, 0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 9999;
            `;
            
            overlay.innerHTML = `
                <div class="loading-spinner">
                    <div class="spinner-border text-primary" role="status" style="width: 3rem; height: 3rem;">
                        <span class="visually-hidden">جاري التحميل...</span>
                    </div>
                    <p style="margin-top: 1rem; font-weight: 500;">جاري تحديث البيانات...</p>
                </div>
            `;
            
            document.body.appendChild(overlay);
        }
    } else {
        if (loadingElement) {
            loadingElement.remove();
        }
    }
}

// التحقق من حالة المصادقة
function checkAuthStatus() {
    const user = localStorage.getItem('user');
    if (!user) return false;
    
    try {
        const userData = JSON.parse(user);
        return userData.loggedIn === true;
    } catch (error) {
        return false;
    }
}

// تسجيل الخروج
function logout() {
    localStorage.removeItem('user');
    showNotification('تم تسجيل الخروج بنجاح', 'success');
    
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 1000);
}

// فتح نموذج البيع السريع
function openQuickSaleModal() {
    const modal = document.getElementById('quickSaleModal');
    if (modal) {
        modal.style.display = 'flex';
    }
}

// إغلاق نموذج البيع السريع
function closeQuickSaleModal() {
    const modal = document.getElementById('quickSaleModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// تصدير الوظائف للاستخدام
window.dashboard = {
    initDashboard,
    loadUserData,
    updateDashboardData,
    openQuickSaleModal,
    closeQuickSaleModal
};