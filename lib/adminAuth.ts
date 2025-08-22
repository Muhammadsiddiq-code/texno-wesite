// Admin authentication utilities
export const isAdminLoggedIn = (): boolean => {
  return localStorage.getItem("texnopark_admin_logged_in") === "true"
}

export const getAdminUsername = (): string | null => {
  return localStorage.getItem("texnopark_admin_username")
}

export const logoutAdmin = (): void => {
  localStorage.removeItem("texnopark_admin_logged_in")
  localStorage.removeItem("texnopark_admin_username")
}

export const requireAdminAuth = (navigate: (path: string) => void): boolean => {
  if (!isAdminLoggedIn()) {
    navigate("/admin")
    return false
  }
  return true
}
