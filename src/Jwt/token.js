export const clearTokens = () => localStorage.clear()

export const addToken = (name, token) => localStorage.setItem(name, token);

export const getToken = (name) => localStorage.getItem(name)