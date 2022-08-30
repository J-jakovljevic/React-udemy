import { useCallback, useReducer } from "react";

const httpReducer = (curHttpState, action) => {
  switch (action.type) {
    case "SEND":
      return { loading: true, error: null, data: null, extra: null, identifier: action.identifier };
    case "RESPONSE":
      return {
        ...curHttpState,
        loading: false,
        data: action.responseData,
        extra: action.extra,
      }; // updating only a filed that has changes
    case "ERROR":
      return { loading: false, error: action.errorMessage }; // errorMessage name is up to u
    case "CLEAR":
      return { ...curHttpState, error: null };
    default:
      throw new Error("Should not be reached");
  }
};

const useHttp = () => {
  const [httpState, dispatchHttp] = useReducer(httpReducer, {
    loading: false,
    error: false,
    data: null,
    extra: null,
    identifier: null
  });

  const sendRequest = useCallback((url, method, body, reqExtra, reqIdentifier) => {
    // we're getting this parameters from outside
    dispatchHttp({ type: "SEND", identifier: reqIdentifier });
    fetch(url, {
      method: method,
      body: body,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        dispatchHttp({
          type: "RESPONSE",
          responseData: responseData,
          extra: reqExtra,
        });
      })
      .catch((error) => {
        dispatchHttp({ type: "ERROR", errorMessage: "Something went wrong!" });
      });
  }, []);

  return {
    isLoading: httpState.loading,
    data: httpState.data,
    error: httpState.error,
    sendRequest: sendRequest,
    reqExtra: httpState.extra,
    reqIdentifier: httpState.identifier
  };
};

export default useHttp;
