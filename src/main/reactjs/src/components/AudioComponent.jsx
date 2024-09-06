import { LocalAudioTrack, RemoteAudioTrack } from "livekit-client";
import { useEffect, useRef, useState } from "react";


export default function AudioComponent({ track }) {
    const audioElement = useRef(null);

    useEffect(() => {
        if (audioElement.current && track) {
            // 오디오 요소에 트랙을 연결합니다.
            track.attach(audioElement.current);

            // 컴포넌트가 언마운트될 때 트랙을 해제합니다.
            return () => {
                if (track) {
                    track.detach(audioElement.current);
                }
            };
        }
    }, [track]);

    //return <audio ref={audioElement} id={track.sid} />;
    return <audio ref={audioElement} id={track?.sid} autoPlay />; // autoPlay와 controls 속성 추가

}

