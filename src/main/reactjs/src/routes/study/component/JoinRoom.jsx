import { AppBar, Box, Button, IconButton, Toolbar, Typography } from "@mui/material";
import { Videocam as VideocamIcon, VideocamOff as VideocamOffIcon, Mic as MicIcon, MicOff as MicOffIcon, ExitToApp as ExitToAppIcon } from '@mui/icons-material';
import StartVideoComponent from "../../../components/study/StartVideoComponent";
import JoinControlPanel from "./JoinControlPanel";

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
                                     setRoomName // props로 setRoomName 받아옴
                                 }) {
    return (

        <div className="flex flex-col h-screen">
            <div className="flex-grow bg-[#222222]">

                {previewStream ? ( // props로 전달된 previewStream 사용
                    <StartVideoComponent
                        track={previewStream.getVideoTracks()[0]} // MediaStreamTrack을 전달
                        local={true}
                    />
                ) : (
                    <div>
                        <img
                            src={`${photopath}/${participantImage}`} // 카메라 꺼진 상태를 나타내는 이미지 경로
                            style={{width: '320px', height: '240px'}}
                        />
                    </div>
                )}

                <form onSubmit={(e) => {
                    joinRoom();
                    e.preventDefault();
                }}>
                    <div>
                        <input
                            className="form-control"
                            type="text"
                            value={participantName}
                            onChange={(e) => setParticipantName(e.target.value)} // props로 받은 setParticipantName 사용
                            required
                        />
                    </div>
                    <div>
                        <input
                            id="room-name"
                            className="form-control"
                            type="hidden"
                            value={roomName}
                            onChange={(e) => setRoomName(e.target.value)} // props로 받은 setRoomName 사용
                            required
                        />
                    </div>

                        <div style={{
                            textAlign: "center",
                            marginTop: "50px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-evenly",
                            width: "100%",
                            maxWidth: "1200px",
                            margin: "0 auto"
                        }}>
                            <IconButton onClick={toggleMic}>
                                {isMicOn ? <MicOffIcon sx={{fontSize: 60}}/> : <MicIcon sx={{fontSize: 60}}/>}
                            </IconButton>

                            <IconButton onClick={toggleCam} size="large">
                                {isCamOn ? <VideocamOffIcon sx={{fontSize: 60}}/> : <VideocamIcon sx={{fontSize: 60}}/>}
                            </IconButton>

                            <div>
                                <img src={`${photopath}/${participantImage}`}
                                     style={{width: "60px", borderRadius: "100%"}}/>
                            </div>
                        </div>
                        <div>
                            <Button
                                variant="contained"
                                type="submit"
                                disabled={!roomName || !participantName}
                                sx={{display: 'block', margin: '0 auto', fontSize: 20}}>
                                입장
                            </Button>
                        </div>
                    </form>
                </div>
            <JoinControlPanel/>
        </div>
    );
}
