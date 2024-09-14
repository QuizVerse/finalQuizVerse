import ShareVideoComponent from "../../../components/study/ShareVideoComponent";
import VideoComponent from "../../../components/study/VideoComponent";
import AudioComponent from "../../../components/study/AudioComponent";

export default function RoomView({ roomName, isCamOn, localTrack, remoteTracks, cameraStatus, screenTrack }) {
    return (
        <div id="room" className="room-view">
            <div id="layout-container-share">
                {screenTrack ? (
                    <ShareVideoComponent track={screenTrack} />
                ) : null}
            </div>

            <div id="layout-container">
                {!isCamOn && localTrack ? (
                    <VideoComponent track={localTrack} participantIdentity={"You"} local />
                ) : (
                    <div className="video-container">
                        <p>You</p>
                        <img src="your_profile_picture_url" style={{ width: '320px', height: '240px' }} />
                    </div>
                )}

                {remoteTracks.map((track) => (
                    <div key={track.trackSid} className="remote-participant">
                        {track.isVideo ? (
                            <VideoComponent track={track} participantIdentity={track.participantIdentity} />
                        ) : (
                            <AudioComponent track={track} />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
