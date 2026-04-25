import React from 'react';
import { motion } from 'framer-motion';
import './BackgroundBlobs.css';

const BackgroundBlobs: React.FC = () => {
  return (
    <div className="blobs-container">
      <motion.div 
        className="blob blob-1"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="blob blob-2"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -40, 0],
          y: [0, 60, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="blob blob-3"
        animate={{
          scale: [1, 1.1, 1],
          x: [0, 30, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
};

export default BackgroundBlobs;
