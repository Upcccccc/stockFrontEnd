import React, { useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from 'react-router-dom';

import "./newsSection.css";
import NewsCard from "./NewsCard.jsx";
import ThinkingLoader from "../ThinkingLoader/ThinkingLoader.jsx";

const NewsSection = () => {
    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    const { data: newsData, isLoading, error} = useQuery({
        queryKey: ["newsEvents", searchQuery],
        queryFn: async () => {
            const url = searchQuery
                ? `http://localhost:3000/api/news-events?company_name=${encodeURIComponent(searchQuery)}`
                : 'http://localhost:3000/api/news-events';
            const response = await fetch(url);
            return response.json();
        },
        refetchOnWindowFocus: false
    });

    const handleSearch = (e) => {
        e.preventDefault();
        setSearchQuery(searchTerm);
    };

    if (isLoading) return (
        <div className="news-loading-container">
            <ThinkingLoader />
        </div>
    );
    if (error) return <div className="error">Error loading news</div>;

    const handleSimilarNewsClick = (headline) => {
        console.log("NewsSection: Navigating to similar news for:", headline);
        const encodedHeadline = encodeURIComponent(headline);
        console.log("Encoded headline:", encodedHeadline);
        navigate(`/dashboard/news/similar/${encodedHeadline}`);
    };

    console.log('newsData:', newsData);

    return (
        <div className="newsSectionContainer">
            <div className="searchContainer">
                <form onSubmit={handleSearch} className="searchForm">
                    <input
                        type="text"
                        placeholder="Search company news..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="searchInput"
                    />
                    <button type="submit" className="searchButton">
                        Search
                    </button>
                </form>
            </div>
            <div className="newsContent">
                {newsData?.data.map((news, index) => (
                    <NewsCard
                        key={news.id}
                        news={news}
                        hasImage={!!news.imageUrl && index < 4}
                        onSimilarNewsClick={(headline) => {
                            console.log("Click handler in NewsSection");
                            handleSimilarNewsClick(headline);
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default NewsSection;