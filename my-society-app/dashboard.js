document.addEventListener("DOMContentLoaded", function () {
  const savedName = localStorage.getItem("societyName");
  if (savedName) {
    document.querySelectorAll(".societyNameText").forEach(el => el.innerText = savedName);
  }
});

function openEditModal() {
  const nameEl = document.querySelector('.societyNameText');
  const currentName = nameEl ? nameEl.innerText : "Gokul Dham Society";
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