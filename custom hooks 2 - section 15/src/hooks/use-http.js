import { useState, useCallback } from "react";

const useHttp = (applyData) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
  
    const sendRequest = useCallback(async (requestConfig) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
            requestConfig.url, {
                method: requestConfig.method ? requestConfig.method : 'GET' ,
                headers: requestConfig.headers ? requestConfig.headers : {},         // if it's not required, then it's set to empty object
                body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
            }
        );
  
        if (!response.ok) {
          throw new Error('Request failed!');
        }
  
        const data = await response.json();
        applyData(data);
  
      } catch (err) {
        setError(err.message || 'Something went wrong!');
      }
      setIsLoading(false);
    }, [applyData]);     // functions are objects too! (applyData); if requestConfig is parameter of this function, it doesn't need to be dependency

    return {
        isLoading,              // same as "isLoading: isLoading"
        error,
        sendRequest
    }
};

export default useHttp;