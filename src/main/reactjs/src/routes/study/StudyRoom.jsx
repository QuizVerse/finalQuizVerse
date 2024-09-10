import {
    LocalAudioTrack,
    LocalVideoTrack,
    Room,
    RoomEvent
} from "livekit-client";
import "./StudyRoom.css";
import { useEffect, useRef, useState } from "react";
import VideoComponent from "../../components/VideoComponent";
import AudioComponent from "../../components/AudioComponent";
import ShareVideoComponent from "../../components/ShareVideoComponent";
import StartVideoComponent from "../../components/StartVideoComponent";
import { LiveKitRoom, LayoutContextProvider } from "@livekit/components-react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { AppBar, Box, Button, IconButton, Toolbar, Typography } from "@mui/material";
import {
    Videocam as VideocamIcon,
    VideocamOff as VideocamOffIcon,
    Mic as MicIcon,
    MicOff as MicOffIcon,
    ExitToApp as ExitToAppIcon,
    ScreenShare as ScreenShareIcon,
    StopScreenShare as StopScreenShareIcon,
} from '@mui/icons-material';

let APPLICATION_SERVER_URL = "";
let LIVEKIT_URL = "";
configureUrls();

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
    const [roomName, setRoomName] = useState("");
    const [token, setToken] = useState(null);
    const [isCameraEnabled, setIsCameraEnabled] = useState(true);
    const [isScreenSharing, setIsScreenSharing] = useState(false);
    const [screenTrack, setScreenTrack] = useState(null);
    const [previewStream, setPreviewStream] = useState(undefined); // 추가: 미리보기 상태
    const { study_id, studyTitle } = useParams(); // URL에서 studyId 추출
    const [sharedScreenTrackSid, setSharedScreenTrackSid] = useState(null);
    const [isMicrophoneMuted, setIsMicrophoneMuted] = useState(false);
    const navi = useNavigate();

    // 사용자 정보를 가져오는 함수
    const getUserDto = () => {
        axios.get(`/book/username`).then((res) => {
            setParticipantName(res.data.userNickname); // 닉네임 불러오기
        });
    };

    useEffect(() => {
        getUserDto();
        setRoomName(studyTitle);
    }, []);

    // 방에 참가하기 전 카메라 미리보기 활성화 함수
    const startVideoPreview = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            const videoTrack = stream.getVideoTracks()[0];
            setPreviewStream(stream); // 미리보기 스트림 설정
            const startVideoTrack = new LocalVideoTrack(videoTrack);
            setLocalTrack(startVideoTrack);
        } catch (error) {
            console.error("비디오 미리보기를 활성화할 수 없습니다:", error);
        }
    };

    // 방에 참가하지 않으면 미리보기 종료
    const stopVideoPreview = () => {
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
    }, [room]);

    async function joinRoom() {
        const room = new Room();
        setRoom(room);

        // Room 이벤트 처리
        room.on(RoomEvent.TrackSubscribed, (_track, publication, participant) => {
            setRemoteTracks((prev) => [
                ...prev,
                { trackPublication: publication, participantIdentity: participant.identity }
            ]);
        });

        room.on(RoomEvent.TrackUnsubscribed, (_track, publication) => {
            setRemoteTracks((prev) => prev.filter((track) => track.trackPublication.trackSid !== publication.trackSid));
        });

        try {
            // 방 이름과 참가자 이름으로 토큰 가져오기
            const token = await getToken(roomName, participantName);
            setToken(token);

            await room.connect(LIVEKIT_URL, token);
            await room.localParticipant.enableCameraAndMicrophone();

            const localVideoTrack = room.localParticipant.videoTrackPublications.values().next().value?.videoTrack;
            if (localVideoTrack) {
                setLocalTrack(localVideoTrack);
            } else {
                console.warn("참가자의 비디오 트랙을 찾을 수 없습니다.");
            }
        } catch (error) {
            console.log("방에 연결하는 중 오류가 발생 : ", error.message);
            await leaveRoom();
        }
    }

    async function leaveRoom() {
        await room?.disconnect();
        stopVideoPreview(); // 미리보기 종료
        setRoom(undefined);
        setLocalTrack(undefined);
        setPreviewStream(undefined);
        setRemoteTracks([]);
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
                headers: { "Content-Type": "application/json" },
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

    async function enableCamera() {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        const videoTrack = stream.getVideoTracks()[0];
        const localVideoTrack = new LocalVideoTrack(videoTrack);
        await room.localParticipant.publishTrack(localVideoTrack);
        setLocalTrack(localVideoTrack);
    }

    async function disableCamera() {
        if (localTrack) {
            await room.localParticipant.unpublishTrack(localTrack);
            localTrack.stop();
            setLocalTrack(null);
        }
        setIsCameraEnabled(false);
    }

    async function toggleCamera() {
        if (isCameraEnabled) {
            await disableCamera();
        } else {
            await enableCamera();
        }
        setIsCameraEnabled(!isCameraEnabled);
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
    };

    // 화면 공유
    async function toggleScreenSharing() {
        try {
            if (isScreenSharing) {
                // 화면 공유 중지
                if (screenTrack) {
                    screenTrack.stop();
                    await room.localParticipant.unpublishTrack(screenTrack);
                    setScreenTrack(null);
                    setSharedScreenTrackSid(null); // 화면 공유 중지 시, 식별자도 초기화
                }
            } else {
                // 화면 공유 시작
                const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
                const track = stream.getVideoTracks()[0];
                await room.localParticipant.publishTrack(track);
                setScreenTrack(track);
                setSharedScreenTrackSid(track.id); // 화면 공유 시, 고유 식별자 설정
            }
            setIsScreenSharing(prevState => !prevState);
        } catch (error) {
            console.error("화면 공유 토글 중 에러 발생:", error);
        }
    }

    // 원격 비디오 및 오디오 트랙을 렌더링하기 위한 조건
    const getSharedScreenTracks = (remoteTracks, sharedScreenTrackSid) => {
        return remoteTracks.filter(track => isScreenShareTrack(track, sharedScreenTrackSid));
    };

    const isScreenShareTrack = (track, sharedScreenTrackSid) => {
        return track.trackPublication.kind === "video" &&
            track.trackPublication.videoTrack &&
            track.trackPublication.trackSid === sharedScreenTrackSid;
    };

    const isRegularVideoTrack = (track, sharedScreenTrackSid) => {
        return track.trackPublication.kind === "video" &&
            track.trackPublication.videoTrack &&
            track.trackPublication.trackSid !== sharedScreenTrackSid;
    };

    const isAudioTrack = (track) => {
        return track.trackPublication.kind === "audio" &&
            track.trackPublication.audioTrack;
    };

    // 로그를 통해 trackPublication 상태 확인
    remoteTracks.forEach(remoteTrack => {
        console.log("Remote Track:", remoteTrack);
    });

    return (
        <LayoutContextProvider>
            <LiveKitRoom>
                {!room ? (
                    <div id="join">
                        <div id="join-dialog">
                            <AppBar position="static" sx={{ backgroundColor: 'lightgray' }}>
                                <Toolbar>
                                    <Typography variant="h4">
                                        <b>{roomName}</b>
                                    </Typography>
                                    <Box sx={{ flexGrow: 1 }} />
                                    <IconButton color="inherit" onClick={leaveRoom}>
                                        <ExitToAppIcon sx={{ fontSize: 30 }} />
                                    </IconButton>
                                </Toolbar>
                            </AppBar>

                            {previewStream && (
                                <StartVideoComponent
                                    track={previewStream.getVideoTracks()[0]}
                                    local={true}
                                />
                            )}
                            <form onSubmit={(e) => { joinRoom(); e.preventDefault(); }}>
                                <div>
                                    <input
                                        id="participant-name"
                                        className="form-control"
                                        type="text"
                                        value={participantName}
                                        onChange={(e) => setParticipantName(e.target.value)}
                                        required
                                    />
                                </div>
                                <Button
                                    variant="contained"
                                    type="submit"
                                    disabled={!roomName || !participantName}
                                    sx={{ display: 'block', margin: '0 auto', fontSize: 20 }}>
                                    입장
                                </Button>
                            </form>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-[0.5fr,1.5fr,0.5fr] h-[80vh]">
                        <div className="flex flex-col bg-gray-100 p-4 h-[80vh]">
                            사용자들이 나올 화면<br />
                            시바타 유니<br />
                            정상혁<br />
                            우태형<br />
                            도훈하윤<br />
                            막내 aka 민지박
                        </div>

                        <div id="room" className="flex flex-col">
                            <div id="layout-container-share" className="">
                                {isScreenSharing && screenTrack && (
                                    <ShareVideoComponent
                                        track={screenTrack}
                                        participantIdentity={participantName}
                                        local={true}
                                    />
                                )}
                                {getSharedScreenTracks(remoteTracks, sharedScreenTrackSid).map(remoteTrack => (
                                    <ShareVideoComponent
                                        key={remoteTrack.trackPublication.trackSid}
                                        track={remoteTrack.trackPublication.videoTrack}
                                        participantIdentity={remoteTrack.participantIdentity}
                                    />
                                ))}
                            </div>
                            <div id="layout-container" className="flex-grow h-[80vh]">
                                {localTrack && (
                                    <VideoComponent track={localTrack} participantIdentity={participantName} local={true} />
                                )}
                                {remoteTracks.filter(track => isRegularVideoTrack(track, sharedScreenTrackSid)).map(remoteTrack => (
                                    <VideoComponent
                                        key={remoteTrack.trackPublication.trackSid}
                                        track={remoteTrack.trackPublication.videoTrack}
                                        participantIdentity={remoteTrack.participantIdentity}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </LiveKitRoom>
        </LayoutContextProvider>
    );
}
