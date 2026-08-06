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
    document.querySelectorAll('.societyNameText').forEach(el => {
      el.innerText = newName;
    });
    closeEditModal();
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