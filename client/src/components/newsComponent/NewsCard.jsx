// NewsCard.jsx
import React from 'react';
import SimilarNewsButton from './SimilarNewsButton';

const NewsCard = ({ news, hasImage, onSimilarNewsClick }) => {
    const handleNewsClick = (url) => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    const handleSimilarClick = () => {
        console.log("Similar click in NewsCard", news.headline); // Debug log
        onSimilarNewsClick(news.headline);
    };


    return (
        <div className={`newsCard ${hasImage ? 'withImage featured' : 'withoutImage'}`}
             onClick={() => handleNewsClick(news.link)}>
            {hasImage && (
                <div className="newsCard-imageContainer">
                    <img
                        src={news.imageUrl}
                        alt={news.headline}
                        className="newsCard-image"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = '/fallback-image.jpg';
                        }}
                    />
                    <div className="newsCard-overlay">
                        <div className="newsCard-content">
                            <div className="newsCard-meta">
                                <span className="newsCard-category">{news.category}</span>
                                <span className="newsCard-date">
                                    {new Date(news.date).toLocaleDateString()}
                                </span>
                            </div>
                            <h3 className="newsCard-headline">{news.headline}</h3>
                        </div>
                    </div>
                </div>
            )}
            {!hasImage && (
                <div className="newsCard-content">
                    <div className="newsCard-meta">
                        <span className="newsCard-category">{news.category}</span>
                        <span className="newsCard-date">
                            {new Date(news.date).toLocaleDateString()}
                        </span>
                    </div>
                    <h3 className="newsCard-headline">{news.headline}</h3>
                </div>
            )}
            <div onClick={(e) => e.stopPropagation()}> {/* Wrapper to prevent event bubbling */}
                <SimilarNewsButton
                    onClick={() => {
                        console.log("Click handler in NewsCard"); // Debug log
                        handleSimilarClick();
                    }}
                />
            </div>
        </div>
    );
};

export default NewsCard;