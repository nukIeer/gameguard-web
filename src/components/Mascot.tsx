import React from 'react';

export function Mascot({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Shield Body */}
      <path d="M50 5L90 20V45C90 70 73.5 91.5 50 95C26.5 91.5 10 70 10 45V20L50 5Z" fill="#3B82F6"/>
      <path d="M50 5V95C73.5 91.5 90 70 90 45V20L50 5Z" fill="#2563EB"/>
      
      {/* Eyes */}
      <circle cx="35" cy="45" r="5" fill="white"/>
      <circle cx="65" cy="45" r="5" fill="white"/>
      <circle cx="35" cy="45" r="2.5" fill="#1E3A8A"/>
      <circle cx="65" cy="45" r="2.5" fill="#1E3A8A"/>
      
      {/* Smile */}
      <path d="M35 60C35 60 45 68 50 68C55 68 65 60 65 60" stroke="white" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
