/**
 * Authentication Manager
 * 
 * This utility provides consistent authentication token management
 * using localStorage only (no cookies).
 */

// Token and user storage keys
const AUTH_TOKEN_KEY = 'ghareebstar_token';
const USER_DATA_KEY = 'ghareebstar_user';

/**
 * Save authentication token to localStorage
 * @param {string} token - JWT token
 * @returns {boolean} Success status
 */
export const saveToken = (token) => {
  if (!token) return false;
  
  try {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
    return true;
  } catch (error) {
    console.error('Error saving auth token:', error);
    return false;
  }
};

/**
 * Get authentication token from localStorage
 * @returns {string|null} JWT token or null if not found
 */
export const getToken = () => {
  try {
    return localStorage.getItem(AUTH_TOKEN_KEY);
  } catch (error) {
    console.error('Error getting auth token:', error);
    return null;
  }
};

/**
 * Save user data to localStorage
 * @param {Object} user - User data object
 * @returns {boolean} Success status
 */
export const saveUser = (user) => {
  if (!user) return false;
  
  try {
    localStorage.setItem(USER_DATA_KEY, JSON.stringify(user));
    return true;
  } catch (error) {
    console.error('Error saving user data:', error);
    return false;
  }
};

/**
 * Get user data from localStorage
 * @returns {Object|null} User data or null if not found
 */
export const getUser = () => {
  try {
    const userData = localStorage.getItem(USER_DATA_KEY);
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('Error getting user data:', error);
    return null;
  }
};

/**
 * Parse JWT token to get payload
 * @param {string} token - JWT token
 * @returns {Object|null} Decoded payload or null
 */
export const parseJwt = (token) => {
  try {
    // Split the token and get the payload part
    const base64Url = token.split('.')[1];
    if (!base64Url) return null;
    
    // Replace characters and decode
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error parsing JWT token:', error);
    return null;
  }
};

/**
 * Check if token is expired
 * @param {string} token - JWT token
 * @returns {boolean} True if token is expired or invalid
 */
export const isTokenExpired = (token = getToken()) => {
  if (!token) return true;
  
  try {
    const payload = parseJwt(token);
    if (!payload) return true;
    
    // Check if token has expired
    const currentTime = Date.now() / 1000;
    return payload.exp && payload.exp < currentTime;
  } catch (error) {
    console.error('Error checking token expiration:', error);
    return true;
  }
};

/**
 * Check if user is authenticated
 * @returns {boolean} Authentication status
 */
export const isAuthenticated = () => {
  const token = getToken();
  return !!token && !isTokenExpired(token);
};

/**
 * Clear all authentication data
 */
export const clearAuth = () => {
  try {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(USER_DATA_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing authentication data:', error);
    return false;
  }
};

/**
 * Get authentication headers for API requests
 * @returns {Object} Headers object with Authorization
 */
export const getAuthHeaders = () => {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

/**
 * Debug authentication state
 * @returns {Object} Authentication debug info
 */
export const debugAuth = () => {
  const token = getToken();
  const user = getUser();
  const isValid = isAuthenticated();
  
  // Return debug info without logging
  return {
    hasToken: !!token,
    hasUser: !!user,
    isAuthenticated: isValid,
    tokenPayload: token ? parseJwt(token) : null
  };
};

export default {
  saveToken,
  getToken,
  saveUser,
  getUser,
  parseJwt,
  isTokenExpired,
  isAuthenticated,
  clearAuth,
  getAuthHeaders,
  debugAuth
}; 