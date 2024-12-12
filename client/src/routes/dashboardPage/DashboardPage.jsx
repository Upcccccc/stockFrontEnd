// client/src/routes/dashboardPage/DashboardPage.jsx
import "./dashboardPage.css";
import { useNavigate } from "react-router-dom";
import { createChat } from "../../lib/api";
import {useState} from "react";
import ThinkingLoader from "../../components/ThinkingLoader/ThinkingLoader.jsx";

const DashboardPage = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const text = e.target.text.value;
        if (!text) return;

        setCurrentQuestion(text);  // 保存当前问题
        setIsLoading(true);       // 显示加载状态
        e.target.reset();

        try {
            const chatId = await createChat(text);
            navigate(`/dashboard/chats/${chatId}`);
        } catch (err) {
            console.error(err);
            setIsLoading(false);
        }
    };

    return (
        <div className="dashboardPage">
            <div className="texts">
                <div className="logo">
                    <img src="/logo.png" alt="" />
                    <h1>Stock Chat AI</h1>
                </div>
                <div className="options">
                    <div className="option">
                        <img src="/chat.png" alt="" />
                        <span>Create a New Chat</span>
                    </div>
                    <div className="option">
                        <img src="/image.png" alt="" />
                        <span>Analyze Stock Data</span>
                    </div>
                    <div className="option">
                        <img src="/code.png" alt="" />
                        <span>Market Analysis</span>
                    </div>
                </div>
            </div>
            <div className="formContainer">
                <form onSubmit={handleSubmit}>
                    {isLoading && (
                        <div className="message">
                            <ThinkingLoader />
                        </div>
                    )}
                    <input type="text"
                           name="text"
                           placeholder="Ask about stocks..."
                           autoComplete="off" />
                    <button>
                        <img src="/arrow.png" alt="" />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default DashboardPage;
