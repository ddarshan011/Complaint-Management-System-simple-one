// import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import authReducer from './reducers/user';

const store = createStore(authReducer, composeWithDevTools(applyMiddleware(thunk)));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
  <App/>
  </Provider>,
  document.getElementById('root')
);
reportWebVitals();