// Mock user data (replace with real API calls)
const mockUser = {
  email: "admin@gmail.com",
  password: "123",
};

// Check if the user is authenticated
export const isAuthenticated = () => {
  if (typeof window === "undefined") return false;
  return localStorage.getItem("isAuthenticated") === "true";
};

// Login function
export const login = (email, password) => {
  if (email === mockUser.email && password === mockUser.password) {
    localStorage.setItem("isAuthenticated", "true");
    return true;
  }
  return false;
};

// Logout function
export const logout = () => {
  localStorage.removeItem("isAuthenticated");
};
