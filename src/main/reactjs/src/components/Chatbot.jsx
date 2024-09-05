import { useState } from 'react';
import { Avatar, Button, Fab, IconButton, TextField } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import { useNavigate } from 'react-router-dom'; // 페이지 이동을 위한 useNavigate 훅

export default function Chatbot() {
    const [isChatbotOpen, setIsChatbotOpen] = useState(false); // 챗봇 열림/닫힘 상태 관리
    const [messages, setMessages] = useState([]); // 채팅 메시지 상태 관리
    const [userInput, setUserInput] = useState(''); // 사용자 입력 상태 관리
    const [dynamicButtons, setDynamicButtons] = useState([]); // 동적 버튼 상태 관리
    const navigate = useNavigate(); // 페이지 이동을 위한 훅

    // 챗봇 열림/닫힘 상태를 토글하는 함수
    const toggleChatbot = () => {
        setIsChatbotOpen(!isChatbotOpen);
    };

    // 사용자의 메시지 입력 및 챗봇 응답 추가 함수
    const handleSendMessage = () => {
        if (!userInput) return; // 빈 입력은 무시

        const newMessages = [
            ...messages,
            { sender: 'user', text: userInput }, // 사용자 메시지 추가
            { sender: 'bot', text: generateResponse(userInput) } // 챗봇의 응답 추가
        ];

        setMessages(newMessages);
        generateButtons(userInput); // 입력에 따라 버튼 생성
        setUserInput(''); // 입력 필드 초기화
    };

    // 간단한 챗봇 응답 생성 함수
    const generateResponse = (input) => {
        if (input.toLowerCase().includes('회원가입')) {
            return '회원가입 페이지로 이동할 수 있습니다.';
        } else if (input.toLowerCase().includes('로그인')) {
            return '로그인 페이지로 이동할 수 있습니다.';
        } else if (input.toLowerCase().includes('책 목록')) {
            return '책 목록 페이지로 이동할 수 있습니다.';
        } else {
            return '해당 명령을 이해하지 못했습니다. 다른 명령을 시도해 주세요.';
        }
    };

    // 사용자의 입력에 따라 동적 버튼 생성
    const generateButtons = (input) => {
        if (input.toLowerCase().includes('회원가입')) {
            setDynamicButtons([
                { label: '회원가입으로 이동', path: '/account/signup' }
            ]);
        } else if (input.toLowerCase().includes('로그인')) {
            setDynamicButtons([
                { label: '로그인으로 이동', path: '/account/login' }
            ]);
        } else if (input.toLowerCase().includes('책 목록')) {
            setDynamicButtons([
                { label: '책 목록으로 이동', path: '/book/list' }
            ]);
        } else {
            setDynamicButtons([]); // 매칭되는 게 없으면 버튼을 제거
        }
    };

    // 페이지 이동 함수
    const handleNavigation = (path) => {
        navigate(path); // 주어진 경로로 이동
        toggleChatbot(); // 이동 후 챗봇을 닫기
    };

    return (
        <div className="fixed bottom-4 right-4 flex flex-col items-end" style={{ zIndex: 9999 }}>
            {/* 챗봇 열림 상태에 따라 내용 표시 */}
            {isChatbotOpen && (
                <div className={`transition-all duration-500 ease-in-out transform scale-100 opacity-100 w-[350px] p-4 bg-white border border-blue-300 rounded-lg shadow-lg h-[500px] flex flex-col justify-between`}>
                    {/* 오른쪽 상단의 닫기(X) 버튼 */}
                    <div className="flex justify-between items-center mb-2">
                        <p className="text-sm font-bold">챗봇</p>
                        <IconButton onClick={toggleChatbot}>
                            <CloseIcon />
                        </IconButton>
                    </div>

                    {/* 채팅 메시지 창 */}
                    <div className="flex flex-col gap-2 overflow-y-auto mb-4" style={{ height: '300px' }}>
                        {messages.map((message, index) => (
                            <div key={index} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`p-2 rounded-lg ${message.sender === 'user' ? 'bg-blue-100' : 'bg-gray-200'}`}>
                                    {message.text}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* 동적 버튼들 */}
                    <div className="flex flex-col gap-2 mb-4">
                        {dynamicButtons.map((button, index) => (
                            <Button key={index} variant="outlined" onClick={() => handleNavigation(button.path)}>
                                {button.label}
                            </Button>
                        ))}
                    </div>

                    {/* 메시지 입력창 및 전송 버튼 */}
                    <div className="flex items-center gap-2">
                        <TextField
                            fullWidth
                            placeholder="메시지를 입력하세요..."
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') handleSendMessage();
                            }}
                        />
                        <Button variant="contained" onClick={handleSendMessage}>
                            <SendIcon />
                        </Button>
                    </div>
                </div>
            )}

            {/* 챗봇이 닫혀 있을 때 로고 아이콘 표시 */}
            {!isChatbotOpen && (
                <Fab color="primary" aria-label="help" onClick={toggleChatbot}>
                    <HelpOutlineIcon />
                </Fab>
            )}
        </div>
    );
}
