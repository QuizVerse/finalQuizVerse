import { useState } from 'react';
import { Fab } from "@mui/material";
import Chatbot from "../../components/Chatbot";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

export default function ChatbotModal() {
    // Chatbot 컴포넌트의 표시 여부를 제어하는 상태 변수
    const [isChatbotOpen, setIsChatbotOpen] = useState(false);

    // Chatbot의 표시 여부를 토글하는 함수
    const toggleChatbot = () => {
        setIsChatbotOpen(!isChatbotOpen);
    };

    return (
        <div className={"flex flex-col gap-4 items-end justify-end fixed p-8 right-0 bottom-0"}>
            {/* isChatbotOpen이 true일 때만 Chatbot 컴포넌트가 렌더링됩니다 */}
            {isChatbotOpen && <Chatbot />}
            {/* Fab 버튼을 클릭하면 toggleChatbot 함수가 호출됩니다 */}
            <Fab color="primary" aria-label="help" onClick={toggleChatbot}>
                <HelpOutlineIcon />
            </Fab>
        </div>
    );
}
