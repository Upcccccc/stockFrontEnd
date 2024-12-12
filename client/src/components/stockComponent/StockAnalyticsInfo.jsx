// src/components/stockAnalysis/StockAnalyticsInfo.jsx
import { useMemo } from 'react';

const StockAnalyticsInfo = ({ stockData, trendsData }) => {
    console.log('StockAnalyticsInfo received:', { stockData, trendsData });

    const analytics = useMemo(() => {
        if (!stockData || stockData.length === 0) return null;

        // Add debug logs
        console.log('Starting analytics calculation...');

        // 确保所有数值计算都使用parseFloat转换字符串
        const prices = stockData.map(item => parseFloat(item.close));
        console.log('Processed prices:', prices);

        const maxPrice = Math.max(...prices);
        const minPrice = Math.min(...prices);
        const avgPrice = prices.reduce((a, b) => a + b, 0) / prices.length;

        console.log('Basic calculations:', {
            maxPrice,
            minPrice,
            avgPrice,
            totalDays: prices.length
        });

        // Debug the volatility calculation step by step
        let sumSquaredDiff = prices.reduce((sum, price) => {
            const diff = price - avgPrice;
            const squaredDiff = Math.pow(diff, 2);
            // console.log(`Price: ${price}, Diff: ${diff}, Squared: ${squaredDiff}`);
            return sum + squaredDiff;
        }, 0);

        console.log('Sum of squared differences:', sumSquaredDiff);

        const volatility = Math.sqrt(sumSquaredDiff / prices.length);
        console.log('Calculated volatility:', volatility);

        return {
            maxPrice,
            minPrice,
            avgPrice,
            volatility,
            totalDays: prices.length,
            dateRange: {
                start: new Date(stockData[0].date).toLocaleDateString(),
                end: new Date(stockData[stockData.length - 1].date).toLocaleDateString()
            }
        };
    }, [stockData]);

    const trendsSummary = useMemo(() => {
        console.log('Calculating trendsSummary with trendsData:', trendsData);
        // Changed validation to check if trendsData is an array
        if (!Array.isArray(trendsData)) {
            console.log('Returning null because trendsData is invalid');
            return null;
        }

        // Process the array directly since trendsData is the array
        const increaseTrend = trendsData.find(trend => trend.trend_type === 'increase');
        const decreaseTrend = trendsData.find(trend => trend.trend_type === 'decrease');

        return {
            increase: increaseTrend ? {
                amount: parseFloat(increaseTrend.amount),
                startDate: new Date(increaseTrend.start_from),
                endDate: new Date(increaseTrend.end_at)
            } : null,
            decrease: decreaseTrend ? {
                amount: parseFloat(decreaseTrend.amount),
                startDate: new Date(decreaseTrend.start_from),
                endDate: new Date(decreaseTrend.end_at)
            } : null
        };
    }, [trendsData]);

    if (!analytics || !trendsSummary) return null;

    const formatDate = (date) => date.toLocaleDateString();

    console.log('Final analytics values:', {
        volatility: analytics?.volatility,
        totalDays: analytics?.totalDays
    });

    return (
        <div className="stock-analytics-info">
            <h3 className="analytics-title">Market Analyze Summary</h3>

            <div className="analytics-grid">
                <div className="info-card">
                    <h4>价格区间</h4>
                    <div className="price-range">
                        <span className="max-price">
                            最高: ${analytics.maxPrice.toFixed(2)}
                        </span>
                        <span className="min-price">
                            最低: ${analytics.minPrice.toFixed(2)}
                        </span>
                    </div>
                    <p className="avg-price">
                        平均: ${analytics.avgPrice.toFixed(2)}
                    </p>
                </div>

                <div className="info-card">
                    <h4>波动性指标</h4>
                    <p className="volatility">
                        标准差: ${analytics?.volatility?.toFixed(2) || 'N/A'}
                    </p>
                    <p className="trading-days">
                        交易天数: {analytics?.totalDays || 'N/A'}天
                    </p>
                </div>

                <div className="info-card trends">
                    <h4>趋势分析</h4>
                    {trendsSummary.increase && (
                        <div className="trend-item increase">
                            <span className="trend-label">最长上涨区间</span>
                            <span className="trend-value">
                                +${trendsSummary.increase.amount.toFixed(2)}
                            </span>
                            <span className="trend-period">
                                {formatDate(trendsSummary.increase.startDate)} -
                                {formatDate(trendsSummary.increase.endDate)}
                            </span>
                        </div>
                    )}
                    {trendsSummary.decrease && (
                        <div className="trend-item decrease">
                            <span className="trend-label">最长下跌区间</span>
                            <span className="trend-value">
                                -${Math.abs(trendsSummary.decrease.amount).toFixed(2)}
                            </span>
                            <span className="trend-period">
                                {formatDate(trendsSummary.decrease.startDate)} -
                                {formatDate(trendsSummary.decrease.endDate)}
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StockAnalyticsInfo;