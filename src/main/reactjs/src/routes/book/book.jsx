import MainHeader from "../../components/MainHeader";
import { Outlet, useLocation } from "react-router-dom";
import CategoryHeader from "../../components/CategoryHeader";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules"; // Autoplay, Navigation 모듈 추가
import React, {useEffect, useState} from "react";
import MainFooter from "../../components/MainFooter";
import { Link } from "react-router-dom";
import axios from "axios";
import Chatbot from "../../components/Chatbot";  // react-router-dom에서 Link 컴포넌트 임포트

export default function Book() {
    const location = useLocation();

    // 메인 홈 주소일 때만 배너를 보여줌 (예: '/' 경로)
    const isHome = location.pathname === "/";
    const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const response = await axios.get('/book/username', {
                    validateStatus: status => status < 500
                });
                setIsLoggedIn(response.status === 200);
            } catch (error) {
                setIsLoggedIn(false);
            }
        };
        checkLoginStatus();
    }, []);

    return (
        <div className="min-h-screen">
            <MainHeader />
            <CategoryHeader />

            {/* 메인 홈 경로일 때만 배너를 렌더링 */}
            {isHome && (
                <Swiper
                    pagination={{ type: 'fraction' }}
                    navigation={true} // 네비게이션(넘기는 버튼) 추가
                    autoplay={{
                        delay: 3000, // 3초마다 슬라이드 전환
                        disableOnInteraction: false, // 사용자가 슬라이드를 넘기더라도 autoplay가 유지되도록 설정
                    }}
                    modules={[Pagination, Autoplay, Navigation]} // Autoplay와 Navigation 모듈 추가
                    className="mySwiper mb-8"
                    style={{ height: '500px' }}
                >

                    <SwiperSlide>
                        {isLoggedIn? (
                                <Link to={"/book/new"} className={"w-full"}>
                                    <img src="/banner1.png"/>
                                </Link>
                            ) : (
                                <Link to={"/account/login"} className={"w-full"}>
                                    <img src="/banner1.png"/>
                                </Link>
                            )
                        }
                    </SwiperSlide>
                    <SwiperSlide>
                        <Link to={"/account/login"} className={"w-full"}>
                            <img src="/banner2.png"/>
                        </Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Link to={"/study/list"} className={"w-full"}>
                            <img src="/banner3.png"/>
                        </Link>
                    </SwiperSlide>
                </Swiper>
            )}

            <div className="p-16">
                <Outlet />
            </div>
            <Chatbot/>
            <MainFooter/>
        </div>
    );
}
