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

// account 관련 컴포넌트
import Login from './routes/account/Login';
import Signup from './routes/account/Signup';
import FindUser from './routes/account/FindUser';
import FindUserResult from './routes/account/FindUserResult';
import ChangePassword from './routes/account/ChangePassword';

// Book 관련 컴포넌트
import BookList from './routes/book/BookList';
import Detail from './routes/book/Detail';
import BookPreview from './routes/book/BookPreview';
import NewBook from './routes/book/NewBook';
import Edit from './routes/book/Edit';
import EditAi from './routes/book/EditAi';
import QuestionPreview from './routes/book/QuestionPreview';
import Test from './routes/book/Test';
import Score from './routes/book/Score';
import ScorePreview from './routes/book/ScorePreview';
import Result from './routes/book/Result';
import Explanation from './routes/book/Explanation';
import SearchBook from './routes/book/SearchBook';
import Category from './routes/book/Category';

// Study 관련 컴포넌트
import StudyList from './routes/study/StudyList';
import StudyRoom from './routes/study/StudyRoom';
import SearchRoom from './routes/study/SearchRoom';

// MyPage 관련 컴포넌트
import Summary from './routes/mypage/Summary';
import PublishedBook from './routes/mypage/PublishedBook';
import SolvedBook from './routes/mypage/SolvedBook';
import Myclass from './routes/mypage/Myclass';
import MyclassDetail from './routes/mypage/MyclassDetail';
import Bookmark from './routes/mypage/Bookmark';
import Wrong from './routes/mypage/Wrong';
import TestWrong from './routes/mypage/TestWrong';
import UpdateUser from './routes/mypage/UpdateUser';
import Leave from './routes/mypage/Leave';

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
        path: "/account/login",
        element: <Login />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/account/signup",
        element: <Signup />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/account/finduser",
        element: <FindUser />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/account/finduser/result",
        element: <FindUserResult />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/account/changepassword",
        element: <ChangePassword />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/book",
        element: <BookList />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/book/list",
        element: <BookList />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/book/detail",
        element: <Detail />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/book/bookpreview",
        element: <BookPreview />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/book/new",
        element: <NewBook />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/book/edit",
        element: <Edit />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/book/edit/ai",
        element: <EditAi />,
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
    {
        path: '/book/questionpreview',
        element: <QuestionPreview />,
      },
      {
        path: '/book/test',
        element: <Test />,
      },
      {
        path: '/book/score',
        element: <Score />,
      },
      {
        path: '/book/scorepreview',
        element: <ScorePreview />,
      },
      {
        path: '/book/result',
        element: <Result />,
      },
      {
        path: '/book/explanation',
        element: <Explanation />,
      },
      {
        path: '/book/searchbook',
        element: <SearchBook />,
      },
      {
        path: '/book/category',
        element: <Category />,
      },
      {
        path: '/study/list',
        element: <StudyList />,
      },
      {
        path: '/study/room',
        element: <StudyRoom />,
      },
      {
        path: '/study/searchroom',
        element: <SearchRoom />,
      },
      {
        path: '/mypage/summary',
        element: <Summary />,
      },
      {
        path: '/mypage/publishedbook',
        element: <PublishedBook />,
      },
      {
        path: '/mypage/solvedbook',
        element: <SolvedBook />,
      },
      {
        path: '/mypage/myclass',
        element: <Myclass />,
      },
      {
        path: '/mypage/myclass/detail',
        element: <MyclassDetail />,
      },
      {
        path: '/mypage/bookmark',
        element: <Bookmark />,
      },
      {
        path: '/mypage/wrong',
        element: <Wrong />,
      },
      {
        path: '/mypage/testwrong',
        element: <TestWrong />,
      },
      {
        path: '/mypage/updateuser',
        element: <UpdateUser />,
      },
      {
        path: '/mypage/leave',
        element: <Leave />,
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
