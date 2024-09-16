import "./VideoComponent.css";
import { useEffect, useRef } from "react";

export default function VideoComponentcopy({ track, participantIdentity, local = false , participantImage }) {
    
    useEffect(() => {
        console.log("Participant Identity:", participantIdentity); // 이름 확인
        console.log("Participant Image:", participantImage); // 이미지 경로 확인
    }, [participantIdentity, participantImage]);

    return (
        <div className="video-container2">
            <div className="participant-data absolute top-0 right-0">
                <p>{participantIdentity}</p>
            </div>
            <img
                src={`${participantImage}`} // 카메라 꺼진 상태를 나타내는 이미지 경로
                style={{ width: '320px', height: '240px' }} // 원하는 크기 설정
                />
        </div>
    );
}
