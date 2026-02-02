import { motion } from 'framer-motion';
import { useEffect } from 'react';
import './HomePage.css';

const HomePage = () => {
  // No need to modify body overflow here, it's handled in App.css

  return (
    <motion.div className="home-section">
      <motion.div 
        className="home-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.h1 
          className="home-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          Auria Zhang
        </motion.h1>
        <motion.p 
          className="home-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          UX Designer & Product Thinker
        </motion.p>
        <motion.p 
          className="home-description"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
        >
          Crafting intuitive systems across digital interfaces and connected devices
        </motion.p>
        <motion.div 
          className="home-scroll-indicator"
          animate={{ y: [0, 10, 0] }}
          transition={{ 
            duration: 1.8, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 1
          }}
        >
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="6" r="1.5" fill="currentColor" opacity="0.6"/>
            <circle cx="12" cy="10" r="1.5" fill="currentColor" opacity="0.8"/>
            <path d="M8 14L12 18L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default HomePage;
