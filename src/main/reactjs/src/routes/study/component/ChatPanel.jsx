import {useEffect, useRef} from "react";

export default function ChatComponent({ messages, message, setMessage, sendMessage }) {
    const chatEndRef = useRef(null);

    useEffect(() => {
        if (chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    return (
        <div className="absolute top-0 right-0 w-80 h-full bg-white border-l">
            <div className="p-4 border-b">
                <h2 className="text-lg font-medium">회의 중 메시지</h2>
                <button
                    type="button"
                    role="combobox"
                    aria-controls="radix-:r2:"
                    aria-expanded="false"
                    aria-autocomplete="none"
                    dir="ltr"
                    data-state="closed"
                    data-placeholder=""
                    className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    id="message-permission"
                >
                    <span>모든 사용자가 메시지를 보낼 수 있도록 허용</span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className="lucide lucide-chevron-down h-4 w-4 opacity-50"
                        aria-hidden="true"
                    >
                        <path d="m6 9 6 6 6-6"></path>
                    </svg>
                </button>
            </div>
            <div className="p-4">
                <p className="text-sm text-muted-foreground">
                    메시지는 고정되어 있지 않은 한, 메시지를 전송하면 통화 중인 사용자에게만 표시됩니다. 통화가 끝나면 모든
                    메시지가 삭제됩니다.
                </p>
            </div>
            <div className="absolute bottom-0 w-full p-4">
                <input
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="메시지 보내기"
                />
            </div>
        </div>
    );
}
