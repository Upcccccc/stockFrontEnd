import React from 'react';
import './SimilarCompanies.css';

const SimilarCompanies = ({ similarCompanies }) => {
    console.log('Similar Companies Props:', similarCompanies);

    if (!similarCompanies || similarCompanies.length === 0) {
        console.log('No similar companies data available');
        return null;
    }

    console.log('Number of companies:', similarCompanies.length);

    return (
        <div className="similar-companies-section">
            <h3>Similar Companies</h3>
            <div className="similar-companies-container">
                {similarCompanies.map((company, index) => {
                    console.log(`Rendering company ${index}:`, company);
                    return (
                        <div key={index} className="company-card">
                            <h4>{company.name}</h4>
                            <div className="company-details">
                                <div className="detail-item">
                                    <span className="label">Industry:</span>
                                    <span className="value">{company.industry}</span>
                                </div>
                                <div className="detail-item">
                                    <span className="label">Revenue:</span>
                                    <span className="value">
                                        ${(parseFloat(company.revenue) / 1000000000).toFixed(2)}B
                                    </span>
                                </div>
                                <div className="detail-item">
                                    <span className="label">Avg Price:</span>
                                    <span className="value">
                                        ${parseFloat(company.avg_price).toFixed(2)}
                                    </span>
                                </div>
                                <div className="detail-item">
                                    <span className="label">Correlation:</span>
                                    <span className="value correlation">
                                        {(company.price_correlation * 100).toFixed(1)}%
                                    </span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default SimilarCompanies;