// Admin Dashboard JavaScript - Complete Version

document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    initializeAdminPanel();
});

function checkAuth() {
    const isLoggedIn = sessionStorage.getItem('adminLoggedIn');
    const loginDiv = document.getElementById('admin-login');
    const dashboardDiv = document.getElementById('admin-dashboard');

    if (isLoggedIn === 'true') {
        if (loginDiv) loginDiv.classList.add('hidden');
        if (dashboardDiv) dashboardDiv.classList.remove('hidden');
        loadDashboard();
    } else {
        if (loginDiv) loginDiv.classList.remove('hidden');
        if (dashboardDiv) dashboardDiv.classList.add('hidden');
    }
}

function initializeAdminPanel() {
    setupLoginForm();
    setupPasswordToggle();
}

function setupLoginForm() {
    const loginForm = document.getElementById('login-form');
    if (!loginForm) return;

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        handleLogin();
    });
}

function setupPasswordToggle() {
    const togglePassword = document.getElementById('toggle-password');
    const passwordInput = document.getElementById('password');

    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', () => {
            const type = passwordInput.type === 'password' ? 'text' : 'password';
            passwordInput.type = type;
            const icon = togglePassword.querySelector('i');
            if (icon) {
                icon.className = type === 'password' ? 'fas fa-eye' : 'fas fa-eye-slash';
            }
        });
    }
}

function handleLogin() {
    const username = document.getElementById('username')?.value;
    const password = document.getElementById('password')?.value;

    // Default credentials: admin / admin123
    if (username === 'admin' && password === 'admin123') {
        sessionStorage.setItem('adminLoggedIn', 'true');
        sessionStorage.setItem('adminUsername', username);
        
        showToast('Login successful!', 'success');
        
        setTimeout(() => {
            const loginDiv = document.getElementById('admin-login');
            const dashboardDiv = document.getElementById('admin-dashboard');
            
            if (loginDiv) loginDiv.classList.add('hidden');
            if (dashboardDiv) dashboardDiv.classList.remove('hidden');
            
            loadDashboard();
        }, 500);
    } else {
        showToast('Invalid username or password!', 'error');
        
        const loginContainer = document.querySelector('.login-container');
        if (loginContainer) {
            loginContainer.style.animation = 'shake 0.5s';
            setTimeout(() => {
                loginContainer.style.animation = '';
            }, 500);
        }
    }
}

function logout() {
    if (confirm('Are you sure you want to logout?')) {
        sessionStorage.removeItem('adminLoggedIn');
        sessionStorage.removeItem('adminUsername');
        location.reload();
    }
}

function loadDashboard() {
    loadStatistics();
    loadFeedbackList();
}

function loadStatistics() {
    const feedback = JSON.parse(localStorage.getItem('contactFeedback') || '[]');
    
    const totalFeedback = feedback.length;
    const unreadFeedback = feedback.filter(f => !f.read).length;
    
    const thisMonth = feedback.filter(f => {
        const date = new Date(f.timestamp);
        const now = new Date();
        return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
    }).length;

    document.getElementById('total-feedback').textContent = totalFeedback;
    document.getElementById('unread-feedback').textContent = unreadFeedback;
    document.getElementById('this-month').textContent = thisMonth;
}

function loadFeedbackList() {
    const feedbackList = document.getElementById('feedback-list');
    if (!feedbackList) return;

    const feedback = JSON.parse(localStorage.getItem('contactFeedback') || '[]');

    if (feedback.length === 0) {
        feedbackList.innerHTML = `
            <div class="no-feedback">
                <i class="fas fa-inbox"></i>
                <p>No feedback messages yet</p>
            </div>
        `;
        return;
    }

    feedbackList.innerHTML = feedback.map((item, index) => `
        <div class="feedback-item ${item.read ? 'read' : 'unread'}">
            <div class="feedback-header">
                <div class="feedback-user">
                    <div class="user-avatar">
                        <i class="fas fa-user"></i>
                    </div>
                    <div class="user-info">
                        <h4>${escapeHtml(item.name)}</h4>
                        <p>${escapeHtml(item.email)}</p>
                    </div>
                </div>
                <div class="feedback-meta">
                    <span class="feedback-time">
                        <i class="fas fa-clock"></i>
                        ${formatTimeAgo(item.timestamp)}
                    </span>
                </div>
            </div>
            <div class="feedback-body">
                <h5>${escapeHtml(item.subject || 'No Subject')}</h5>
                <p>${escapeHtml(item.message)}</p>
            </div>
            <div class="feedback-actions">
                <button class="btn-action" onclick="markAsRead(${index}, ${!item.read})" title="${item.read ? 'Mark as unread' : 'Mark as read'}">
                    <i class="fas fa-${item.read ? 'envelope' : 'envelope-open'}"></i>
                </button>
                <button class="btn-action" onclick="replyToFeedback('${escapeHtml(item.email)}')" title="Reply">
                    <i class="fas fa-reply"></i>
                </button>
                <button class="btn-action danger" onclick="deleteFeedback(${index})" title="Delete">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `).join('');
}

function markAsRead(index, read = true) {
    const feedback = JSON.parse(localStorage.getItem('contactFeedback') || '[]');
    if (feedback[index]) {
        feedback[index].read = read;
        localStorage.setItem('contactFeedback', JSON.stringify(feedback));
        loadDashboard();
        showToast(read ? 'Marked as read' : 'Marked as unread', 'success');
    }
}

function replyToFeedback(email) {
    window.location.href = `mailto:${email}`;
}

function deleteFeedback(index) {
    if (confirm('Are you sure you want to delete this feedback?')) {
        const feedback = JSON.parse(localStorage.getItem('contactFeedback') || '[]');
        feedback.splice(index, 1);
        localStorage.setItem('contactFeedback', JSON.stringify(feedback));
        loadDashboard();
        showToast('Feedback deleted', 'success');
    }
}

function clearAllFeedback() {
    if (confirm('Are you sure you want to delete ALL feedback? This cannot be undone!')) {
        localStorage.removeItem('contactFeedback');
        loadDashboard();
        showToast('All feedback cleared', 'success');
    }
}

function exportFeedback() {
    const feedback = JSON.parse(localStorage.getItem('contactFeedback') || '[]');
    
    if (feedback.length === 0) {
        showToast('No feedback to export', 'warning');
        return;
    }

    const csv = convertToCSV(feedback);
    downloadCSV(csv, `reelspot-feedback-${Date.now()}.csv`);
    showToast('Feedback exported successfully!', 'success');
}

function convertToCSV(data) {
    const headers = ['Name', 'Email', 'Subject', 'Message', 'Date', 'Read'];
    const rows = data.map(item => [
        item.name,
        item.email,
        item.subject || 'No Subject',
        item.message,
        new Date(item.timestamp).toLocaleString(),
        item.read ? 'Yes' : 'No'
    ]);

    return [
        headers.join(','),
        ...rows.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
    ].join('\n');
}

function downloadCSV(csv, filename) {
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}

function formatTimeAgo(timestamp) {
    const now = new Date();
    const then = new Date(timestamp);
    const seconds = Math.floor((now - then) / 1000);

    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)} days ago`;
    
    return then.toLocaleDateString();
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Make functions globally accessible
window.logout = logout;
window.markAsRead = markAsRead;
window.replyToFeedback = replyToFeedback;
window.deleteFeedback = deleteFeedback;
window.clearAllFeedback = clearAllFeedback;
window.exportFeedback = exportFeedback;