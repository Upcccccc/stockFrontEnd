// src/components/stockAnalysis/StockSearchForm.jsx
import { useState } from 'react';
import { stockAnalytics } from '../../lib/api';


const StockSearchForm = ({ onAnalysisRequest, onDataReceived }) => {
    const [formData, setFormData] = useState({
        companyName: '',
        startDate: '',
        endDate: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Notify parent component about loading states
        onAnalysisRequest(['stockData', 'trendsData', 'similarCompanies', 'industryData']);

        try {
            // Make requests individually and update as they complete
            stockAnalytics.getStockData(formData.companyName, formData.startDate, formData.endDate)
                .then(response => onDataReceived('stockData', response.data))
                .catch(error => onDataReceived('stockData', null, error.message));

            stockAnalytics.getMonotonicTrends(formData.companyName, formData.startDate, formData.endDate)
                .then(response => onDataReceived('trendsData', response.data))
                .catch(error => onDataReceived('trendsData', null, error.message));

            stockAnalytics.getSimilarCompanies(formData.companyName, formData.startDate, formData.endDate)
                .then(response => onDataReceived('similarCompanies', response.data))
                .catch(error => onDataReceived('similarCompanies', null, error.message));

            stockAnalytics.getIndustryAnalysis(formData.companyName, formData.startDate, formData.endDate)
                .then(response => onDataReceived('industryData', response))
                .catch(error => onDataReceived('industryData', null, error.message));

        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="stock-search-form">
            <div className="input-group">
                <div className="form-field">
                    <label htmlFor="companyName">Company name</label>
                    <input
                        type="text"
                        id="companyName"
                        value={formData.companyName}
                        onChange={(e) => setFormData({
                            ...formData,
                            companyName: e.target.value
                        })}
                        required
                        placeholder="Enter the company name"
                        className="input-field"
                    />
                </div>
            </div>

            <div className="date-group">
                <div className="form-field">
                    <label htmlFor="startDate">Start date</label>
                    <input
                        type="date"
                        id="startDate"
                        value={formData.startDate}
                        onChange={(e) => setFormData({
                            ...formData,
                            startDate: e.target.value
                        })}
                        required
                        className="input-field"
                    />
                </div>

                <div className="form-field">
                    <label htmlFor="endDate">End date</label>
                    <input
                        type="date"
                        id="endDate"
                        value={formData.endDate}
                        onChange={(e) => setFormData({
                            ...formData,
                            endDate: e.target.value
                        })}
                        required
                        className="input-field"
                    />
                </div>
            </div>

            <button
                type="submit"
                className={`submit-button ${isSubmitting ? 'submitting' : ''}`}
                disabled={isSubmitting}
            >
                {isSubmitting ? 'Analyzing...' : 'Start Analysis'}
            </button>
        </form>
    );
};

export default StockSearchForm;