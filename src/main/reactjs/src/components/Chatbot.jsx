import { useState, useEffect } from 'react';
import { Avatar, Button, Fab, IconButton, TextField } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { useNavigate } from 'react-router-dom';

export default function Chatbot() {
    const [isChatbotOpen, setIsChatbotOpen] = useState(false); // 챗봇 열림/닫힘 상태 관리
    const [messages, setMessages] = useState([]); // 채팅 메시지 상태 관리
    const [userInput, setUserInput] = useState(''); // 사용자 입력 상태 관리
    const [dynamicButtons, setDynamicButtons] = useState([]); // 동적 버튼 상태 관리
    const [stompClient, setStompClient] = useState(null); // WebSocket 클라이언트 상태
    const [isConnected, setIsConnected] = useState(false); // 연결 상태 관리
    const navigate = useNavigate();

    useEffect(() => {
        const socket = new SockJS('/ws'); // SockJS를 통해 WebSocket 연결
        const client = new Client({
            webSocketFactory: () => socket,
            debug: (str) => {
                console.log(str);
            },
            reconnectDelay: 5000, // 자동 재연결 딜레이
            onConnect: () => {
                console.log('Connected to WebSocket');
                client.subscribe('/topic/public', (message) => {
                    handleReceiveMessage(message.body); // 서버 응답 처리
                });
                setIsConnected(true); // 연결 완료 상태 업데이트
            },
            onStompError: (frame) => {
                console.error('Broker error: ', frame.headers['message']);
                setIsConnected(false); // 연결 상태 끊김
            },
        });

        client.activate(); // WebSocket 연결 활성화
        setStompClient(client);

        return () => {
            if (stompClient && stompClient.connected) {
                stompClient.deactivate(); // WebSocket 연결 해제
            }
        };
    }, []);

    // 챗봇 열림/닫힘 상태를 토글하는 함수
    const toggleChatbot = () => {
        setIsChatbotOpen(!isChatbotOpen);
    };

    // 서버로 메시지를 전송하는 함수
    const handleSendMessage = () => {
        if (!userInput || !stompClient || !isConnected) {
            console.error('STOMP client is not connected or user input is empty.');
            return; // 빈 입력 및 stompClient가 없거나 연결되지 않았을 경우 무시
        }

        // 사용자가 입력한 메시지를 화면에 추가
        const newMessages = [
            ...messages,
            { sender: 'user', text: userInput } // 사용자 메시지 추가
        ];

        setMessages(newMessages); // 새로운 메시지 상태 업데이트

        // 서버로 메시지 전송 (STOMP 프로토콜 사용)
        stompClient.publish({
            destination: '/app/sendMessage',  // 서버의 @MessageMapping("/sendMessage")로 매핑된 경로
            body: userInput,  // 사용자 입력을 그대로 전송
        });

        setUserInput(''); // 입력 필드 초기화
    };

    // 서버에서 받은 메시지를 처리하는 함수
    const handleReceiveMessage = (chatMessage) => {
        const newMessages = [
            ...messages,
            { sender: 'bot', text: chatMessage } // 서버로부터 받은 메시지 추가
        ];

        setMessages(newMessages);
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
