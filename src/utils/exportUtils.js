export const exportHistoryToCSV = (historyData) => {
    if (!historyData || historyData.length === 0) {
        return;
    }

    // Define columns
    const headers = ['Date', 'Title', 'Platform', 'Type', 'Format', 'Quality', 'URL', 'Status', 'File Size (Bytes)'];
    
    // Convert data to CSV rows
    const rows = historyData.map(item => [
        new Date(item.created_at).toLocaleString(),
        `"${(item.title || '').replace(/"/g, '""')}"`, // Escape quotes
        item.platform,
        item.media_type,
        item.format,
        item.quality,
        item.media_url,
        item.download_status,
        item.file_size
    ]);

    // Combine
    const csvContent = [
        headers.join(','),
        ...rows.map(r => r.join(','))
    ].join('\n');

    // Create Download Link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `reelspot_history_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
