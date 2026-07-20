// importing the required essentials 
import { createBrowserRouter } from "react-router";
// create createBrowserRouter([...]): Takes an array of route objects. Each object defines a mapping between a URL path and a React component.
import Login from "./features/auth/pages/Login.jsx";
import Register from "./features/auth/pages/Register.jsx";

// in react this comes [] within a logic function 
export const router = createBrowserRouter ([
    {
        path : "/login" , 
        element : <Login />
    }, 
    {
        path : "/register" , 
        element : <Register />
    },
])