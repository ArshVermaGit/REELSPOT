// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        });
    }

    // Handle download buttons
    const downloadButtons = document.querySelectorAll('.download-btn');
    downloadButtons.forEach(button => {
        button.addEventListener('click', function() {
            const platform = this.getAttribute('data-platform');
            window.location.href = `download.html?platform=${platform}`;
        });
    });

    // Handle platform cards
    const platformCards = document.querySelectorAll('.platform-card');
    platformCards.forEach(card => {
        card.addEventListener('click', function(e) {
            e.preventDefault();
            const platform = this.getAttribute('data-platform');
            window.location.href = `download.html?platform=${platform}`;
        });
    });

    // Handle download process
    const analyzeBtn = document.querySelector('.analyze-btn');
    if (analyzeBtn) {
        analyzeBtn.addEventListener('click', handleDownloadProcess);
    }

    // Handle quality selection
    const qualityOptions = document.querySelectorAll('.quality-option');
    qualityOptions.forEach(option => {
        option.addEventListener('click', function() {
            qualityOptions.forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
        });
    });

    // Admin functionality
    initializeAdmin();
});

function handleDownloadProcess() {
    const urlInput = document.querySelector('.url-input');
    const url = urlInput.value.trim();
    
    if (!url) {
        alert('Please enter a valid URL');
        return;
    }

    // Show loading state
    const downloadInputSection = document.querySelector('.download-input-section');
    const loadingState = document.querySelector('.loading-state');
    const downloadOptions = document.querySelector('.download-options');
    
    downloadInputSection.classList.add('hidden');
    loadingState.classList.remove('hidden');
    
    // Simulate analysis
    setTimeout(() => {
        loadingState.classList.add('hidden');
        downloadOptions.classList.remove('hidden');
        
        // Update video info based on platform
        const urlParams = new URLSearchParams(window.location.search);
        const platform = urlParams.get('platform');
        updateVideoInfo(platform);
    }, 2000);
}

function updateVideoInfo(platform) {
    const videoTitle = document.querySelector('.video-info h3');
    const platformIcons = {
        'instagram': 'fab fa-instagram',
        'youtube': 'fab fa-youtube',
        'tiktok': 'fab fa-tiktok',
        'facebook': 'fab fa-facebook',
        'twitter': 'fab fa-twitter'
    };
    
    const platformNames = {
        'instagram': 'Instagram',
        'youtube': 'YouTube',
        'tiktok': 'TikTok',
        'facebook': 'Facebook',
        'twitter': 'X (Twitter)'
    };
    
    if (videoTitle && platformIcons[platform]) {
        videoTitle.innerHTML = `<i class="${platformIcons[platform]}"></i> ${platformNames[platform]} Video`;
    }
}

function downloadVideo() {
    const progressSection = document.querySelector('.progress-section');
    const downloadOptions = document.querySelector('.download-options');
    const progressBar = document.querySelector('.progress-bar-fill');
    const progressPercentage = document.querySelector('.progress-percentage');
    const progressMessage = document.querySelector('.progress-message');
    
    downloadOptions.classList.add('hidden');
    progressSection.classList.remove('hidden');
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 10;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            progressMessage.textContent = 'Download complete!';
            
            // Show success message and redirect after delay
            setTimeout(() => {
                alert('Download completed successfully!');
                window.location.href = 'platforms.html';
            }, 1000);
        }
        
        progressBar.style.width = `${progress}%`;
        progressPercentage.textContent = `${Math.round(progress)}%`;
    }, 200);
}

// Admin functionality
function initializeAdmin() {
    const adminLoginForm = document.getElementById('admin-login-form');
    const adminDashboard = document.getElementById('admin-dashboard');
    
    if (adminLoginForm) {
        adminLoginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            // Simple authentication (in real app, use secure authentication)
            if (username === 'admin' && password === 'admin123') {
                localStorage.setItem('adminLoggedIn', 'true');
                adminLoginForm.classList.add('hidden');
                adminDashboard.classList.remove('hidden');
                loadFeedbackData();
            } else {
                alert('Invalid credentials');
            }
        });
    }
    
    // Check if already logged in
    if (localStorage.getItem('adminLoggedIn') === 'true' && adminDashboard) {
        adminLoginForm.classList.add('hidden');
        adminDashboard.classList.remove('hidden');
        loadFeedbackData();
    }
    
    // Handle filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            filterFeedback(this.getAttribute('data-filter'));
        });
    });
}

function loadFeedbackData() {
    // Sample feedback data
    const feedbackData = [
        {
            id: 1,
            name: 'John Doe',
            email: 'john@example.com',
            rating: 5,
            message: 'Amazing service! Downloaded my Instagram reels in seconds.',
            date: '2025-01-15',
            read: false
        },
        {
            id: 2,
            name: 'Sarah Wilson',
            email: 'sarah@example.com',
            rating: 4,
            message: 'Works great for YouTube videos. Would love to see more platform support.',
            date: '2025-01-14',
            read: true
        },
        {
            id: 3,
            name: 'Mike Johnson',
            email: 'mike@example.com',
            rating: 5,
            message: 'The download speed is incredible. Best free downloader I have used!',
            date: '2025-01-13',
            read: false
        }
    ];
    
    displayFeedback(feedbackData);
    updateStats(feedbackData);
}

function displayFeedback(feedbackData) {
    const feedbackList = document.getElementById('feedback-list');
    if (!feedbackList) return;
    
    feedbackList.innerHTML = '';
    
    feedbackData.forEach(feedback => {
        const feedbackItem = document.createElement('div');
        feedbackItem.className = `feedback-item ${feedback.read ? 'read' : 'unread'}`;
        
        const stars = '★'.repeat(feedback.rating) + '☆'.repeat(5 - feedback.rating);
        
        feedbackItem.innerHTML = `
            <div class="feedback-avatar">${feedback.name.charAt(0)}</div>
            <div class="feedback-content">
                <div class="feedback-header">
                    <div>
                        <div class="feedback-name">${feedback.name}</div>
                        <div class="feedback-rating">${stars}</div>
                    </div>
                    <div class="feedback-date">${feedback.date}</div>
                </div>
                <div class="feedback-message">${feedback.message}</div>
                <div class="feedback-email">${feedback.email}</div>
            </div>
            <div class="feedback-actions">
                <button class="action-btn" onclick="markAsRead(${feedback.id})" title="Mark as read">
                    <i class="fas fa-check"></i>
                </button>
                <button class="action-btn" onclick="deleteFeedback(${feedback.id})" title="Delete">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        
        feedbackList.appendChild(feedbackItem);
    });
}

function updateStats(feedbackData) {
    const totalFeedback = document.getElementById('total-feedback');
    const unreadFeedback = document.getElementById('unread-feedback');
    const avgRating = document.getElementById('avg-rating');
    const thisMonth = document.getElementById('this-month');
    
    if (totalFeedback) totalFeedback.textContent = feedbackData.length;
    if (unreadFeedback) {
        const unreadCount = feedbackData.filter(f => !f.read).length;
        unreadFeedback.textContent = unreadCount;
    }
    if (avgRating) {
        const average = feedbackData.reduce((sum, f) => sum + f.rating, 0) / feedbackData.length;
        avgRating.textContent = average.toFixed(1);
    }
    if (thisMonth) {
        const thisMonthCount = feedbackData.filter(f => {
            const feedbackDate = new Date(f.date);
            const now = new Date();
            return feedbackDate.getMonth() === now.getMonth() && feedbackDate.getFullYear() === now.getFullYear();
        }).length;
        thisMonth.textContent = thisMonthCount;
    }
}

function markAsRead(feedbackId) {
    // In a real app, this would update the server
    const feedbackItems = document.querySelectorAll('.feedback-item');
    feedbackItems.forEach(item => {
        // Simple simulation - in real app, you'd have proper IDs
        item.classList.add('read');
    });
}

function deleteFeedback(feedbackId) {
    if (confirm('Are you sure you want to delete this feedback?')) {
        // In a real app, this would delete from server
        const feedbackItems = document.querySelectorAll('.feedback-item');
        if (feedbackItems.length > 0) {
            feedbackItems[0].remove(); // Simple simulation
        }
    }
}

function filterFeedback(filter) {
    // In a real app, this would filter the feedback list
    console.log('Filtering by:', filter);
}

function adminLogout() {
    localStorage.removeItem('adminLoggedIn');
    window.location.reload();
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add loading states for better UX
function showLoading(element) {
    element.disabled = true;
    element.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
}

function hideLoading(element, originalText) {
    element.disabled = false;
    element.innerHTML = originalText;
}