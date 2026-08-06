let visitorsData = [
    { name: "Rahul Singh", role: "Swiggy Delivery", flat: "Flat 101", vehicle: "MH-31 EV-2020", time: "10:30 AM", status: "Approved" },
    { name: "Amit Shah", role: "Guest", flat: "Flat 102", vehicle: "MH-12 AB-9999", time: "10:15 AM", status: "Approved" }
];

window.onload = function() {
    renderVisitors();
    
    // Load saved society name if available
    const savedName = localStorage.getItem('societyName');
    if (savedName) {
        document.querySelectorAll('.societyNameText').forEach(el => {
            el.textContent = savedName;
        });
    }
};

function renderVisitors() {
    const tbody = document.getElementById('visitors-table-body');
    if (!tbody) return;
    tbody.innerHTML = '';
    visitorsData.forEach(v => {
        tbody.innerHTML += `
            <tr>
                <td style="font-weight: bold; color: #1e293b;">${v.name}</td>
                <td>${v.role}</td>
                <td><a href="#" class="flat-link">${v.flat}</a></td>
                <td>${v.vehicle}</td>
                <td>${v.time}</td>
                <td style="text-align: right;"><span class="status-approved">${v.status}</span></td>
            </tr>`;
    });
}

function openModal() {
    const modal = document.getElementById('modal-visitor');
    if (modal) modal.classList.remove('hidden');
}

function closeModal() {
    const modal = document.getElementById('modal-visitor');
    if (modal) modal.classList.add('hidden');
}

function handleAddVisitor(e) {
    e.preventDefault();
    const nameVal = document.getElementById('vis-name').value;
    const roleVal = document.getElementById('vis-role').value;
    const flatVal = document.getElementById('vis-flat').value;
    const vehicleVal = document.getElementById('vis-vehicle').value;
    const timeVal = document.getElementById('vis-time').value;

    visitorsData.unshift({
        name: nameVal,
        role: roleVal,
        flat: flatVal,
        vehicle: vehicleVal,
        time: timeVal,
        status: "Approved"
    });

    renderVisitors();
    closeModal();
    
    // Clear form inputs
    document.getElementById('vis-name').value = '';
    document.getElementById('vis-role').value = '';
    document.getElementById('vis-flat').value = '';
    document.getElementById('vis-vehicle').value = '';
    document.getElementById('vis-time').value = '';
}

/* --- Edit Society Name Functions --- */
function openEditModal() {
    const modal = document.getElementById('editModal');
    if (modal) modal.classList.remove('hidden');
}

function closeEditModal() {
    const modal = document.getElementById('editModal');
    if (modal) modal.classList.add('hidden');
}

function saveSocietyName() {
    const input = document.getElementById('societyInput');
    const newName = input ? input.value.trim() : '';
    if (newName) {
        localStorage.setItem('societyName', newName);
        document.querySelectorAll('.societyNameText').forEach(el => {
            el.textContent = newName;
        });
        closeEditModal();
        input.value = '';
    } else {
        alert('Please enter a valid society name');
    }
}

/* --- Notification Modal Functions --- */
function openNotificationModal(e) {
    if (e) e.preventDefault();
    const modal = document.getElementById('modal-notifications');
    if (modal) modal.classList.remove('hidden');
}

function closeNotificationModal() {
    const modal = document.getElementById('modal-notifications');
    if (modal) modal.classList.add('hidden');
}