"use client";

import { useState, useRef } from "react";
import Image from "next/image";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleOpen = () => {
    setIsOpen(true);
    if (audioRef.current) {
      audioRef.current.play().catch((err) => console.error("Audio playback failed:", err));
    }
  };

  return (
    <main className="min-h-screen bg-stone-100 flex flex-col items-center justify-center relative overflow-hidden">
      {!isOpen ? (
        <div className="flex flex-col items-center justify-center z-10 space-y-8 p-6 text-center">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-serif text-stone-800">Ahmed & Reham</h1>
            <p className="text-lg text-stone-600 font-light tracking-widest uppercase">Wedding Invitation</p>
          </div>
          <button 
            onClick={handleOpen}
            className="mt-8 px-10 py-4 bg-stone-800 hover:bg-stone-700 text-stone-50 rounded-full text-sm tracking-[0.2em] uppercase transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1"
          >
            Open Invitation
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center w-full min-h-screen p-4 transition-opacity duration-1000">
          <Image 
            src='/new.jpeg' 
            height={800} 
            width={600} 
            alt="Ahmed and Reham Wedding Invitation" 
            className="w-full max-w-lg h-auto shadow-2xl rounded-md"
            priority
          />
        </div>
      )}
      
      {/* Audio Element */}
      <audio ref={audioRef} src="/newone.mp3" loop className="hidden" />
    </main>
  );
}
