import {
    LocalAudioTrack,
    LocalVideoTrack,
    Room,
    RoomEvent,
    Track
} from "livekit-client";
import React, {useEffect, useRef, useState} from "react";
import VideoComponent from "../../components/study/VideoComponent";
import AudioComponent from "../../components/study/AudioComponent";
import ShareVideoComponent from "../../components/study/ShareVideoComponent";
import StartVideoComponent from "../../components/study/StartVideoComponent";
import {
    LiveKitRoom,
    LayoutContextProvider,
    ScreenShareIcon,
    ChatIcon,
} from "@livekit/components-react";
import PeopleIcon from '@mui/icons-material/People';
import axios from "axios";
import {useNavigate, useParams, useLocation} from "react-router-dom";
import {AppBar, Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, TextField, Toolbar, Tooltip, Typography} from "@mui/material";
import {
    Videocam as VideocamIcon,
    VideocamOff as VideocamOffIcon,
    Mic as MicIcon,
    MicOff as MicOffIcon, ExitToApp as ExitToAppIcon,
} from '@mui/icons-material';
import "../../routes/study/StudyRoom.css";
import LoginIcon from '@mui/icons-material/Login';
import CloseIcon from '@mui/icons-material/Close';

let APPLICATION_SERVER_URL = "";
let LIVEKIT_URL = "";
configureUrls();

function configureUrls() {
    APPLICATION_SERVER_URL = "http://localhost:3000/";
    LIVEKIT_URL = "wss://openvidu.openvidu.kro.kr/";
}


export default function StudyRoom() {

    // URL에서 studyId 추출
    const {study_id} = useParams();

    // 방 관련 정보
    const [room, setRoom] = useState(undefined);
    const [participantName, setParticipantName] = useState("");
    const [participantImage, setParticipantImage] = useState("");
    const [roomName, setRoomName] = useState("");
    const [roomDescription, setRoomDescription] = useState("");

    const [localTrack, setLocalTrack] = useState(undefined);
    const [localAudioTrack, setLocalAudioTrack] = useState(null);
    const [remoteTracks, setRemoteTracks] = useState([]);
    const [token, setToken] = useState(null);
    const [isCameraEnabled, setIsCameraEnabled] = useState(true);
    const [screenTrack, setScreenTrack] = useState(null);
    const [previewStream, setPreviewStream] = useState(undefined); // 추가: 미리보기 상태

    const [isMicrophoneMuted, setIsMicrophoneMuted] = useState(false);
    const navi = useNavigate();
    const photopath = "https://kr.object.ncloudstorage.com/bitcamp701-129/final/user";
    const [open, setOpen] = useState(false);

    // alert state
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertTitle, setAlertTitle] = useState("");

    /**
     * @description : Alert창 열릴 때
     * */
    const openAlert = (title) => {
        setAlertTitle(title);
        setAlertVisible(true);
    };

    /**
     * @description : Alert창 닫힐 때
     * */
    const closeAlert = () => {
        setAlertVisible(false);
    };

    // 추가: 채팅창 토글 상태를 관리하는 state
    const [isChatOpen, setIsChatOpen] = useState(false);

    // 채팅창 토글 함수
    const toggleChat = () => {
        setIsParticipantListOpen(false);
        setIsChatOpen((prevState) => !prevState);
    };

    // 참여자 토글 상태를 관리하는 state
    const [isParticipantListOpen, setIsParticipantListOpen] = useState(false);

    // 참여자 리스트
    const toggleParticipantList = () => {
        setIsChatOpen(false);
        setIsParticipantListOpen((prevState) => !prevState);
    };


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
        if (!isCamOn) {
            await stopVideoPreview();
        } else {
            startVideoPreview();
        }
        // 상태를 비동기로 변경 후 정확한 상태를 전송
        setIsCamOn((prevState) => {
            const newCamStatus = !prevState; // 새로운 카메라 상태
            sendCameraStatus(newCamStatus);  // 변경된 상태를 웹소켓으로 전송
            return newCamStatus;  // 상태 업데이트
        });
    };

     // 카메라 상태를 웹소켓을 통해 서버로 전송하는 함수
     const sendCameraStatus = (isCamOn) => {
        if (cameraSocket) {
            const message = JSON.stringify({
                type: 'camera_status',
                participantName: participantName,
                isCamOn: isCamOn,
            });
            cameraSocket.send(message);
            console.log("카메라 상태 전송됨:", message); // 전송된 메시지 출력
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
        if (location.state) {
            setRoomName(location.state.studyTitle);
            setRoomDescription(location.state.studyDescription);
        } else {
            console.log("State가 전달되지 않음");
        }
    }, [location.state]);

    // 방에 참가하기 전 카메라 미리보기 활성화 함수
    const startVideoPreview = async () => {
        try {
            // 사용자의 비디오 장치에서 비디오 스트림을 생성
            const stream = await navigator.mediaDevices.getUserMedia({video: true});
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
                    {trackPublication: publication, participantIdentity: participant.identity}
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
    
     // 모달 열기 함수
     const handleOpen = () => {
        setOpen(true);
    };

    // 모달 닫기 함수
    const handleClose = () => {
        setOpen(false);
    };

    // 나가기 확인 함수 (실제로 방을 나가는 기능)
    const handleConfirm = () => {
        leaveRoom(study_id); // 방 나가기 함수 호출
        handleClose(); // 모달 닫기
    };

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
            console.log(`보낼 데이터:`, JSON.stringify({roomName, participantName, isSharing}));
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
                const mediaStream = await navigator.mediaDevices.getUserMedia({audio: true});
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
                setSharedScreenTrackSid(null); // 트랙 ID 초기화
                setIsScreenSharing(false);
                await sendScreenShareStatus(roomName, participantName, false); // 중지 상태 전송
            } else {
                // 다른 참가자가 화면을 공유 중인 경우 화면 공유를 시작할 수 없도록 처리
                if (screenSharingParticipant && screenSharingParticipant !== participantName) {
                    openAlert(`${screenSharingParticipant}가 이미 화면을 공유하고 있습니다. 다른 참가자가 공유를 중지할 때까지 기다려주세요.`);
                    return; // 화면 공유 시작을 중단
                }
                // 화면 공유 시작
                try {
                    const stream = await navigator.mediaDevices.getDisplayMedia({video: true});
                    const screenTrack = stream.getVideoTracks()[0];

                    // 트랙을 '화면 공유' 소스로 설정하여 게시
                    await room.localParticipant.publishTrack(screenTrack, {source: Track.Source.ScreenShare});
                    //, { source: Track.Source.ScreenShare }
                    setScreenTrack(screenTrack);
                    setSharedScreenTrackSid(screenTrack.id); // 트랙 ID 저장
                    setIsScreenSharing(true);
                    setScreenSharingParticipant(participantName); // 자신을 화면 공유 중인 참가자로 설정
                    await sendScreenShareStatus(roomName, participantName, true); // 시작 상태 전송
                } catch (error) {
                    console.error("화면 공유 시작 중 에러 발생:", error);
                }
            }
        } catch (error) {
            console.error("화면 공유 토글 중 에러 발생:", error);
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
        //const ws = new WebSocket('wss://www.quizverse.kro.kr/ws/screen-share');
        const ws = new WebSocket('ws://localhost:9002/ws/screen-share');


        ws.onopen = () => {
            console.log('화면 공유 웹소켓 연결이 설정되었습니다.');
        };

        ws.onmessage = (event) => {
            const message = JSON.parse(event.data);
            console.log('화면 공유 메시지 수신됨:', message);
            // 화면 공유 상태 업데이트 로직
            if (message.isSharing) {
                console.log(`${message.participantName}가 화면 공유를 시작했습니다.`);
                if (!isScreenSharing && message.participantName !== participantName) {
                    // 다른 참가자가 공유 중이면, 이 정보를 표시하고 공유 시작을 막습니다.
                    setSharedScreenTrackSid(message.trackSid);  // 해당 트랙 ID 저장
                    setScreenSharingParticipant(message.participantName); // 공유 중인 참가자 설정
                    setIsScreenSharing(true); // 화면 공유 상태 설정
                    openAlert(`${message.participantName}가 화면을 공유 중입니다. 화면 공유가 중복될 수 없습니다.`);
                }
            } else {
                console.log(`${message.participantName}가 화면 공유를 중지했습니다.`);
                // 화면 공유 중지 처리
                if (message.participantName === screenSharingParticipant) {
                    setScreenSharingParticipant(null);  // 공유 중인 참가자 초기화
                    setSharedScreenTrackSid(null);  // 트랙 ID 초기화
                    setIsScreenSharing(false);  // 화면 공유 상태 해제
                }
            }
        };

        ws.onclose = () => {
            console.log('화면 공유 웹소켓 연결이 종료되었습니다.');
        };

        ws.onerror = (error) => {
            console.error('화면 공유 웹소켓 오류 발생:', error);
            ws.close();
        };

        return () => {
            ws.close(); // WebSocket 연결 종료
        };
    }, [isScreenSharing, participantName, screenSharingParticipant]);

    //채팅
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [cameraSocket, setCameraSocket] = useState(null);
    const [chatSocket, setChatSocket] = useState(null);
    // 채팅 WebSocket
    useEffect(() => {
        //const ws = new WebSocket('wss://www.quizverse.kro.kr/ws/chat');
        const ws = new WebSocket('ws://localhost:9002/ws/chat');

        ws.onopen = () => {
            console.log('웹소켓 연결이 설정되었습니다.');
        };

        ws.onmessage = (event) => {
            // 채팅 메시지를 처리 (텍스트 형식)
            const message = event.data;  // 텍스트 메시지
            setMessages((prevMessages) => prevMessages.concat([message]));
            console.log('채팅 메시지 수신됨:', message);
        };

        ws.onclose = () => {
            console.log('웹소켓 연결이 종료되었습니다.');
            attemptReconnect(); // 재연결 시도
        };

        ws.onerror = (error) => {
            console.error('웹소켓 오류 발생:', error);
            ws.close();
        };

        const attemptReconnect = () => {
            console.log('채팅 웹소켓 재연결 시도 중...');
            setTimeout(() => {
                setChatSocket(new WebSocket('ws://localhost:9002/ws/chat'));
                //setChatSocket(new WebSocket('wss://www.quizverse.kro.kr/ws/chat'));
            }, 5000); // 5초 후 재연결 시도
        };

        return () => {
            ws.close();
        };
    }, [participantName]);

    const sendMessage = (e) => {
        e.preventDefault();
        if (chatSocket && message) {
            let sending = participantName + " : " + message;
            chatSocket.send(sending);
            setMessage(''); // 메시지 입력란 비우기
        } else {
            console.warn('소켓이 열려 있지 않거나 메시지가 비어 있습니다.');
        }
    };
    //웹소켓 카메라
    useEffect(() => {

        //const ws = new WebSocket('wss://www.quizverse.kro.kr/ws/camera');
        const ws = new WebSocket('ws://localhost:9002/ws/camera');

        ws.onopen = () => {
            console.log('카메라 상태 웹소켓 연결이 설정되었습니다.');
        };

        ws.onmessage = (event) => {
            const message = JSON.parse(event.data);
            console.log('카메라 상태 메시지 수신됨:', message);

            if (message.type === 'camera_status') {
                // 카메라 상태 메시지일 경우
                updateCameraStatus(message.participantName, message.isCamOn);
            }
        };

        ws.onclose = () => {
            console.log('카메라 상태 웹소켓 연결이 종료되었습니다.');
            attemptReconnect(); // 재연결 시도
        };

        ws.onerror = (error) => {
            console.error('카메라 상태 웹소켓 오류 발생:', error);
        };

        const attemptReconnect = () => {
            console.log('카메라 상태 웹소켓 재연결 시도 중...');
            setTimeout(() => {
                setCameraSocket(new WebSocket('ws://localhost:9002/ws/camera'));
                //setCameraSocket(new WebSocket('wss://www.quizverse.kro.kr/ws/camera'));
            }, 5000); // 5초 후 재연결 시도
        };

        return () => {
            ws.close(); // WebSocket 연결 종료
        };
    }, [participantName]);

    const [cameraStatus, setCameraStatus] = useState({});

    // 카메라 상태를 업데이트하는 함수
    const updateCameraStatus = (participantName, isCamOn) => {
        setCameraStatus(prevStatus => ({
            ...prevStatus,
            [participantName]: isCamOn,
        }));
        console.log(`${participantName}의 카메라 상태 업데이트됨: ${isCamOn ? '켜짐' : '꺼짐'}`);
    };

    // scroll set to bottom
    const chatEndRef = useRef(null);

    useEffect(() => {
        // 채팅 컨테이너의 스크롤을 맨 아래로 설정합니다.
        if (chatEndRef.current) {
            chatEndRef.current.scrollIntoView({behavior: 'smooth'});
        }
    }, [messages]);

    return (
        <LayoutContextProvider>
            <LiveKitRoom>
                {/* token={token} serverUrl={LIVEKIT_URL} connect={!!token} */}
                {!room ? (
                    // 스터디 입장 페이지
                    <div className={"bg-black w-screen h-screen flex items-center justify-center"}>
                        <div className={"bg-[#666666] w-[720px] rounded"}>
                            <div className={"p-4 space-y-4"}>
                                <div className={"flex justify-between items-center"}>
                                    <Typography variant="h5">
                                        <b>{roomName}</b>
                                    </Typography>
                                    <Tooltip title="나가기">
                                        <IconButton onClick={() => leaveRoom(study_id)}>
                                            <CloseIcon/>
                                        </IconButton>
                                    </Tooltip>
                                </div>
                                <div className={"break-all"}>
                                    {roomDescription}
                                </div>
                            </div>

                            <div className={"h-[360px] flex justify-center items-center p-4"}>
                                <div className={"bg-[#222222] w-full h-full flex justify-center items-center"}>
                                    {/* 미리보는 화상창 */}
                                    {previewStream ? (
                                        <StartVideoComponent
                                            track={previewStream.getVideoTracks()[0]} // MediaStreamTrack을 전달
                                            local={true}
                                        />
                                    ) : (
                                        // 카메라 꺼진 상태를 나타내는 이미지 경로
                                        <div>
                                            <Avatar title={participantName}
                                                    src={`${photopath}/${participantImage}`}
                                                    sx={{width: "96px", height: "96px"}}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>


                            {/* 버튼 스위칭 위치입니다 */}
                            <div className={"p-4 flex justify-center gap-4 bg-[#222222] rounded-b"}>
                                {/* 카메라 토글 버튼 */}
                                <Tooltip title={isCamOn ? '카메라 켜기' : '카메라 끄기'}>
                                    <Button onClick={toggleCam} variant={"contained"}>
                                        {isCamOn ? <VideocamIcon fontSize="medium"/> :
                                            <VideocamOffIcon fontSize="medium"/>}
                                    </Button>
                                </Tooltip>

                                {/* 마이크 토글 버튼 */}
                                <Tooltip title={isMicOn ? '마이크 끄기' : '마이크 켜기'}>
                                    <Button onClick={toggleMic} variant={"contained"}>
                                        {isMicOn ? <MicIcon fontSize="medium"/> : <MicOffIcon fontSize="medium"/>}
                                    </Button>
                                </Tooltip>

                                <Avatar title={participantName} src={`${photopath}/${participantImage}`}/>
                                <form onSubmit={(e) => {joinRoom(); e.preventDefault();}}>
                                    <input
                                        id="participant-name"
                                        className="form-control"
                                        type="text"
                                        value={participantName}
                                        onChange={(e) => setParticipantName(e.target.value)}
                                        required />

                                    <input
                                        id="room-name"
                                        className="form-control"
                                        type="hidden"
                                        value={roomName}
                                        onChange={(e) => setRoomName(e.target.value)}
                                        required />

                                    <Tooltip title="입장">
                                        <Button
                                            type="submit"
                                            variant={"contained"}
                                            color={"success"}>
                                             <LoginIcon/>
                                        </Button>
                                    </Tooltip>
                                </form>
                            </div>
                        </div>
                    </div>
                ) : (
                    // 화상 스터디 방 내부
                    <div className="flex flex-col h-screen">
                        <div className="flex-grow bg-[#222222] flex justify-center items-center">
                            <div className="relative">
                                <div id="room" className="flex flex-col">
                                    <div id="layout-container-share">
                                        {/* 화면 공유 비디오 표시    */}
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
                                                <VideoComponent track={localTrack} participantIdentity={participantName}
                                                                local={true}/>
                                            ) :
                                            (
                                                <div className="video-container2">
                                                    <div className="participant-data absolute top-0 right-0">
                                                        <p>{participantName + (localTrack ? " (You)" : "")}</p>
                                                    </div>
                                                    <Avatar
                                                        title={participantImage}
                                                        src={`${photopath}/${participantImage}`} // 카메라 꺼진 상태를 나타내는 이미지 경로
                                                        sx={{width : "72px", height : "72px"}}
                                                    />
                                                </div>
                                            )}
                                        {/* 일반 비디오 및 오디오 트랙 렌더링 */}
                                        {remoteTracks
                                            .filter(track => isRegularVideoTrack(track, sharedScreenTrackSid) || isAudioTrack(track))
                                            .map(remoteTrack => {
                                                const isCamOn = cameraStatus[remoteTrack.participantIdentity]; // 웹소켓으로부터 수신된 카메라 상태
                                                return remoteTrack.trackPublication.kind === "video" ? (
                                                    !isCamOn ? (
                                                        <VideoComponent
                                                            key={remoteTrack.trackPublication.trackSid}
                                                            track={remoteTrack.trackPublication.videoTrack}
                                                            participantIdentity={remoteTrack.participantIdentity}
                                                        />
                                                    ) : (
                                                        <div className="video-container2">
                                                            <div className="participant-data absolute top-0 right-0">
                                                                <p>{participantName + (localTrack ? " (You)" : "")}</p>
                                                            </div>
                                                            <Avatar
                                                                title={participantImage}
                                                                src={`${photopath}/${participantImage}`} // 카메라 꺼진 상태를 나타내는 이미지 경로
                                                                sx={{width : "72px", height : "72px"}}
                                                            />
                                                        </div>
                                                    )
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
                                    {isParticipantListOpen && (
                                        <div className="flex flex-col bg-gray-100 p-4 h-[920px] w-[360px] fixed top-0 right-0">
                                            <div className="flex justify-between items-center mb-2">
                                                <Typography variant="h6">참여자 목록</Typography>
                                                {/* 채팅창 닫기 버튼 */}
                                                <IconButton onClick={toggleParticipantList}>
                                                    <CloseIcon/>
                                                </IconButton>
                                            </div>
                                            <div className="flex-grow overflow-y-auto">
                                            </div>
                                        </div>
                                    )}
                                {isChatOpen && (
                                    <div
                                        className="flex flex-col bg-gray-100 p-4 h-[920px] w-[360px] fixed top-0 right-0">
                                        <div className="flex justify-between items-center mb-2">
                                            <Typography variant="h6">채팅</Typography>
                                            {/* 채팅창 닫기 버튼 */}
                                            <IconButton onClick={toggleChat}>
                                                    <CloseIcon />
                                                </IconButton>
                                            </div>
                                            <div className="flex-grow overflow-y-auto">
                                                <ul id="messages" className="flex flex-col">
                                                    {messages.map((msg, index) => (
                                                        <li key={index} className="my-2 p-2 rounded-lg bg-gray-200 text-gray-900">
                                                            {msg}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <form onSubmit={sendMessage} className="flex items-center mt-2 gap-2">
                                                <TextField
                                                    fullWidth
                                                    type="text"
                                                    variant={"outlined"}
                                                    size={"small"}
                                                    autoComplete="off"
                                                    value={message}
                                                    onChange={(e) => setMessage(e.target.value)}
                                                    placeholder="메시지를 입력하세요"
                                                />
                                                <Button type="submit" variant={"contained"}>Send</Button>
                                            </form>
                                        </div>
                                    )}
                            </div>
                        </div>
                        <div className="flex justify-between items-center p-4 bg-black text-white">
                            <span className="text-sm">{roomName}</span>
                            <div className="flex space-x-2">
                                {/* 카메라 토글 버튼 */}
                                <Tooltip title={isCameraEnabled ? '카메라 끄기' : '카메라 켜기'}>
                                    <Button onClick={toggleCam} variant={"contained"}>
                                        {isCameraEnabled ? <VideocamIcon /> :
                                            <VideocamOffIcon />}
                                    </Button>
                                </Tooltip>
                                {/* 마이크 토글 버튼 */}
                                <Tooltip title={isMicrophoneMuted ? '마이크 끄기' : '마이크 켜기'}>
                                    <Button onClick={toggleMicrophone} variant={"contained"}>
                                        {isMicrophoneMuted ? <MicIcon /> : <MicOffIcon />}
                                    </Button>
                                </Tooltip>
                                {/* 화면 공유 토글 버튼 */}
                                <Tooltip title={isScreenSharing ? '공유 중지' : '화면 공유'}>
                                    <Button onClick={toggleScreenSharing} variant={"contained"}>
                                        {isScreenSharing ? <ScreenShareIcon /> : <ScreenShareIcon />}
                                    </Button>
                                </Tooltip>

                                {/* 채팅창 버튼 */}
                                <Tooltip title={isChatOpen ? '채팅창 닫기' : '채팅창 열기'}>
                                    <Button onClick={toggleChat} variant={"contained"}>
                                        <ChatIcon  />
                                    </Button>
                                </Tooltip>

                                {/* 참여자 목록 버튼 */}
                                <Tooltip title={isParticipantListOpen ? '참여자 목록 닫기' : '참여자 목록 열기'}>
                                    <Button onClick={toggleParticipantList} variant={"contained"}>
                                        <PeopleIcon  />
                                    </Button>
                                </Tooltip>
                            </div>
                            <div className="flex space-x-2">
                                {/* 나가기 버튼 */}
                                <Tooltip title="나가기">
                                    <Button onClick={handleOpen}
                                            variant={"contained"}
                                            color={"error"}>
                                        <ExitToAppIcon />
                                    </Button>
                                </Tooltip>

                                 {/* 방장이 나갈 때의 모달 */}
                                 {/* <Dialog open={open} onClose={handleClose}>
                                        <DialogTitle>정말 나가시겠습니까?</DialogTitle>
                                        <DialogContent>
                                            <DialogContentText>
                                                방장이 나가면 방이 삭제됩니다. 정말 나가시겠습니까?
                                            </DialogContentText>
                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={handleClose} color="secondary">
                                                취소
                                            </Button>
                                            <Button onClick={handleConfirm} color="primary">
                                                나가기
                                            </Button>
                                        </DialogActions>
                                    </Dialog> */}

                                    {/* 일반 사용자가 나갈 때의 모달 */}
                                    <Dialog open={open} onClose={handleClose}>
                                        <DialogTitle>정말 나가시겠습니까?</DialogTitle>
                                        <DialogContent>
                                            <DialogContentText>
                                                방을 나가면 다시 입장할 수 없습니다. 정말 나가시겠습니까?
                                            </DialogContentText>
                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={handleClose} color="secondary">
                                                취소
                                            </Button>
                                            <Button onClick={handleConfirm} color="primary">
                                                나가기
                                            </Button>
                                        </DialogActions>
                                    </Dialog>

                            </div>
                        </div>
                    </div>
                )}
            </LiveKitRoom>
        </LayoutContextProvider>
    );
}