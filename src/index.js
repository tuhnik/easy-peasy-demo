import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from './store.js'
import { StoreProvider } from 'easy-peasy';

//make store accessible through console
window.store = store

ReactDOM.render(
    <StoreProvider store={store}>
        <App />
    </StoreProvider>
, document.getElementById('root'));

