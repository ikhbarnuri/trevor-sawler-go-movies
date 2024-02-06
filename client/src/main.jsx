import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import ErrorPage from "./components/ErrorPage.jsx";
import Home from "./components/Home.jsx";
import Movies from "./components/Movies.jsx";
import Genres from "./components/Genres.jsx";
import Movie from "./components/Movie.jsx";
import ManageCatalogue from "./components/ManageCatalogue.jsx";
import GraphQL from "./components/GraphQL.jsx";
import Login from "./components/Login.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                index: true,
                element: <Home/>
            },
            {
                path: '/movies',
                element: <Movies/>
            },
            {
                path: '/genres',
                element: <Genres/>
            },
            {
                path: '/admin/movie/create',
                element: <Movie/>
            },
            {
                path: '/manage-catalogue',
                element: <ManageCatalogue/>
            },
            {
                path: '/graphql',
                element: <GraphQL/>
            },
            {
                path: '/login',
                element: <Login/>
            },
        ]
    }
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>,
)
