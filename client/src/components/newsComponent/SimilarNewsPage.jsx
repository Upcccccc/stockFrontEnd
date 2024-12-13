// SimilarNewsPage.jsx
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import NewsCard from './NewsCard';

const SimilarNewsPage = () => {
    const { headline } = useParams();

    const handleNewsClick = (url) => {
        console.log('Clicking URL:', url); // Debug log
        if (url) {
            window.open(url, '_blank', 'noopener,noreferrer');
        }
    };

    const { data: similarNews, isLoading, error } = useQuery({
        queryKey: ['similarNews', headline],
        queryFn: async () => {
            const response = await fetch(`http://localhost:3000/api/similar-news`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ headline: decodeURIComponent(headline) }),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        },
        enabled: !!headline,
    });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading similar news: {error.message}</div>;

    return (
        <div className="similarNewsPage">
            <h1>Similar News</h1>
            <div className="originalArticle">
                <h2>Original Article:</h2>
                <p>{decodeURIComponent(headline)}</p>
            </div>
            <div className="newsContent">
                {similarNews?.data?.map((news) => (
                    <div
                        key={news.id}
                        className="newsCard withoutImage"
                        onClick={() => handleNewsClick(news.url)} // Use news.url instead of news.link
                    >
                        <div className="newsCard-content">
                            <div className="newsCard-meta">
                                <span className="newsCard-category">{news.category}</span>
                                <span className="newsCard-date">
                                    {new Date(news.date).toLocaleDateString()}
                                </span>
                            </div>
                            <h3 className="newsCard-headline">{news.title}</h3>
                            {news.summary && news.summary !== 'No description' && (
                                <p className="newsCard-description">{news.summary}</p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SimilarNewsPage;