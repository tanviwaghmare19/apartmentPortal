let complaintsData = [
    { flat: "Flat 302", title: "Water Leakage in Bathroom", desc: "Main pipe leaking near shaft", status: "Pending", statusClass: "status-pending" },
    { flat: "Flat 104", title: "Lift Sound Fault", desc: "Grinding noise on 2nd floor", status: "In Progress", statusClass: "status-progress" },
    { flat: "Flat 201", title: "Passage Bulb Fuse", desc: "Bulb replaced by electrician", status: "Resolved", statusClass: "status-resolved" }
];

let chatMessagesData = [
    { sender: "Flat 302", text: "Water leakage ki vajah se 3rd floor par paani ruk raha hai.", time: "10:15 AM" },
    { sender: "Flat 104", text: "Electrician/Plumber kab tak aayenge?", time: "10:20 AM" },
    { sender: "Flat 201", text: "Plumber ka contact number Staff Payroll tab mein available hai waha se call kar sakte ho.", time: "10:25 AM" }
];

document.addEventListener('DOMContentLoaded', () => {
  // 1. Check Role on Page Load
  const userRole = localStorage.getItem('userRole');

  // Agar security guard hai, toh use turant visitors page par bhej do
  if (userRole === 'security') {
    window.location.href = 'visitors.html';
    return;
  }

  // Agar resident hai, toh subtitle update karein
  if (userRole === 'resident') {
    const subtitle = document.getElementById('helpdeskSubtitle');
    if (subtitle) subtitle.innerText = 'Resident View (Flat 101)';
    
    // Optional: Resident naye issues add nahi kar sakta toh button hide karein
    // const addBtn = document.querySelector('.primary-btn');
    // if(addBtn) addBtn.style.display = 'none';
  }

  // 2. Render Data
  renderComplaints();
  renderChatMessages();
    
  // 3. Load saved society name if available
  const savedName = localStorage.getItem('societyName');
  if (savedName) {
    document.querySelectorAll('.societyNameText').forEach(el => {
      el.textContent = savedName;
    });
  }
});

function renderComplaints() {
    const list = document.getElementById('complaints-list-container');
    if (!list) return;
    list.innerHTML = '';
    complaintsData.forEach(c => {
        list.innerHTML += `
            <div class="complaint-item">
                <div class="complaint-info">
                    <span class="flat-tag">${c.flat}</span>
                    <h4>${c.title}</h4>
                    <p>${c.desc}</p>
                </div>
                <span class="status-badge ${c.statusClass}">${c.status}</span>
            </div>`;
    });
}

function renderChatMessages() {
    const box = document.getElementById('chat-messages-box');
    if (!box) return;
    box.innerHTML = '';
    chatMessagesData.forEach(msg => {
        box.innerHTML += `
            <div class="chat-msg">
                <div class="msg-top">
                    <span class="msg-sender">${msg.sender}</span>
                    <span class="msg-time">${msg.time}</span>
                    </div>
                <p>${msg.text}</p>
            </div>
        `;
    });
    box.scrollTop = box.scrollHeight;
}

function handleSendChatMessage(e) {
    e.preventDefault();
    const input = document.getElementById('chat-input-msg');
    const msgText = input.value.trim();
    if (!msgText) return;

    const userRole = localStorage.getItem('userRole');
    const senderName = (userRole === 'resident') ? "Flat 101" : "Admin / Secretary";

    chatMessagesData.push({
        sender: senderName,
        text: msgText,
        time: "Just Now"
    });

    renderChatMessages();
    input.value = '';
}

// Renamed to handleAddTicketForm to match HTML onsubmit
function handleAddTicketForm(e) {
    e.preventDefault();
    const flatVal = document.getElementById('comp-flat').value;
    const titleVal = document.getElementById('comp-title').value;
    const descVal = document.getElementById('comp-desc').value;

    complaintsData.unshift({
        flat: flatVal,
        title: titleVal,
        desc: descVal,
        status: 'Pending',
        statusClass: 'status-pending'
    });

    renderComplaints();
    closeModal('modal-add-complaint');
    document.getElementById('comp-flat').value = '';
    document.getElementById('comp-title').value = '';
    document.getElementById('comp-desc').value = '';
}

function openModal(id) {
    const el = document.getElementById(id);
    if (el) el.classList.remove('hidden');
}

function closeModal(id) {
    const el = document.getElementById(id);
    if (el) el.classList.add('hidden');
}

// Specific function for Add Ticket button
function openAddTicketModal() {
    openModal('modal-add-complaint');
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