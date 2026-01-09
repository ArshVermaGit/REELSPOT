'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, Calendar, Filter, Download, Trash2, 
  CheckCircle2, AlertTriangle, FileDown, 
  Instagram, Youtube, Facebook, Music2, MoreVertical, X
} from 'lucide-react';
import styles from './History.module.css';

// --- Mock Data ---
const MOCK_HISTORY = [
  { id: '1', title: 'Top 10 Unity Tips for 2026', platform: 'YouTube', date: '2026-01-09T10:30:00Z', thumbnail: '' },
  { id: '2', title: 'Beach Sunset Reel #Summer2026', platform: 'Instagram', date: '2026-01-09T08:15:00Z', thumbnail: '' },
  { id: '3', title: 'Viral Dance Challenge Part 2', platform: 'TikTok', date: '2026-01-08T22:00:00Z', thumbnail: '' },
  { id: '4', title: 'Coding Music - Deep Focus', platform: 'YouTube', date: '2026-01-07T14:20:00Z', thumbnail: '' },
  { id: '5', title: 'Tech Review: New MacBook Pro M5', platform: 'YouTube', date: '2026-01-05T09:00:00Z', thumbnail: '' },
  { id: '6', title: 'Modern Architecture Tour', platform: 'Facebook', date: '2025-12-28T11:45:00Z', thumbnail: '' },
  { id: '7', title: 'Unity VR Implementation Guide', platform: 'YouTube', date: '2025-12-20T16:30:00Z', thumbnail: '' },
  { id: '8', title: 'Morning Workout Routine', platform: 'Instagram', date: '2025-12-15T07:00:00Z', thumbnail: '' },
];

const HistoryContainer = () => {
  const [search, setSearch] = useState('');
  const [timeFilter, setTimeFilter] = useState('All');
  const [platformFilter, setPlatformFilter] = useState('All');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [items, setItems] = useState(MOCK_HISTORY);
  const [isLoading, setIsLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState<{ type: 'single' | 'bulk' | 'clear', id?: string } | null>(null);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // --- Filtering Logic ---
  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase());
      const matchesPlatform = platformFilter === 'All' || item.platform === platformFilter;
      
      let matchesTime = true;
      const date = new Date(item.date);
      const now = new Date();
      if (timeFilter === 'Today') {
        matchesTime = date.toDateString() === now.toDateString();
      } else if (timeFilter === 'This Week') {
        const weekAgo = new Date();
        weekAgo.setDate(now.getDate() - 7);
        matchesTime = date >= weekAgo;
      } else if (timeFilter === 'This Month') {
        matchesTime = date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
      }

      return matchesSearch && matchesPlatform && matchesTime;
    });
  }, [items, search, timeFilter, platformFilter]);

  // --- Handlers ---
  const handleToggleSelect = (id: string) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const handleExportCSV = () => {
    const headers = ['Title', 'Platform', 'Date'];
    const rows = filteredItems.map(i => [i.title, i.platform, i.date].join(','));
    const csvContent = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `reelspot_history_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  };

  const confirmDelete = () => {
    if (!showDeleteModal) return;
    
    if (showDeleteModal.type === 'single') {
      setItems(prev => prev.filter(i => i.id !== showDeleteModal.id));
    } else if (showDeleteModal.type === 'bulk') {
      setItems(prev => prev.filter(i => !selectedIds.includes(i.id)));
      setSelectedIds([]);
    } else if (showDeleteModal.type === 'clear') {
      setItems([]);
      setSelectedIds([]);
    }
    setShowDeleteModal(null);
  };

  return (
    <div className={styles.historyWrapper}>
      
      {/* Header Panel */}
      <header className={styles.header}>
        <div className={styles.titleSection}>
          <h1 className={styles.title}>History</h1>
          <div className={styles.bulkActions}>
            <button className={`${styles.bulkBtn}`} onClick={handleExportCSV}>
              <FileDown size={18} /> Export CSV
            </button>
            {items.length > 0 && (
              <button className={`${styles.bulkBtn} ${styles.deleteBtn}`} onClick={() => setShowDeleteModal({ type: 'clear' })}>
                <Trash2 size={18} /> Clear All
              </button>
            )}
          </div>
        </div>

        <div className={styles.searchContainer}>
          <Search className={styles.searchIcon} size={22} />
          <input 
            type="text" 
            placeholder="Search your downloads..." 
            className={styles.searchInput}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className={styles.filtersRow}>
          <div className={styles.chipGroup}>
            {['All', 'Today', 'This Week', 'This Month'].map(f => (
              <button 
                key={f} 
                className={`${styles.filterChip} ${timeFilter === f ? styles.filterChipActive : ''}`}
                onClick={() => setTimeFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>
          <div className={styles.chipGroup}>
            {['All', 'YouTube', 'Instagram', 'TikTok', 'Facebook'].map(p => (
              <button 
                key={p} 
                className={`${styles.filterChip} ${platformFilter === p ? styles.filterChipActive : ''}`}
                onClick={() => setPlatformFilter(p)}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {selectedIds.length > 0 && (
          <div className="flex items-center justify-between p-4 bg-gray-900 text-white rounded-2xl animate-fade-in">
            <span className="font-bold">{selectedIds.length} items selected</span>
            <button 
              className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 rounded-xl transition-colors font-bold"
              onClick={() => setShowDeleteModal({ type: 'bulk' })}
            >
              <Trash2 size={16} /> Delete Selected
            </button>
          </div>
        )}
      </header>

      {/* Grid Content */}
      {isLoading ? (
        <div className={styles.itemsGrid}>
          {[1,2,3,4,5,6].map(i => <div key={i} className={styles.skeletonCard} />)}
        </div>
      ) : filteredItems.length > 0 ? (
        <div className={styles.itemsGrid}>
          {filteredItems.map((item, idx) => (
            <div 
              key={item.id} 
              className={styles.historyCard}
              style={{ animationDelay: `${idx * 0.05}s` }}
            >
              <div 
                className={`${styles.checkbox} ${selectedIds.includes(item.id) ? styles.checkboxSelected : ''}`}
                onClick={() => handleToggleSelect(item.id)}
              />
              <div className={styles.thumbWrapper}>
                <div className={styles.platformBadge}>
                  {item.platform === 'YouTube' && <Youtube size={14} color="#FF0000" />}
                  {item.platform === 'Instagram' && <Instagram size={14} color="#E4405F" />}
                  {item.platform === 'TikTok' && <Music2 size={14} color="#000000" />}
                  {item.platform === 'Facebook' && <Facebook size={14} color="#1877F2" />}
                  {item.platform}
                </div>
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <div className={styles.cardFooter}>
                  <span className={styles.date}>
                    {new Date(item.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </span>
                  <div className="flex gap-2">
                    <button className={styles.reDownloadBtn} title="Download Again">
                      <Download size={16} />
                    </button>
                    <button className={styles.reDownloadBtn} onClick={() => setShowDeleteModal({ type: 'single', id: item.id })}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>🎬</div>
          <h3 className="text-2xl font-black mb-2">No history found</h3>
          <p className="text-gray-500 mb-8 font-medium">Try adjusting your filters or start downloading new media.</p>
          <a href="/" className="px-8 py-4 bg-black text-white rounded-2xl font-bold hover:scale-105 transition-all inline-block">
            Start Downloading
          </a>
        </div>
      )}

      {/* Delete/Clear Modal */}
      {showDeleteModal && (
        <div className={styles.modalBackdrop}>
          <div className={styles.confirmModal}>
            <div className={styles.dangerIcon}>
              <AlertTriangle size={32} />
            </div>
            <h2 className="text-2xl font-black mb-2">
              {showDeleteModal.type === 'clear' ? 'Clear All History?' : 'Delete Items?'}
            </h2>
            <p className="text-gray-500 font-medium">
              This action cannot be undone. Are you sure you want to proceed?
            </p>
            <div className={styles.modalBtns}>
              <button className={`${styles.modalBtn} ${styles.cancelBtn}`} onClick={() => setShowDeleteModal(null)}>
                Cancel
              </button>
              <button className={`${styles.modalBtn} ${styles.confirmBtn}`} onClick={confirmDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default HistoryContainer;
