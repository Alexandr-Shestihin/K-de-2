import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import VisuallyImpaired from './total/VisuallyImpaired'
import { Provider } from 'react-redux';
import store from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <Provider store={store}>
      <BrowserRouter>
         <VisuallyImpaired>
            <App />
         </VisuallyImpaired>
      </BrowserRouter>
   </Provider>
);

reportWebVitals();
