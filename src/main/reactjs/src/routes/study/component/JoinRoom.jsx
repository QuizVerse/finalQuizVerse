export default function JoinRoom({ participantName, participantImage, photopath, isMicOn, isCamOn, toggleMic, toggleCam, joinRoom }) {
    return (
        <div id="join">
            <div id="join-dialog">
                <AppBar position="static" sx={{ backgroundColor: 'lightgray' }}>
                    <Toolbar>
                        <Typography variant="h4">
                            <b>Room Name</b>
                        </Typography>
                        <Box sx={{ flexGrow: 1 }} />
                    </Toolbar>
                </AppBar>

                {/* 미리보는 화상창 */}
                {participantImage ? (
                    <div className="startvideo-container2">
                        <img src={`${photopath}/${participantImage}`} style={{ width: '320px', height: '240px' }} />
                    </div>
                ) : (
                    <div>No Preview Available</div>
                )}

                {/* 참여자 정보 입력 */}
                <form onSubmit={joinRoom}>
                    <input type="text" value={participantName} required onChange={() => {}} placeholder="Enter Name" />

                    <div>
                        <IconButton onClick={toggleMic}>
                            {isMicOn ? <MicOffIcon sx={{ fontSize: 60 }} /> : <MicIcon sx={{ fontSize: 60 }} />}
                        </IconButton>

                        <IconButton onClick={toggleCam}>
                            {isCamOn ? <VideocamOffIcon sx={{ fontSize: 60 }} /> : <VideocamIcon sx={{ fontSize: 60 }} />}
                        </IconButton>

                        <img src={`${photopath}/${participantImage}`} style={{ width: "60px", borderRadius: "100%" }} />
                    </div>

                    <Button variant="contained" type="submit">입장</Button>
                </form>
            </div>
        </div>
    );
}
