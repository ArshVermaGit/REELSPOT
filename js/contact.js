<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact Us - ReelSpot</title>
    <link rel="icon" href="assets/icons/favicon.ico">
    <link href="css/style.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
</head>
<body>
    <nav class="navbar">
        <div class="container">
            <div class="logo">
                <i class="fas fa-film"></i>
                <h1>ReelSpot</h1>
            </div>
            <div class="nav-links">
                <a href="index.html">Home</a>
                <a href="platforms.html">Platforms</a>
                <a href="about.html">About</a>
                <a href="contact.html" class="active">Contact</a>
            </div>
            <button id="mobile-menu-btn" aria-label="Toggle menu">
                <i class="fas fa-bars"></i>
            </button>
        </div>
    </nav>

    <section class="contact-page">
        <div class="container">
            <div class="section-header">
                <h2 class="section-title">Contact Us</h2>
                <p class="section-description">Get in touch with us for any questions or feedback</p>
            </div>

            <div class="contact-content">
                <div class="contact-info">
                    <div class="contact-card">
                        <div class="contact-icon">
                            <i class="fas fa-envelope"></i>
                        </div>
                        <h3>Email Us</h3>
                        <p>Send us an email and we'll respond within 24 hours</p>
                        <a href="mailto:support@reelspot.com" class="contact-link">support@reelspot.com</a>
                    </div>

                    <div class="contact-card">
                        <div class="contact-icon">
                            <i class="fas fa-bug"></i>
                        </div>
                        <h3>Report Issue</h3>
                        <p>Found a bug or having trouble? Let us know</p>
                        <a href="mailto:bugs@reelspot.com" class="contact-link">bugs@reelspot.com</a>
                    </div>

                    <div class="contact-card">
                        <div class="contact-icon">
                            <i class="fas fa-lightbulb"></i>
                        </div>
                        <h3>Suggestions</h3>
                        <p>Have ideas to improve ReelSpot? We'd love to hear</p>
                        <a href="mailto:ideas@reelspot.com" class="contact-link">ideas@reelspot.com</a>
                    </div>
                </div>

                <div class="contact-form-container">
                    <form class="contact-form">
                        <h3>Send us a Message</h3>
                        <div class="form-group">
                            <label for="name">Your Name</label>
                            <input type="text" id="name" name="name" required placeholder="Enter your name">
                        </div>
                        <div class="form-group">
                            <label for="email">Email Address</label>
                            <input type="email" id="email" name="email" required placeholder="Enter your email">
                        </div>
                        <div class="form-group">
                            <label for="subject">Subject</label>
                            <input type="text" id="subject" name="subject" required placeholder="What is this about?">
                        </div>
                        <div class="form-group">
                            <label for="message">Message</label>
                            <textarea id="message" name="message" rows="5" required placeholder="Tell us more..."></textarea>
                        </div>
                        <button type="submit" class="btn btn-primary" style="width: 100%;">
                            <i class="fas fa-paper-plane"></i>
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </section>

    <footer class="footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-brand">
                    <div class="logo">
                        <i class="fas fa-film"></i>
                        <h3>ReelSpot</h3>
                    </div>
                    <p>Download social media content with ease</p>
                </div>
                <div class="footer-links">
                    <div class="footer-column">
                        <h4>Quick Links</h4>
                        <a href="index.html">Home</a>
                        <a href="platforms.html">Platforms</a>
                        <a href="about.html">About</a>
                        <a href="admin.html" class="admin-link">Admin</a>
                    </div>
                    <div class="footer-column">
                        <h4>Legal</h4>
                        <a href="privacy.html">Privacy Policy</a>
                        <a href="contact.html">Contact</a>
                    </div>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2025 ReelSpot - All Rights Reserved. Created by Arsh Verma.</p>
            </div>
        </div>
    </footer>

    <script src="js/main.js"></script>
    <script>
        document.querySelector('.contact-form').addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
    </script>
</body>
</html>