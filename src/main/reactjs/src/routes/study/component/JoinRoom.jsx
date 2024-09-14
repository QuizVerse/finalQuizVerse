import { AppBar, Box, Button, IconButton, Toolbar, Typography } from "@mui/material";
import { Videocam as VideocamIcon, VideocamOff as VideocamOffIcon, Mic as MicIcon, MicOff as MicOffIcon, ExitToApp as ExitToAppIcon } from '@mui/icons-material';
import StartVideoComponent from "../../../components/study/StartVideoComponent";

export default function JoinRoom({ roomName, studyId, participantName, participantImage, photopath, isMicOn, isCamOn, toggleMic, toggleCam, joinRoom, leaveRoom }) {
    return (
        <div id="join">
            <div id="join-dialog">
                <AppBar position="static" sx={{ backgroundColor: 'lightgray' }}>
                    <Toolbar>
                        <Typography variant="h4">
                            <b>{roomName}</b>
                        </Typography>
                        <Box sx={{ flexGrow: 1 }} />
                        <IconButton color="inherit" onClick={() => leaveRoom(studyId)}>
                            <ExitToAppIcon sx={{ fontSize: 30 }} />
                        </IconButton>
                    </Toolbar>
                </AppBar>

                {previewStream ? (
                    <StartVideoComponent track={previewStream.getVideoTracks()[0]} local={true} />
                ) : (
                    <div className="startvideo-container2">
                        <img
                            src={`${photopath}/${participantImage}`}
                            style={{ width: '320px', height: '240px' }}
                        />
                    </div>
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
                    <div>
                        <input
                            id="room-name"
                            className="form-control"
                            type="hidden"
                            value={roomName}
                            onChange={(e) => setRoomName(e.target.value)}
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
                            {isMicOn ? <MicOffIcon sx={{ fontSize: 60 }} /> : <MicIcon sx={{ fontSize: 60 }} />}
                        </IconButton>

                        <IconButton onClick={toggleCam} size="large">
                            {isCamOn ? <VideocamOffIcon sx={{ fontSize: 60 }} /> : <VideocamIcon sx={{ fontSize: 60 }} />}
                        </IconButton>

                        <div>
                            <img src={`${photopath}/${participantImage}`} style={{ width: "60px", borderRadius: "100%" }} />
                        </div>
                    </div>
                    <div>
                        <Button
                            variant="contained"
                            type="submit"
                            disabled={!roomName || !participantName}
                            sx={{ display: 'block', margin: '0 auto', fontSize: 20 }}
                        >
                            입장
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
