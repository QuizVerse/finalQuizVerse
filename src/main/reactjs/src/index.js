import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import ErrorPage from './routes/ErrorPage404';

// account 관련 컴포넌트
import Account from "./routes/account/Account";
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
import Book from "./routes/book/book";
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
import Mypage from "./routes/mypage/Mypage";
import DevTest from "./routes/devtest/DevTest";
import UseModal from "./routes/devtest/UseModal";
import UseCustomInput from "./routes/devtest/UseCustomInput";
import PrivateRoute from "./components/PrivateRoute";

// Test 관련 컴포넌트
import Pagenation from './routes/devtest/Pagenation';
import MakeLeave from './routes/devtest/MakeLeave';
import BookmarkDemo from "./routes/devtest/BookmarkDemo";
import ReactDnd from "./routes/devtest/ReactDnd";
import ReviewModal from "./routes/devtest/ReviewModal";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Book />,
        errorElement: <ErrorPage />,
        children: [{
            path: "",
            element: <BookList/>
        }]
    },
    {   // 개발 중 테스트가 필요한 경우 사용
        path: "/devtest",
        element: <DevTest />,
        errorElement: <ErrorPage />,

        children: [
            {
                path: "/devtest/pagenation",
                element: <Pagenation/>
            },
            {
                path: "/devtest/usemodal",
                element: <UseModal/>
            },
            {
                path: "/devtest/makeleave",
                element: <MakeLeave/>
            },
            {
                path: "/devtest/usecustominput",
                element: <UseCustomInput/>
            },
            {
                path: "/devtest/bookmarkdemo",
                element: <BookmarkDemo/>
            },
            {
                path: "/devtest/reactdnd",
                element: <ReactDnd/>
            },
            {
                path: "/devtest/reviewmodal",
                element: <ReviewModal/>
            },
        ]

    },
    {
        path: "/account",
        element: <Account />,
        errorElement: <ErrorPage />,
        children :[
            {
                path: "",
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
        ]
    },
    {
        path: "/book",
        element: <Book />,
        errorElement: <ErrorPage />,
        children :[
            {
                path: "",
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
                path: '/book/questionpreview',
                element: <QuestionPreview />,
                errorElement: <ErrorPage />,
            },
            {
                path: '/book/test',
                element: <Test />,
                errorElement: <ErrorPage />,
            },
            {
                path: '/book/score',
                element: <Score />,
                errorElement: <ErrorPage />,
            },
            {
                path: '/book/scorepreview',
                element: <ScorePreview />,
                errorElement: <ErrorPage />,
            },
            {
                path: '/book/result',
                element: <Result />,
                errorElement: <ErrorPage />,
            },
            {
                path: '/book/explanation',
                element: <Explanation />,
                errorElement: <ErrorPage />,
            },
            {
                path: '/book/searchbook',
                element: <SearchBook />,
                errorElement: <ErrorPage />,
            },
            {
                path: '/book/category',
                element: <Category />,
                errorElement: <ErrorPage />,
            },
        ]
    },
    {
        path: "/study",
        element: <StudyList />,
        errorElement: <ErrorPage />,
        children : [
            {
                path: '',
                element: <StudyList />,
                errorElement: <ErrorPage />,
            },
            {
                path: '/study/list',
                element: <StudyList />,
                errorElement: <ErrorPage />,
            },
            {
                path: '/study/room',
                element: <StudyRoom />,
                errorElement: <ErrorPage />,
            },
            {
                path: '/study/searchroom',
                element: <SearchRoom />,
                errorElement: <ErrorPage />,
            },

        ]
    },
    {

        path: "/mypage",
        element: (

            <Mypage />

        ),
        errorElement: <ErrorPage />,
        children :[
            {
                path: "",
                element: <Summary />,
                errorElement: <ErrorPage />,
            },
            {
                path: '/mypage/summary',
                element: <Summary />,
                errorElement: <ErrorPage />,
            },
            {
                path: '/mypage/publishedbook',
                element: <PublishedBook />,
                errorElement: <ErrorPage />,
            },
            {
                path: '/mypage/solvedbook',
                element: <SolvedBook />,
                errorElement: <ErrorPage />,
            },
            {
                path: '/mypage/myclass',
                element: <Myclass />,
                errorElement: <ErrorPage />,
            },
            {
                path: '/mypage/myclass/detail',
                element: <MyclassDetail />,
                errorElement: <ErrorPage />,
            },
            {
                path: '/mypage/bookmark',
                element: <Bookmark />,
                errorElement: <ErrorPage />,
            },
            {
                path: '/mypage/wrong',
                element: <Wrong />,
                errorElement: <ErrorPage />,
            },
            {
                path: '/mypage/testwrong',
                element: <TestWrong />,
                errorElement: <ErrorPage />,
            },
            {
                path: '/mypage/updateuser',
                element: <UpdateUser />,
                errorElement: <ErrorPage />,
            },
            {
                path: '/mypage/leave',
                element: <Leave />,
                errorElement: <ErrorPage />,
            },
        ]
    }
      

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
