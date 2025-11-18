// Main JavaScript for ReelSpot - Complete Version
console.log('🎬 ReelSpot Loaded');

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    setupMobileMenu();
    setupNavigation();
    highlightActivePage();
}

// Mobile Menu Toggle
function setupMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.className = 'fas fa-times';
            } else {
                icon.className = 'fas fa-bars';
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                navLinks.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) icon.className = 'fas fa-bars';
            }
        });
    }
}

// Navigation Setup
function setupNavigation() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                    // Close mobile menu if open
                    const navLinks = document.querySelector('.nav-links');
                    if (navLinks) navLinks.classList.remove('active');
                }
            }
        });
    });
}

// Highlight Active Page
function highlightActivePage() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (currentPath.includes(href) || 
            (currentPath === '/' && href === 'index.html') ||
            (currentPath.endsWith('/') && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// Coming Soon Modal
function showComingSoon() {
    const existingModal = document.getElementById('coming-soon-modal');
    if (existingModal) existingModal.remove();

    const modal = document.createElement('div');
    modal.id = 'coming-soon-modal';
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content coming-soon-modal">
            <button class="modal-close" onclick="closeModal()">
                <i class="fas fa-times"></i>
            </button>
            <div class="modal-icon">
                <i class="fas fa-rocket"></i>
            </div>
            <h2>Coming Soon!</h2>
            <p>Our download service is currently under development and will be available soon.</p>
            <div class="modal-features">
                <div class="feature-item">
                    <i class="fas fa-check-circle"></i>
                    <span>High-quality downloads</span>
                </div>
                <div class="feature-item">
                    <i class="fas fa-check-circle"></i>
                    <span>Multiple format support</span>
                </div>
                <div class="feature-item">
                    <i class="fas fa-check-circle"></i>
                    <span>Fast processing</span>
                </div>
                <div class="feature-item">
                    <i class="fas fa-check-circle"></i>
                    <span>100% free forever</span>
                </div>
            </div>
            <p class="modal-subscribe">
                <i class="fas fa-bell"></i>
                Stay tuned! We'll notify you when the service launches.
            </p>
            <div class="modal-actions">
                <button class="btn btn-primary" onclick="closeModal()">
                    <i class="fas fa-check"></i>
                    Got it!
                </button>
                <a href="contact.html" class="btn btn-secondary">
                    <i class="fas fa-envelope"></i>
                    Contact Us
                </a>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('show'), 10);

    // Close on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Close on Escape key
    document.addEventListener('keydown', handleEscapeKey);
}

function handleEscapeKey(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
}

function closeModal() {
    const modal = document.getElementById('coming-soon-modal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => modal.remove(), 300);
        document.removeEventListener('keydown', handleEscapeKey);
    }
}

// Quick Download Handler (for homepage)
function handleQuickDownload() {
    const urlInput = document.getElementById('quick-url');
    if (!urlInput) return;

    const url = urlInput.value.trim();
    if (!url) {
        showToast('Please enter a video URL!', 'warning');
        return;
    }

    if (!isValidUrl(url)) {
        showToast('Please enter a valid URL!', 'error');
        return;
    }

    showComingSoon();
}

// URL Validation
function isValidUrl(string) {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
}

// Toast Notification System
function showToast(message, type = 'info', duration = 3000) {
    // Remove existing toasts
    const existingToasts = document.querySelectorAll('.toast');
    existingToasts.forEach(toast => toast.remove());

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        warning: 'fa-exclamation-triangle',
        info: 'fa-info-circle'
    };
    
    toast.innerHTML = `
        <i class="fas ${icons[type] || icons.info}"></i>
        <span>${escapeHtml(message)}</span>
    `;

    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 10);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Format file size
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

// Format duration
function formatDuration(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Make functions globally accessible
window.showComingSoon = showComingSoon;
window.closeModal = closeModal;
window.handleQuickDownload = handleQuickDownload;
window.showToast = showToast;
window.formatFileSize = formatFileSize;
window.formatDuration = formatDuration;