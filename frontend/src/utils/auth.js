export const getToken = () => localStorage.setItem('token');

export const isAuthenticated = () => Boolean(getToken());

export const logout = () => {
    localStorage.removeItem('token');
}