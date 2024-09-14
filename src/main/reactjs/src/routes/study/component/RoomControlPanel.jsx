import {IconButton} from "@mui/material";
import {
    Videocam as VideocamIcon,
    VideocamOff as VideocamOffIcon,
    Mic as MicIcon,
    MicOff as MicOffIcon,
    ExitToApp as ExitToAppIcon
} from '@mui/icons-material';
import { ScreenShareIcon } from "@livekit/components-react";

export default function RoomControlPanel({ toggleMic, toggleCam, toggleScreenSharing, leaveRoom, isCamOn, isMicOn, isScreenSharing }) {
    return (
        <div className="control-panel">
            <IconButton onClick={toggleMic}>
                {isMicOn ? <MicOffIcon /> : <MicIcon />}
            </IconButton>

            <IconButton onClick={toggleCam}>
                {isCamOn ? <VideocamOffIcon /> : <VideocamIcon />}
            </IconButton>

            <IconButton onClick={toggleScreenSharing}>
                {isScreenSharing ? <ScreenShareIcon /> : <ScreenShareIcon />}
            </IconButton>

            <IconButton onClick={leaveRoom}>
                <ExitToAppIcon />
            </IconButton>
        </div>
    );
}
