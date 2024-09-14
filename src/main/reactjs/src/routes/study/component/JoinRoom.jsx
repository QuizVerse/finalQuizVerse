import {AppBar, Box, Button, IconButton, Toolbar, Typography} from "@mui/material";
import {
    Videocam as VideocamIcon,
    VideocamOff as VideocamOffIcon,
    Mic as MicIcon,
    MicOff as MicOffIcon,
    ExitToApp as ExitToAppIcon
} from '@mui/icons-material';
import StartVideoComponent from "../../../components/study/StartVideoComponent";
import axios from "axios";

export default function JoinRoom({ roomName, studyId, participantName, participantImage, photopath, isMicOn, isCamOn, toggleMic, toggleCam, joinRoom }) {

    //방 나가기
    async function leaveRoom(studyId) {
        console.log("Received studyId:", studyId); // studyId 값 출력
        // 서버에 스터디 멤버 삭제 요청
        await axios.post(`/studys/removes?studyId=${studyId}`);
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

    return (
        <div id="join">
            <div id="join-dialog">
                <AppBar position="static" sx={{backgroundColor: 'lightgray'}}>
                    <Toolbar>
                        <Typography variant="h4">
                            <b>{roomName}</b>
                        </Typography>
                        <Box sx={{flexGrow: 1}}/> {/* 이 Box가 여백을 자동으로 생성 */}
                        <IconButton color="inherit" onClick={() => leaveRoom(studyId)}>
                            <ExitToAppIcon sx={{fontSize: 30}}/>
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
                            style={{width: '320px', height: '240px'}} // 원하는 크기 설정
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
                            {isMicOn ? <MicOffIcon sx={{fontSize: 60}}/> : <MicIcon sx={{fontSize: 60}}/>}
                        </IconButton>

                        <IconButton onClick={toggleCam} size="large">
                            {isCamOn ? <VideocamOffIcon sx={{fontSize: 60}}/> : <VideocamIcon sx={{fontSize: 60}}/>}
                        </IconButton>

                        <div>
                            {/* 프로필사진넣는 명령어 입력해주길 */}
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
        </div>
    );
}
