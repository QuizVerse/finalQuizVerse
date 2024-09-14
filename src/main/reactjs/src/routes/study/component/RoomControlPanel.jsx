import {Button, IconButton, Tooltip} from "@mui/material";
import {
    Videocam as VideocamIcon,
    VideocamOff as VideocamOffIcon,
    Mic as MicIcon,
    MicOff as MicOffIcon,
    ExitToApp as ExitToAppIcon
} from '@mui/icons-material';
import {ChatIcon, ScreenShareIcon} from "@livekit/components-react";

export default function RoomControlPanel({ toggleMic, toggleCam, toggleScreenSharing, leaveRoom, isCamOn, isMicOn, isScreenSharing }) {
    return (
        <div className="flex justify-between items-center p-4 bg-black text-white">
            <span className="text-sm">{roomName}</span>
            <div className="flex space-x-2">
                {/* 카메라 토글 버튼 */}
                <Tooltip title={isCameraEnabled ? '카메라 끄기' : '카메라 켜기'}>
                    <Button onClick={toggleCam} variant={"contained"}>
                        {isCameraEnabled ? <VideocamIcon fontSize="medium"/> : <VideocamOffIcon fontSize="medium"/>}
                    </Button>
                </Tooltip>

                {/* 마이크 토글 버튼 */}
                <Tooltip title={isMicrophoneMuted ? '마이크 끄기' : '마이크 켜기'}>
                    <Button onClick={toggleMicrophone} variant={"contained"}>
                        {isMicrophoneMuted ? <MicIcon fontSize="medium"/> : <MicOffIcon fontSize="medium"/>}
                    </Button>
                </Tooltip>

                {/* 화면 공유 토글 버튼 */}
                <Tooltip title={isScreenSharing ? '공유 중지' : '화면 공유'}>
                    <Button onClick={toggleScreenSharing} variant={"contained"}>
                        {isScreenSharing ? <ScreenShareIcon fontSize="medium"/> : <ScreenShareIcon fontSize="medium"/>}
                    </Button>
                </Tooltip>

                {/* 나가기 버튼 */}
                <Tooltip title="나가기">
                    <Button onClick={() => leaveRoom(study_id)} variant={"contained"}>
                        <ExitToAppIcon fontSize="medium"/>
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
    );
}
