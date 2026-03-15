const USER_KEY = "veloura_user";
const CURRENT_USER_KEY = "veloura_current_user";

export function registerUser(userData) {
  localStorage.setItem(USER_KEY, JSON.stringify(userData));
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userData));
  window.dispatchEvent(new Event("storageUpdate"));
}

export function loginUser(email, password) {
  const savedUser = JSON.parse(localStorage.getItem(USER_KEY));

  if (!savedUser) {
    return {
      success: false,
      message: "No account found. Please register first.",
    };
  }

  if (savedUser.email !== email || savedUser.password !== password) {
    return {
      success: false,
      message: "Invalid email or password.",
    };
  }

  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(savedUser));
  window.dispatchEvent(new Event("storageUpdate"));

  return {
    success: true,
    message: "Login successful.",
    user: savedUser,
  };
}

export function getCurrentUser() {
  return JSON.parse(localStorage.getItem(CURRENT_USER_KEY)) || null;
}

export function logoutUser() {
  localStorage.removeItem(CURRENT_USER_KEY);
  window.dispatchEvent(new Event("storageUpdate"));
}

export function isLoggedIn() {
  return !!localStorage.getItem(CURRENT_USER_KEY);
}