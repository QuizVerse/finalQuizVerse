import MainHeader from "../../components/MainHeader";
import {Outlet} from "react-router-dom";
import CategoryHeader from "../../components/CategoryHeader";

export default function Book() {
    return (
        <div className="min-h-screen bg-white">
            <MainHeader/>
            <CategoryHeader/>
            <div className="p-16">
                <Outlet/>
            </div>

        </div>
    )
}
