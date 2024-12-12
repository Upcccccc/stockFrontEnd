// client/src/components/chatList/ChatList.jsx
import "./chatList.css";
import { useQuery } from "@tanstack/react-query";
import { getUserChats } from "../../lib/api";
import { Link } from "react-router-dom";

const ChatList = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ["userChats"],
        queryFn: getUserChats,
        refetchOnWindowFocus: false
    });

    return (
        <div className="chatList">
            <span className="title">DASHBOARD</span>
            <Link to="/dashboard">Create a new Chat</Link>
            <Link to="/dashboard/stock-analysis">Stock Analysis</Link>
            <Link to="/dashboard/news">Market News</Link>
            <Link to="/">Explore Lama AI</Link>
            <Link to="/">Contact</Link>
            <hr />
            <span className="title">RECENT CHATS</span>
            <div className="list">
                {isLoading
                    ? "Loading..."
                    : error
                        ? "Something went wrong!"
                        : data?.map((chat) => (
                            <Link to={`/dashboard/chats/${chat._id}`} key={chat._id}>
                                {chat.title}
                            </Link>
                        ))}
            </div>
            <hr />
            <div className="upgrade">
                <img src="/logo.png" alt="" />
                <div className="texts">
                    <span>Upgrade to Lama AI Pro</span>
                    <span>Get unlimited access to all features</span>
                </div>
            </div>
        </div>
    );
};

export default ChatList;
