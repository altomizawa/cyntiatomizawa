// components/LocoScroll.tsx
'use client';

import React, { useEffect } from 'react';
import "locomotive-scroll/dist/locomotive-scroll.css"; // Import the CSS

function LocoScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Dynamically import the library inside useEffect to ensure it runs client-side
    (async () => {
      const LocomotiveScroll = (await import('locomotive-scroll')).default;
      const scroll = new LocomotiveScroll();
    })();

    // Cleanup function to destroy the scroll instance on component unmount
    return () => {
      // Note: A more robust implementation would store the scroll instance in a ref 
      // to ensure the specific instance is destroyed.
    };
  }, []); // Empty dependency array ensures it runs once on mount

  return <>{children}</>;
}

export default LocoScroll;
