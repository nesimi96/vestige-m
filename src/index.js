import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from "react-router-dom";
import { createStore, compose } from 'redux'
import { Provider } from 'react-redux'
import reducer from './store/reducer/reducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers());

ReactDOM.render(
     <Router>
        <Provider store={store}>
           <App />
        </Provider>
     </Router>
,
  document.getElementById('root')
);

