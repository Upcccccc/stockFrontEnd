import React from 'react';
import './stockAnalysis.css';

const IndustryAnalysis = ({ industryData }) => {
    console.log("IndustryAnalysis component rendered with props:", industryData);

    if (!industryData) {
        console.log("industryData is null or undefined, returning null");
        return null;
    }

    const { data, metadata } = industryData;
    console.log("Destructured data:", data);
    console.log("Destructured metadata:", metadata);

    const topIndustries = [...data.industry_distribution]
        .sort((a, b) => b.company_count - a.company_count)
        .slice(0, 5);

    const totalCompaniesInTop5 = topIndustries.reduce((sum, item) => sum + item.company_count, 0);

    return (
        <div className="industry-analysis">
            <h3 className="industry-title">
                Industry Analysis for {metadata.company}
                <span className="period-subtitle">
                    ({metadata.period.start} to {metadata.period.end})
                </span>
            </h3>

            <div className="industry-cards-container">
                {/* Metrics Card */}
                <div className="industry-card metrics-card">
                    <h4>Industry Metrics</h4>
                    <div className="metrics-grid">
                        <div className="metric-item">
                            <span className="metric-label">Primary Industry</span>
                            <span className="metric-value">{data.primary_industry}</span>
                        </div>
                        <div className="metric-item">
                            <span className="metric-label">Sector</span>
                            <span className="metric-value">{data.sector}</span>
                        </div>
                        <div className="metric-item">
                            <span className="metric-label">Total Peer Companies</span>
                            <span className="metric-value">{data.total_peer_companies}</span>
                        </div>
                        <div className="metric-item">
                            <span className="metric-label">Average Price</span>
                            <span className="metric-value">${Number(data.group_avg_price).toFixed(2)}</span>
                        </div>
                        <div className="metric-item">
                            <span className="metric-label">Average Volatility</span>
                            <span className="metric-value">{Number(data.avg_volatility).toFixed(2)}%</span>
                        </div>
                        <div className="metric-item">
                            <span className="metric-label">Average Revenue</span>
                            <span className="metric-value">${(Number(data.avg_revenue) / 1e9).toFixed(2)}B</span>
                        </div>
                        <div className="metric-item">
                            <span className="metric-label">Revenue Leader</span>
                            <span className="metric-value">{data.revenue_leader}</span>
                        </div>
                        <div className="metric-item">
                            <span className="metric-label">Price Leader</span>
                            <span className="metric-value">{data.price_leader}</span>
                        </div>
                    </div>
                </div>

                {/* Distribution Card */}
                <div className="industry-card distribution-card">
                    <h4>Top 5 Industry Distribution</h4>
                    <div className="distribution-list">
                        {topIndustries.map((item, index) => (
                            <div key={index} className="distribution-item">
                                <div className="distribution-bar"
                                     style={{width: `${(item.company_count / totalCompaniesInTop5) * 100}%`}}>
                                </div>
                                <span className="distribution-label">{item.industry}</span>
                                <span className="distribution-value">
                                    {item.company_count} companies
                                    ({((item.company_count / Number(data.total_peer_companies)) * 100).toFixed(1)}%)
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IndustryAnalysis;