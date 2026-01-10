import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const PlatformChart = ({ data }) => {
     const COLORS = ['#E1306C', '#FF0000', '#1877F2', '#000000']; // Insta, YT, FB, TikTok (approx)

    // Transform stats object to array if needed, or assume data is passed correctly formatted
    // Assuming data is like: [{ name: 'Instagram', value: 400 }, ...]
    
    // If we receive the raw stats object from useDashboardStats:
    // stats.platforms = { instagram: 10, youtube: 5 ... }
    
    const chartData = data ? [
        { name: 'Instagram', value: data.instagram || 0 },
        { name: 'YouTube', value: data.youtube || 0 },
        { name: 'Facebook', value: data.facebook || 0 },
        { name: 'TikTok', value: data.tiktok || 0 },
    ].filter(item => item.value > 0) : [];

    if (chartData.length === 0) {
        return (
            <div className="bg-white rounded-3xl p-6 border border-zinc-100 shadow-sm flex items-center justify-center h-[300px] text-zinc-400">
                No data available
            </div>
        );
    }

    return (
        <div className="bg-white rounded-3xl p-6 border border-zinc-100 shadow-sm">
            <h2 className="text-xl font-bold mb-6">Platform Usage</h2>
            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default PlatformChart;
