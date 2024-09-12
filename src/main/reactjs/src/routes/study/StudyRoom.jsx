import {
    LocalAudioTrack,
    LocalVideoTrack,
    Room,
    RoomEvent,
    Track
} from "livekit-client";
import "./StudyRoom.css";
import { useEffect, useRef, useState } from "react";
import VideoComponent from "../../components/VideoComponent";
import AudioComponent from "../../components/AudioComponent";
import ShareVideoComponent from "../../components/ShareVideoComponent";
import StartVideoComponent from "../../components/StartVideoComponent";
import { LiveKitRoom, LayoutContextProvider, ScreenShareIcon, StopScreenShareIcon } from "@livekit/components-react";
import axios from "axios";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { AppBar, Box, Button, IconButton, Toolbar, Typography } from "@mui/material";
import {
    Videocam as VideocamIcon,
    VideocamOff as VideocamOffIcon,
    Mic as MicIcon,
    MicOff as MicOffIcon,
    ExitToApp as ExitToAppIcon
} from '@mui/icons-material';
import VideoComponentcopy from "../../components/VideoComponent copy";
import Brightness1Icon from '@mui/icons-material/Brightness1';


let APPLICATION_SERVER_URL = "";
let LIVEKIT_URL = "";
configureUrls();

//   function configureUrls() {
//       APPLICATION_SERVER_URL = "https://www.quizverse.kro.kr/";
//       LIVEKIT_URL = "wss://openvidu.openvidu.kro.kr/";
//   }

function configureUrls() {
    APPLICATION_SERVER_URL = "http://localhost:3000/";
    LIVEKIT_URL = "wss://openvidu.openvidu.kro.kr/";
}

export default function StudyRoom() {
    const [room, setRoom] = useState(undefined);
    const [localTrack, setLocalTrack] = useState(undefined);
    const [localAudioTrack, setLocalAudioTrack] = useState(null);
    const [remoteTracks, setRemoteTracks] = useState([]);
    const [participantName, setParticipantName] = useState("");
    const [participantImage, setParticipantImage] = useState("");
    const [roomName, setRoomName] = useState("");
    const [token, setToken] = useState(null);
    const [isCameraEnabled, setIsCameraEnabled] = useState(true);
    const [screenTrack, setScreenTrack] = useState(null);
    const [previewStream, setPreviewStream] = useState(undefined); // 추가: 미리보기 상태
    const { study_id } = useParams(); // URL에서 studyId 추출
    const [isMicrophoneMuted, setIsMicrophoneMuted] = useState(false);
    const navi = useNavigate();
    const photopath = "https://kr.object.ncloudstorage.com/bitcamp701-129/final/user";

    // 마이크 상태를 관리하는 state (초기값: off)
    const [isMicOn, setIsMicOn] = useState(false);

    // 마이크 상태를 토글하는 함수
    const toggleMic = (e) => {
        e.preventDefault(); // 폼 제출 방지
        setIsMicOn((prevState) => !prevState); // 이전 상태를 반대로 변경
    };

    // 카메라 상태를 관리하는 state (초기값: off)
    const [isCamOn, setIsCamOn] = useState(false);

    // 카메라 상태를 토글하는 함수
    const toggleCam = async (e) => {
        e.preventDefault(); // 폼 제출 방지
        if (isCamOn) {
            startVideoPreview();
        } else {
            await stopVideoPreview();
        }
        setIsCamOn((prevState) => !prevState); // 이전 상태를 반대로 변경

        // 카메라 상태를 웹소켓을 통해 서버로 전송
        if (socket) {
            const message = JSON.stringify({
                type: 'camera_status',
                participantName: participantName,
                isCamOn: !isCamOn, // 새로운 상태를 서버로 전송
            });
            socket.send(message);
        }
    };

    //사용자 정보를 가져오는 함수
    const getUserDto = () => {
        axios.get(`/book/username`).then((res) => {
            //닉네임 불러오기
            setParticipantName(res.data.userNickname);
            //프로필 사진불러오기 
            setParticipantImage(res.data.userImage);
        });
    };
    const location = useLocation();
    useEffect(() => {
        getUserDto();
        if (location.state?.studyTitle) {
            setRoomName(location.state.studyTitle);
        }
    }, [location.state?.studyTitle]);

    // 방에 참가하기 전 카메라 미리보기 활성화 함수
    const startVideoPreview = async () => {
        try {
            // 사용자의 비디오 장치에서 비디오 스트림을 생성
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            setPreviewStream(stream); // 미리보기 스트림 설정
        } catch (error) {
            console.error("비디오 미리보기를 활성화할 수 없습니다:", error);
        }
    };

    // 방에 참가하지 않으면 미리보기 종료
    const stopVideoPreview = async () => {
        if (previewStream) {
            previewStream.getTracks().forEach((track) => track.stop());
            setPreviewStream(null);
        }
    };

    useEffect(() => {
        if (!room) {
            startVideoPreview(); // 방에 참가하지 않은 상태에서는 미리보기를 시작
        } else {
            stopVideoPreview(); // 방에 참가할 경우 미리보기 중지
        }

        return () => stopVideoPreview(); // 컴포넌트 언마운트 시 미리보기 종료
    }, [room]); // room 상태 변경에 따라 미리보기 상태를 관리

    async function joinRoom() {
        // 새 Room 객체 초기화
        const room = new Room();
        setRoom(room);

        // Room에서 이벤트 발생 시 동작 지정
        // 새로운 Track을 받을 때...
        room.on(
            RoomEvent.TrackSubscribed,
            (_track, publication, participant) => {
                //console.log("수신된 트랙 소스:", publication.source, "트랙 ID:", publication.trackSid);
                if (publication.source === Track.Source.ScreenShare) {
                    console.log("화면 공유 트랙이 수신되었습니다. 트랙 ID:", publication.trackSid);
                    setSharedScreenTrackSid(publication.trackSid); // 공유 트랙 ID 저장
                    setScreenSharingParticipant(participant.identity); // 화면 공유 중인 참가자 저장
                }
                setRemoteTracks((prev) => [
                    ...prev,
                    { trackPublication: publication, participantIdentity: participant.identity }
                ]);
            }
        );

        // Track이 삭제될 때...
        room.on(RoomEvent.TrackUnsubscribed, (_track, publication) => {
            if (publication.source === Track.Source.ScreenShare) {
                setSharedScreenTrackSid(null); // 공유 트랙 ID 초기화
                setScreenSharingParticipant(null); // 화면 공유 중인 참가자 초기화
            }
            setRemoteTracks((prev) => prev.filter((track) => track.trackPublication.trackSid !== publication.trackSid));
        });

        try {
            // 방 이름과 참가자 이름으로 애플리케이션 서버에서 토큰 가져오기
            const token = await getToken(roomName, participantName);
            setToken(token);

            // LiveKit URL과 토큰으로 방에 연결
            await room.connect(LIVEKIT_URL, token);

            // 카메라와 마이크 활성화
            await room.localParticipant.enableCameraAndMicrophone();
            // 로컬 비디오 트랙 가져오기
            const LocalVideoTrack = room.localParticipant.videoTrackPublications.values().next().value?.videoTrack;
            if (LocalVideoTrack) {
                setLocalTrack(LocalVideoTrack);
            } else {
                console.warn("참가자의 비디오 트랙을 찾을 수 없습니다.");
            }
        } catch (error) {
            console.log("방에 연결하는 중 오류가 발생 : ", error.message);
            await leaveRoom();
        }
    }

    //방 나가기
    async function leaveRoom(study_id) {
        console.log("Received studyId:", study_id); // studyId 값 출력
        // 서버에 스터디 멤버 삭제 요청
        await axios.post(`/studys/removes?studyId=${study_id}`);
        // 'disconnect' 메서드를 호출하여 방에서 나가기
        await room?.disconnect();
        // 비디오 미리보기 종료
        stopVideoPreview(); // 추가: 미리보기 종료
        // 상태 초기화
        setRoom(undefined);
        setLocalTrack(undefined);
        setPreviewStream(undefined);
        setRemoteTracks([]);
        //공유화면 정리
        if (isScreenSharing && screenTrack) {
            await screenTrack.stop();
            setScreenTrack(null);
        }
        navi(`/study/list`);
    }

    async function getToken(roomName, participantName) {
        try {
            const response = await fetch(APPLICATION_SERVER_URL + "token", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    roomName: roomName,
                    participantName: participantName
                })
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(`토큰 가져오기 실패: ${error.errorMessage}`);
            }

            const data = await response.json();
            return data.token;
        } catch (error) {
            console.error("토큰 가져오기 실패:", error);
            throw error;
        }
    }
    async function sendScreenShareStatus(roomName, participantName, isSharing) {
        console.log(`화면 공유 상태 전송: ${isSharing ? '시작' : '중지'}`);
        try {
            console.log(`보낼 데이터:`, JSON.stringify({ roomName, participantName, isSharing }));
            // 서버에 화면 공유 상태를 전송하는 API 요청
            const response = await fetch(APPLICATION_SERVER_URL + "screen-share", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    roomName: roomName,
                    participantName: participantName,
                    isSharing: isSharing // true면 화면 공유 시작, false면 중지
                })
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(`화면 공유 상태 전송 실패: ${error.errorMessage}`);
            }

            const data = await response.json();
            return data.success;
        } catch (error) {
            console.error("화면 공유 상태 전송 실패:", error);
            throw error;
        }
    }
    // 마이크 음소거 기능
    const toggleMicrophone = async () => {
        if (isMicrophoneMuted) {
            // 마이크 켜기
            if (!localAudioTrack) {
                const mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
                const track = mediaStream.getAudioTracks()[0];
                const audioTrack = new LocalAudioTrack(track);
                await room.localParticipant.publishTrack(audioTrack);
                setLocalAudioTrack(audioTrack);
            } else {
                if (localAudioTrack.mediaStreamTrack) {
                    localAudioTrack.mediaStreamTrack.enabled = true;
                }
            }
            setIsMicrophoneMuted(false);
        } else {
            // 마이크 끄기
            if (localAudioTrack) {
                await room.localParticipant.unpublishTrack(localAudioTrack);
                if (localAudioTrack.mediaStreamTrack) {
                    localAudioTrack.mediaStreamTrack.enabled = false;
                }
                localAudioTrack.stop();
                setLocalAudioTrack(null);
            }
            setIsMicrophoneMuted(true);
        }
        // 상대방 오디오 음소거 제어
        remoteTracks.forEach(remoteTrack => {
            if (remoteTrack.trackPublication.kind === "audio") {
                remoteTrack.trackPublication.audioTrack.mediaStreamTrack.enabled = !isMicrophoneMuted;
            }
        });
    };

    const [isScreenSharing, setIsScreenSharing] = useState(false);
    const [sharedScreenTrackSid, setSharedScreenTrackSid] = useState(null); // 현재 화면 공유 중인 트랙 ID
    const [screenSharingParticipant, setScreenSharingParticipant] = useState(null); // 현재 화면 공유 중인 참가자

    // 화면 공유
    async function toggleScreenSharing() {
        try {
            if (isScreenSharing && screenTrack) {
                // 화면 공유 중지
                screenTrack.stop(); // 트랙 중지
                await room.localParticipant.unpublishTrack(screenTrack); // 방에서 공유 해제
                setScreenTrack(null); // 상태 초기화
                setIsScreenSharing(false);
                await sendScreenShareStatus(roomName, participantName, false); // 중지 상태 전송
            } else {
                // 화면 공유 시작
                try {
                    const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
                    const screenTrack = stream.getVideoTracks()[0];

                    // 트랙을 '화면 공유' 소스로 설정하여 게시
                    await room.localParticipant.publishTrack(screenTrack, { source: Track.Source.ScreenShare });

                    setScreenTrack(screenTrack);
                    setIsScreenSharing(true);
                    await sendScreenShareStatus(roomName, participantName, true); // 시작 상태 전송
                } catch (error) {
                    console.error("화면 공유 시작 중 에러 발생:", error);
                    alert("화면 공유를 시작하는 동안 문제가 발생했습니다. 권한을 허용했는지 확인하세요.");
                }
            }
        } catch (error) {
            console.error("화면 공유 토글 중 에러 발생:", error);
            alert("화면 공유 상태를 변경하는 동안 문제가 발생했습니다.");
        }
    }

    // 원격 비디오 트랙을 렌더링하기 위한 조건
    const isRegularVideoTrack = (track, sharedScreenTrackSid) => {
        return track.trackPublication.kind === "video" &&
            track.trackPublication.videoTrack &&
            track.trackPublication.trackSid !== sharedScreenTrackSid;
    };

    // 원격 오디오 트랙을 렌더링하기 위한 조건
    const isAudioTrack = (track) => {
        return track.trackPublication.kind === "audio" &&
            track.trackPublication.audioTrack;
    };

    // 화면 공유 비디오 트랙을 모든 참가자에게 렌더링
    const getSharedScreenTracks = (remoteTracks, sharedScreenTrackSid) => {
        console.log("현재 공유된 화면 트랙 ID:", sharedScreenTrackSid);
        console.log("원격 트랙:", remoteTracks);

        return remoteTracks.filter(track => {
            const isScreenShare = track.trackPublication.kind === "video" &&
                track.trackPublication.videoTrack &&
                track.trackPublication.trackSid === sharedScreenTrackSid;
            console.log("트랙이 화면 공유인지 확인:", isScreenShare, "트랙 ID:", track.trackPublication.trackSid);
            return isScreenShare;
        });
    };
    // 화면 공유 WebSocket
    useEffect(() => {
        //const screenShareWs = new WebSocket('wss://www.quizverse.kro.kr/ws/screen-share');
        const screenShareWs = new WebSocket('ws://localhost:9002/ws/screen-share');

        screenShareWs.onopen = () => {
            console.log('화면 공유 웹소켓 연결이 설정되었습니다.');
        };

        screenShareWs.onmessage = (event) => {
            const message = JSON.parse(event.data);
            console.log('화면 공유 메시지 수신됨:', message);
            // 화면 공유 상태 업데이트 로직
            if (message.isSharing) {
                console.log(`${message.participantName}가 화면 공유를 시작했습니다.`);
                // 화면 공유 트랙을 설정
                setSharedScreenTrackSid(message.trackSid);  // 해당 트랙 ID 저장
                setScreenSharingParticipant(message.participantName);  // 화면 공유 중인 사람 설정
                setIsScreenSharing(true);  // 화면 공유 상태로 설정
            } else {
                console.log(`${message.participantName}가 화면 공유를 중지했습니다.`);
                // 화면 공유 중지 처리
                setSharedScreenTrackSid(null);  // 트랙 ID 초기화
                setScreenSharingParticipant(null);  // 공유 중인 참가자 초기화
                setIsScreenSharing(false);  // 화면 공유 상태 해제
            }
        };

        screenShareWs.onclose = () => {
            console.log('화면 공유 웹소켓 연결이 종료되었습니다.');
        };

        screenShareWs.onerror = (error) => {
            console.error('화면 공유 웹소켓 오류 발생:', error);
        };

        return () => {
            screenShareWs.close(); // 컴포넌트가 언마운트될 때 연결 종료
        };
    }, [participantName]);

    //채팅
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        //const ws = new WebSocket('wss://www.quizverse.kro.kr/ws/chat');
        const ws = new WebSocket('ws://localhost:9002/ws/chat');

        ws.onopen = () => {
            console.log('웹소켓 연결이 설정되었습니다.');
        };

        ws.onmessage = (event) => {
            console.log('메시지 수신됨:', event.data);
            setMessages(messages.concat([event.data]));
        };

        ws.onclose = () => {
            console.log('웹소켓 연결이 종료되었습니다.');
        };

        ws.onerror = (error) => {
            console.error('웹소켓 오류 발생:', error);
        };

        setSocket(ws);

        return () => {
            ws.close();
        };
    }, [participantName, messages]);

    const sendMessage = (e) => {
        e.preventDefault();
        if (socket && message) {
            let sending = participantName + " : " + message;
            socket.send(sending);
            setMessage(''); // 메시지 입력란 비우기
        }
        else {
            console.warn('소켓이 열려 있지 않거나 메시지가 비어 있습니다.');
        }
    };

    useEffect(() => {
        // 웹소켓 연결 설정
        //const ws = new WebSocket('wss://www.quizverse.kro.kr/ws/camera');
        const ws = new WebSocket('ws://localhost:9002/ws/camera');

        ws.onopen = () => {
            console.log('카메라 상태 웹소켓 연결이 설정되었습니다.');
        };

        ws.onmessage = (event) => {
            const message = JSON.parse(event.data);
            console.log('카메라 상태 메시지 수신됨:', message);

            // 다른 참가자의 카메라 상태를 업데이트
            if (message.type === 'camera_status') {
                if (message.participantName !== participantName) {
                    // 카메라 상태를 업데이트
                    updateCameraStatus(message.participantName, message.isCamOn);
                }
            }
        };

        ws.onclose = () => {
            console.log('카메라 상태 웹소켓 연결이 종료되었습니다.');
        };

        ws.onerror = (error) => {
            console.error('카메라 상태 웹소켓 오류 발생:', error);
        };

        setSocket(ws);

        return () => {
            ws.close();
        };
    }, [participantName]);
    const [cameraStatus, setCameraStatus] = useState({});

    // 카메라 상태를 웹소켓을 통해 서버로 전송하는 함수
    const sendCameraStatus = (isCamOn) => {
        if (socket) {
            const message = JSON.stringify({
                type: 'camera_status',
                participantName: participantName,
                isCamOn: isCamOn,
            });
            socket.send(message);
        }
    };

    // 카메라 상태를 업데이트하는 함수
    const updateCameraStatus = (participantName, isCamOn) => {
        setCameraStatus(prevStatus => ({
            ...prevStatus,
            [participantName]: isCamOn
        }));
    };

    // scroll set to bottom
    const chatEndRef = useRef(null);

    useEffect(() => {
        // 채팅 컨테이너의 스크롤을 맨 아래로 설정합니다.
        if (chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    return (
        <LayoutContextProvider>
            <LiveKitRoom>
                {/* token={token} serverUrl={LIVEKIT_URL} connect={!!token} */}
                {!room ? (
                    <div id="join">
                        <div id="join-dialog">
                        <AppBar position="static" sx={{ backgroundColor: 'lightgray' }}>
                <Toolbar>
                    <Typography variant="h4" sx={{ flexGrow: 1, textAlign: 'left' }}>
                        <b>{roomName}</b>
                    </Typography>
                    
                    {/* 중앙 정렬을 위한 컨테이너 */}
                    <Box sx={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
                        <Brightness1Icon 
                            sx={{ 
                                fontSize: 30, 
                                color: isCamOn ? '#ff0000' : '#00ff00', // 카메라 상태에 따라 색상 조정
                                margin: '0 10px'
                            }} 
                        />
                    </Box>

                    <IconButton color="inherit" onClick={() => leaveRoom(study_id)}>
                        <ExitToAppIcon sx={{ fontSize: 30 }} />
                    </IconButton>
                </Toolbar>
            </AppBar>


                            {/* 미리보는 화상창 */}
                            {previewStream ? (
                                <StartVideoComponent
                                    track={previewStream.getVideoTracks()[0]} // MediaStreamTrack을 전달
                                    local={true}

                                />
                            ) : (
                                <div className="startvideo-container2">
                                    <img
                                        src={`${photopath}/${participantImage}`} // 카메라 꺼진 상태를 나타내는 이미지 경로
                                        style={{ width: '320px', height: '240px' }} // 원하는 크기 설정
                                    />
                                </div>
                            )}
                            <form
                                onSubmit={(e) => {
                                    joinRoom();
                                    e.preventDefault()
                                }}>
                                <div>
                                    {/* <label htmlFor="participant-name">참가자</label> */}
                                    <input
                                        id="participant-name"
                                        className="form-control"
                                        type="text"
                                        value={participantName}
                                        onChange={(e) => setParticipantName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    {/* <label htmlFor="room-name">Room</label> */}
                                    <input
                                        id="room-name"
                                        className="form-control"
                                        type="hidden"
                                        value={roomName}
                                        onChange={(e) => setRoomName(e.target.value)}
                                        required
                                    />
                                </div>
                                {/* 버튼 스위칭 위치입니다 */}
                                <div style={{
                                    textAlign: "center",
                                    marginTop: "50px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-evenly", // 버튼들 사이에 균일한 간격
                                    width: "100%", // 전체 너비 사용
                                    maxWidth: "1200px", // 최대 너비 설정 (필요에 따라 조정)
                                    margin: "0 auto" // 중앙 정렬
                                }}>
                                    <IconButton onClick={toggleMic}>
                                        {isMicOn ? <MicOffIcon sx={{ fontSize: 60 }} /> : <MicIcon sx={{ fontSize: 60 }} />}
                                    </IconButton>

                                    <IconButton onClick={toggleCam} size="large">
                                        {isCamOn ? <VideocamOffIcon sx={{ fontSize: 60 }} /> : <VideocamIcon sx={{ fontSize: 60 }} />}
                                    </IconButton>

                                    <div>
                                        {/* 프로필사진넣는 명령어 입력해주길 */}
                                        <img src={`${photopath}/${participantImage}`}
                                            style={{ width: "60px", borderRadius: "100%" }} />
                                    </div>
                                </div>
                                <div>
                                    <Button
                                        variant="contained"
                                        type="submit"
                                        disabled={!roomName || !participantName}
                                        sx={{ display: 'block', margin: '0 auto', fontSize: 20 }}>
                                        입장
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-[0.5fr,1.5fr,0.5fr] h-[85vh]">
                        <div className="flex flex-col bg-gray-100 p-4 " style={{height:'100%'}}>
                            {/* 사용자들이 나올 화면에 스크롤 기능 추가 */}
                            <div className="flex-grow overflow-y-auto">
                                <div className="flex flex-col space-y-2 h-[40vh]">
                                    사용자들이 나올 화면<br />
                                    시바타 유니<br />
                                    정상혁<br />
                                    우태형<br />
                                    도훈하윤<br />
                                    막내 aka 민지박
                                    {/* 많은 사용자 예시 추가 */}
                                    더 많은 사용자들<br />
                                    사용자 A<br />
                                    사용자 B<br />
                                    사용자 C<br />
                                    사용자 D<br />
                                    사용자 E<br />
                                    사용자 F<br />
                                    사용자 G<br />
                                    사용자 A<br />
                                    사용자 B<br />
                                    사용자 C<br />
                                    사용자 D<br />
                                    사용자 E<br />
                                    사용자 F<br />
                                    사용자 G<br />
                                    사용자 A<br />
                                    사용자 B<br />
                                    사용자 C<br />
                                    사용자 D<br />
                                    사용자 E<br />
                                    사용자 F<br />
                                    사용자 G<br />
                                    사용자 A<br />
                                    사용자 B<br />
                                    사용자 C<br />
                                    사용자 D<br />
                                    사용자 E<br />
                                    사용자 F<br />
                                    사용자 G<br />
                                    사용자 D<br />
                                    사용자 E<br />
                                    사용자 F<br />
                                    사용자 G<br />
                                </div>
                            </div>

                            {/* 버튼 영역 */}
                            <div className="h-[50vh] bg-gray text-white p-4">
                                {/* 빈 공간 */}
                                <div className="h-[50%]" />

                                {/* 버튼 영역 하단 절반 */}
                                <div className="grid grid-cols-2 grid-rows-2 gap-4 h-[50%]">
                                    {/* 카메라 토글 버튼 */}
                                    <button className="flex flex-col items-center justify-center py-1 px-2" onClick={toggleCam}>
                                        {isCameraEnabled ? <VideocamIcon fontSize="medium" /> : <VideocamOffIcon fontSize="medium" />}
                                        <span className="text-s mt-1">{isCameraEnabled ? '카메라 끄기' : '카메라 켜기'}</span>
                                    </button>

                                    {/* 마이크 토글 버튼 */}
                                    <button className="flex flex-col items-center justify-center py-1 px-2" onClick={toggleMicrophone}>
                                        {isMicrophoneMuted ? <MicIcon fontSize="medium" /> : <MicOffIcon fontSize="medium" />}
                                        <span className="text-s mt-1">{isMicrophoneMuted ? '마이크 끄기' : '마이크 켜기'}</span>
                                    </button>

                                    {/* 화면 공유 토글 버튼 */}
                                    <button className="flex flex-col items-center justify-center py-1 px-2" onClick={toggleScreenSharing}>
                                        {isScreenSharing ? <ScreenShareIcon fontSize="medium" /> : <ScreenShareIcon fontSize="medium" />}
                                        <span className="text-s mt-1">{isScreenSharing ? '공유 중지' : '화면 공유'}</span>
                                    </button>

                                    {/* 나가기 버튼 */}
                                    <button className="flex flex-col items-center justify-center py-1 px-2" onClick={() => leaveRoom(study_id)}>
                                        <ExitToAppIcon fontSize="medium" />
                                        <span className="text-s mt-1">나가기</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div id="room" className="flex flex-col">
                            {/* <AppBar position="static" sx={{ backgroundColor: 'lightgray' }}>
                                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                                        {roomName}
                                    </Typography>
                                    <Box sx={{ flexGrow: 1, textAlign: 'center', mx: 2 }}> */}
                            {/* Replace this text with your room description */}
                            {/* <Typography variant="subtitle1">
                                            방에 대한 설명설명충
                                        </Typography>
                                    </Box>
                                </Toolbar>
                            </AppBar> */}
                            <div id="layout-container-share" className="">
                                {/* 화면 공유 비디오 표시 */}
                                {isScreenSharing && screenTrack && (
                                    <ShareVideoComponent
                                        track={screenTrack} // 화면 공유 비디오 트랙
                                        participantIdentity={screenSharingParticipant || participantName} // 화면 공유를 나타내는 고유 이름
                                        local={screenSharingParticipant === participantName} // 본인이 공유 중인 경우 local로 설정    
                                    />
                                )}
                                {/* 원격 화면 공유 비디오 트랙을 추가로 렌더링 */}
                                {getSharedScreenTracks(remoteTracks, sharedScreenTrackSid).map(remoteTrack => (
                                    <ShareVideoComponent
                                        key={remoteTrack.trackPublication.trackSid}
                                        track={remoteTrack.trackPublication.videoTrack}
                                        participantIdentity={remoteTrack.participantIdentity}
                                    />
                                ))}
                            </div>
                            <div id="layout-container" className="flex-grow h-[80vh]">
                                {!isCamOn && localTrack ? (
                                    <VideoComponent track={localTrack} participantIdentity={participantName} local={true} />
                                ) :
                                    (
                                        <div className="video-container2">
                                            <div className="participant-data">
                                                <p>{participantName + (localTrack ? " (You)" : "")}</p>
                                            </div>
                                            <img
                                                src={`${photopath}/${participantImage}`} // 카메라 꺼진 상태를 나타내는 이미지 경로
                                                style={{ width: '320px', height: '240px' }} // 원하는 크기 설정
                                            />
                                        </div>
                                    )}
                                {/* 일반 비디오 및 오디오 트랙 렌더링 */}
                                {remoteTracks
                                    .filter(track => isRegularVideoTrack(track, sharedScreenTrackSid) || isAudioTrack(track))
                                    .map(remoteTrack => {
                                        const isCamOn = cameraStatus[remoteTrack.participantIdentity];
                                        return remoteTrack.trackPublication.kind === "video" ? (
                                            !isCamOn ? (
                                                <VideoComponent
                                                    key={remoteTrack.trackPublication.trackSid}
                                                    track={remoteTrack.trackPublication.videoTrack}
                                                    participantIdentity={remoteTrack.participantIdentity}
                                                />
                                            ) :
                                                <VideoComponentcopy
                                                    participantIdentity={remoteTrack.participantIdentity}
                                                    participantImage={`${photopath}/${participantImage}`} // 이미지 경로와 파일명 조합
                                                />
                                        ) : (
                                            <AudioComponent
                                                key={remoteTrack.trackPublication.trackSid}
                                                track={remoteTrack.trackPublication.audioTrack}
                                                muted={isMicrophoneMuted} // 음소거 상태 전달
                                            />
                                        );
                                    })
                                }
                            </div>
                        </div>


                        <div className="flex flex-col bg-gray-100 p-4 " style={{ height: '100%' }}>
                            <div className="flex-grow overflow-y-auto">
                                <ul id="messages" className="flex flex-col">
                                    {messages.map((msg, index) => (
                                        <li key={index} className={`my-2 p-2 rounded-lg ${msg.sender === 'me' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-900'}`}>
                                            {msg}
                                        </li>
                                    ))}
                                    <li ref={chatEndRef} />
                                </ul>
                            </div>
                            <form onSubmit={sendMessage} className="flex items-center mt-2">
                                <input
                                    type="text"
                                    autoComplete="off"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="메시지를 입력하세요"
                                    className="border border-gray-300 rounded-lg py-2 px-4 w-full"
                                />
                                <button type="submit" className="bg-blue-500 text-white font-bold py-2 px-4 rounded ml-2">
                                    Send
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </LiveKitRoom>
        </LayoutContextProvider>
    );
}