import { useCallback, useReducer } from 'react';

const httpReducer = (curHttpState, action) => {
    switch(action.type) {
      case 'SEND':
        return { loading: true, error: null, data: null };
      case 'RESPONSE':
        return {...curHttpState, loading: false, data: action.responseData};  // updating only a filed that has changes
      case 'ERROR':
        return { loading: false, error: action.errorMessage };   // errorMessage name is up to u
      case 'CLEAR':
        return {...curHttpState, error: null};
      default:
        throw new Error('Should not be reached');
    }
  }

const useHttp = () => {
    const [httpState, dispatchHttp] = useReducer(httpReducer, { loading: false, error: false, data: null });

    const sendRequest = useCallback((url, method, body) => {    // we're getting this parameters from outside
        dispatchHttp({type: 'SEND'});
        fetch(
            url,
        {
          method: method,
          body: body,
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(response => {
            return response.json();
        }).then(responseData => {
            dispatchHttp({type: 'RESPONSE', responseData: responseData});
        })
        .catch(error => {
            dispatchHttp({type: 'ERROR', errorMessage: 'Something went wrong!'});
        })
    }, []);

    return {
        isLoading: httpState.loading,
        data: httpState.data,
        error: httpState.error,
        sendRequest: sendRequest
    }
    
};

export default useHttp;