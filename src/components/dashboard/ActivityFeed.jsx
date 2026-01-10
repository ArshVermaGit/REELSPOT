import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import HistoryCard from '../HistoryCard';

const ActivityFeed = ({ activities, onDelete }) => {
    return (
        <div className="bg-white rounded-3xl p-6 border border-zinc-100 shadow-sm flex-1">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Recent Downloads</h2>
                <Link to="/history" className="text-sm font-bold text-blue-600 hover:underline flex items-center gap-1">
                    View All <ArrowRight size={16} />
                </Link>
            </div>

            {activities.length === 0 ? (
                <div className="text-center py-10 text-zinc-400">
                    No recent activity
                </div>
            ) : (
                <div className="space-y-4">
                    {activities.map(item => (
                        <div key={item.id} className="relative">
                            <HistoryCard 
                                item={item} 
                                // Simplified props for dashboard view if needed, or stick to standard
                                // We might want a "mini" version, but standard is responsive enough
                                onDelete={onDelete} 
                                onRedownload={() => {}} // simplified 
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ActivityFeed;
