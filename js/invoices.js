// js/invoices.js

document.addEventListener('DOMContentLoaded', function() {
    if (!checkAuthStatus()) {
        window.location.href = 'login.html';
        return;
    }
    initInvoicesPage();
});

function initInvoicesPage() {
    updateDate();
    initSidebar();
    initInvoicesTabs();
    loadInvoicesData();
}

function updateDate() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const el = document.getElementById('currentDate');
    if (el) el.textContent = now.toLocaleDateString('ar-SA', options);
}

function initInvoicesTabs() {
    const tabs = document.querySelectorAll('.tab-btn');
    const panes = document.querySelectorAll('.tab-pane');
    tabs.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            tabs.forEach(b => b.classList.remove('active'));
            panes.forEach(p => p.classList.remove('active'));
            this.classList.add('active');
            document.getElementById(tabId + '-tab').classList.add('active');
            if (tabId === 'sales') loadSalesInvoices();
            else if (tabId === 'purchases') loadPurchaseInvoices();
            else if (tabId === 'drafts') loadDraftInvoices();
        });
    });
}

function loadInvoicesData() {
    loadSalesInvoices();
    loadPurchaseInvoices();
    loadDraftInvoices();
    updateInvoiceSummary();
}

function loadSalesInvoices() {
    const data = [
        { number: 'INV-2024-001', date: '2024-01-15', customer: 'شركة الأصيل', amount: 120000, paid: 120000, dueDate: '2024-02-14', status: 'paid' },
        { number: 'INV-2024-002', date: '2024-01-14', customer: 'محمد أحمد', amount: 8500, paid: 5000, dueDate: '2024-02-13', status: 'partial' },
        { number: 'INV-2024-003', date: '2024-01-13', customer: 'مؤسسة السلام', amount: 35000, paid: 0, dueDate: '2024-02-12', status: 'unpaid' },
        { number: 'INV-2024-004', date: '2024-01-12', customer: 'عبدالله السبيعي', amount: 22000, paid: 22000, dueDate: '2024-02-11', status: 'paid' },
    ];
    renderInvoicesTable('salesTable', data);
}

function loadPurchaseInvoices() {
    const data = [
        { number: 'PUR-2024-001', date: '2024-01-15', supplier: 'شركة السيارات المتحدة', amount: 250000, paid: 250000, dueDate: '2024-02-14', status: 'paid' },
        { number: 'PUR-2024-002', date: '2024-01-14', supplier: 'معرض السيارات الفاخرة', amount: 320000, paid: 200000, dueDate: '2024-02-13', status: 'partial' },
    ];
    renderInvoicesTable('purchasesTable', data);
}

function renderInvoicesTable(tableId, data) {
    const tbody = document.querySelector(`#${tableId} tbody`);
    if (!tbody) return;
    tbody.innerHTML = '';
    data.forEach(inv => {
        const row = document.createElement('tr');
        const remaining = inv.amount - inv.paid;
        row.innerHTML = `
            <td><a href="#" onclick="viewInvoice('${inv.number}')">${inv.number}</a></td>
            <td>${inv.date}</td>
            <td>${inv.customer || inv.supplier}</td>
            <td class="debit-amount">${utils.formatCurrency(inv.amount)}</td>
            <td class="debit-amount">${utils.formatCurrency(inv.paid)}</td>
            <td class="${remaining > 0 ? 'credit-amount' : ''}">${utils.formatCurrency(remaining)}</td>
            <td>${inv.dueDate}</td>
            <td><span class="invoice-badge badge-${inv.status}">${getInvoiceStatusText(inv.status)}</span></td>
            <td>
                <button class="action-btn view" onclick="viewInvoice('${inv.number}')"><i class="fas fa-eye"></i></button>
                <button class="action-btn edit" onclick="editInvoice('${inv.number}')"><i class="fas fa-edit"></i></button>
                <button class="action-btn delete" onclick="deleteInvoice('${inv.number}')"><i class="fas fa-trash"></i></button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function getInvoiceStatusText(status) {
    const map = { paid: 'مدفوعة', unpaid: 'غير مدفوعة', partial: 'مدفوعة جزئياً', draft: 'مسودة' };
    return map[status] || status;
}

function loadDraftInvoices() {
    const data = [
        { number: 'DRF-001', created: '2024-01-15', type: 'مبيعات', party: 'شركة الأصيل', amount: 95000, modified: '2024-01-15' },
        { number: 'DRF-002', created: '2024-01-14', type: 'مشتريات', party: 'مورد قطع غيار', amount: 15000, modified: '2024-01-14' }
    ];
    const tbody = document.querySelector('#draftsTable tbody');
    if (tbody) {
        tbody.innerHTML = '';
        data.forEach(d => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${d.number}</td>
                <td>${d.created}</td>
                <td>${d.type}</td>
                <td>${d.party}</td>
                <td>${utils.formatCurrency(d.amount)}</td>
                <td>${d.modified}</td>
                <td>
                    <button class="action-btn edit" onclick="editDraft('${d.number}')"><i class="fas fa-edit"></i></button>
                    <button class="action-btn delete" onclick="deleteDraft('${d.number}')"><i class="fas fa-trash"></i></button>
                </td>
            `;
            tbody.appendChild(row);
        });
    }
}

function updateInvoiceSummary() {
    document.getElementById('totalInvoices').textContent = '48';
    document.getElementById('paidInvoices').textContent = '32';
    document.getElementById('unpaidInvoices').textContent = '12';
    document.getElementById('draftInvoices').textContent = '4';
}

function openNewInvoice() {
    const modal = document.getElementById('invoiceModal');
    const body = modal.querySelector('.modal-body');
    body.innerHTML = `
        <form id="invoiceForm" onsubmit="saveInvoice(event)">
            <div class="row">
                <div class="col-md-4">
                    <div class="form-group">
                        <label>نوع الفاتورة</label>
                        <select class="form-control" id="invoiceType" required>
                            <option value="sales">مبيعات</option>
                            <option value="purchases">مشتريات</option>
                        </select>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label>التاريخ</label>
                        <input type="date" class="form-control" id="invoiceDate" required value="${new Date().toISOString().split('T')[0]}">
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label>تاريخ الاستحقاق</label>
                        <input type="date" class="form-control" id="dueDate" required>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <div class="form-group">
                        <label>العميل/المورد</label>
                        <input type="text" class="form-control" id="party" required>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label>رقم الفاتورة</label>
                        <input type="text" class="form-control" id="invoiceNumber" value="INV-${Date.now().toString().slice(-6)}" readonly>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <label>بنود الفاتورة</label>
                <table class="table table-bordered" id="itemsTable">
                    <thead>
                        <tr>
                            <th>الوصف</th>
                            <th>الكمية</th>
                            <th>السعر</th>
                            <th>الإجمالي</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><input type="text" class="form-control" name="desc[]" placeholder="الوصف"></td>
                            <td><input type="number" class="form-control item-qty" name="qty[]" value="1" min="1"></td>
                            <td><input type="number" class="form-control item-price" name="price[]" value="0" min="0" step="0.01"></td>
                            <td class="item-total">0.00</td>
                            <td><button type="button" class="btn btn-danger btn-sm" onclick="removeItem(this)"><i class="fas fa-times"></i></button></td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colspan="3" class="text-end">الإجمالي</td>
                            <td id="invoiceTotal">0.00</td>
                            <td></td>
                        </tr>
                    </tfoot>
                </table>
                <button type="button" class="btn btn-outline btn-sm" onclick="addItem()">+ إضافة بند</button>
            </div>
            <div class="form-group">
                <label>ملاحظات</label>
                <textarea class="form-control" rows="3"></textarea>
            </div>
            <div class="form-actions">
                <button type="button" class="btn btn-outline" onclick="closeInvoiceModal()">إلغاء</button>
                <button type="submit" class="btn btn-primary">حفظ الفاتورة</button>
            </div>
        </form>
    `;
    modal.style.display = 'flex';
    // إضافة مستمعين لحساب الإجمالي
    attachItemEvents();
}

function closeInvoiceModal() {
    document.getElementById('invoiceModal').style.display = 'none';
}

function saveInvoice(e) {
    e.preventDefault();
    utils.showNotification('تم حفظ الفاتورة بنجاح', 'success');
    closeInvoiceModal();
    loadInvoicesData();
}

function addItem() {
    const tbody = document.querySelector('#itemsTable tbody');
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td><input type="text" class="form-control" name="desc[]" placeholder="الوصف"></td>
        <td><input type="number" class="form-control item-qty" name="qty[]" value="1" min="1"></td>
        <td><input type="number" class="form-control item-price" name="price[]" value="0" min="0" step="0.01"></td>
        <td class="item-total">0.00</td>
        <td><button type="button" class="btn btn-danger btn-sm" onclick="removeItem(this)"><i class="fas fa-times"></i></button></td>
    `;
    tbody.appendChild(newRow);
    attachItemEvents();
}

function removeItem(btn) {
    const row = btn.closest('tr');
    if (document.querySelectorAll('#itemsTable tbody tr').length > 1) {
        row.remove();
        calculateInvoiceTotal();
    } else {
        utils.showNotification('يجب وجود بند واحد على الأقل', 'warning');
    }
}

function attachItemEvents() {
    document.querySelectorAll('.item-qty, .item-price').forEach(input => {
        input.removeEventListener('input', calculateItemTotal);
        input.addEventListener('input', calculateItemTotal);
    });
}

function calculateItemTotal(e) {
    const row = e.target.closest('tr');
    const qty = parseFloat(row.querySelector('.item-qty').value) || 0;
    const price = parseFloat(row.querySelector('.item-price').value) || 0;
    const total = qty * price;
    row.querySelector('.item-total').textContent = utils.formatCurrency(total);
    calculateInvoiceTotal();
}

function calculateInvoiceTotal() {
    let total = 0;
    document.querySelectorAll('.item-total').forEach(td => {
        const val = parseFloat(td.textContent.replace(/[^0-9.-]+/g, '')) || 0;
        total += val;
    });
    document.getElementById('invoiceTotal').textContent = utils.formatCurrency(total);
}

function viewInvoice(num) { utils.showNotification(`عرض الفاتورة: ${num}`, 'info'); }
function editInvoice(num) { utils.showNotification(`تحرير الفاتورة: ${num}`, 'info'); }
function deleteInvoice(num) { if (confirm('حذف الفاتورة؟')) utils.showNotification('تم الحذف', 'success'); loadInvoicesData(); }
function editDraft(num) { console.log('edit draft', num); }
function deleteDraft(num) { console.log('delete draft', num); }
function filterSales() { utils.showNotification('تم تطبيق الفلتر', 'info'); }
function filterPurchases() { utils.showNotification('تم تطبيق الفلتر', 'info'); }

// إعدادات الفواتير
document.getElementById('invoiceNumberingForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    utils.showNotification('تم حفظ إعدادات الترقيم', 'success');
});
document.getElementById('invoiceTermsForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    utils.showNotification('تم حفظ الشروط', 'success');
});