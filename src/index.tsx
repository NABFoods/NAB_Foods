// React entry point
import React from 'react';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import { store } from './client/store';
import App from './client/App';

const root = createRoot(document.getElementById('root')!);

// Wrapping App w/ Provider to give access to Redux store 
root.render(
    // Using React.StrictMode as best practice for assisting w/ development w/out impacting production
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
