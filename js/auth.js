// Save users to browser memory
function saveUser(username, email, password) {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  users.push({ username, email, password });
  localStorage.setItem('users', JSON.stringify(users));
}

// Get all saved users
function getUsers() {
  return JSON.parse(localStorage.getItem('users')) || [];
}

function login() {
  const username = document.getElementById('login-username').value;
  const password = document.getElementById('login-password').value;

  const users = getUsers();
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    alert("Login successful!");
    window.location.href = "index.html";
  } else {
    alert("Wrong username or password");
  }
}

function register() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const email = document.getElementById('email').value;
  const users = getUsers();
  const user1 = users.find(u => u.username === username);
  const user2 = users.find(u => u.email === email);
  if (!user1 && !user2) {
    saveUser(username, password);
    alert("Registration complete! Please login.");
    window.location.href = "login.html";
  } else {
    if (user1) {
      alert("username already exists");
    }
    else {
      alert("email already exists");
    }
  }
}


window.onload = function () {
  // Setup login form if it exists
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.onsubmit = function (e) {
      e.preventDefault();
      login();
    };
  }

  const registerForm = document.getElementById('register-form');
  if (registerForm) {
    registerForm.onsubmit = function (e) {
      e.preventDefault();
      register();
    };
  }
};

function logout() {
  alert("You've been logged out");
  window.location.href = "index.html";
}