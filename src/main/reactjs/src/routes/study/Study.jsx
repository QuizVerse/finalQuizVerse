import MainHeader from "../../components/MainHeader";
import {Outlet} from "react-router-dom";
import CategoryHeader from "../../components/CategoryHeader";
import MainFooter from "../../components/MainFooter";

export default function Study() {
    return (
        <div className="min-h-screen bg-white">
            <MainHeader/>
            <div className="p-16">
                <Outlet/>
            </div>
            <MainFooter/>
        </div>
    )
}
