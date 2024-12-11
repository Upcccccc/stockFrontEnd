// src/components/stockAnalysis/StockSearchForm.jsx
import { useState } from 'react';
import { stockAnalytics } from '../../lib/api';

const StockSearchForm = ({ onAnalysisRequest }) => {
    const [formData, setFormData] = useState({
        companyName: '',
        startDate: '',
        endDate: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            onAnalysisRequest({ loading: true });

            // parallel requests
            const [stockResponse, trendsResponse] = await Promise.all([
                stockAnalytics.getStockData(
                    formData.companyName,
                    formData.startDate,
                    formData.endDate
                ),
                stockAnalytics.getMonotonicTrends(
                    formData.companyName,
                    formData.startDate,
                    formData.endDate
                )
            ]);

            console.log('股票数据响应:', stockResponse);
            console.log('趋势数据响应:', trendsResponse);

            onAnalysisRequest({
                loading: false,
                stockData: stockResponse.data,
                trendsData: trendsResponse.data,
                error: null
            });
        } catch (error) {
            onAnalysisRequest({
                loading: false,
                stockData: null,
                trendsData: null,
                error: error.message
            });
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