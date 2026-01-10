'use client';

import React from 'react';
import Image from 'next/image';
import { Github, Twitter, Globe, Linkedin, Mail } from 'lucide-react';
import styles from './About.module.css';

const AboutPage = () => {
  const socialLinks = [
    { name: 'GitHub', icon: <Github size={18} />, href: 'https://github.com/ArshVermaGit' },
    { name: 'LinkedIn', icon: <Linkedin size={18} />, href: 'https://www.linkedin.com/in/arshvermadev' },
    { name: 'X', icon: <Twitter size={18} />, href: 'https://x.com/TheArshVerma' },
    { name: 'Portfolio', icon: <Globe size={18} />, href: 'https://arshcreates.vercel.app' },
  ];

  return (
    <div className={styles.pageContainer}>
      <div className="container">
        
        <div className={styles.aboutCard}>
          
          {/* Profile Side */}
          <div className={styles.profileSide}>
            <div className={styles.imageOuter}>
              <div className={styles.imageInner}>
                <Image 
                  src="/arsh_verma.jpg"
                  alt="Arsh Verma"
                  width={300}
                  height={300}
                  className={styles.profileImage}
                  priority
                />
              </div>
            </div>
            
            <div className={styles.socialGrid}>
              {socialLinks.map((link, i) => (
                <a 
                  key={i} 
                  href={link.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.socialBtn}
                >
                  {link.icon}
                  <span>{link.name}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Content Side */}
          <div className={styles.contentSide}>
            <span className={styles.subtitle}>Full-Stack Digital Creator</span>
            <h1 className={styles.title}>About Me</h1>
            
            <div className={styles.bioWrap}>
              <p className={styles.bioText}>
                I&apos;m <strong>Arsh Verma</strong>, a Tech Gaming Technology student at <strong>VIT Bhopal</strong> and a full-stack digital creator. 
                My expertise lies in game development with <strong>Unity</strong>, but I also build dynamic websites and apps.
              </p>
              
              <p className={styles.bioText}>
                I&apos;ve earned numerous certifications and treat every project, like my portfolio <a href="https://arshcreates.vercel.app" target="_blank">arshcreates</a>, 
                as an opportunity to blend creative vision with technical precision.
              </p>
              
              <p className={styles.bioText}>
                My development philosophy is simple: <em>turn great ideas into polished, engaging digital reality</em>. 
                I love the challenge of coding and design, focusing on creating seamless user experiences across all platforms.
              </p>
              
              <p className={styles.philosophy}>
                Take a look around—I&apos;m ready to tackle the next big project!
              </p>
            </div>

            <a 
              href="mailto:contact@arshcreates.com"
              className={styles.primaryBtn}
            >
              <Mail size={20} />
              <span>Get In Touch</span>
            </a>
          </div>

        </div>

        <div className={styles.footer}>
          Handcrafted with 🤍 by Arsh Verma &bull; 2026
        </div>

      </div>
    </div>
  );
};

export default AboutPage;
