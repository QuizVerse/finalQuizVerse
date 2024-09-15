import "./StudyRoom.css";
import { useEffect, useRef, useState } from "react";
import ChatComponent from "./component/ChatPanel";
import RoomControlPanel from "./component/RoomControlPanel";
import RoomView from "./component/RoomView";
import JoinRoom from "./component/JoinRoom";

let APPLICATION_SERVER_URL = "";
let LIVEKIT_URL = "";
configureUrls();

  function configureUrls() {
      APPLICATION_SERVER_URL = "https://www.quizverse.kro.kr/";
      LIVEKIT_URL = "wss://openvidu.openvidu.kro.kr/";
  }

export default function StudyRoom() {
    const [isMicOn, setIsMicOn] = useState(false);
    const [isCamOn, setIsCamOn] = useState(true);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');

    const toggleMic = () => setIsMicOn(!isMicOn);
    const toggleCam = () => setIsCamOn(!isCamOn);
    const sendMessage = (e) => {
        e.preventDefault();
        if (message.trim()) {
            setMessages([...messages, message]);
            setMessage('');
        }
    };

    return (
        <div className="study-room">
            {/* 방 입장 전 */}
            {!isCamOn ? (
                <JoinRoom
                    participantName="John Doe"
                    participantImage="your_image_url"
                    photopath="your_photopath"
                    isMicOn={isMicOn}
                    isCamOn={isCamOn}
                    toggleMic={toggleMic}
                    toggleCam={toggleCam}
                    joinRoom={() => console.log("Join Room")}
                />
            ) : (
                // 방 내부
                <RoomView
                    roomName="Study Room"
                    isCamOn={isCamOn}
                    localTrack={null}
                    remoteTracks={[]}
                    cameraStatus={{}}
                    screenTrack={null}
                />
            )}

            {/* 방 내부 컨트롤 패널 */}
            <RoomControlPanel
                toggleMic={toggleMic}
                toggleCam={toggleCam}
                toggleScreenSharing={() => {}}
                leaveRoom={() => {}}
                isCamOn={isCamOn}
                isMicOn={isMicOn}
                isScreenSharing={false}
            />

            {/* 채팅 컴포넌트 */}
            <ChatComponent
                messages={messages}
                message={message}
                setMessage={setMessage}
                sendMessage={sendMessage}
            />
        </div>
    );
}
