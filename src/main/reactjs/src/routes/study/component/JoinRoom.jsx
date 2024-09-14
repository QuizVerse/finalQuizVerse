import {AppBar, Box, Button, IconButton, Toolbar, Tooltip, Typography} from "@mui/material";
import { Videocam as VideocamIcon, VideocamOff as VideocamOffIcon, Mic as MicIcon, MicOff as MicOffIcon, ExitToApp as ExitToAppIcon } from '@mui/icons-material';
import StartVideoComponent from "../../../components/study/StartVideoComponent";
import JoinControlPanel from "./JoinControlPanel";
import { ChatIcon, ScreenShareIcon } from "@livekit/components-react";


export default function JoinRoom({
                                     roomName,
                                     studyId,
                                     participantName,
                                     participantImage,
                                     photopath,
                                     isMicOn,
                                     isCamOn,
                                     toggleMic,
                                     toggleCam,
                                     joinRoom,
                                     leaveRoom,
                                     previewStream, // props로 previewStream 받아옴
                                     setParticipantName, // props로 setParticipantName 받아옴
                                     setRoomName, // props로 setRoomName 받아옴
                                     isScreenSharing, // 추가
                                     toggleScreenSharing // 추가
                                 }) {
    return (
        <div className="flex flex-col h-screen">
            <div className="flex-grow bg-[#222222]">
                왜 아무것도 안나와?
                {previewStream ? (
                    <StartVideoComponent
                        track={previewStream.getVideoTracks()[0]}
                        local={true}
                    />
                ) : (
                    <div>
                        <img
                            src={`${photopath}/${participantImage}`}
                            style={{width: '320px', height: '240px'}}
                        />
                    </div>
                )}

                {/*<input*/}
                {/*    type="text"*/}
                {/*    value={participantName}*/}
                {/*    onChange={(e) => setParticipantName(e.target.value)}*/}
                {/*    required*/}
                {/*/>*/}

            </div>
            <div className="flex justify-between items-center p-4 bg-black text-white">
                <span className="text-sm">{roomName}</span>
                <div className="flex space-x-2">
                    {/* 카메라 토글 버튼 */}
                    <Tooltip title={isCamOn ? '카메라 끄기' : '카메라 켜기'}>
                        <Button onClick={toggleCam} variant={"contained"}>
                            {isCamOn ? <VideocamIcon fontSize="medium"/> : <VideocamOffIcon fontSize="medium"/>}
                        </Button>
                    </Tooltip>

                    {/* 마이크 토글 버튼 */}
                    <Tooltip title={isMicOn ? '마이크 끄기' : '마이크 켜기'}>
                        <Button onClick={toggleMic} variant={"contained"}>
                            {isMicOn ? <MicIcon fontSize="medium"/> : <MicOffIcon fontSize="medium"/>}
                        </Button>
                    </Tooltip>

                    {/* 프로필 이미지 */}
                    <div>
                        <img src={`${photopath}/${participantImage}`}
                             style={{width: "60px", borderRadius: "100%"}}/>
                    </div>


                    {/* 나가기 버튼 */}
                    <Tooltip title="나가기">
                        <Button onClick={() => leaveRoom(studyId)} variant={"contained"}>
                            <ExitToAppIcon/>
                        </Button>
                    </Tooltip>

                    {/* 나가기 버튼 */}
                    <Tooltip title="입장">
                        <Button disabled={!roomName || !participantName}
                                onClick={joinRoom()}
                                variant={"contained"}>
                            입장
                        </Button>
                    </Tooltip>
                </div>
                <div className="flex space-x-2">
                    {/* 채팅창 버튼 */}
                    <Tooltip title="채팅창 열기">
                        <Button variant={"contained"}>
                            <ChatIcon fontSize="medium"/>
                        </Button>
                    </Tooltip>
                </div>
            </div>
        </div>
    );
}
