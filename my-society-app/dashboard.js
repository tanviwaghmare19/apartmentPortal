document.addEventListener('DOMContentLoaded', () => {
  // 1. Edit Society Name Modal Logic
  const editSocietyBtn = document.getElementById('editSocietyBtn');
  const editModal = document.getElementById('editModal');
  const cancelModalBtn = document.getElementById('cancelModalBtn');
  const updateNameBtn = document.getElementById('updateNameBtn');
  const newSocietyNameInput = document.getElementById('newSocietyNameInput');
  const societyNameText = document.getElementById('societyNameText');

  if (editSocietyBtn) {
    editSocietyBtn.addEventListener('click', () => {
      newSocietyNameInput.value = societyNameText.textContent;
      editModal.classList.remove('hidden');
    });
  }

  if (cancelModalBtn) {
    cancelModalBtn.addEventListener('click', () => {
      editModal.classList.add('hidden');
    });
  }

  if (updateNameBtn) {
    updateNameBtn.addEventListener('click', () => {
      const updatedName = newSocietyNameInput.value.trim();
      if (updatedName !== '') {
        societyNameText.textContent = updatedName;
        editModal.classList.add('hidden');
      } else {
        alert('Please enter a valid society name!');
      }
    });
  }

  if (editModal) {
    editModal.addEventListener('click', (e) => {
      if (e.target === editModal) {
        editModal.classList.add('hidden');
      }
    });
  }

  // 2. Search & Filter Table Logic
  const searchInput = document.querySelector('.search-input');
  const categorySelect = document.querySelector('.category-select');
  const tableRows = document.querySelectorAll('tbody tr');

  function filterTable() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const selectedCategory = categorySelect.value.toLowerCase();

    tableRows.forEach(row => {
      const categoryText = row.children[0].textContent.toLowerCase();
      const descriptionText = row.children[1].textContent.toLowerCase();

      const matchesSearch = descriptionText.includes(searchTerm) || categoryText.includes(searchTerm);
      const matchesCategory = selectedCategory === 'all' || categoryText.includes(selectedCategory);

      if (matchesSearch && matchesCategory) {
        row.style.display = '';
      } else {
        row.style.display = 'none';
      }
    });
  }

  if (searchInput && categorySelect) {
    searchInput.addEventListener('input', filterTable);
    categorySelect.addEventListener('change', filterTable);
  }
});