import {
  LocalAudioTrack,
  LocalVideoTrack,
  Room,
  RoomEvent
} from "livekit-client";
import "./StudyRoom.css";
import { useEffect, useState } from "react";
import VideoComponent from "../../components/VideoComponent";
import AudioComponent from "../../components/AudioComponent";
import ShareVideoComponent from "../../components/ShareVideoComponent";
import StartVideoComponent from "../../components/StartVideoComponent";
import { LiveKitRoom, LayoutContextProvider } from "@livekit/components-react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

let APPLICATION_SERVER_URL = "";
let LIVEKIT_URL = "";
configureUrls();

function configureUrls() {
    APPLICATION_SERVER_URL = "https://www.quizverse.kro.kr/";
    LIVEKIT_URL = "wss://openvidu.openvidu.kro.kr/";
}

// function configureUrls() {
//     APPLICATION_SERVER_URL = "http://localhost:3000/";
//     LIVEKIT_URL = "wss://openvidu.openvidu.kro.kr/";
// }

export default function StudyRoom() {
    const [room, setRoom] = useState(undefined);
    const [localTrack, setLocalTrack] = useState(undefined);
    const [localAudioTrack, setLocalAudioTrack] = useState(null);
    const [remoteTracks, setRemoteTracks] = useState([]);
    const [participantName, setParticipantName] = useState("");
    const [roomName, setRoomName] = useState("");
    const [token, setToken] = useState(null);
    const [isCameraEnabled, setIsCameraEnabled] = useState(true);
    const [isScreenSharing, setIsScreenSharing] = useState(false);
    const [screenTrack, setScreenTrack] = useState(null);
    const [previewStream, setPreviewStream] = useState(undefined); // 추가: 미리보기 상태
    const {study_id,studyTitle } = useParams(); // URL에서 studyId 추출
    const [sharedScreenTrackSid, setSharedScreenTrackSid] = useState(null);
    const [isMicrophoneMuted, setIsMicrophoneMuted] = useState(false);
    const navi = useNavigate();


    //사용자 정보를 가져오는 함수
    const getUserDto = () => {
        axios.get(`/book/username`).then((res) => {
            //닉네임불러오기
            setParticipantName(res.data.userNickname);
          });
    };

    useEffect(() => {
        getUserDto();
        setRoomName(studyTitle);
    },[]); 
    
    // 방에 참가하기 전 카메라 미리보기 활성화 함수
    const startVideoPreview = async () => {
        try {
            // 사용자의 비디오 장치에서 비디오 스트림을 생성
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            const videoTrack = stream.getVideoTracks()[0];
            setPreviewStream(stream); // 미리보기 스트림 설정
            const startVideoTrack = new LocalVideoTrack(videoTrack);
            setLocalTrack(startVideoTrack);
        } catch (error) {
        console.error("비디오 미리보기를 활성화할 수 없습니다:", error);
        }
    };

    // 방에 참가하지 않으면 미리보기 종료
    const stopVideoPreview = () => {
        if (previewStream) {
        previewStream.getTracks().forEach((track) => track.stop());
        setPreviewStream(null);
        }
    };

    useEffect(() => {
        if (!room) {
        startVideoPreview(); // 방에 참가하지 않은 상태에서는 미리보기를 시작
        } else {
        stopVideoPreview(); // 방에 참가할 경우 미리보기 중지
        }

        return () => stopVideoPreview(); // 컴포넌트 언마운트 시 미리보기 종료
    }, [room]); // room 상태 변경에 따라 미리보기 상태를 관리

  async function joinRoom() {
      // 새 Room 객체 초기화
      const room = new Room();
      setRoom(room);

      // Room에서 이벤트 발생 시 동작 지정
      // 새로운 Track을 받을 때...
      room.on(
          RoomEvent.TrackSubscribed,
          (_track, publication, participant) => {
              setRemoteTracks((prev) => [
                  ...prev,
                  { trackPublication: publication, participantIdentity: participant.identity }
              ]);
          }
      );

       // Track이 삭제될 때...
      room.on(RoomEvent.TrackUnsubscribed, (_track, publication) => {
          setRemoteTracks((prev) => prev.filter((track) => track.trackPublication.trackSid !== publication.trackSid));
      });

      try {
          // 방 이름과 참가자 이름으로 애플리케이션 서버에서 토큰 가져오기
          const token = await getToken(roomName, participantName);
          setToken(token);

          // LiveKit URL과 토큰으로 방에 연결
          await room.connect(LIVEKIT_URL, token);

          // 카메라와 마이크 활성화
          await room.localParticipant.enableCameraAndMicrophone();
          // 로컬 비디오 트랙 가져오기
          //setLocalTrack(room.localParticipant.videoTrackPublications.values().next().value.videoTrack);
          const LocalVideoTrack = room.localParticipant.videoTrackPublications.values().next().value?.videoTrack;
          if (LocalVideoTrack) {
              setLocalTrack(LocalVideoTrack);
          } else {
              console.warn("참가자의 비디오 트랙을 찾을 수 없습니다.");
          }
      } catch (error) {
          console.log("방에 연결하는 중 오류가 발생 : ", error.message);
          await leaveRoom();
      }
  }

    //방 나가기
    async function leaveRoom() {
        // 'disconnect' 메서드를 호출하여 방에서 나가기
        await room?.disconnect();
        // 비디오 미리보기 종료
        stopVideoPreview(); // 추가: 미리보기 종료
        // 상태 초기화
        setRoom(undefined);
        setLocalTrack(undefined);
        setPreviewStream(undefined);
        setRemoteTracks([]);
        //공유화면, ?
        if (isScreenSharing && screenTrack) {
            await screenTrack.stop();
            setScreenTrack(null);
        }
        navi(`/study/list`);
    }

  async function getToken(roomName, participantName) {
      try {
          const response = await fetch(APPLICATION_SERVER_URL + "token", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json"
              },
              body: JSON.stringify({
                  roomName: roomName,
                  participantName: participantName
              })
          });
          
          if (!response.ok) {
              const error = await response.json();
              throw new Error(`토큰 가져오기 실패: ${error.errorMessage}`);
          }
  
          const data = await response.json();
          return data.token;
      } catch (error) {
          console.error("토큰 가져오기 실패:", error);
          throw error;
      }
  }
  //카메라 켜기
  async function enableCamera() {
      // 사용자의 비디오 장치에서 비디오 스트림을 생성
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const videoTrack = stream.getVideoTracks()[0];
      const localVideoTrack = new LocalVideoTrack(videoTrack);
      await room.localParticipant.publishTrack(localVideoTrack);
      setLocalTrack(localVideoTrack);
  }
  //카메라 끄기
  async function disableCamera() {
    if (localTrack) {
        await room.localParticipant.unpublishTrack(localTrack);
        localTrack.stop(); // 비디오 트랙을 중지합니다.
        setLocalTrack(null);
    }
    setIsCameraEnabled(false);
  }
  //카메라 토글 함수
  async function toggleCamera() {
      if (isCameraEnabled) {
          await disableCamera();
      } else {
          await enableCamera();
      }
      setIsCameraEnabled(!isCameraEnabled);
  }

// 마이크 음소거 기능
const toggleMicrophone = async () => {
    if (isMicrophoneMuted) {
        // 마이크 켜기
        if (!localAudioTrack) {
            const mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const track = mediaStream.getAudioTracks()[0];
            const audioTrack = new LocalAudioTrack(track);
            await room.localParticipant.publishTrack(audioTrack);
            setLocalAudioTrack(audioTrack);
        } else {
            if (localAudioTrack.mediaStreamTrack) {
                localAudioTrack.mediaStreamTrack.enabled = true;
            }
        }
        setIsMicrophoneMuted(false);
    } else {
        // 마이크 끄기
        if (localAudioTrack) {
            await room.localParticipant.unpublishTrack(localAudioTrack);
            if (localAudioTrack.mediaStreamTrack) {
                localAudioTrack.mediaStreamTrack.enabled = false;
            }
            localAudioTrack.stop();
            setLocalAudioTrack(null);
        }
        setIsMicrophoneMuted(true);
    }
    // 상대방 오디오 음소거 제어
    remoteTracks.forEach(remoteTrack => {
        if (remoteTrack.trackPublication.kind === "audio") {
            remoteTrack.trackPublication.audioTrack.mediaStreamTrack.enabled = !isMicrophoneMuted;
        }
    });
};

    // 화면 공유
    async function toggleScreenSharing() {
        try {
            if (isScreenSharing) {
                // 화면 공유 중지
                if (screenTrack) {
                    try {
                        await screenTrack.stop();
                        room.localParticipant.unpublishTrack(screenTrack);
                        setScreenTrack(null);
                        setSharedScreenTrackSid(null); // 화면 공유 중지 시, 식별자도 초기화
                    } catch (error) {
                        console.error("화면 공유 중지 중 에러 발생:", error);
                        alert("화면 공유를 중지하는 동안 문제가 발생했습니다.");
                    }
                }
            } else {
                // 화면 공유 시작
                try {
                    const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
                    const track = stream.getVideoTracks()[0];
                    setScreenTrack(track);
                    await room.localParticipant.publishTrack(track);
                    setSharedScreenTrackSid(track.id); // 화면 공유 시, 고유 식별자 설정
                } catch (error) {
                    console.error("화면 공유 시작 중 에러 발생:", error);
                    alert("화면 공유를 시작하는 동안 문제가 발생했습니다. 권한을 허용했는지 확인하세요.");
                }
            }
            // 화면 공유 상태 토글
            setIsScreenSharing(!isScreenSharing);
        } catch (error) {
            console.error("화면 공유 토글 중 에러 발생:", error);
            alert("화면 공유 상태를 변경하는 동안 문제가 발생했습니다.");
        }
    }

  //채팅
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
      const ws = new WebSocket('wss://www.quizverse.kro.kr/ws/chat');
      //const ws = new WebSocket('ws://localhost:9002/ws/chat');
      
      ws.onopen = () => {
      console.log('웹소켓 연결이 설정되었습니다.');
      };

      ws.onmessage = (event) => {
      console.log('메시지 수신됨:', event.data);
      setMessages((prevMessages) => [...prevMessages, `${event.data}`]);
      };
  
      ws.onclose = () => {
      console.log('웹소켓 연결이 종료되었습니다.');
      };
  
      ws.onerror = (error) => {
      console.error('웹소켓 오류 발생:', error);
      };

      setSocket(ws);
      
      return () => {
          ws.close();
      };
      }, [participantName]);

  const sendMessage = (e) => {
      e.preventDefault();
      if (socket && message) {
          let sending = participantName + " : " + message;
          socket.send(sending);
          setMessage(''); // 메시지 입력란 비우기
      }
      else {
          console.warn('소켓이 열려 있지 않거나 메시지가 비어 있습니다.');
      }
  };

  return (
      <LayoutContextProvider>
      <LiveKitRoom> 
          {/* token={token} serverUrl={LIVEKIT_URL} connect={!!token} */}
          {!room ? (
              <div id="join">
                  <div id="join-dialog">
                  <h2 id="room-title">{roomName}</h2>
                  &nbsp;
                    <button className="btn btn-danger" id="leave-room-button" onClick={leaveRoom}>
                        Leave Room
                    </button>
                        {/* 미리보는 화상창 */}
                        {previewStream && (
                        <StartVideoComponent
                            track={previewStream.getVideoTracks()[0]} // MediaStreamTrack을 전달
                            local={true}
                        />
                        )}
                      <form
                          onSubmit={(e) => {
                              joinRoom();
                              e.preventDefault();
                          }}
                      >
                          <div>
                              {/* <label htmlFor="participant-name">참가자</label> */}
                              <input
                                  id="participant-name"
                                  className="form-control"
                                  type="text"
                                  value={participantName}
                                  onChange={(e) => setParticipantName(e.target.value)}
                                  required
                              />
                          </div>
                          <div>
                              {/* <label htmlFor="room-name">Room</label> */}
                              <input
                                  id="room-name"
                                  className="form-control"
                                  type="hidden"
                                  value={roomName}
                                  onChange={(e) => setRoomName(e.target.value)}
                                  required
                              />
                          </div>
                            <button className="btn btn-secondary" onClick={toggleCamera}>
                                {isCameraEnabled ? "카메라 끄기" : "카메라 켜기"}
                            </button>
                            <button className="btn btn-secondary" onClick={toggleMicrophone}>
                                {isMicrophoneMuted ? "마이크 끄기" : "마이크 켜기"}
                            </button>
                          <button
                              className="btn btn-lg btn-success"
                              type="submit"
                              disabled={!roomName || !participantName}
                            >
                              입장
                          </button>
                      </form>
                  </div>
              </div>
          ) : (
              <div id="room">
                  <div id="room-header">
                      <h2 id="room-title">{roomName}</h2>
                      <button className="btn btn-danger" id="leave-room-button" onClick={leaveRoom}>
                          Leave Room
                      </button>
                  </div>
                  <div id="layout-container-share">
                        {/* 화면 공유 비디오 표시 */}
                        {isScreenSharing && screenTrack && (
                            <ShareVideoComponent
                                track={screenTrack} // 화면 공유 비디오 트랙
                                participantIdentity={participantName} // 화면 공유를 나타내는 고유 이름
                                local={true}
                            />
                        )}
                        {/* 원격 화면 공유 비디오 트랙을 추가로 렌더링 */}
                        {remoteTracks
                            .filter(remoteTrack =>
                                remoteTrack.trackPublication.kind === "video" &&
                                remoteTrack.trackPublication.trackSid === sharedScreenTrackSid  //screenTrack?.sid
                            )
                            .map(remoteTrack => (
                                <ShareVideoComponent
                                    key={remoteTrack.trackPublication.trackSid}
                                    track={remoteTrack.trackPublication.videoTrack}
                                    participantIdentity={remoteTrack.participantIdentity}
                                />
                        ))}
                    </div>
                    <div id="layout-container">
                        {/* {localTrack &&(
                            <VideoComponent track={localTrack} participantIdentity={participantName} local={true} />
                        )} */}
                        {localTrack && (
                            <>
                                {/* 로컬 비디오 컴포넌트 렌더링 */}
                                <VideoComponent track={localTrack} participantIdentity={participantName} local={true} />
                                
                                {/* 로컬 오디오 컴포넌트 렌더링 */}
                                {localAudioTrack && (
                                    <AudioComponent track={localAudioTrack} isLocal={true} />
                                )}
                            </>
                        )}
                        {/* 일반 비디오 및 오디오 트랙 렌더링 */}
                        {remoteTracks
                            .filter(remoteTrack =>
                                remoteTrack.trackPublication.trackSid !== sharedScreenTrackSid
                            )
                            .map(remoteTrack =>
                                remoteTrack.trackPublication.kind === "video" ? (
                                    <VideoComponent
                                        key={remoteTrack.trackPublication.trackSid}
                                        track={remoteTrack.trackPublication.videoTrack}
                                        participantIdentity={remoteTrack.participantIdentity}
                                    />
                                ) : (
                                    <AudioComponent
                                        key={remoteTrack.trackPublication.trackSid}
                                        track={remoteTrack.trackPublication.audioTrack}
                                        muted={isMicrophoneMuted} // 음소거 상태 전달
                                    />
                                )
                            )
                        }
                    </div>
                  <button className="btn btn-secondary" onClick={toggleCamera}>
                      {isCameraEnabled ? "카메라 끄기" : "카메라 켜기"}
                  </button>
                  <button className="btn btn-secondary" onClick={toggleMicrophone}>
                      {isMicrophoneMuted   ? "마이크 끄기" : "마이크 켜기"}
                  </button>
                  <button className="btn btn-secondary" onClick={toggleScreenSharing}>
                      {isScreenSharing ? "화면 공유 중지" : "화면 공유"}
                  </button>
                  <div className="chat-container">
                      <ul id="messages">
                      {messages.map((msg, index) => (
                          <li key={index}>{msg}</li>
                      ))}
                      </ul>
                      <form onSubmit={sendMessage}>
                      <input
                          autoComplete="off"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="메시지를 입력하세요"
                      />
                      <button type="submit">Send</button>
                      </form>
                  </div>
              </div>
          )}
      </LiveKitRoom>
      </LayoutContextProvider> 
  );
}
