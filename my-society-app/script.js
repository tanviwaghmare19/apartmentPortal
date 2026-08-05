document.addEventListener('DOMContentLoaded', () => {
  const loginCard = document.getElementById('loginCard');
  const signupCard = document.getElementById('signupCard');
  
  const goToSignupBtn = document.getElementById('goToSignup');
  const goToLoginBtn = document.getElementById('goToLogin');

  const loginForm = document.getElementById('loginForm');
  const signupForm = document.getElementById('signupForm');

  // Switch to Sign Up View
  goToSignupBtn.addEventListener('click', (e) => {
    e.preventDefault();
    loginCard.classList.add('hidden');
    signupCard.classList.remove('hidden');
  });

  // Switch to Login View
  goToLoginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    signupCard.classList.add('hidden');
    loginCard.classList.remove('hidden');
  });

  // Login Form Submission
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    window.location.href = 'dashboard.html';
  });

  // Sign Up Form Submission
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Account created successfully!');
    signupCard.classList.add('hidden');
    loginCard.classList.remove('hidden');
  });
});