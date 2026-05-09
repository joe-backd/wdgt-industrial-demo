import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from './store';
import App from './App.jsx';
import './index.css';

// Mirror the live site: hydrate cart from localStorage["FinalCart"] before render.
const persisted = localStorage.getItem('FinalCart');
if (persisted) {
  try {
    const items = JSON.parse(persisted);
    store.dispatch({ type: 'cart/hydrate', payload: items });
  } catch {
    // ignore malformed cache
  }
}

// Persist cart to localStorage on every change.
store.subscribe(() => {
  const { cart } = store.getState();
  localStorage.setItem('FinalCart', JSON.stringify(cart.items));
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
