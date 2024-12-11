// client/src/routes/dashboardPage/DashboardPage.jsx
import "./dashboardPage.css";
import { useNavigate } from "react-router-dom";
import { createChat } from "../../lib/api";

const DashboardPage = () => {
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const text = e.target.text.value;
        if (!text) return;
        try {
            const chatId = await createChat(text);
            navigate(`/dashboard/chats/${chatId}`);
        } catch (err) {
            console.error(err);
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
                    <input type="text" name="text" placeholder="Ask about stocks..." />
                    <button>
                        <img src="/arrow.png" alt="" />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default DashboardPage;
