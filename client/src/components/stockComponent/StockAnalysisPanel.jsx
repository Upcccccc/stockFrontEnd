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
        loading: false,
        error: null
    });

    // handle the analysis request
    const handleAnalysisRequest = (data) => {
        setAnalysisData(data);
    };

    return (
        <div className="stock-analysis-panel">
            <div className="panel-header">
                <h2>Stock Analysis</h2>
            </div>

            <div className="panel-content">
                <StockSearchForm onAnalysisRequest={handleAnalysisRequest} />

                {/* 加载状态显示 */}
                {analysisData.loading && (
                    <div className="loading-state">
                        <div className="loading-spinner"></div>
                        <p>Analyzing...</p>
                    </div>
                )}

                {/* 错误状态显示 */}
                {analysisData.error && (
                    <div className="error-state">
                        <p>error: {analysisData.error}</p>
                    </div>
                )}

                {/* 分析结果显示 */}
                {analysisData.stockData && (
                    <div className="analysis-results">
                        <EnhancedStockChart
                            stockData={analysisData.stockData}
                            trendsData={analysisData.trendsData}
                        />
                        <StockAnalyticsInfo
                            stockData={analysisData.stockData}
                            trendsData={analysisData.trendsData}
                        />
                        <SimilarCompanies
                            similarCompanies={analysisData.similarCompanies}
                        />
                        <IndustryAnalysis
                            industryData={analysisData.industryData}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default StockAnalysisPanel;