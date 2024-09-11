import {Outlet} from "react-router-dom";
import MainHeader from "../../components/MainHeader";
import MainFooter from "../../components/MainFooter";

export default function Account() {
    return (
        <>
            <MainHeader/>
            <div className="flex flex-col items-center w-full min-h-screen">
                <Outlet/>
            </div>
            <MainFooter/>
        </>
    );
}