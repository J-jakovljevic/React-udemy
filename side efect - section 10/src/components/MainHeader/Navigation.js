import React from "react";
import AuthContext from "../../store/auth-context";

import classes from "./Navigation.module.css";

const Navigation = (props) => {
  return (
    // to consume (or use) what was provided on our context, we use the consumer component
    // ne stavljati space posle 10. linije jer se parsira kao child ka Consumer-u 
    <AuthContext.Consumer>
      {(ctx) => {             // ctx je context data koji je ustvari objekat iz auth-context
        return (
          <nav className={classes.nav}>
            <ul>
              {ctx.isLoggedIn && (
                <li>
                  <a href="/">Users</a>
                </li>
              )}
              {ctx.isLoggedIn && (
                <li>
                  <a href="/">Admin</a>
                </li>
              )}
              {ctx.isLoggedIn && (
                <li>
                  <button onClick={props.onLogout}>Logout</button>
                </li>
              )}
            </ul>
          </nav>
        );
      }}
    </AuthContext.Consumer>
  );
};

export default Navigation;
