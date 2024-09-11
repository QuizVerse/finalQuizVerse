import MainHeader from "../../components/MainHeader";
import { Outlet, useLocation } from "react-router-dom";
import CategoryHeader from "../../components/CategoryHeader";
import {Swiper, SwiperSlide} from "swiper/react";
import {Pagination} from "swiper/modules";
import React from "react";
import MainFooter from "../../components/MainFooter";
import {Link} from "react-router-dom";  // react-router-dom에서 Link 컴포넌트 임포트

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
                        <Link to={"/account/login"} className={"w-full"}>
                            <img src="/banner1.png"/>
                        </Link>
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
            <MainFooter/>
        </div>
    );
}
