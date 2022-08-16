import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import './index.css';
import App from './App';
import store from './store/index';

// provider is used to connect app with redux store -> for that
// we need to provide that store to react app
// access to redux will have only components that are wrapped with <Provider>

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Provider store={store}> <App /> </Provider>);      // {store} is from line 7

