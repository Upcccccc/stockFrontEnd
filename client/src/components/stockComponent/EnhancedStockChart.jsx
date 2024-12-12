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
                date: new Date(item.date).toISOString().split('T')[0], // Keeps YYYY-MM-DD format
                close: Number(item.close),
                volume: Number(item.volume),
                high: Number(item.high),
                low: Number(item.low)
            }));
            console.log('First few formatted dates:', formattedData.slice(0, 3));
            setChartData(formattedData);
        }
    }, [stockData]);

    console.log('Received trendsData:', trendsData);

    useEffect(() => {
        if (trendsData && Array.isArray(trendsData)) {  // Remove the .data check
            console.log('Processing trends data:', trendsData);
            const highlights = {
                increase: trendsData.find(trend => trend.trend_type === 'increase'),
                decrease: trendsData.find(trend => trend.trend_type === 'decrease')
            };
            console.log('Original highlights:', highlights);
            setTrendHighlights({
                increase: highlights.increase ? {
                    ...highlights.increase,
                    start_from: formatDate(highlights.increase.start_from),
                    end_at: formatDate(highlights.increase.end_at)
                } : null,
                decrease: highlights.decrease ? {
                    ...highlights.decrease,
                    start_from: formatDate(highlights.decrease.start_from),
                    end_at: formatDate(highlights.decrease.end_at)
                } : null
            });
        }
    }, [trendsData]);


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

    console.log('trendHighlights for rendering:', {
        increase: {
            start: trendHighlights.increase?.start_from,
            end: trendHighlights.increase?.end_at
        },
        decrease: {
            start: trendHighlights.decrease?.start_from,
            end: trendHighlights.decrease?.end_at
        }
    });
    console.log('Sample chart dates:', chartData.slice(0, 3).map(d => d.date));

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
                            x1={trendHighlights.increase.start_from}
                            x2={trendHighlights.increase.end_at}
                            fill="#4caf50"
                            fillOpacity={0.3}
                            stroke="#4caf50"
                            strokeOpacity={1}
                            label={{
                                value: `Longest Uptrend (+${parseFloat(trendHighlights.increase.amount).toFixed(2)})`,
                                position: 'insideTop'
                            }}
                        />
                    )}

                    {trendHighlights.decrease && (
                        <ReferenceArea
                            yAxisId="price"
                            x1={trendHighlights.decrease.start_from}
                            x2={trendHighlights.decrease.end_at}
                            fill="#f44336"
                            fillOpacity={0.2}
                            stroke="#f44336"
                            strokeOpacity={0.5}
                            label={{
                                value: `Longest Downtrend (${parseFloat(trendHighlights.decrease.amount).toFixed(2)})`,
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