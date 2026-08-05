// Load Saved Society Name
document.addEventListener("DOMContentLoaded", function () {
  const savedName = localStorage.getItem("societyName");
  if (savedName) {
    document.querySelectorAll(".societyNameText").forEach(el => el.innerText = savedName);
  }
});

// Edit Modal Functions
function openEditModal() {
  const currentName = document.querySelector('.societyNameText').innerText;
  document.getElementById('societyInput').value = currentName;
  document.getElementById('editModal').classList.add('active');
}

function closeEditModal() {
  document.getElementById('editModal').classList.remove('active');
}

function saveSocietyName() {
  const newName = document.getElementById('societyInput').value.trim();
  if (newName !== "") {
    document.querySelectorAll('.societyNameText').forEach(el => el.innerText = newName);
    localStorage.setItem("societyName", newName);
  }
  closeEditModal();
}

// Interactive Button Functions
function collectMaintenance() {
  const amount = prompt("Enter Maintenance Amount Collected (₹):");
  if (amount) {
    alert("Maintenance of ₹" + amount + " collected successfully!");
  }
}

function addExpense() {
  const category = prompt("Enter Expense Category:");
  const amount = prompt("Enter Expense Amount (₹):");
  if (category && amount) {
    alert("Expense of ₹" + amount + " under '" + category + "' added!");
  }
}

function postNotice() {
  const title = prompt("Enter Notice Title:");
  const desc = prompt("Enter Notice Description:");
  if (title && desc) {
    const heading = document.querySelector('.notice-content h4');
    const paragraph = document.querySelector('.notice-content p');
    const dateTag = document.querySelector('.notice-date');
    
    if (heading) heading.innerText = title;
    if (paragraph) paragraph.innerText = desc;
    if (dateTag) dateTag.innerText = "Today";
    
    alert("New Notice Published!");
  }
}