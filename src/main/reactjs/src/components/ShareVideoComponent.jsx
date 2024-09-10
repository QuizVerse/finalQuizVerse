import { LocalVideoTrack, RemoteVideoTrack } from "livekit-client";
import "./ShareVideoComponent.css";
import { useEffect, useRef } from "react";

export default function ShareVideoComponent({ track, participantIdentity, local = false}) {
    const videoElement = useRef(null);
    
    useEffect(() => {
        const video = videoElement.current;

        if (video) {
            if (track instanceof MediaStreamTrack) {
                video.srcObject = new MediaStream([track]);
            } else if (track instanceof LocalVideoTrack || track instanceof RemoteVideoTrack) {
                track.attach(video);
            }
        } else {
            console.error("videoElement.current is null");
        }

        return () => {
            //track.detach();
            if (track instanceof MediaStreamTrack) {
                // MediaStreamTrack을 사용하는 경우
                video.srcObject = null;
            } else if (track instanceof LocalVideoTrack || track instanceof RemoteVideoTrack) {
                // LiveKit 트랙을 사용하는 경우
                track.detach(video);
            }
        };
    }, [track]);

    return ( //id={"camera-" + participantIdentity}
        <div className="sharevideo-container">
            <div className="participant-data">
                <p>{participantIdentity + (local ? " (Share - You)" : " (Share)")}</p>
            </div>
            {/* <video ref={videoElement} id={track.sid}></video> */}
            <video ref={videoElement} autoPlay playsInline muted={local}></video>
        </div>
    );
}

