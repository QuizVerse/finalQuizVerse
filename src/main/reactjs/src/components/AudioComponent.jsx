import { LocalAudioTrack, RemoteAudioTrack } from "livekit-client";
import { useEffect, useRef, useState } from "react";


export default function AudioComponent({ track, muted }) { //isLocal
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
    
    useEffect(() => {
        if (track) {
            track.mediaStreamTrack.enabled = !muted; // track의 enabled 속성으로 오디오 송출 제어
        }
    }, [track, muted]);

    // useEffect(() => {
    //     if (audioElement.current) {
    //         track.attach(audioElement.current);
    //     }

    //     return () => {
    //         track.detach();
    //     };
    // }, [track, isLocal]);

    return <audio ref={audioElement} id={track.sid} autoPlay />;
    //return <audio ref={audioElement} id={track?.sid} />; // autoPlay와 controls 속성 추가
    // return (
    //     <audio ref={audioElement} id={track.sid} muted={isLocal} autoPlay />
    // );

}

