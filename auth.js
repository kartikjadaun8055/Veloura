export const saveAdminAuth = (token, admin) => {
  localStorage.setItem("adminToken", token);
  localStorage.setItem("adminData", JSON.stringify(admin));
};

export const getAdminToken = () => {
  return localStorage.getItem("adminToken");
};

export const getAdminData = () => {
  const data = localStorage.getItem("adminData");
  return data ? JSON.parse(data) : null;
};

export const clearAdminAuth = () => {
  localStorage.removeItem("adminToken");
  localStorage.removeItem("adminData");
};