import React from 'react';

export const privacyContent = {
    title: 'Privacy Policy',
    body: (
        <div className="space-y-6 text-zinc-600">
            <p>Last updated: January 2026</p>
            <p className="text-lg leading-relaxed">At Reelspot, we take your privacy seriously. This Privacy Policy describes how your personal information is collected, used, and shared when you use our services. We are committed to protecting your privacy and ensuring transparency in all our data practices.</p>
            
            <h3 className="text-xl font-bold text-zinc-900 mt-8">1. Information We Collect</h3>
            <p className="leading-relaxed"><strong>Information You Provide:</strong> We collect information you provide directly to us, such as when you create an account using Google Sign-In. This includes your name, email address, and profile picture as provided by Google. We also collect any API keys you choose to store in your account settings.</p>
            <p className="leading-relaxed"><strong>Automatically Collected Information:</strong> When you use our services, we automatically collect certain technical information including your IP address, browser type, device information, and pages visited on our site. We also collect your download history (URL, platform, timestamp, and download status) which is stored securely in our database to provide you with history and analytics features.</p>
            <p className="leading-relaxed"><strong>Cookies and Tracking Technologies:</strong> We use cookies and similar technologies to maintain your login session, remember your preferences, and analyze how our service is used. For more details, please see our Cookie Policy.</p>

            <h3 className="text-xl font-bold text-zinc-900 mt-8">2. How We Use Your Information</h3>
            <p className="leading-relaxed">We use the information we collect for the following purposes:</p>
            <ul className="list-disc pl-5 space-y-2">
                <li>Provide, maintain, and improve our services and features;</li>
                <li>Process your downloads and manage your download history;</li>
                <li>Authenticate your identity and secure your account;</li>
                <li>Communicate with you about service updates, new features, or support messages;</li>
                <li>Monitor and analyze usage trends to improve user experience;</li>
                <li>Detect, prevent, and address technical issues or security threats;</li>
                <li>Comply with legal obligations and enforce our terms of service.</li>
            </ul>

            <h3 className="text-xl font-bold text-zinc-900 mt-8">3. Third-Party Services and Advertising</h3>
            <p className="leading-relaxed"><strong>Google AdSense:</strong> We use Google AdSense to display advertisements on our website. Google and its advertising partners use cookies to serve ads based on your prior visits to our website or other websites on the Internet. These cookies enable Google to display ads that may be relevant to your interests.</p>
            <p className="leading-relaxed"><strong>Opting Out:</strong> You may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="nofollow noreferrer" className="text-blue-600 hover:underline">Google Ads Settings</a>. You can also visit <a href="https://www.aboutads.info" target="_blank" rel="nofollow noreferrer" className="text-blue-600 hover:underline">www.aboutads.info</a> to opt out of third-party vendor cookies.</p>
            <p className="leading-relaxed"><strong>Authentication Services:</strong> We use Google Sign-In for authentication. When you sign in with Google, Google may collect information according to their privacy policy. We only receive your basic profile information (name, email, profile picture) from Google.</p>
            <p className="leading-relaxed"><strong>Backend Services:</strong> We use Supabase for secure data storage and authentication. Your data is stored on servers located in secure data centers with appropriate security measures in place.</p>

            <h3 className="text-xl font-bold text-zinc-900 mt-8">4. Data Sharing and Disclosure</h3>
            <p className="leading-relaxed">We do not sell, trade, or rent your personal information to third parties for marketing purposes. We may share your information in the following limited circumstances:</p>
            <ul className="list-disc pl-5 space-y-2">
                <li>With service providers who assist in operating our website and services;</li>
                <li>To comply with legal obligations, court orders, or government requests;</li>
                <li>To protect our rights, property, or safety, or that of our users;</li>
                <li>In connection with a merger, acquisition, or sale of assets (with prior notice).</li>
            </ul>

            <h3 className="text-xl font-bold text-zinc-900 mt-8">5. Data Security</h3>
            <p className="leading-relaxed">We implement industry-standard security measures to protect your personal information. This includes encryption of data in transit (HTTPS), secure storage of credentials, and regular security audits. Your API keys are encrypted before storage and are only accessible to you. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.</p>

            <h3 className="text-xl font-bold text-zinc-900 mt-8">6. Your Rights and Choices</h3>
            <p className="leading-relaxed">Depending on your location, you may have certain rights regarding your personal data, including:</p>
            <ul className="list-disc pl-5 space-y-2">
                <li><strong>Access:</strong> Request access to your personal data we hold;</li>
                <li><strong>Correction:</strong> Request correction of inaccurate data;</li>
                <li><strong>Deletion:</strong> Request deletion of your data (available in Settings);</li>
                <li><strong>Data Portability:</strong> Request a copy of your data in a portable format;</li>
                <li><strong>Withdraw Consent:</strong> Withdraw consent for data processing at any time.</li>
            </ul>
            <p className="leading-relaxed mt-4">To exercise any of these rights, please contact us at privacy@reelspot.app or use the data management tools in your Settings page.</p>

            <h3 className="text-xl font-bold text-zinc-900 mt-8">7. Data Retention</h3>
            <p className="leading-relaxed">We retain your personal information for as long as your account is active or as needed to provide you services. You can delete your download history at any time through the Settings page. If you delete your account, we will delete your personal data within 30 days, except where we are required to retain it for legal purposes.</p>

            <h3 className="text-xl font-bold text-zinc-900 mt-8">8. Children&apos;s Privacy</h3>
            <p className="leading-relaxed">Reelspot is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If you believe we have collected information from a child under 13, please contact us immediately.</p>

            <h3 className="text-xl font-bold text-zinc-900 mt-8">9. Changes to This Policy</h3>
            <p className="leading-relaxed">We may update this Privacy Policy from time to time. We will notify you of any significant changes by posting the new policy on this page and updating the &quot;Last updated&quot; date. We encourage you to review this policy periodically.</p>

            <h3 className="text-xl font-bold text-zinc-900 mt-8">10. Contact Us</h3>
            <p className="leading-relaxed">If you have any questions about this Privacy Policy or our data practices, please contact us at:</p>
            <p className="leading-relaxed">Email: privacy@reelspot.app</p>
        </div>
    )
};
