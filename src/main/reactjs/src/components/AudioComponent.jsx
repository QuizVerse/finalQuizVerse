import { LocalAudioTrack, RemoteAudioTrack } from "livekit-client";
import { useEffect, useRef, useState } from "react";


export default function AudioComponent({ track, muted }) {
    const audioElement = useRef(null);

    useEffect(() => {
        if (audioElement.current) {
            track.attach(audioElement.current);
            audioElement.current.muted = muted; // 음소거 상태 적용
        }

        return () => {
            track.detach();
        };
    }, [track, muted]);

    //return <audio ref={audioElement} id={track.sid} />;
    return <audio ref={audioElement} id={track?.sid} />; // autoPlay와 controls 속성 추가

}

