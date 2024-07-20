import React from 'react'
import ReactDOM from 'react-dom/client'
import UserContextProvider from './context/UserContextProvider'
import './index.css'
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Login from './pages/Login/Login.jsx';
import Signup from './pages/Signup/Signup.jsx';
const router=createBrowserRouter([
  {
    path: "/",
    element: <UserContextProvider><Login/></UserContextProvider>,
  },
  {
    path: "/signup",
    element: <UserContextProvider><Signup/></UserContextProvider>,}
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
