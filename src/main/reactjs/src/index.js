import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './routes/App';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import ErrorPage from './routes/ErrorPage';
import Login from './routes/account/Login';
import BookList from './routes/book/BookList';
import StudyList from './routes/study/StudyList';
import Summary from './routes/mypage/Summary';

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/account",
        element: <Login />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/book",
        element: <BookList />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/study",
        element: <StudyList />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/mypage",
        element: <Summary />,
        errorElement: <ErrorPage />,
    },

]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
