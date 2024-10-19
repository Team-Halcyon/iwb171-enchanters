import axios from 'axios';

export const performRequestWithRetry = async (url, options) => {
  try {
    // Attempt the initial request
    const response = await axios(url, options);
    return response;
  } catch (error) {
    // Check if the error is a 401 Unauthorized error
    if (error.response && error.response.status === 401) {
      // Access token may be expired, attempt to refresh the token
      try {
        await axios.post('/auth/refresh');
        // If the token refresh is successful, retry the original request
        const retryResponse = await axios(url, options);
        return retryResponse;
      } catch (refreshError) {
        // If the refresh fails with a 401, redirect to login
        if (refreshError.response && refreshError.response.status === 401) {
          console.log('Failed to refresh token. Status: ' + refreshError.response.status);
          window.location.href = '/auth/login';
        } else {
          // If the error is something else (like a server error), throw the original error
          throw error;
        }
      }
    } else {
      // If the error is not a 401, throw it
      throw error;
    }
  }
};
