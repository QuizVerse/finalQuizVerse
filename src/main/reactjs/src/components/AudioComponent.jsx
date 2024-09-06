import { LocalAudioTrack, RemoteAudioTrack } from "livekit-client";
import { useEffect, useRef, useState } from "react";


export default function AudioComponent({ track, isLocal }) { //muted
    const audioElement = useRef(null);

    // useEffect(() => {
    //     if (audioElement.current) {
    //         track.attach(audioElement.current);
    //         audioElement.current.muted = muted; // 음소거 상태 적용
    //     }

    //     return () => {
    //         track.detach();
    //     };
    // }, [track, muted]);
    useEffect(() => {
        if (audioElement.current) {
            track.attach(audioElement.current);
        }

        return () => {
            track.detach();
        };
    }, [track]);

    //return <audio ref={audioElement} id={track.sid} />;
    //return <audio ref={audioElement} id={track?.sid} />; // autoPlay와 controls 속성 추가
    return (
        <audio ref={audioElement} id={track.sid} muted={isLocal} autoPlay />
    );

}

