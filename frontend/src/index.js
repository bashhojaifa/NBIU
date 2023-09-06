//External Lib Import
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

//Internal Lib Import

// import i18n (needs to be bundled ;))
import './locales/i18n';

import './App.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './redux/store';
import ApiLoad from './components/common/ApiLoad';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
        <ApiLoad />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
