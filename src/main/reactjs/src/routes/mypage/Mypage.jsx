

import MypageSidebar from "../../components/MypageSidebar";
import {Outlet} from "react-router-dom";
import MainFooter from "../../components/MainFooter";

export default function Mypage() {
    return (
        <div className="flex min-h-screen">
            <MypageSidebar/>
            <Outlet/>
        </div>
    )
}