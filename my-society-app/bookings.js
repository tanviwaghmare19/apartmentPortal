let bookingsData = [
    { amenity: "Community Hall", flat: "Flat 101", date: "2026-08-15", status: "Confirmed" }
];

window.onload = function() {
    renderBookings();
    
    // Load saved society name if available
    const savedName = localStorage.getItem('societyName');
    if (savedName) {
        document.querySelectorAll('.societyNameText').forEach(el => {
            el.textContent = savedName;
        });
    }
};

function renderBookings() {
    const tbody = document.getElementById('amenities-booking-table');
    if (!tbody) return;
    tbody.innerHTML = '';
    bookingsData.forEach(b => {
        tbody.innerHTML += `
            <tr>
                <td style="font-weight: bold;">${b.amenity}</td>
                <td>${b.flat}</td>
                <td>${b.date}</td>
                <td style="text-align: right;"><span class="status-confirmed">${b.status}</span></td>
            </tr>`;
    });
}

function openModal(amenityName) {
    const nameInput = document.getElementById('book-amenity-name');
    if (nameInput) nameInput.value = amenityName;
    const modal = document.getElementById('modal-book-amenity');
    if (modal) modal.classList.remove('hidden');
}

function closeModal() {
    const modal = document.getElementById('modal-book-amenity');
    if (modal) modal.classList.add('hidden');
}

function handleBookAmenity(e) {
    e.preventDefault();
    const amenityVal = document.getElementById('book-amenity-name').value;
    const flatVal = document.getElementById('book-flat').value;
    const dateVal = document.getElementById('book-date').value;

    bookingsData.unshift({
        amenity: amenityVal,
        flat: flatVal,
        date: dateVal,
        status: "Confirmed"
    });

    renderBookings();
    closeModal();
    document.getElementById('book-flat').value = '';
    document.getElementById('book-date').value = '';
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