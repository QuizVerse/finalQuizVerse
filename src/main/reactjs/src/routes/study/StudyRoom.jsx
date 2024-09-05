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
    const [isMicrophoneEnabled, setIsMicrophoneEnabled] = useState(true);
    const [isScreenSharing, setIsScreenSharing] = useState(false);
    const [screenTrack, setScreenTrack] = useState(null);
    const [previewStream, setPreviewStream] = useState(undefined); // 추가: 미리보기 상태
    const { study_id,studyTitle } = useParams(); // URL에서 studyId 추출
    const [sharedScreenTrackSid, setSharedScreenTrackSid] = useState(null);
    const navi = useNavigate();
    // 원격 화면 공유 트랙 상태 추가
    const [remoteSharedScreenTrack, setRemoteSharedScreenTrack] = useState(null);
    
    // // 트랙의 해상도를 확인하는 함수
    // function isScreenSharingTrack(track) {
    //     if (track.kind === 'video') {
    //         const settings = track.mediaStreamTrack.getSettings();
    //         return settings.width && settings.height && (settings.width > 1280 || settings.height > 720); // 해상도가 1280x720보다 크면 화면 공유로 가정
    //     }
    //     return false;
    // }
    // // 원격 트랙 업데이트 로직
    // useEffect(() => {
    //     // 원격 트랙이 변경될 때마다 실행
    //     const sharedScreenTrack = remoteTracks.find(remoteTrack => 
    //         remoteTrack.trackPublication.kind === 'video' && 
    //         isScreenSharingTrack(remoteTrack.trackPublication.track)
    //     );

    //     if (sharedScreenTrack) {
    //         setRemoteSharedScreenTrack(sharedScreenTrack.trackPublication);
    //     } else {
    //         setRemoteSharedScreenTrack(null);
    //     }
    // }, [remoteTracks]);

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

    // 현재 사용 중인 비디오 스트림이 있는 경우, 해당 스트림의 모든 트랙을 중지합니다.
    const streams = await navigator.mediaDevices.enumerateDevices();
    for (const stream of streams) {
        if (stream.kind === 'videoinput') {
            const mediaStream = await navigator.mediaDevices.getUserMedia({ video: { deviceId: stream.deviceId } });
            mediaStream.getTracks().forEach(track => track.stop());
        }
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
  //마이크 켜기
  async function enableMicrophone() {
      if (!localAudioTrack) {
          // 새로운 오디오 트랙을 생성합니다.
          const mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
          const track = mediaStream.getAudioTracks()[0];
          const audioTrack = new LocalAudioTrack(track);
      
          // 트랙을 퍼블리시합니다.
          await room.localParticipant.publishTrack(audioTrack);
          setLocalAudioTrack(audioTrack);
      } else {
          // 이미 트랙이 존재하면, 상태를 활성화합니다.
          //localAudioTrack.mediaStreamTrack.enabled = true;
          if (localAudioTrack.mediaStreamTrack) {
              localAudioTrack.mediaStreamTrack.enabled = true;
          }
      }
      setIsMicrophoneEnabled(true);
  }
  ///////
  // async function stopAllMediaStreams() {
  //     const devices = await navigator.mediaDevices.enumerateDevices();
  //     const audioInputs = devices.filter(device => device.kind === 'audioinput');

  //     // 병렬로 모든 오디오 입력 장치 처리
  //     // const stopPromises = audioInputs.map(async device => {
  //     //     const stream = await navigator.mediaDevices.getUserMedia({ audio: { deviceId: device.deviceId } });
  //     //     stream.getTracks().forEach(track => track.stop());
  //     // });
  //     // await Promise.all(stopPromises);
  //     for (const device of audioInputs) {
  //         const stream = await navigator.mediaDevices.getUserMedia({ audio: { deviceId: device.deviceId } });
  //             stream.getTracks().forEach(track => {
  //                 console.log(`Stopping track from device: ${device.label}`);
  //                 track.stop(); // Stop the individual track
  //             });
  //     }
  // }
  //마이크 끄기
  async function disableMicrophone() {
      if (localAudioTrack) {
          // 필요시 트랙을 언퍼블리시합니다.
          await room.localParticipant.unpublishTrack(localAudioTrack);
          if (localAudioTrack.mediaStreamTrack) {
              localAudioTrack.mediaStreamTrack.stop(); // 트랙을 완전히 중지합니다.
          }
          // 트랙을 중지
          localAudioTrack.stop();  // 추가: LocalAudioTrack의 stop 메서드를 호출하여 트랙을 정리합니다.
          setLocalAudioTrack(null);
      }
      // 모든 오디오 트랙 중지
      // await stopAllMediaStreams();
      setIsMicrophoneEnabled(false);
  }
  //마이크 토글
  async function toggleMicrophone() {
      if (isMicrophoneEnabled) {
          await disableMicrophone();
      } else {
          await enableMicrophone();
      }
  }

    //화면공유
    async function toggleScreenSharing() {
        if (isScreenSharing) {
            if (screenTrack) {
                //공유화면 중지
                await room.localParticipant.unpublishTrack(screenTrack);
                screenTrack.stop();
                setScreenTrack(null);
                setSharedScreenTrackSid(null); // 화면 공유 트랙 식별자 초기화
            }
        } else {
            //공유화면 시작
            //const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
            const stream = await navigator.mediaDevices.getDisplayMedia({ 
                video: { 
                    cursor: "always" // 화면 공유일 때만 커서를 항상 보이도록 설정
                } 
            });
            const videoTrack = stream.getVideoTracks()[0];
            const localScreenTrack = new LocalVideoTrack(videoTrack);

            videoTrack.onended = () => {
                console.log('화면 공유가 중지되었습니다.');
                setIsScreenSharing(false);
                setScreenTrack(null);
                setSharedScreenTrackSid(null); // 화면 공유 중지 시 식별자 초기화
            };

            setScreenTrack(localScreenTrack);
            setSharedScreenTrackSid(localScreenTrack.sid); // 화면 공유 트랙 식별자 설정
            await room.localParticipant.publishTrack(localScreenTrack);
        }
        setIsScreenSharing(!isScreenSharing);
    }

  //채팅
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
      const ws = new WebSocket('wss://openvidu.quizver.kro.kr/ws/chat');
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
                                {isMicrophoneEnabled ? "마이크 끄기" : "마이크 켜기"}
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
                        {localTrack && (
                            <VideoComponent track={localTrack} participantIdentity={participantName} local={true} />
                        )}
                        {/* 일반 비디오 및 오디오 트랙 렌더링 */}
                        {remoteTracks
                                .filter(remoteTrack =>
                                    remoteTrack.trackPublication.kind === "video" &&
                                    remoteTrack.trackPublication.trackSid !== sharedScreenTrackSid  //screenTrack?.sid
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
                                            participantIdentity={remoteTrack.participantIdentity}
                                        />
                                    )
                                )}
                    </div>
                  <button className="btn btn-secondary" onClick={toggleCamera}>
                      {isCameraEnabled ? "카메라 끄기" : "카메라 켜기"}
                  </button>
                  <button className="btn btn-secondary" onClick={toggleMicrophone}>
                      {isMicrophoneEnabled ? "마이크 끄기" : "마이크 켜기"}
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
