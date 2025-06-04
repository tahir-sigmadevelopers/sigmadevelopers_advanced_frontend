/**
 * Utility for debugging cookie issues
 */

// Check if a specific cookie exists with more detailed logging
export const hasCookie = (name) => {
  const cookies = document.cookie.split(';');
  console.log("All document cookies:", document.cookie);
  
  // Try to find the cookie
  const cookie = cookies.find(c => {
    const trimmed = c.trim();
    const hasName = trimmed.startsWith(`${name}=`);
    console.log(`Checking cookie: ${trimmed} - Has name '${name}'? ${hasName}`);
    return hasName;
  });
  
  return !!cookie;
};

// Get all cookies as an object with more detailed logging
export const getAllCookies = () => {
  const cookies = document.cookie.split(';');
  const cookieObject = {};
  
  cookies.forEach(cookie => {
    const parts = cookie.trim().split('=');
    if (parts.length >= 2) {
      const name = parts[0];
      // Join the rest of the parts in case the value itself contains = signs
      const value = parts.slice(1).join('=');
      if (name) cookieObject[name] = value;
    }
  });
  
  return cookieObject;
};

// Log cookie information for debugging
export const debugCookies = () => {
  const allCookies = getAllCookies();
  const hasAuthCookie = hasCookie('ghareebstar');
  
  console.log('All cookies:', allCookies);
  console.log('Raw cookie string:', document.cookie);
  console.log('Has auth cookie:', hasAuthCookie);
  
  return {
    allCookies,
    hasAuthCookie,
    rawCookieString: document.cookie
  };
};

// Check if we're in development or production
export const getEnvironment = () => {
  const hostname = window.location.hostname;
  const isDev = hostname === 'localhost' || hostname === '127.0.0.1';
  return {
    isDevelopment: isDev,
    hostname,
    port: window.location.port,
    protocol: window.location.protocol
  };
};

export default {
  hasCookie,
  getAllCookies,
  debugCookies,
  getEnvironment
}; 