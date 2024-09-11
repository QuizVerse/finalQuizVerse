import MainHeader from "../../components/MainHeader";
import { Outlet, useLocation } from "react-router-dom";
import CategoryHeader from "../../components/CategoryHeader";
import Chatbot from "../../components/Chatbot";
import {Swiper, SwiperSlide} from "swiper/react";
import {Pagination} from "swiper/modules";
import React from "react";
import MainFooter from "../../components/MainFooter";  // 챗봇 컴포넌트 임포트

export default function Book() {
    const location = useLocation();

    // 메인 홈 주소일 때만 배너를 보여줌 (예: '/' 경로)
    const isHome = location.pathname === "/";

    return (
        <div className="min-h-screen">
            <MainHeader />
            <CategoryHeader />

            {/* 메인 홈 경로일 때만 배너를 렌더링 */}
            {isHome && (
                <Swiper
                    pagination={{ type: 'fraction' }}
                    navigation={true}
                    modules={[Pagination]}
                    className="mySwiper mb-8"
                    style={{ height: '500px' }}
                >
                    <SwiperSlide>
                        <img
                            src="/banner2.png"
                            style={{cursor: 'pointer'}}
                        />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img
                            src="/banner1.png"
                            style={{cursor: 'pointer'}}
                        />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img
                            src="/banner3.png"
                            style={{cursor: 'pointer'}}
                        />
                    </SwiperSlide>
                </Swiper>
            )}

            <div className="p-16">
                <Outlet />
            </div>

            {/* 챗봇을 화면의 오른쪽 하단에 고정 */}
            {/*<div className="fixed bottom-4 right-4">*/}
            {/*    <Chatbot />*/}
            {/*</div>*/}
            <MainFooter/>
        </div>
    );
}
