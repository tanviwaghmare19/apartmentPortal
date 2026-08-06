let staffData = [
    { name: "Bahadur Singh", role: "Head Security Watchman", phone: "+91 9876543210" },
    { name: "Raju Mehra", role: "Sweeping & Cleaning Staff", phone: "+91 9811223344" },
    { name: "Sunil Electrician", role: "On-Call Electrician", phone: "+91 9899001122" }
];

window.onload = function() {
    renderStaff();
    
    // Load saved society name if available
    const savedName = localStorage.getItem('societyName');
    if (savedName) {
        document.querySelectorAll('.societyNameText').forEach(el => {
            el.textContent = savedName;
        });
    }
};

function renderStaff() {
    const grid = document.getElementById('staff-grid-container');
    if (!grid) return;
    grid.innerHTML = '';
    staffData.forEach(s => {
        grid.innerHTML += `
            <div class="staff-box">
                <div class="staff-info">
                    <h3>${s.name}</h3>
                    <p>${s.role}</p>
                    <a href="tel:${s.phone}" class="staff-phone"><i class="fa-solid fa-phone"></i> ${s.phone}</a>
                </div>
                <a href="tel:${s.phone}" class="call-btn"><i class="fa-solid fa-phone"></i> Call</a>
            </div>`;
    });
}

function openModal() {
    const modal = document.getElementById('modal-staff');
    if (modal) modal.classList.remove('hidden');
}

function closeModal() {
    const modal = document.getElementById('modal-staff');
    if (modal) modal.classList.add('hidden');
}

function handleAddStaff(e) {
    e.preventDefault();
    const nameVal = document.getElementById('staff-name').value;
    const roleVal = document.getElementById('staff-role').value;
    const phoneVal = document.getElementById('staff-phone').value;

    staffData.push({
        name: nameVal,
        role: roleVal,
        phone: phoneVal
    });

    renderStaff();
    closeModal();
    
    document.getElementById('staff-name').value = '';
    document.getElementById('staff-role').value = '';
    document.getElementById('staff-phone').value = '';
}

// --- Edit Society Name Functions ---
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

// --- Notification Modal Functions ---
function openNotificationModal(e) {
    if (e) e.preventDefault();
    const modal = document.getElementById('modal-notifications');
    if (modal) modal.classList.remove('hidden');
}

function closeNotificationModal() {
    const modal = document.getElementById('modal-notifications');
    if (modal) modal.classList.add('hidden');
}