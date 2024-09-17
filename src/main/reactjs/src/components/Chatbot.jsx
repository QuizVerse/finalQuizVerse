import React, { useState, useEffect, useRef } from 'react';
import {Avatar, Button, Fab, IconButton, TextField, Tooltip} from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { useNavigate } from 'react-router-dom';
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

export default function Chatbot() {
    const [isChatbotOpen, setIsChatbotOpen] = useState(false); // 챗봇 열림/닫힘 상태 관리
    const [messages, setMessages] = useState([]); // 채팅 메시지 상태 관리
    const [userInput, setUserInput] = useState(''); // 사용자 입력 상태 관리
    const [dynamicButtons, setDynamicButtons] = useState([]); // 동적 버튼 상태 관리
    const [stompClient, setStompClient] = useState(null); // WebSocket 클라이언트 상태
    const [isConnected, setIsConnected] = useState(false); // 연결 상태 관리
    const navigate = useNavigate();
    let subscriptionRef = null; // 구독을 해제하기 위해 참조 저장

    // 채팅 창 스크롤을 제어하기 위한 Ref
    const chatEndRef = useRef(null);

    // 새로운 메시지가 추가될 때마다 스크롤을 가장 아래로 이동하는 함수
    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    // 섹션 접고 펴는 상태
    const [isCollapsed, setIsCollapsed] = useState(true);

    // 섹션 접고 펴는 함수
    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    useEffect(() => {
        const socket = new SockJS('/ws/stomp'); // SockJS를 통해 WebSocket 연결
        const client = new Client({
            webSocketFactory: () => socket,
            debug: (str) => {
                console.log(str);
            },
            reconnectDelay: 5000, // 자동 재연결 딜레이
            onConnect: () => {
                console.log('Connected to WebSocket');

                // 구독을 한 번만 설정하고, 구독 ID를 저장
                if (!subscriptionRef) {
                    subscriptionRef = client.subscribe('/topic/public', (message) => {
                        handleReceiveMessage(message.body); // 서버 응답 처리
                    });
                }

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
            // 컴포넌트가 언마운트될 때 구독 해제 및 WebSocket 연결 해제
            if (subscriptionRef) {
                subscriptionRef.unsubscribe(); // 구독 해제
                subscriptionRef = null;
            }
            if (stompClient && stompClient.connected) {
                stompClient.deactivate(); // WebSocket 연결 해제
            }
        };
    }, []);

    const toggleChatbot = () => {
        setIsChatbotOpen(!isChatbotOpen);
        if (!isChatbotOpen) {
            // 첫 번째 메시지: 환영 인사
            setMessages((prevMessages) => [
                ...prevMessages,
                { sender: 'bot', text: "안녕하세요, 퀴즈버스에 오신 것을 환영합니다!\n무엇을 도와드릴까요?" }
            ]);

            setDynamicButtons([
                { label: '회원 가입', value: '회원 가입' },
                { label: '문제집 생성', value: '문제집 생성' },
                { label: '화상스터디', value: '화상스터디' }
            ]);
        }
    };

    // 버튼 클릭 시 서버로 메시지 전송
    const handleButtonClick = (value) => {
        setMessages((prevMessages) => [
            ...prevMessages,
            { sender: 'user', text: value } // 사용자 선택 메시지 추가
        ]);

        if (stompClient && isConnected) {
            stompClient.publish({
                destination: '/app/sendMessage',  // 서버의 @MessageMapping("/sendMessage")로 매핑된 경로
                body: value,  // 버튼으로 선택한 질문을 서버로 전송
            });
        }
    };

    // 서버로 메시지를 전송하는 함수
    const handleSendMessage = () => {
        if (!userInput || !stompClient || !isConnected) {
            console.error('STOMP client is not connected or user input is empty.');
            return; // 빈 입력 및 stompClient가 없거나 연결되지 않았을 경우 무시
        }

        // 사용자 메시지를 기존 메시지 목록에 추가
        setMessages((prevMessages) => [
            ...prevMessages,
            { sender: 'user', text: userInput } // 사용자 메시지 추가
        ]);

        // 서버로 메시지 전송 (STOMP 프로토콜 사용)
        stompClient.publish({
            destination: '/app/sendMessage',  // 서버의 @MessageMapping("/sendMessage")로 매핑된 경로
            body: userInput,  // 사용자 입력을 그대로 전송
        });

        setUserInput(''); // 입력 필드 초기화
    };

    // 서버에서 받은 메시지를 처리하는 함수
    const handleReceiveMessage = (chatMessage) => {
        console.log("Received message from server:", chatMessage); // 서버 메세지 확인
        // 서버 응답 메시지를 기존 메시지 목록에 추가
        setMessages((prevMessages) => [
            ...prevMessages,
            { sender: 'bot', text: chatMessage } // 서버로부터 받은 메시지 추가
        ]);
    };

    // 새로운 메시지가 추가될 때마다 자동으로 스크롤을 아래로 이동
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <div className="fixed bottom-4 right-4 flex flex-col items-end" style={{ zIndex: 9999 }}>
            {isChatbotOpen && (
                <div className="w-[360px] p-4 bg-[#E0F1FF] border border-blue-300 rounded-lg flex flex-col justify-between">
                    <div>
                        <div className={"flex justify-between items-center mb-4"}>
                            <img src="/logooo.png" alt="quizverse" width={"150px"}/>

                            <Tooltip title="나가기">
                                <IconButton onClick={() => setIsChatbotOpen(false)}>
                                    <CloseIcon/>
                                </IconButton>
                            </Tooltip>
                        </div>


                        {/* 채팅 메시지 창 */}
                        <div className="flex flex-col gap-2 overflow-y-auto mb-4 h-[300px]">
                            {messages.map((message, index) => (
                                <div key={index} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`p-2 rounded-lg ${message.sender === 'user' ? 'bg-[#1F4976] text-white' : 'bg-white'}`}>
                                        {message.text}
                                    </div>
                                </div>
                            ))}
                            {/* 스크롤을 이동시키기 위한 Ref를 여기 추가 */}
                            <div ref={chatEndRef} />
                        </div>

                        {/* 동적 버튼들 */}
                        <div className="space-y-2 mb-4">
                            <Button
                                fullWidth
                                onClick={toggleCollapse}>
                                <span className={"whitespace-nowrap"}>자주묻는 질문</span>
                                {isCollapsed ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                            </Button>
                            {!isCollapsed && (
                                dynamicButtons.map((button, index) => (
                                    <Button
                                        key={index}
                                        variant="outlined"
                                        fullWidth
                                        onClick={() => handleButtonClick(button.value)}>
                                        {button.label}
                                    </Button>))
                            )}
                        </div>
                    </div>

                    {/* 메시지 입력창 및 전송 버튼 */}
                    <div className="flex items-center gap-2">
                        <TextField
                            variant={"outlined"}
                            size={"small"}
                            placeholder="메시지를 입력하세요..."
                            value={userInput}
                            className={"bg-white"}
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

            {!isChatbotOpen && (
                <Fab color="primary" aria-label="help" onClick={toggleChatbot}>
                    <HelpOutlineIcon />
                </Fab>
            )}
        </div>
    );
}