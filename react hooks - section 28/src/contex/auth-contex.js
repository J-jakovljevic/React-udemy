import React, { useState } from "react";

export const AuthContex = React.createContext({     // named export
    isAuth: false,
    login: () => {}
});

const AuthContexProvider = props => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const loginHandler = () => {
        setIsAuthenticated(true);
    }

    return (
        //access to contex will have only components that are wrapped with Provider
        <AuthContex.Provider
            value={{ login: loginHandler, isAuth: isAuthenticated }}>  {/* that value will be automatically distributed to everyone listening if it changes; 
                                                                            we're overwriting starting value with new object */}
            {props.children}
        </AuthContex.Provider>
    )

}

export default AuthContexProvider;