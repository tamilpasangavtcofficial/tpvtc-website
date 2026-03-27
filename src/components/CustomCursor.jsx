import React, { useState, useEffect, useRef } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const requestRef = useRef();

  useEffect(() => {
    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      const target = e.target;
      const isClickable = target.closest('a, button, .clickable, input, .nav-link');
      setIsPointer(!!isClickable);
    };

    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  useEffect(() => {
    const updateTrail = () => {
      setTrail(prev => ({
        x: prev.x + (position.x - prev.x) * 0.15,
        y: prev.y + (position.y - prev.y) * 0.15
      }));
      requestRef.current = requestAnimationFrame(updateTrail);
    };
    requestRef.current = requestAnimationFrame(updateTrail);
    return () => cancelAnimationFrame(requestRef.current);
  }, [position]);

  // Calculate distance and angle for the connecting line
  const dx = position.x - trail.x;
  const dy = position.y - trail.y;
  const distance = Math.hypot(dx, dy);
  const angle = Math.atan2(dy, dx) * (180 / Math.PI);

  return (
    <>
      <div 
        className={`cursor-dot ${isPointer ? 'cursor-active' : ''}`}
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      />
      <div 
        className={`cursor-trail-dot ${isPointer ? 'cursor-active' : ''}`}
        style={{ 
          left: `${trail.x}px`, 
          top: `${trail.y}px`
        }}
      >
        <div 
          className="cursor-line-vector"
          style={{ 
            width: `${distance}px`,
            transform: `rotate(${angle}deg)`
          }}
        />
      </div>
    </>
  );
};

export default CustomCursor;
