import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import store from "./redux/store"
import { Provider } from 'react-redux';
import { ToastContainer, Bounce} from 'react-toastify';

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <BrowserRouter>
    <Provider store={store}>
      <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
          />
      <App />
    </Provider>
   </BrowserRouter>
  </StrictMode>,
)
