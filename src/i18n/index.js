import React, { useReducer } from "react";

import EN from "./en.json";
import ET from "./et.json";

// To make it easier to read from JSON files
const translations = {
  en: EN,
  et: ET
};

// This function will be used to create `translate` function for the context
const getTranslate = langCode => key => translations[langCode][key] || key;

/* We will have two things in our context state, 
langCode will be the current language of the page
and translate will be the method to translate keys
into meaningful texts. Default language will be Estonian */

const getLang = () => {
    let url = window.location.href
    let lang = "et"
    if(url.match("/en/")) lang = "en"
    if(url.match("/et/")) lang = "et"
    return lang
}



const initialState = {
  langCode: getLang(),
  t: getTranslate(getLang()),
};

export const I18nContext = React.createContext(initialState);

export const I18nContextProvider = ({ children }) => {
  
  /* This is where magic starts to happen. We're creating
  a reducer to manage the global state which will sit in
  I18nContext. For now, the only action we will have
  is setting language */
  const reducer = (state, action) => {
    switch (action.type) {
      case "setLanguage":
        return {
          langCode: action.payload,
          t: getTranslate(action.payload),
        };
      default:
        return { ...initialState };
    }
  };

  /* useReducer hook receives a reducer and an initialState to
  return the current state object with a dispatch method to
  dispatch actions. */ 
  const [state, dispatch] = useReducer(reducer, initialState);

  /* We're Providing state object (langCode and translate method
  in this case) and also the dispatch for the children components */
  return (
    <I18nContext.Provider value={{ ...state, dispatch }}>
      {children}
    </I18nContext.Provider>
  );
};