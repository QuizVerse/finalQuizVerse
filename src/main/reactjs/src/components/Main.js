import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SideBar from '../page/SideBar';
import MyPage from '../page/MyPage';
import MyExam from '../page/MyExam';
import MyLearn from '../page/MyLearn';
import MyClass from '../page/MyClass';
import BookMark from '../page/BookMark';
import Wrong from '../page/Wrong';
import UserInfo from '../page/UserInfo';
import UserLeave from '../page/UserLeave';

const Main = () => {
    return (
        <div className="container">
        <BrowserRouter>
            <SideBar />
            <div className="content">
                <Routes>
                    <Route path="/mypage" element={<MyPage />} />
                    <Route path="/myexam" element={<MyExam />} />
                    <Route path="/mylearn" element={<MyLearn />} />
                    <Route path="/myclass" element={<MyClass />} />
                    <Route path="/bookmark" element={<BookMark />} />
                    <Route path="/wrong" element={<Wrong />} />
                    <Route path="/userinfo" element={<UserInfo />} />
                    <Route path="/userleave" element={<UserLeave />} />
                </Routes>
            </div>
        </BrowserRouter>
    </div>
    );
};

export default Main;