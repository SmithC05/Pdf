const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const loginSection = document.getElementById('login-section');
const signupSection = document.getElementById('signup-section');
const pdfSection = document.getElementById('pdf-section');
const loginError = document.getElementById('login-error');
const signupError = document.getElementById('signup-error');
const welcomeMsg = document.getElementById('welcome-msg');

// Helper to show one section and hide others by toggling 'active' class
function showSection(id) {
  [loginSection, signupSection, pdfSection].forEach(section => {
    if (section.id === id) {
      section.classList.add('active');
    } else {
      section.classList.remove('active');
    }
  });
}

// Login
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  loginError.textContent = '';

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  try {
    const res = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
      credentials: 'include'
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Login failed');

    if (data.token) localStorage.setItem('authToken', data.token);

    showSection('pdf-section');
    welcomeMsg.textContent = `Welcome, ${email.split('@')[0]} 👋`;
    loginForm.reset();
  } catch (err) {
    loginError.textContent = err.message;
  }
});

// Signup
signupForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  signupError.textContent = '';

  const email = document.getElementById('signup-email').value.trim();
  const password = document.getElementById('signup-password').value.trim();

  try {
    const res = await fetch('http://localhost:5000/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Signup failed');

    localStorage.setItem('authToken', data.token);

    showSection('pdf-section');
    welcomeMsg.textContent = `Welcome, ${email.split('@')[0]} 👋`;
    signupForm.reset();
  } catch (err) {
    signupError.textContent = err.message;
  }
});

// Switch to login
document.getElementById('show-login').addEventListener('click', (e) => {
  e.preventDefault();
  showSection('login-section');
});

// Switch to signup
document.getElementById('show-signup').addEventListener('click', (e) => {
  e.preventDefault();
  showSection('signup-section');
});

// Logout
document.getElementById('logout-btn').addEventListener('click', async () => {
  try {
    await fetch('http://localhost:5000/api/auth/logout', {
      method: 'POST',
      credentials: 'include',
    });

    localStorage.removeItem('authToken');
    showSection('login-section');
    loginError.textContent = '';
    loginForm.reset();
  } catch (err) {
    alert('Logout failed. Try again.');
  }
});

// On page load, show login section by default
showSection('login-section');
