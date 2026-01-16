import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { PieChart as PieChartIcon, Activity } from 'lucide-react';

// Moved outside component to avoid re-creation on render
const ChartEmptyState = () => (
    <div className="bg-white rounded-[2.5rem] p-8 border border-zinc-100 shadow-sm flex flex-col items-center justify-center h-[420px] text-zinc-400 gap-4 group">
        <div className="bg-zinc-50 p-6 rounded-full group-hover:scale-110 transition-transform duration-500">
            <PieChartIcon size={40} className="opacity-20" />
        </div>
        <p className="font-semibold text-zinc-500">No download data available</p>
    </div>
);

const PlatformChart = ({ data }) => {
    const chartData = (data && Array.isArray(data)) ? data.filter(item => item.value > 0) : [];
    const totalDownloads = chartData.reduce((acc, curr) => acc + curr.value, 0);

    if (chartData.length === 0) return <ChartEmptyState />;

    return (
        <div className="bg-white rounded-[2.5rem] p-8 border border-zinc-100 shadow-sm h-[420px] flex flex-col relative overflow-hidden">
            <div className="flex items-center justify-between mb-2 z-10">
                <h2 className="text-xl font-bold text-zinc-900 flex items-center gap-2">
                    <Activity size={20} className="text-zinc-400" /> Platform Usage
                </h2>
            </div>
            
            <div className="flex-1 w-full min-h-0 relative z-10">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            innerRadius={85}
                            outerRadius={110}
                            paddingAngle={6}
                            dataKey="value"
                            startAngle={90}
                            endAngle={-270}
                            cornerRadius={12}
                            stroke="none"
                        >
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fill || '#000'} />
                            ))}
                        </Pie>
                        <Tooltip 
                            contentStyle={{ 
                                borderRadius: '16px', 
                                border: 'none', 
                                boxShadow: '0 10px 40px -10px rgba(0,0,0,0.1)',
                                padding: '12px 16px',
                                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                                backdropFilter: 'blur(8px)'
                            }}
                            itemStyle={{ fontWeight: 700, color: '#18181b', fontSize: '14px' }}
                            formatter={(value) => [`${value} Downloads`, '']}
                        />
                        <Legend 
                            verticalAlign="bottom" 
                            height={36} 
                            iconType="circle"
                            iconSize={8}
                            formatter={(value) => <span className="text-sm font-bold text-zinc-600 ml-2">{value}</span>}
                        />
                    </PieChart>
                </ResponsiveContainer>
                
                {/* Center Content */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] text-center pointer-events-none">
                    <div className="text-4xl font-[900] text-zinc-900 tracking-tighter">
                        {totalDownloads}
                    </div>
                    <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider mt-1">Total</div>
                </div>
            </div>
        </div>
    );
};

export default PlatformChart;
