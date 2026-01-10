'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useSession } from 'next-auth/react';
import { 
  Search, Trash2, 
  Instagram, Youtube, Facebook, Music2,
  RefreshCw, FileDown
} from 'lucide-react';
import styles from './History.module.css';
import ConfirmationModal from '@/components/ui/ConfirmationModal';
import Skeleton from '@/components/ui/Skeleton';

// --- Types ---
interface HistoryItem {
  id: string;
  title: string;
  platform: string;
  date: string;
  thumbnail?: string;
  url?: string;
}

const HistoryContainer = () => {
  const { status } = useSession();
  const [search, setSearch] = useState('');
  const [timeFilter, setTimeFilter] = useState('All');
  const [platformFilter, setPlatformFilter] = useState('All');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [items, setItems] = useState<HistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState<{ type: 'single' | 'bulk' | 'clear', id?: string } | null>(null);

  const fetchHistory = async (silent = false) => {
    try {
      if (!silent) setIsLoading(true);
      if (silent) setIsRefreshing(true);
      const res = await fetch('/api/history');
      if (res.ok) {
        const data = await res.json();
        setItems(data);
      }
    } catch (error) {
      console.error("Failed to fetch history:", error);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    if (status === 'authenticated') {
      fetchHistory();
    } else if (status === 'unauthenticated') {
      setIsLoading(false);
    }
  }, [status]);

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

  const confirmDelete = async () => {
    if (!showDeleteModal) return;
    
    setIsDeleting(true);
    try {
      if (showDeleteModal.type === 'single') {
        const res = await fetch(`/api/history?id=${showDeleteModal.id}`, { method: 'DELETE' });
        if (res.ok) setItems(prev => prev.filter(i => i.id !== showDeleteModal.id));
      } else if (showDeleteModal.type === 'bulk') {
        for (const id of selectedIds) {
          await fetch(`/api/history?id=${id}`, { method: 'DELETE' });
        }
        setItems(prev => prev.filter(i => !selectedIds.includes(i.id)));
        setSelectedIds([]);
      } else if (showDeleteModal.type === 'clear') {
        const res = await fetch('/api/history?clearAll=true', { method: 'DELETE' });
        if (res.ok) setItems([]);
        setSelectedIds([]);
      }
    } catch (error) {
      console.error("Delete failed:", error);
    } finally {
      setIsDeleting(false);
      setShowDeleteModal(null);
    }
  };

  if (status === 'unauthenticated') {
    return (
      <div className={styles.emptyState}>
        <div className={styles.emptyIcon}>🔒</div>
        <h3 className="text-2xl font-black mb-2">Private History</h3>
        <p className="text-gray-500 mb-8 font-medium">Please sign in to view and manage your download history.</p>
        <button 
          onClick={() => window.dispatchEvent(new CustomEvent('open-login'))}
          className="px-8 py-4 bg-black text-white rounded-xl font-bold inline-block"
        >
          Sign In Now
        </button>
      </div>
    );
  }

  return (
    <div className={styles.historyWrapper}>
      
      <div className={styles.layout}>
      
      {/* Header Panel */}
      <header className={styles.header}>
        <div className={styles.titleSection}>
          <div className="flex items-center gap-4">
            <h1 className={styles.title}>History</h1>
            {isRefreshing && <RefreshCw className="animate-spin text-gray-400" size={20} />}
          </div>
          <div className={styles.bulkActions}>
            <button className={styles.bulkBtn} onClick={() => fetchHistory(true)}>
              <RefreshCw size={18} /> Sync
            </button>
            <button className={styles.bulkBtn} onClick={handleExportCSV}>
              <FileDown size={18} /> Export
            </button>
            {items.length > 0 && (
              <button className={`${styles.bulkBtn} ${styles.deleteBtn}`} onClick={() => setShowDeleteModal({ type: 'clear' })}>
                <Trash2 size={18} /> Clear
              </button>
            )}
          </div>
        </div>

        <div className={styles.searchContainer}>
          <Search className={styles.searchIcon} size={20} />
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
            {['All', 'Today', 'This Week'].map(f => (
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
            {['All', 'YouTube', 'Instagram'].map(p => (
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
          <div className="flex items-center justify-between p-4 bg-black text-white rounded-xl">
            <span className="font-bold">{selectedIds.length} selected</span>
            <button 
              className="flex items-center gap-2 px-4 py-2 bg-red-600 rounded-lg font-bold"
              onClick={() => setShowDeleteModal({ type: 'bulk' })}
            >
              <Trash2 size={16} /> Delete
            </button>
          </div>
        )}
      </header>

      {/* Grid Content */}
      {isLoading ? (
        <div className={styles.itemsGrid}>
          {[1,2,3,4].map(i => (
            <div key={i} className={styles.historyCard}>
              <div className={styles.thumbWrapper}>
                <Skeleton width="100%" height="100%" />
              </div>
              <div className={styles.cardContent}>
                <Skeleton width="100%" height="20px" className="mb-2" />
                <Skeleton width="60%" height="14px" />
              </div>
            </div>
          ))}
        </div>
      ) : filteredItems.length > 0 ? (
        <div className={styles.itemsGrid}>
          {filteredItems.map((item) => (
            <div key={item.id} className={styles.historyCard}>
              <div 
                className={`${styles.checkbox} ${selectedIds.includes(item.id) ? styles.checkboxSelected : ''}`}
                onClick={() => handleToggleSelect(item.id)}
              />
              <div className={styles.thumbWrapper}>
                <div className={styles.platformBadge}>
                  {item.platform === 'YouTube' && <Youtube size={14} />}
                  {item.platform === 'Instagram' && <Instagram size={14} />}
                  {item.platform === 'TikTok' && <Music2 size={14} />}
                  {item.platform === 'Facebook' && <Facebook size={14} />}
                  <span>{item.platform}</span>
                </div>
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <div className={styles.cardFooter}>
                  <span className={styles.date}>
                    {new Date(item.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                  </span>
                  <div className="flex gap-2">
                    <button className={styles.actionBtn} onClick={() => setShowDeleteModal({ type: 'single', id: item.id })}>
                      <Trash2 size={14} />
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
          <h3 className="text-xl font-black mb-2">No history found</h3>
          <p className="text-gray-500 mb-6 font-medium">Try adjusting your filters.</p>
          <a href="/" className="px-6 py-3 bg-black text-white rounded-xl font-bold inline-block">
            Start Downloading
          </a>
        </div>
      )}

      <ConfirmationModal 
        isOpen={!!showDeleteModal} 
        onClose={() => setShowDeleteModal(null)}
        onConfirm={confirmDelete}
        title={showDeleteModal?.type === 'clear' ? 'Clear History?' : 'Delete Items?'}
        description="This action cannot be undone."
        confirmLabel={showDeleteModal?.type === 'clear' ? 'Clear All' : 'Delete'}
        type="danger"
        isLoading={isDeleting}
      />

      </div>
    </div>
  );
};

export default HistoryContainer;
