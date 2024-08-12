import Header from "../../components/Header";
import {Outlet} from "react-router-dom";
import CategoryHeader from "../../components/CategoryHeader";

export default function BookList() {
    return (
        <div className="min-h-screen bg-white">
            <Header/>
            <CategoryHeader/>
            <Outlet/>
        </div>
    )
}
