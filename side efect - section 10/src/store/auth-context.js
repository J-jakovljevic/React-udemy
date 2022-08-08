import React from 'react';

// Context lets us pass a value deep into the component tree
// without explicitly threading it through every component.
const AuthContext = React.createContext({
    isLoggedIn: false
});

export default AuthContext;