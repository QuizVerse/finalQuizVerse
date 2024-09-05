import { useState } from 'react';
import { Avatar, Button, Fab, IconButton } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import CloseIcon from '@mui/icons-material/Close';  // 닫기 아이콘

export default function Chatbot() {
    const [isChatbotOpen, setIsChatbotOpen] = useState(false); // 챗봇 열림/닫힘 상태 관리
    const [response, setResponse] = useState(''); // 상태 관리: 보여줄 메시지

    // 챗봇 열림/닫힘 상태를 토글하는 함수
    const toggleChatbot = () => {
        setIsChatbotOpen(!isChatbotOpen);
    };

    // 버튼 클릭 시 호출되는 함수: 고정된 응답 설정
    const handleButtonClick = (message) => {
        setResponse(message);
    };

    return (
        <div className="fixed bottom-4 right-4 flex flex-col items-end">
            {/* 챗봇 열림 상태에 따라 내용 표시 */}
            <div
                className={`transition-all duration-500 ease-in-out transform ${isChatbotOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'} origin-bottom-right w-[300px] p-4 bg-blue-100 border border-blue-300 rounded-lg shadow-lg h-96 flex flex-col justify-between`}>
                {/* 오른쪽 상단의 닫기(X) 버튼 */}
                <div className="flex justify-between items-center">
                    <p className="text-sm">무엇이 궁금하신가요?</p>
                    <IconButton onClick={toggleChatbot}>
                        <CloseIcon />
                    </IconButton>
                </div>

                <div className="flex space-x-2 mb-4">
                    <Button variant="outlined" onClick={() => handleButtonClick('사용법에 대한 설명입니다.')}>사용법</Button>
                    <Button variant="outlined" onClick={() => handleButtonClick('문의 사항이 있습니다.')}>문의</Button>
                    <Button variant="outlined" onClick={() => handleButtonClick('클래스 관리를 설명합니다.')}>클래스 관리</Button>
                </div>

                <div className="flex items-center gap-2">
                    <input
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 flex-1"
                        placeholder="무엇이든 물어보세요."
                        disabled // 입력을 막기 위해 비활성화
                    />
                    <Button variant="contained">확인</Button>
                </div>

                {response && (
                    <div className="mt-4 p-2 bg-white border rounded">
                        <p>{response}</p>
                    </div>
                )}
            </div>

            {/* 챗봇이 닫혀 있을 때 로고 아이콘 표시 */}
            {!isChatbotOpen && (
                <Fab color="primary" aria-label="help" onClick={toggleChatbot}>
                    <HelpOutlineIcon />
                </Fab>
            )}
        </div>
    );
}
