// Check Role on Page Load & Apply View
document.addEventListener('DOMContentLoaded', () => {
  const userRole = localStorage.getItem('userRole');

  // Agar user security guard hai, toh use turant visitors page par bhej do
  if (userRole === 'security') {
    window.location.href = 'visitors.html';
    return;
  }

  // Agar user resident hai, tabhi resident view apply hoga.
  if (userRole === 'resident') {
    applyResidentView();
  }
  
  // Load saved society name if available
  const savedName = localStorage.getItem('societyName');
  if (savedName) {
    document.querySelectorAll('.societyNameText').forEach(el => {
      el.textContent = savedName;
    });
  }
  
  attachReceiptListeners();
});

// Resident View Transformation Function
function applyResidentView() {
  // 1. Subtitle change karein
  const brandSub = document.querySelector('.brand-info p');
  if (brandSub) brandSub.innerText = 'Resident View (Flat 101)';

  // 2. Pehla stat card "TOTAL FLATS" ko "MY MAINTENANCE" mein badlein
  const firstStatCard = document.querySelector('.stats-grid .stat-card');
  if (firstStatCard) {
    firstStatCard.innerHTML = `
      <div>
        <div class="stat-title">MY MAINTENANCE</div>
        <div class="stat-value" style="font-size: 18px; color: #059669;">PAID (₹2,000)</div>
        <div class="stat-subtext" style="color: #64748b;">Current Month Status</div>
      </div>
      <div class="stat-icon-bg" style="background-color: #dcfce7; color: #10b981;">
        <i class="fa-solid fa-circle-check"></i>
      </div>
    `;
  }

  // 3. Action buttons ko Resident wale buttons se replace karein (Report Complaint opens Helpdesk)
  const leftActions = document.querySelector('.left-actions');
  if (leftActions) {
    leftActions.innerHTML = `
      <button class="btn-red-action" style="background: #e11d48;" onclick="openExpenseModal()">- Add Expense</button>
      <button class="btn-green-action" style="background: #059669;" onclick="openUpiModal()">Pay Online (UPI)</button>
      <button class="btn-red-action" style="background: #dc2626;" onclick="window.location.href='helpdesk.html'">Report Complaint</button>
    `;
  }

  // 4. Resident view mein "+ Post Notice" button ko hide karein
  const postNoticeBtn = document.getElementById('postNoticeBtn');
  if (postNoticeBtn) {
    postNoticeBtn.style.display = 'none';
  }
}

// 1. Edit Society Name Modal
function openEditModal() {
  document.getElementById('editModal').classList.add('active');
  const currentName = document.querySelector('.societyNameText').innerText;
  document.getElementById('societyInput').value = currentName;
}

function closeEditModal() {
  document.getElementById('editModal').classList.remove('active');
}

function saveSocietyName() {
  const newName = document.getElementById('societyInput').value.trim();
  if (newName) {
    localStorage.setItem('societyName', newName);
    document.querySelectorAll('.societyNameText').forEach(el => {
      el.innerText = newName;
    });
    closeEditModal();
  } else {
    alert('Please enter a valid society name');
  }
}

// 2. Collect Maintenance Modal
function openMaintenanceModal() {
  document.getElementById('maintenanceModal').classList.add('active');
}

function closeMaintenanceModal() {
  document.getElementById('maintenanceModal').classList.remove('active');
}

function submitMaintenance() {
  const flat = document.getElementById('maintFlat').value;
  const amount = document.getElementById('maintAmount').value;
  const note = document.getElementById('maintMonth').value;
  
  if(!flat || !amount) {
    alert('Please fill out the flat number and amount.');
    return;
  }
  
  alert('Maintenance collected successfully for flat ' + flat);
  closeMaintenanceModal();
  document.getElementById('maintFlat').value = '';
  document.getElementById('maintAmount').value = '';
  document.getElementById('maintMonth').value = '';
}

// 3. Add Expense Modal Logic
function openExpenseModal() {
  document.getElementById('expenseModal').classList.add('active');
}

function closeExpenseModal() {
  document.getElementById('expenseModal').classList.remove('active');
}

function submitExpense() {
  const category = document.getElementById('expCategory').value;
  const desc = document.getElementById('expDesc').value;
  const amount = document.getElementById('expAmount').value;
  
  if(!desc || !amount) {
    alert('Please enter description and amount.');
    return;
  }

  // Add new row to expense table
  const tbody = document.getElementById('expenseTableBody');
  const newRow = document.createElement('tr');
  
  // Badge color mapping
  let badgeClass = 'blue';
  if (category === 'Lift Service') badgeClass = 'pink';
  if (category === 'Sweeper / Staff') badgeClass = 'yellow';

  newRow.innerHTML = `
    <td><span class="badge-cat ${badgeClass}">${category}</span></td>
    <td>${desc}</td>
    <td>06 Aug 2026</td>
    <td><a href="#" class="link-receipt"><i class="fa-solid fa-paperclip"></i> View Receipt</a></td>
    <td style="text-align: right;"><span class="amount-text">₹${Number(amount).toLocaleString('en-IN')}</span></td>
  `;
  
  tbody.insertBefore(newRow, tbody.firstChild);
  
  alert('Expense recorded successfully!');
  closeExpenseModal();
  
  // Re-bind listeners so the new row's receipt link works
  attachReceiptListeners();

  // Clear inputs
  document.getElementById('expDesc').value = '';
  document.getElementById('expAmount').value = '';
  document.getElementById('expReceipt').value = '';
}

// 4. Table Filter / Search Logic
function filterTable() {
  const input = document.getElementById('tableSearch').value.toLowerCase();
  const categoryFilter = document.getElementById('categoryFilter').value.toLowerCase();
  const rows = document.getElementById('expenseTableBody').getElementsByTagName('tr');

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const text = row.innerText.toLowerCase();
    const categoryCellText = row.cells[0].innerText.toLowerCase();

    const matchesSearch = text.includes(input);
    const matchesCategory = categoryFilter === '' || categoryCellText.includes(categoryFilter);

    if (matchesSearch && matchesCategory) {
      row.style.display = '';
    } else {
      row.style.display = 'none';
    }
  }
}

// 5. Excel CSV Export & PDF Print
function exportTableToCSV(filename) {
  let csv = [];
  const rows = document.querySelectorAll('#expenseTable tr');
  
  for (let i = 0; i < rows.length; i++) {
    let row = [], cols = rows[i].querySelectorAll('td, th');
    for (let j = 0; j < cols.length; j++) {
      row.push('"' + cols[j].innerText.replace(/"/g, '""') + '"');
    }
    csv.push(row.join(','));
  }
  
  const csvFile = new Blob([csv.join('\n')], { type: 'text/csv' });
  const downloadLink = document.createElement('a');
  downloadLink.download = filename;
  downloadLink.href = window.URL.createObjectURL(csvFile);
  downloadLink.style.display = 'none';
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
}

function printExpenseTable() {
  window.print();
}

// 6. Expense Voucher Modal Script Logic
function openVoucherModal(category, desc, date, amount) {
  document.getElementById('vouchCategory').innerText = category;
  document.getElementById('vouchDesc').innerText = desc;
  document.getElementById('vouchDate').innerText = date;
  document.getElementById('vouchAmount').innerText = amount;
  
  document.getElementById('voucherModal').classList.add('active');
}

function closeVoucherModal() {
  document.getElementById('voucherModal').classList.remove('active');
}

function printVoucher() {
  const printContents = document.getElementById('printableVoucher').innerHTML;
  const originalContents = document.body.innerHTML;

  document.body.innerHTML = `<div style="padding: 40px; max-width: 500px; margin: auto; font-family: sans-serif;">${printContents}</div>`;
  window.print();
  document.body.innerHTML = originalContents;
  location.reload(); 
}

// 7. Recent System Alerts (Notification Bell Modal Logic)
function openNotifModal() {
  document.getElementById('notifModal').classList.add('active');
}

function closeNotifModal() {
  document.getElementById('notifModal').classList.remove('active');
}

// 8. UPI Payment Modal Functions
function openUpiModal() {
  const modal = document.getElementById('upiModal');
  if (modal) modal.classList.add('active');
}

function closeUpiModal() {
  const modal = document.getElementById('upiModal');
  if (modal) modal.classList.remove('active');
}

function markMaintenancePaid() {
  alert('Maintenance marked as paid successfully!');
  closeUpiModal();
}

// Function to attach click triggers to expense table rows
function attachReceiptListeners() {
  document.querySelectorAll('.link-receipt').forEach(link => {
    link.onclick = (e) => {
      e.preventDefault();
      const row = link.closest('tr');
      if (!row) return;
      
      const category = row.cells[0] ? row.cells[0].innerText.trim() : 'General';
      const desc = row.cells[1] ? row.cells[1].innerText.trim() : 'Expense Item';
      const date = row.cells[2] ? row.cells[2].innerText.trim() : '01 Aug 2026';
      const amount = row.cells[4] ? row.cells[4].innerText.trim() : '₹0';
      
      openVoucherModal(category, desc, date, amount);
    };
  });
}