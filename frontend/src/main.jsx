import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import ReactQueryProvider from './providers/ReactQueryProvider.jsx';
import { Toaster } from "react-hot-toast";



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ReactQueryProvider>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
      <App />
    </ReactQueryProvider>
  </React.StrictMode>
);

