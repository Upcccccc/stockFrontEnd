// src/components/stockAnalysis/EnhancedStockChart.jsx
import { useState, useEffect } from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    ReferenceArea
} from 'recharts';

const EnhancedStockChart = ({ stockData, trendsData }) => {
    const [chartData, setChartData] = useState([]);
    const [trendHighlights, setTrendHighlights] = useState({
        increase: null,
        decrease: null
    });

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0]; // 转换为 YYYY-MM-DD 格式
    };

    useEffect(() => {
        if (stockData) {
            const formattedData = stockData.map(item => ({
                date: new Date(item.date).toISOString().split('T')[0], // 确保是 YYYY-MM-DD 格式
                close: Number(item.close),
                volume: Number(item.volume),
                high: Number(item.high),
                low: Number(item.low)
            }));
            setChartData(formattedData);
        }
    }, [stockData]);

    useEffect(() => {
        if (trendsData?.data && Array.isArray(trendsData.data)) {
            const highlights = {
                increase: trendsData.data.find(trend => trend.trend_type === 'increase'),
                decrease: trendsData.data.find(trend => trend.trend_type === 'decrease')
            };
            setTrendHighlights({
                increase: {
                    ...highlights.increase,
                    start_from: formatDate(highlights.increase?.start_from),
                    end_at: formatDate(highlights.increase?.end_at)
                },
                decrease: {
                    ...highlights.decrease,
                    start_from: formatDate(highlights.decrease?.start_from),
                    end_at: formatDate(highlights.decrease?.end_at)
                }
            });
        }
    }, [trendsData]);

    useEffect(() => {
        if (stockData && Array.isArray(stockData)) {
            console.log('Processing stock data:', stockData);
            try {
                const formattedData = stockData.map(item => ({
                    date: new Date(item.date).toLocaleDateString(),
                    close: Number(item.close) || 0,
                    volume: Number(item.volume) || 0,
                    high: Number(item.high) || 0,
                    low: Number(item.low) || 0
                }));
                console.log('格式化后的数据:', formattedData);
                setChartData(formattedData);
            } catch (error) {
                console.error('数据格式化错误:', error);
            }
        }
    }, [stockData]);


    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="custom-tooltip">
                    <p className="date">Date: {label}</p>
                    <p className="price">Close prices: ${payload[0].value.toFixed(2)}</p>
                    <p className="volume">Volume: {payload[1].value.toLocaleString()}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="stock-chart-container">
            {chartData.length === 0 ? (
                <div className="no-data-message">
                    No data available
                </div>
            ) : (
            <ResponsiveContainer width="100%" height={400}>
                <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        dataKey="date"
                        tick={{ fontSize: 12 }}
                        interval="preserveStartEnd"
                    />
                    <YAxis
                        yAxisId="price"
                        domain={['auto', 'auto']}
                        tick={{ fontSize: 12 }}
                        label={{ value: 'Stock Prices', angle: -90, position: 'insideLeft' }}
                    />
                    <YAxis
                        yAxisId="volume"
                        orientation="right"
                        tick={{ fontSize: 11 }}
                        label={{ value: 'Volume', angle: 90, position: 'insideRight' }}
                    />

                    <Tooltip content={<CustomTooltip />} />
                    <Legend />

                    <Line
                        yAxisId="price"
                        type="monotone"
                        dataKey="close"
                        stroke="#1a73e8"
                        dot={false}
                        name="stock price"
                    />

                    <Line
                        yAxisId="volume"
                        type="monotone"
                        dataKey="volume"
                        stroke="#82ca9d"
                        dot={false}
                        name="volume"
                    />

                    {trendHighlights.increase && (
                        <ReferenceArea
                            yAxisId="price"
                            x1={formatDate(trendHighlights.increase.start_from)}
                            x2={formatDate(trendHighlights.increase.end_at)}
                            fill="#4caf50"
                            fillOpacity={0.3}
                            stroke="#4caf50"
                            strokeOpacity={1}
                            label={{
                                value: `最长上涨区间 (+${parseFloat(trendHighlights.increase.amount).toFixed(2)})`,
                                position: 'insideTop'
                            }}
                        />
                    )}

                    {trendHighlights.decrease && (
                        <ReferenceArea
                            yAxisId="price"
                            x1={formatDate(trendHighlights.decrease.start_from)}
                            x2={formatDate(trendHighlights.decrease.end_at)}
                            fill="#f44336"
                            fillOpacity={0.2}
                            stroke="#f44336"
                            strokeOpacity={0.5}
                            label={{
                                value: `最长下跌区间 (${parseFloat(trendHighlights.decrease.amount).toFixed(2)})`,
                                position: 'insideBottom'
                            }}
                        />
                    )}
                </LineChart>
            </ResponsiveContainer>
            )}
        </div>
    );
};

export default EnhancedStockChart;