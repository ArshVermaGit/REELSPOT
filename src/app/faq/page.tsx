'use client';

import React, { useState } from 'react';
import { ChevronDown, MessageCircle } from 'lucide-react';
import styles from './FAQ.module.css';

const faqItems = [
  {
    question: "Is ReelSpot free to use?",
    answer: "Yes, ReelSpot is completely free for all users. We believe access to open media should be simple and accessible to everyone."
  },
  {
    question: "What platforms does ReelSpot support?",
    answer: "We currently support high-speed downloads from Instagram (Reels & Posts), YouTube (Videos & Shorts), TikTok, and Facebook. We are constantly adding support for more platforms."
  },
  {
    question: "Do I need to sign in to download videos?",
    answer: "No, you can download videos as a guest. However, signing in with your Google account allows you to save your download history and manage your own API keys for faster performance."
  },
  {
    question: "Is it legal to download videos?",
    answer: "ReelSpot is a tool for personal use only. Users are responsible for ensuring they have the right to download and use the content in accordance with the original creator's terms and local laws."
  },
  {
    question: "Where are my downloads saved?",
    answer: "By default, your browser will save them to your system's 'Downloads' folder. You can change the target path in the ReelSpot Settings if you are using our advanced desktop integration."
  },
  {
    question: "Can I download videos in 4K resolution?",
    answer: "Yes, ReelSpot supports the highest resolution available for the original video, including 4K and 8K where supported by the source platform."
  }
];

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <h1 className={styles.title}>Common Questions</h1>
        <p className={styles.subtitle}>Everything you need to know about ReelSpot</p>
      </header>

      <div className={styles.accordion}>
        {faqItems.map((item, i) => (
          <div 
            key={i} 
            className={`${styles.item} ${openIndex === i ? styles.itemOpen : ''}`}
          >
            <button 
              className={styles.question}
              onClick={() => toggleItem(i)}
              aria-expanded={openIndex === i}
            >
              <span>{item.question}</span>
              <ChevronDown className={styles.icon} size={20} />
            </button>
            <div className={styles.answer}>
              <div className="pt-2">
                {item.answer}
              </div>
            </div>
          </div>
        ))}
      </div>

      <section className={styles.contactSection}>
        <div className="w-12 h-12 bg-black text-white rounded-2xl flex items-center justify-center mx-auto mb-4">
          <MessageCircle size={24} />
        </div>
        <h2 className="text-2xl font-black mb-2">Still have questions?</h2>
        <p className="text-gray-500 font-medium">Can&apos;t find the answer you&apos;re looking for? Our team is here to help.</p>
        <a href="mailto:support@reelspot.com" className={styles.contactBtn}>
          Contact Support
        </a>
      </section>
    </div>
  );
};

export default FAQPage;
