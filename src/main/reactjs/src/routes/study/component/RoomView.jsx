import ShareVideoComponent from "../../../components/study/ShareVideoComponent";
import VideoComponent from "../../../components/study/VideoComponent";
import AudioComponent from "../../../components/study/AudioComponent";
import {
    ExitToApp as ExitToAppIcon,
    Mic as MicIcon,
    MicOff as MicOffIcon,
    Videocam as VideocamIcon,
    VideocamOff as VideocamOffIcon
} from "@mui/icons-material";
import {ScreenShareIcon} from "@livekit/components-react";
import VideoComponentcopy from "../../../components/study/VideoComponent copy";
import {useState} from "react";
import axios from "axios";

export default function RoomView({ roomName, isCamOn, localTrack, remoteTracks, cameraStatus, screenTrack }) {

    const [previewStream, setPreviewStream] = useState(undefined); // 추가: 미리보기 상태
    const [participantName, setParticipantName] = useState("");
    const [participantImage, setParticipantImage] = useState("");

    //
    // //방 나가기
    // async function leaveRoom(studyId) {
    //     console.log("Received studyId:", studyId); // studyId 값 출력
    //     // 서버에 스터디 멤버 삭제 요청
    //     await axios.post(`/studys/removes?studyId=${studyId}`);
    //     // 'disconnect' 메서드를 호출하여 방에서 나가기
    //     await room?.disconnect();
    //     // 비디오 미리보기 종료
    //     stopVideoPreview(); // 추가: 미리보기 종료
    //     // 상태 초기화
    //     setRoom(undefined);
    //     setLocalTrack(undefined);
    //     setPreviewStream(undefined);
    //     setRemoteTracks([]);
    //     //공유화면 정리
    //     if (isScreenSharing && screenTrack) {
    //         await screenTrack.stop();
    //         setScreenTrack(null);
    //     }
    //     navi(`/study/list`);
    // }
    //

    return (
        <></>
        // <div className="grid grid-cols-[0.5fr,1.5fr,0.5fr] h-[85vh]">
        //     <div className="flex flex-col bg-gray-100 p-4 " style={{height: '100%'}}>
        //         {/* 사용자들이 나올 화면에 스크롤 기능 추가 */}
        //         <div className="flex-grow overflow-y-auto">
        //             <div className="flex flex-col space-y-2 h-[40vh]">
        //                 사용자들이 나올 화면<br/>
        //                 시바타 유니<br/>
        //                 정상혁<br/>
        //                 우태형<br/>
        //                 도훈하윤<br/>
        //                 막내 aka 민지박
        //                 {/* 많은 사용자 예시 추가 */}
        //                 더 많은 사용자들<br/>
        //                 사용자 A<br/>
        //                 사용자 B<br/>
        //                 사용자 C<br/>
        //                 사용자 D<br/>
        //                 사용자 E<br/>
        //                 사용자 F<br/>
        //                 사용자 G<br/>
        //                 사용자 A<br/>
        //                 사용자 B<br/>
        //                 사용자 C<br/>
        //                 사용자 D<br/>
        //                 사용자 E<br/>
        //                 사용자 F<br/>
        //                 사용자 G<br/>
        //                 사용자 A<br/>
        //                 사용자 B<br/>
        //                 사용자 C<br/>
        //                 사용자 D<br/>
        //                 사용자 E<br/>
        //                 사용자 F<br/>
        //                 사용자 G<br/>
        //                 사용자 A<br/>
        //                 사용자 B<br/>
        //                 사용자 C<br/>
        //                 사용자 D<br/>
        //                 사용자 E<br/>
        //                 사용자 F<br/>
        //                 사용자 G<br/>
        //                 사용자 D<br/>
        //                 사용자 E<br/>
        //                 사용자 F<br/>
        //                 사용자 G<br/>
        //             </div>
        //         </div>
        //
        //         {/* 버튼 영역 */}
        //         <div className="h-[50vh] bg-gray text-white p-4">
        //             {/* 빈 공간 */}
        //             <div className="h-[50%]"/>
        //
        //             {/* 버튼 영역 하단 절반 */}
        //             <div className="grid grid-cols-2 grid-rows-2 gap-4 h-[50%]">
        //                 {/* 카메라 토글 버튼 */}
        //                 <button className="flex flex-col items-center justify-center py-1 px-2" onClick={toggleCam}>
        //                     {isCameraEnabled ? <VideocamIcon fontSize="medium"/> : <VideocamOffIcon fontSize="medium"/>}
        //                     <span className="text-s mt-1">{isCameraEnabled ? '카메라 끄기' : '카메라 켜기'}</span>
        //                 </button>
        //
        //                 {/* 마이크 토글 버튼 */}
        //                 <button className="flex flex-col items-center justify-center py-1 px-2"
        //                         onClick={toggleMicrophone}>
        //                     {isMicrophoneMuted ? <MicIcon fontSize="medium"/> : <MicOffIcon fontSize="medium"/>}
        //                     <span className="text-s mt-1">{isMicrophoneMuted ? '마이크 끄기' : '마이크 켜기'}</span>
        //                 </button>
        //
        //                 {/* 화면 공유 토글 버튼 */}
        //                 <button className="flex flex-col items-center justify-center py-1 px-2"
        //                         onClick={toggleScreenSharing}>
        //                     {isScreenSharing ? <ScreenShareIcon fontSize="medium"/> :
        //                         <ScreenShareIcon fontSize="medium"/>}
        //                     <span className="text-s mt-1">{isScreenSharing ? '공유 중지' : '화면 공유'}</span>
        //                 </button>
        //
        //                 {/* 나가기 버튼 */}
        //                 <button className="flex flex-col items-center justify-center py-1 px-2"
        //                         onClick={() => leaveRoom(studyId)}>
        //                     <ExitToAppIcon fontSize="medium"/>
        //                     <span className="text-s mt-1">나가기</span>
        //                 </button>
        //             </div>
        //         </div>
        //     </div>
        //
        //     <div id="room" className="flex flex-col">
        //         {/* <AppBar position="static" sx={{ backgroundColor: 'lightgray' }}>
        //                         <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        //                             <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
        //                                 {roomName}
        //                             </Typography>
        //                             <Box sx={{ flexGrow: 1, textAlign: 'center', mx: 2 }}> */}
        //         {/* Replace this text with your room description */}
        //         {/* <Typography variant="subtitle1">
        //                                     방에 대한 설명설명충
        //                                 </Typography>
        //                             </Box>
        //                         </Toolbar>
        //                     </AppBar> */}
        //         <div id="layout-container-share" className="">
        //             {/* 화면 공유 비디오 표시 */}
        //             {isScreenSharing && screenTrack && (
        //                 <ShareVideoComponent
        //                     track={screenTrack} // 화면 공유 비디오 트랙
        //                     participantIdentity={screenSharingParticipant || participantName} // 화면 공유를 나타내는 고유 이름
        //                     local={screenSharingParticipant === participantName} // 본인이 공유 중인 경우 local로 설정
        //                 />
        //             )}
        //             {/* 원격 화면 공유 비디오 트랙을 추가로 렌더링 */}
        //             {getSharedScreenTracks(remoteTracks, sharedScreenTrackSid).map(remoteTrack => (
        //                 <ShareVideoComponent
        //                     key={remoteTrack.trackPublication.trackSid}
        //                     track={remoteTrack.trackPublication.videoTrack}
        //                     participantIdentity={remoteTrack.participantIdentity}
        //                 />
        //             ))}
        //         </div>
        //         <div id="layout-container" className="flex-grow h-[80vh]">
        //             {!isCamOn && localTrack ? (
        //                     <VideoComponent track={localTrack} participantIdentity={participantName} local={true}/>
        //                 ) :
        //                 (
        //                     <div className="video-container2">
        //                         <div className="participant-data">
        //                             <p>{participantName + (localTrack ? " (You)" : "")}</p>
        //                         </div>
        //                         <img
        //                             src={`${photopath}/${participantImage}`} // 카메라 꺼진 상태를 나타내는 이미지 경로
        //                             style={{width: '320px', height: '240px'}} // 원하는 크기 설정
        //                         />
        //                     </div>
        //                 )}
        //             {/* 일반 비디오 및 오디오 트랙 렌더링 */}
        //             {remoteTracks
        //                 .filter(track => isRegularVideoTrack(track, sharedScreenTrackSid) || isAudioTrack(track))
        //                 .map(remoteTrack => {
        //                     const isCamOn = cameraStatus[remoteTrack.participantIdentity];
        //                     return remoteTrack.trackPublication.kind === "video" ? (
        //                         !isCamOn ? (
        //                                 <VideoComponent
        //                                     key={remoteTrack.trackPublication.trackSid}
        //                                     track={remoteTrack.trackPublication.videoTrack}
        //                                     participantIdentity={remoteTrack.participantIdentity}
        //                                 />
        //                             ) :
        //                             <VideoComponentcopy
        //                                 participantIdentity={remoteTrack.participantIdentity}
        //                                 participantImage={`${photopath}/${participantImage}`} // 이미지 경로와 파일명 조합
        //                             />
        //                     ) : (
        //                         <AudioComponent
        //                             key={remoteTrack.trackPublication.trackSid}
        //                             track={remoteTrack.trackPublication.audioTrack}
        //                             muted={isMicrophoneMuted} // 음소거 상태 전달
        //                         />
        //                     );
        //                 })
        //             }
        //         </div>
        //     </div>
        //
        //     <div className="flex flex-col bg-gray-100 p-4 " style={{height: '100%'}}>
        //         <div className="flex-grow overflow-y-auto">
        //             <ul id="messages" className="flex flex-col">
        //                 {/* {messages.map((msg, index) => {
        //                                 return (
        //                                     <li
        //                                         key={index}
        //                                         className={`my-2 p-2 rounded-lg ${
        //                                             username === participantName ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-900'
        //                                         }`}
        //                                     >
        //                                         <strong>{username}</strong>: {content}
        //                                     </li>
        //                                 );
        //                             })}
        //                             <li ref={chatEndRef} /> */}
        //                 {messages.map((msg, index) => (
        //                     <li key={index} className="my-2 p-2 rounded-lg bg-gray-200 text-gray-900">
        //                         {msg}
        //                     </li>
        //                 ))}
        //             </ul>
        //         </div>
        //         <form onSubmit={sendMessage} className="flex items-center mt-2">
        //             <input
        //                 type="text"
        //                 autoComplete="off"
        //                 value={message}
        //                 onChange={(e) => setMessage(e.target.value)}
        //                 placeholder="메시지를 입력하세요"
        //                 className="border border-gray-300 rounded-lg py-2 px-4 w-full"
        //             />
        //             <button type="submit" className="bg-blue-500 text-white font-bold py-2 px-4 rounded ml-2">
        //                 Send
        //             </button>
        //         </form>
        //     </div>
        // </div>
    );
}
