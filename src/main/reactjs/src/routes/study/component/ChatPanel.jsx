import {useEffect, useRef} from "react";

export default function ChatComponent({ messages, message, setMessage, sendMessage }) {
    const chatEndRef = useRef(null);

    useEffect(() => {
        if (chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    return (
        <div className="chat-container">
            <div className="chat-messages">
                {messages.map((msg, index) => (
                    <div key={index} className="message">
                        {msg}
                    </div>
                ))}
                <div ref={chatEndRef}></div>
            </div>

            <form onSubmit={sendMessage}>
                <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="메시지를 입력하세요" />
                <button type="submit">Send</button>
            </form>
        </div>
    );
}
