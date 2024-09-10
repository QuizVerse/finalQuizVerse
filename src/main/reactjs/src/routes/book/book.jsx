import MainHeader from "../../components/MainHeader";
import { Outlet } from "react-router-dom";
import CategoryHeader from "../../components/CategoryHeader";
import Chatbot from "../../components/Chatbot";  // 챗봇 컴포넌트 임포트

export default function Book() {
    return (
        <div className="min-h-screen">
            <MainHeader />
            <CategoryHeader />
            <div className="p-16">
                <Outlet />
            </div>

            {/*/!* 챗봇을 화면의 오른쪽 하단에 고정 *!/*/}
            {/*<div className="fixed bottom-4 right-4">*/}
            {/*    <Chatbot />*/}
            {/*</div>*/}
        </div>
    );
}
