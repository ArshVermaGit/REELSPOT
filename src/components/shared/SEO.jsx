import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * SEO component to dynamically update document title and meta description.
 * This is crucial for SPAs to ensure AdSense crawlers see unique content on every route.
 * 
 * @param {Object} props
 * @param {string} props.title - The page title
 * @param {string} props.description - The page meta description
 */
const SEO = ({ title, description }) => {
    const location = useLocation();

    useEffect(() => {
        const fullTitle = `${title} | Reelspot`;
        document.title = fullTitle;

        // Update meta description
        let metaDescription = document.querySelector('meta[name="description"]');
        if (!metaDescription) {
            metaDescription = document.createElement('meta');
            metaDescription.name = 'description';
            document.head.appendChild(metaDescription);
        }
        metaDescription.setAttribute('content', description);

        // Update Open Graph tags for better social/crawler visibility
        const ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle) ogTitle.setAttribute('content', fullTitle);

        const ogDescription = document.querySelector('meta[property="og:description"]');
        if (ogDescription) ogDescription.setAttribute('content', description);

    }, [title, description, location]);

    return null;
};

export default SEO;
