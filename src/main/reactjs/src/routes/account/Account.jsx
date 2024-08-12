import {Outlet} from "react-router-dom";
import Header from "../../components/Header";

export default function Account() {
    return (
        <div className="flex flex-col items-center w-full min-h-screen bg-white">
            <Header/>
            <Outlet/>
        </div>

    );
}