let bookingsData = [
    { amenity: "Community Hall", flat: "Flat 101", date: "2026-08-15", status: "Confirmed" }
];

window.onload = function() {
    renderBookings();
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
    document.getElementById('book-amenity-name').value = amenityName;
    document.getElementById('modal-book-amenity').classList.remove('hidden');
}

function closeModal() {
    document.getElementById('modal-book-amenity').classList.add('hidden');
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