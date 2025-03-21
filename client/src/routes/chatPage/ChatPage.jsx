import "./chatPage.css";
import NewPrompt from "../../components/newPrompt/NewPrompt";
import { useQuery } from "@tanstack/react-query";
import {useNavigate, useParams} from "react-router-dom";
import { getChat } from "../../lib/api";
import { useRef, useEffect, useState } from "react";  // 添加 useState
import Markdown from "react-markdown";

const ChatPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const endRef = useRef(null);
    // add tempMessage state
    const [tempMessage, setTempMessage] = useState(null);

    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: ["chat", id],
        queryFn: () => getChat(id),
        refetchOnWindowFocus: false
    });

    useEffect(() => {
        if (isError || (!isLoading && !data)) {
            // if there is an error, navigate back to dashboard
            navigate('/dashboard');
        }
    }, [isError, data, isLoading, navigate]);

    const scrollToBottom = () => {
        if (endRef.current) {
            setTimeout(() => {
                endRef.current.scrollIntoView({ behavior: "smooth" });
            }, 100);
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [data, tempMessage]);

    // combine history and tempMessage
    const allMessages = [
        ...(data?.history || []),
        ...(tempMessage ? [tempMessage] : [])
    ];

    return (
        <div className="chatPage">
            <div className="wrapper">
                <div className="chat">
                    {isLoading && <div>Loading...</div>}
                    {isError && <div>Something went wrong!</div>}
                    {allMessages.map((message, i) => (
                        <div
                            className={message.role === "user" ? "message user" : "message"}
                            key={i}
                        >
                            <Markdown>{message.parts[0].text}</Markdown>
                        </div>
                    ))}
                    <div className="endChat" ref={endRef}></div>
                    <NewPrompt
                        chatId={id}
                        onNewMessage={async () => {
                            console.log('开始刷新对话');
                            await refetch();
                            console.log('对话刷新完成');
                        }}
                        onSendMessage={(text) => {
                            console.log('设置临时消息:', text);
                            setTempMessage({
                                role: "user",
                                parts: [{ text }]
                            });
                        }}
                        onMessageComplete={() => {
                            console.log('完成消息处理');
                            setTempMessage(null);
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default ChatPage;
