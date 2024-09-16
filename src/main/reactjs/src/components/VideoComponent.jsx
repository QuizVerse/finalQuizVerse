import "./VideoComponent.css";
import { useEffect, useRef } from "react";

export default function VideoComponent({ track, participantIdentity, local = false }) {
    const videoElement = useRef(null);

    useEffect(() => {
        const video = videoElement.current;
        console.log("Video Element:", video);
        console.log("Track prop:", track);
        
        if (video) {
            if (track instanceof MediaStreamTrack) {
                video.srcObject = new MediaStream([track]);
            } else if (track.attach) {
                track.attach(video);
            }
        } else {
            console.error("videoElement.current is null");
        }

        return () => {
            //track.detach();
            if (track instanceof MediaStreamTrack) {
                // MediaStreamTrack을 사용하는 경우
                //videoElement.current.srcObject = null;
            } else if (track.detach) {
                // LiveKit 트랙을 사용하는 경우
                track.detach(video);
            }
        };
    }, [track]);

    return (
        <div id={"camera-" + participantIdentity} className="video-container">
            <div className="participant-data">
                <p>{participantIdentity + (local ? " (You)" : "")}</p>
            </div>
            {/* <video ref={videoElement} id={track.sid}></video> */}
            <video ref={videoElement} autoPlay playsInline muted={local}></video>
        </div>
    );
}
