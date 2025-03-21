import React from 'react'
import './ScrollTag.css'

const ScrollTag = () => {
    const scrollText = "All products are hand-assembled and woven with precision";
    return (
        <div className="scrolling-container">
          <div className="scrolling-text">
            {/* Duplicate the text multiple times for smooth infinite scroll */}
            {Array(3).fill(scrollText).map((text, index) => (
              <span key={index} className="text-item">
                {text}
              </span>
            ))}
          </div>
        </div>
      );
    };

export default ScrollTag
