'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useSession } from 'next-auth/react';
import { 
  Search, Download, Trash2, 
  FileDown, 
  Instagram, Youtube, Facebook, Music2
} from 'lucide-react';
import styles from './History.module.css';
import ConfirmationModal from '@/components/ui/ConfirmationModal';

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
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState<{ type: 'single' | 'bulk' | 'clear', id?: string } | null>(null);

  const fetchHistory = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/history');
      if (res.ok) {
        const data = await res.json();
        setItems(data);
      }
    } catch (error) {
      console.error("Failed to fetch history:", error);
    } finally {
      setIsLoading(false);
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
          className="px-8 py-4 bg-black text-white rounded-2xl font-bold hover:scale-105 transition-all inline-block"
        >
          Sign In Now
        </button>
      </div>
    );
  }

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

      <ConfirmationModal 
        isOpen={!!showDeleteModal} 
        onClose={() => setShowDeleteModal(null)}
        onConfirm={confirmDelete}
        title={showDeleteModal?.type === 'clear' ? 'Clear History?' : 'Delete Items?'}
        description="This action will permanently remove these items from your private history stash. It cannot be undone."
        confirmLabel={showDeleteModal?.type === 'clear' ? 'Clear All' : 'Delete Now'}
        type="danger"
        isLoading={isDeleting}
      />

    </div>
  );
};

export default HistoryContainer;
