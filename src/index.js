import "@babel/polyfill";
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from './store.js'
import { StoreProvider } from 'easy-peasy';
import { I18nContextProvider } from "./i18n";

//make store accessible through console
window.store = store

ReactDOM.render(
    <I18nContextProvider>
        <StoreProvider store={store}>
            <App />
        </StoreProvider>
    </I18nContextProvider>
, document.getElementById('root'));

