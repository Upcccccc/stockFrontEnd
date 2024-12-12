// NewsCard.jsx
import React from 'react';

const NewsCard = ({ news, hasImage }) => {
    const handleNewsClick = (url) => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    return (
        <div className={`newsCard ${hasImage ? 'withImage' : 'withoutImage'}`}
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
        </div>
    );
};

export default NewsCard;