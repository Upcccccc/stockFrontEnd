// In routes/newsPage/SimilarNewsPage.jsx
import SimilarNewsPage from "../../components/newsComponent/SimilarNewsPage.jsx";

const SimilarNews = () => {
    console.log("Rendering SimilarNews wrapper");
    return (
        <div className="newsPage">
            <SimilarNewsPage />
        </div>
    );
};

export default SimilarNews;