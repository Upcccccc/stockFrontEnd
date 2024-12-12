// src/components/stockAnalysis/StockAnalysisPanel.jsx
import { useState } from 'react';
import StockSearchForm from './StockSearchForm';
import EnhancedStockChart from './EnhancedStockChart';
import StockAnalyticsInfo from './StockAnalyticsInfo';
import SimilarCompanies from './SimilarCompanies';
import IndustryAnalysis from './IndustryAnalysis';
import './stockAnalysis.css';

const StockAnalysisPanel = () => {
    const [analysisData, setAnalysisData] = useState({
        stockData: null,
        trendsData: null,
        similarCompanies: null,
        industryData: null,
        loading: {
            stockData: false,
            trendsData: false,
            similarCompanies: false,
            industryData: false
        },
        error: {
            stockData: null,
            trendsData: null,
            similarCompanies: null,
            industryData: null
        }
    });

    // Handle individual data updates
    const handleDataUpdate = (dataType, data, error = null) => {
        setAnalysisData(prev => ({
            ...prev,
            [dataType]: data,
            loading: {
                ...prev.loading,
                [dataType]: false
            },
            error: {
                ...prev.error,
                [dataType]: error
            }
        }));
    };

    // Handle loading states
    const setLoading = (dataTypes) => {
        setAnalysisData(prev => ({
            ...prev,
            loading: {
                ...prev.loading,
                ...dataTypes.reduce((acc, type) => ({ ...acc, [type]: true }), {})
            }
        }));
    };

    return (
        <div className="stock-analysis-panel">
            <div className="panel-header">
                <h2>Stock Analysis</h2>
            </div>

            <div className="panel-content">
                <StockSearchForm
                    onAnalysisRequest={setLoading}
                    onDataReceived={handleDataUpdate}
                />

                {/* Stock Chart Section */}
                <div className="analysis-section">
                    {analysisData.loading.stockData ? (
                        <div className="loading-container" style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '2rem',
                            minHeight: '200px'
                        }}>
                            <div className="loading-spinner"></div>
                            <div style={{
                                marginTop: '1rem',
                                fontSize: '1.1rem',
                                color: '#666',
                                fontWeight: '500'
                            }}>
                                Loading stock data...
                            </div>
                        </div>
                    ) : analysisData.error.stockData ? (
                        <div className="error-state">
                            <p>Error loading stock data: {analysisData.error.stockData}</p>
                        </div>
                    ) : analysisData.stockData && (
                        <EnhancedStockChart
                            stockData={analysisData.stockData}
                            trendsData={analysisData.trendsData}
                        />
                    )}
                </div>

                {/* Analytics Info Section */}
                <div className="analysis-section">
                    {analysisData.loading.trendsData ? (
                        <div className="loading-container" style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '2rem',
                            minHeight: '200px'
                        }}>
                            <div className="loading-spinner"></div>
                            <div style={{
                                marginTop: '1rem',
                                fontSize: '1.1rem',
                                color: '#666',
                                fontWeight: '500'
                            }}>
                                Analyzing trends...
                            </div>
                        </div>
                    ) : analysisData.error.trendsData ? (
                        <div className="error-state">
                            <p>Error analyzing trends: {analysisData.error.trendsData}</p>
                        </div>
                    ) : analysisData.trendsData && (
                        <StockAnalyticsInfo
                            stockData={analysisData.stockData}
                            trendsData={analysisData.trendsData}
                        />
                    )}
                </div>

                {/* Industry Analysis Section */}
                <div className="analysis-section">
                    {analysisData.loading.industryData ? (
                        <div className="loading-container" style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '2rem',
                            minHeight: '200px'
                        }}>
                            <div className="loading-spinner"></div>
                            <div style={{
                                marginTop: '1rem',
                                fontSize: '1.1rem',
                                color: '#666',
                                fontWeight: '500'
                            }}>
                                Analyzing industry data...
                            </div>
                        </div>
                    ) : analysisData.error.industryData ? (
                        <div className="error-state">
                            <p>Error loading industry data: {analysisData.error.industryData}</p>
                        </div>
                    ) : analysisData.industryData && (
                        <IndustryAnalysis
                            industryData={analysisData.industryData}
                        />
                    )}
                </div>

                {/* Similar Companies Section */}
                <div className="analysis-section">
                    {analysisData.loading.similarCompanies ? (
                        <div className="loading-container" style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '2rem',
                            minHeight: '200px'
                        }}>
                            <div className="loading-spinner"></div>
                            <div style={{
                                marginTop: '1rem',
                                fontSize: '1.1rem',
                                color: '#666',
                                fontWeight: '500'
                            }}>
                                Finding similar companies...
                            </div>
                        </div>
                    ) : analysisData.error.similarCompanies ? (
                        <div className="error-state">
                            <p>Error loading similar companies: {analysisData.error.similarCompanies}</p>
                        </div>
                    ) : analysisData.similarCompanies && (
                        <SimilarCompanies
                            similarCompanies={analysisData.similarCompanies}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};
export default StockAnalysisPanel;