import React, { useContext } from 'react';

import Ingredients from './components/Ingredients/Ingredients';
import Auth from './components/Auth';
import { AuthContex } from './contex/auth-contex';   // named export

const App = props => {
  const authContex = useContext(AuthContex);

  let content = <Auth />;
  
  if(authContex.isAuth) {
    content = <Ingredients />;
  }

  return content;
};

export default App;
