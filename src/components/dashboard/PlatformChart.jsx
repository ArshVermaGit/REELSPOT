import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { PieChart as PieChartIcon } from 'lucide-react';

const PlatformChart = ({ data }) => {
    // Data is expected to be array: [{ name: 'Instagram', value: 12, fill: '#E1306C' }, ...]
    const chartData = (data && Array.isArray(data)) ? data.filter(item => item.value > 0) : [];

    if (chartData.length === 0) {
        return (
            <div className="bg-white rounded-[2rem] p-8 border border-zinc-100 shadow-sm flex flex-col items-center justify-center h-[400px] text-zinc-400 gap-4">
               <div className="bg-zinc-50 p-4 rounded-full">
                    <PieChartIcon size={32} className="opacity-20" />
               </div>
               <p className="font-medium">No download data yet</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-[2rem] p-8 border border-zinc-100 shadow-sm h-[400px] flex flex-col">
            <h2 className="text-xl font-bold mb-6 text-zinc-900">Platform Usage</h2>
            <div className="flex-1 w-full min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            innerRadius={80}
                            outerRadius={100}
                            paddingAngle={8}
                            dataKey="value"
                            startAngle={90}
                            endAngle={-270}
                            cornerRadius={8}
                        >
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fill || '#000'} stroke="none" />
                            ))}
                        </Pie>
                        <Tooltip 
                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                            itemStyle={{ fontWeight: 600, color: '#333' }}
                        />
                        <Legend 
                            verticalAlign="bottom" 
                            height={36} 
                            iconType="circle"
                            formatter={(value) => <span className="text-sm font-semibold text-zinc-600 ml-1">{value}</span>}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default PlatformChart;
