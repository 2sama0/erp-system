// js/payments.js

document.addEventListener('DOMContentLoaded', function() {
    if (!checkAuthStatus()) {
        window.location.href = 'login.html';
        return;
    }
    initPaymentsPage();
});

function initPaymentsPage() {
    updateDate();
    initSidebar();
    initPaymentsTabs();
    loadPaymentsData();
    initPaymentSearch();
    initPaymentMethodForm();
}

function updateDate() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const el = document.getElementById('currentDate');
    if (el) el.textContent = now.toLocaleDateString('ar-SA', options);
}

function initPaymentsTabs() {
    const tabs = document.querySelectorAll('.tab-btn');
    const panes = document.querySelectorAll('.tab-pane');
    tabs.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            tabs.forEach(b => b.classList.remove('active'));
            panes.forEach(p => p.classList.remove('active'));
            this.classList.add('active');
            document.getElementById(tabId + '-tab').classList.add('active');
            
            // تحميل بيانات التبويب عند التبديل
            if (tabId === 'incoming') loadIncomingPayments();
            else if (tabId === 'outgoing') loadOutgoingPayments();
            else if (tabId === 'methods') loadPaymentMethods();
            else if (tabId === 'reconciliation') loadReconciliationList();
        });
    });
}

function loadPaymentsData() {
    loadIncomingPayments();
    loadOutgoingPayments();
    loadPaymentMethods();
    loadReconciliationList();
    updateSummaryCards();
}

// بيانات تجريبية للدفعات الواردة
function loadIncomingPayments() {
    const data = [
        { date: '2024-01-15', ref: 'PAY-001', customer: 'شركة الأصيل', desc: 'دفعة مقدمة لشراء سيارة', amount: 50000, method: 'bank', status: 'completed' },
        { date: '2024-01-14', ref: 'PAY-002', customer: 'محمد أحمد', desc: 'قسط شهري', amount: 2500, method: 'cash', status: 'completed' },
        { date: '2024-01-13', ref: 'PAY-003', customer: 'مؤسسة السلام', desc: 'تسديد فاتورة', amount: 18750, method: 'card', status: 'pending' },
        { date: '2024-01-12', ref: 'PAY-004', customer: 'عبدالله السبيعي', desc: 'دفعة نقدية', amount: 8000, method: 'cash', status: 'completed' },
        { date: '2024-01-11', ref: 'PAY-005', customer: 'شركة الخليج', desc: 'تحويل بنكي', amount: 22000, method: 'bank', status: 'completed' }
    ];
    renderIncomingTable(data);
    document.getElementById('incomingTotal').textContent = utils.formatCurrency(data.reduce((acc, d) => acc + d.amount, 0));
}

function renderIncomingTable(data) {
    const tbody = document.querySelector('#incomingTable tbody');
    if (!tbody) return;
    tbody.innerHTML = '';
    data.forEach(p => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${p.date}</td>
            <td><a href="#" onclick="viewPayment('${p.ref}')">${p.ref}</a></td>
            <td>${p.customer}</td>
            <td>${p.desc}</td>
            <td class="debit-amount">${utils.formatCurrency(p.amount)}</td>
            <td><span class="payment-method-badge method-${p.method}">${getMethodName(p.method)}</span></td>
            <td><span class="status-badge status-${p.status}">${getStatusName(p.status)}</span></td>
            <td>
                <button class="action-btn view" onclick="viewPayment('${p.ref}')"><i class="fas fa-eye"></i></button>
                <button class="action-btn edit" onclick="editPayment('${p.ref}')"><i class="fas fa-edit"></i></button>
                <button class="action-btn delete" onclick="deletePayment('${p.ref}')"><i class="fas fa-trash"></i></button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function getMethodName(m) {
    const methods = { cash: 'نقدي', card: 'بطاقة', bank: 'تحويل بنكي', cheque: 'شيك' };
    return methods[m] || m;
}

function getStatusName(s) {
    const status = { completed: 'مكتملة', pending: 'معلقة', failed: 'فاشلة' };
    return status[s] || s;
}

function loadOutgoingPayments() {
    const data = [
        { date: '2024-01-15', ref: 'PAY-OUT-001', payee: 'معرض السيارات', desc: 'شراء سيارة', amount: 120000, method: 'bank', status: 'completed' },
        { date: '2024-01-14', ref: 'PAY-OUT-002', payee: 'مؤسسة الكهرباء', desc: 'فاتورة كهرباء', amount: 5400, method: 'bank', status: 'completed' },
        { date: '2024-01-10', ref: 'PAY-OUT-003', payee: 'موظفين', desc: 'رواتب شهر يناير', amount: 45000, method: 'bank', status: 'pending' },
        { date: '2024-01-08', ref: 'PAY-OUT-004', payee: 'شركة نظافة', desc: 'خدمات نظافة', amount: 2000, method: 'cash', status: 'completed' }
    ];
    renderOutgoingTable(data);
    document.getElementById('outgoingTotal').textContent = utils.formatCurrency(data.reduce((acc, d) => acc + d.amount, 0));
}

function renderOutgoingTable(data) {
    const tbody = document.querySelector('#outgoingTable tbody');
    if (!tbody) return;
    tbody.innerHTML = '';
    data.forEach(p => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${p.date}</td>
            <td><a href="#" onclick="viewPayment('${p.ref}')">${p.ref}</a></td>
            <td>${p.payee}</td>
            <td>${p.desc}</td>
            <td class="credit-amount">${utils.formatCurrency(p.amount)}</td>
            <td><span class="payment-method-badge method-${p.method}">${getMethodName(p.method)}</span></td>
            <td><span class="status-badge status-${p.status}">${getStatusName(p.status)}</span></td>
            <td>
                <button class="action-btn view" onclick="viewPayment('${p.ref}')"><i class="fas fa-eye"></i></button>
                <button class="action-btn edit" onclick="editPayment('${p.ref}')"><i class="fas fa-edit"></i></button>
                <button class="action-btn delete" onclick="deletePayment('${p.ref}')"><i class="fas fa-trash"></i></button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function loadPaymentMethods() {
    const data = [
        { code: 'CASH', name: 'نقدي', desc: 'الدفع النقدي', account: '101 - النقدية' },
        { code: 'CARD', name: 'بطاقة ائتمان', desc: 'مدى / فيزا', account: '102 - البنك الأهلي' },
        { code: 'BANK', name: 'تحويل بنكي', desc: 'حوالة بنكية', account: '103 - البنك الراجحي' },
        { code: 'CHEQUE', name: 'شيك', desc: 'شيك مصرفي', account: '102 - البنك الأهلي' }
    ];
    const tbody = document.querySelector('#methodsTable tbody');
    if (tbody) {
        tbody.innerHTML = '';
        data.forEach(m => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${m.code}</td>
                <td>${m.name}</td>
                <td>${m.desc}</td>
                <td>${m.account}</td>
                <td>
                    <button class="action-btn edit" onclick="editMethod('${m.code}')"><i class="fas fa-edit"></i></button>
                    <button class="action-btn delete" onclick="deleteMethod('${m.code}')"><i class="fas fa-trash"></i></button>
                </td>
            `;
            tbody.appendChild(row);
        });
    }
}

function loadReconciliationList() {
    const data = [
        { date: '2024-01-15', ref: 'REC-001', desc: 'تسوية دفعات يوم 15 يناير', amount: 12500, status: 'completed' },
        { date: '2024-01-14', ref: 'REC-002', desc: 'تسوية بنكية', amount: 8700, status: 'pending' }
    ];
    const tbody = document.querySelector('#reconciliationTable tbody');
    if (tbody) {
        tbody.innerHTML = '';
        data.forEach(r => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${r.date}</td>
                <td>${r.ref}</td>
                <td>${r.desc}</td>
                <td>${utils.formatCurrency(r.amount)}</td>
                <td><span class="status-badge status-${r.status}">${getStatusName(r.status)}</span></td>
                <td>
                    <button class="action-btn view" onclick="viewReconciliation('${r.ref}')"><i class="fas fa-eye"></i></button>
                    <button class="action-btn edit" onclick="editReconciliation('${r.ref}')"><i class="fas fa-edit"></i></button>
                </td>
            `;
            tbody.appendChild(row);
        });
    }
}

function updateSummaryCards() {
    document.getElementById('totalToday').textContent = '45,000 ر.س';
    document.getElementById('totalIncoming').textContent = '32,500 ر.س';
    document.getElementById('totalOutgoing').textContent = '12,500 ر.س';
    document.getElementById('totalPending').textContent = '3';
}

function initPaymentSearch() {
    document.getElementById('incomingSearch')?.addEventListener('input', function(e) {
        console.log('بحث في الواردة:', e.target.value);
    });
    document.getElementById('outgoingSearch')?.addEventListener('input', function(e) {
        console.log('بحث في الصادرة:', e.target.value);
    });
}

function initPaymentMethodForm() {
    document.getElementById('paymentMethodForm')?.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('methodName').value;
        utils.showNotification(`تم إضافة طريقة الدفع: ${name}`, 'success');
        this.reset();
        loadPaymentMethods();
    });
}

function openNewPayment() {
    const modal = document.getElementById('paymentModal');
    const body = modal.querySelector('.modal-body');
    body.innerHTML = `
        <form id="paymentForm" onsubmit="savePayment(event)">
            <div class="row">
                <div class="col-md-6">
                    <div class="form-group">
                        <label>نوع الدفعة <span class="required">*</span></label>
                        <select class="form-control" id="paymentType" required>
                            <option value="">اختر النوع</option>
                            <option value="incoming">وارد</option>
                            <option value="outgoing">صادر</option>
                        </select>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label>التاريخ <span class="required">*</span></label>
                        <input type="date" class="form-control" id="paymentDate" required value="${new Date().toISOString().split('T')[0]}">
                    </div>
                </div>
            </div>
            <div class="form-group">
                <label>الطرف (عميل/مورد) <span class="required">*</span></label>
                <input type="text" class="form-control" id="paymentParty" required>
            </div>
            <div class="form-group">
                <label>البيان <span class="required">*</span></label>
                <textarea class="form-control" id="paymentDesc" required rows="2"></textarea>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <div class="form-group">
                        <label>المبلغ <span class="required">*</span></label>
                        <input type="number" class="form-control" id="paymentAmount" required min="0" step="0.01">
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label>طريقة الدفع <span class="required">*</span></label>
                        <select class="form-control" id="paymentMethod" required>
                            <option value="cash">نقدي</option>
                            <option value="card">بطاقة</option>
                            <option value="bank">تحويل بنكي</option>
                            <option value="cheque">شيك</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="form-actions">
                <button type="button" class="btn btn-outline" onclick="closePaymentModal()">إلغاء</button>
                <button type="submit" class="btn btn-primary">حفظ الدفعة</button>
            </div>
        </form>
    `;
    modal.style.display = 'flex';
}

function closePaymentModal() {
    document.getElementById('paymentModal').style.display = 'none';
}

function savePayment(e) {
    e.preventDefault();
    utils.showNotification('تم حفظ الدفعة بنجاح', 'success');
    closePaymentModal();
    loadIncomingPayments();
    loadOutgoingPayments();
    updateSummaryCards();
}

function viewPayment(ref) {
    utils.showNotification(`عرض الدفعة: ${ref}`, 'info');
}

function editPayment(ref) {
    utils.showNotification(`تحرير الدفعة: ${ref}`, 'info');
}

function deletePayment(ref) {
    if (confirm('هل أنت متأكد من حذف هذه الدفعة؟')) {
        utils.showNotification(`تم حذف الدفعة ${ref}`, 'success');
        loadIncomingPayments();
        loadOutgoingPayments();
        updateSummaryCards();
    }
}

function filterIncoming() {
    utils.showNotification('تم تطبيق الفلتر', 'info');
}

function filterOutgoing() {
    utils.showNotification('تم تطبيق الفلتر', 'info');
}

function exportIncoming() {
    utils.showNotification('جاري تصدير البيانات...', 'info');
}

function startReconciliation() {
    utils.showNotification('بدء تسوية جديدة', 'info');
}

function viewReconciliation(ref) { console.log('view', ref); }
function editReconciliation(ref) { console.log('edit', ref); }
function editMethod(code) { console.log('edit method', code); }
function deleteMethod(code) { console.log('delete method', code); }