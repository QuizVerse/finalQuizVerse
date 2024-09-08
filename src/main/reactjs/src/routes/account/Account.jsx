import {Outlet} from "react-router-dom";
import MainHeader from "../../components/MainHeader";

export default function Account() {
    return (
        <>
            <MainHeader/>
            <div className="flex flex-col items-center w-full min-h-screen">
                <Outlet/>
            </div>
        </>
    );
}