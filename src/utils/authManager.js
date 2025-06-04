/**
 * Authentication Manager
 * 
 * This utility provides consistent authentication token management
 * to work around SameSite cookie issues in modern browsers.
 */

// Token name
const AUTH_TOKEN_NAME = 'ghareebstar_token';

/**
 * Save auth token (from cookie or response)
 * @param {string} token - The authentication token
 */
export const saveAuthToken = (token) => {
  if (!token) return false;
  
  try {
    // Save to localStorage for persistence
    localStorage.setItem(AUTH_TOKEN_NAME, token);
    console.log('Auth token saved successfully');
    return true;
  } catch (error) {
    console.error('Error saving auth token:', error);
    return false;
  }
};

/**
 * Get the auth token
 * @returns {string|null} The authentication token or null
 */
export const getAuthToken = () => {
  // Try to get from localStorage first
  const localToken = localStorage.getItem(AUTH_TOKEN_NAME);
  
  // If we have a token in localStorage, use it
  if (localToken) {
    return localToken;
  }
  
  // Otherwise, try to extract from cookies
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
    cookie = cookie.trim();
    if (cookie.startsWith('ghareebstar=')) {
      const token = cookie.substring('ghareebstar='.length);
      // Save to localStorage for future use
      saveAuthToken(token);
      return token;
    }
  }
  
  return null;
};

/**
 * Check if user is authenticated
 * @returns {boolean} Whether the user is authenticated
 */
export const isAuthenticated = () => {
  return !!getAuthToken();
};

/**
 * Clear authentication token
 */
export const clearAuthToken = () => {
  localStorage.removeItem(AUTH_TOKEN_NAME);
  console.log('Auth token cleared');
};

/**
 * Extract token value from Set-Cookie header or response
 * @param {Object} response - Axios response object
 * @returns {string|null} The extracted token or null
 */
export const extractTokenFromResponse = (response) => {
  // Check if response has user property
  if (response?.data?.user) {
    console.log('User found in response:', response.data.user);
    return 'user-in-response';
  }
  
  // Check for Set-Cookie headers
  const setCookieHeader = response?.headers?.['set-cookie'];
  if (setCookieHeader) {
    const cookieHeader = Array.isArray(setCookieHeader) 
      ? setCookieHeader[0] 
      : setCookieHeader;
    
    if (cookieHeader && cookieHeader.includes('ghareebstar=')) {
      const tokenMatch = cookieHeader.match(/ghareebstar=([^;]+)/);
      if (tokenMatch && tokenMatch[1]) {
        return tokenMatch[1];
      }
    }
  }
  
  return null;
};

export default {
  saveAuthToken,
  getAuthToken,
  isAuthenticated,
  clearAuthToken,
  extractTokenFromResponse
}; 