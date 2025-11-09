import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import ReactQueryProvider from './providers/ReactQueryProvider.jsx';
import { Toaster } from "react-hot-toast";
import { ApiProvider } from './providers/ApiProvider.jsx';



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ReactQueryProvider>
      <ApiProvider >
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
      <App />
      </ApiProvider>
    </ReactQueryProvider>
  </React.StrictMode>
);

