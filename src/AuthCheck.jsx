import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadUser } from './redux/actions/user';
import { debugCookies } from './utils/cookieDebugger';
import { isAuthenticated, getAuthToken } from './utils/authManager';
import axios from 'axios';
import { server } from './store';

/**
 * A component that tests the authentication system
 * Add this temporarily to a route for debugging
 */
const AuthCheck = () => {
  const [testResult, setTestResult] = useState(null);
  const [testStatus, setTestStatus] = useState('idle');
  const dispatch = useDispatch();
  const { isAuthenticated: reduxIsAuthenticated, user, loading, error } = useSelector(state => state.user);

  const runAuthTest = async () => {
    setTestStatus('testing');
    try {
      // Step 1: Check cookies
      const cookieInfo = debugCookies();
      console.log('Cookie debug info:', cookieInfo);
      
      // Step 2: Check localStorage
      const token = getAuthToken();
      console.log('Auth token from manager:', token);
      
      // Step 3: Check auth manager
      const isAuth = isAuthenticated();
      console.log('Auth manager says authenticated:', isAuth);
      
      // Step 4: Check Redux state
      console.log('Redux auth state:', { reduxIsAuthenticated, user });
      
      // Step 5: Try to load user
      await dispatch(loadUser());
      
      // Step 6: Test API directly
      try {
        const response = await axios.get(`${server}/user/profile`, {
          withCredentials: true,
          headers: token ? { 'Authorization': `Bearer ${token}` } : {}
        });
        console.log('Direct API test succeeded:', response.data);
        
        setTestResult({
          success: true,
          message: 'Authentication is working correctly',
          details: {
            cookies: cookieInfo,
            token: token ? 'Present' : 'Not found',
            authManager: isAuth,
            reduxState: reduxIsAuthenticated,
            apiTest: 'Success'
          }
        });
      } catch (apiError) {
        console.error('Direct API test failed:', apiError);
        
        setTestResult({
          success: false,
          message: 'Authentication is not working correctly',
          details: {
            cookies: cookieInfo,
            token: token ? 'Present' : 'Not found',
            authManager: isAuth,
            reduxState: reduxIsAuthenticated,
            apiTest: 'Failed',
            apiError: apiError.message
          }
        });
      }
    } catch (error) {
      console.error('Auth test error:', error);
      setTestResult({
        success: false,
        message: 'Error testing authentication',
        error: error.message
      });
    } finally {
      setTestStatus('complete');
    }
  };

  useEffect(() => {
    // Log auth status when component mounts
    const authStatus = {
      reduxIsAuthenticated, 
      authManager: isAuthenticated(),
      token: getAuthToken() ? 'Present' : 'Not found',
      user: user ? `${user.name} (${user.email})` : 'Not logged in',
      cookies: document.cookie
    };
    
    console.log('Current auth status:', authStatus);
  }, [reduxIsAuthenticated, user]);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg mt-10 mb-10">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Authentication Check</h1>
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-3 text-gray-700 dark:text-gray-200">Current Authentication Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
            <p className="font-medium text-gray-700 dark:text-gray-200">Redux State:</p>
            <p className={`font-bold ${reduxIsAuthenticated ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              {reduxIsAuthenticated ? 'Authenticated' : 'Not Authenticated'}
            </p>
          </div>
          
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
            <p className="font-medium text-gray-700 dark:text-gray-200">Auth Manager:</p>
            <p className={`font-bold ${isAuthenticated() ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              {isAuthenticated() ? 'Authenticated' : 'Not Authenticated'}
            </p>
          </div>
          
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
            <p className="font-medium text-gray-700 dark:text-gray-200">Auth Token:</p>
            <p className={`font-bold ${getAuthToken() ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              {getAuthToken() ? 'Present' : 'Not Found'}
            </p>
          </div>
          
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
            <p className="font-medium text-gray-700 dark:text-gray-200">User Data:</p>
            <p className={`font-bold ${user ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              {user ? `${user.name} (${user.email})` : 'Not Available'}
            </p>
          </div>
        </div>

        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg mb-4">
          <p className="font-medium text-gray-700 dark:text-gray-200">Cookies:</p>
          <p className="font-mono text-sm break-all text-gray-600 dark:text-gray-300">
            {document.cookie || 'No cookies found'}
          </p>
        </div>
      </div>
      
      <div className="flex justify-center mb-6">
        <button
          onClick={runAuthTest}
          disabled={testStatus === 'testing'}
          className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:opacity-50"
        >
          {testStatus === 'testing' ? 'Testing...' : 'Run Authentication Test'}
        </button>
      </div>
      
      {testResult && (
        <div className={`border p-4 rounded-lg ${testResult.success ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : 'border-red-500 bg-red-50 dark:bg-red-900/20'}`}>
          <h3 className={`text-lg font-bold mb-2 ${testResult.success ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'}`}>
            {testResult.message}
          </h3>
          
          {testResult.details && (
            <div className="mt-4">
              <h4 className="font-semibold mb-2 text-gray-700 dark:text-gray-200">Test Details:</h4>
              <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300">
                <li>Cookies: {testResult.details.cookies.hasAuthCookie ? 'Found' : 'Not Found'}</li>
                <li>Auth Token: {testResult.details.token}</li>
                <li>Auth Manager: {testResult.details.authManager ? 'Authenticated' : 'Not Authenticated'}</li>
                <li>Redux State: {testResult.details.reduxState ? 'Authenticated' : 'Not Authenticated'}</li>
                <li>API Test: {testResult.details.apiTest}</li>
                {testResult.details.apiError && <li>API Error: {testResult.details.apiError}</li>}
              </ul>
            </div>
          )}
          
          {testResult.error && (
            <p className="mt-2 text-red-600 dark:text-red-400">{testResult.error}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AuthCheck; 