"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";

export default function HeroSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isVideoFinished, setIsVideoFinished] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Lock scroll on body when not open
  useEffect(() => {
    if (!isVideoFinished) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflow = "auto";
      document.body.style.touchAction = "auto";
    }
    
    return () => {
      document.body.style.overflow = "auto";
      document.body.style.touchAction = "auto";
    };
  }, [isVideoFinished]);

  const handleOpen = () => {
    setIsOpen(true);
    setIsVideoPlaying(true);
    if (videoRef.current) {
      videoRef.current.play().catch(console.error);
    }
    // Attempt to start audio too
    const audioEl = document.querySelector('audio');
    if (audioEl) {
      audioEl.play().catch(console.error);
    }
  };

  const handleVideoEnded = () => {
    setIsVideoPlaying(false);
    setIsVideoFinished(true);
  };

  return (
    <section className="relative h-screen w-full cursor-pointer overflow-hidden bg-primary">
      {/* 
        0. Closed Curtain Base Layer: Visible before video starts
        It sits behind the intro button but in front of everything else.
      */}
      <Image 
        src="/curtain-closed-Bpkadld4.jpg" 
        alt="Closed Curtain" 
        fill
        className={`absolute inset-0 w-full h-full object-cover z-4 transition-opacity duration-700 ${
          !isVideoPlaying && !isVideoFinished ? "opacity-100" : "opacity-0 pointer-events-none"
        }`} 
        priority
      />

      {/* 
        1. Open Curtain Base Layer: Visible constantly in the background
        So when the video fades out, this is exactly what's behind it.
      */}
      <Image 
        src="/curtain-open-C9MqdT6G.jpg" 
        alt="Background" 
        fill
        className="absolute inset-0 w-full h-full object-cover z-1" 
        priority
      />

      {/* 
        2. Video Layer: Used for the initial closed curtain state and the opening animation
        Sits on top of the open curtain image. Fades out after ending.
      */}
      <video 
        ref={videoRef}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 z-3 ${
          isVideoFinished ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
        playsInline
        preload="auto"
        onEnded={handleVideoEnded}
      >
        <source src="/curtain-video-BAKLj3Y5.mp4" type="video/mp4" />
      </video>

      {/* 3. Intro Button (Sits on top of closed video curtain) */}
      {!isOpen && (
        <div className="absolute inset-0 z-5 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[2px] transition-opacity duration-700">
          <div className="flex flex-col items-center justify-center space-y-6 text-center px-4">
            <h1 className="text-5xl md:text-6xl font-script text-white drop-shadow-lg">Ahmed & Reham</h1>
            <p className="text-sm md:text-base text-white/90 font-body tracking-[0.2em] uppercase drop-shadow">Wedding Invitation</p>
            <button 
              onClick={handleOpen}
              className="mt-8 px-10 py-4 bg-primary/90 hover:bg-primary text-white backdrop-blur-sm border border-white/20 rounded-full text-xs md:text-sm tracking-[0.2em] uppercase transition-all duration-300 shadow-2xl hover:scale-105"
            >
              Open Invitation
            </button>
          </div>
        </div>
      )}

      {/* 4. Final Text Overlay (Shown after curtain opens) */}
      <div className={`absolute inset-0 z-2 flex flex-col transition-all duration-1000 ${
        isVideoFinished ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center text-center max-w-[55%] md:max-w-[45%] lg:max-w-[40%] px-4 pt-4">
            <p className="font-display text-[8px] md:text-[10px] tracking-[0.15em] uppercase mb-4 text-primary">
              You are cordially invited to celebrate the wedding of
            </p>
            <h1 className="font-script text-6xl md:text-7xl lg:text-8xl mb-0 leading-none text-primary">Ahmed</h1>
            <span className="font-script text-3xl md:text-4xl text-primary">&</span>
            <h1 className="font-script text-6xl md:text-7xl lg:text-8xl mb-10 leading-none text-primary">Reham</h1>
          </div>
        </div>
        
        <div className="absolute bottom-40 left-0 right-0 flex justify-center px-4">
          <p className="font-display text-[11px] md:text-sm tracking-[0.12em] uppercase leading-relaxed text-center max-w-[85%] md:max-w-[70%] lg:max-w-[60%] text-primary">
            We would like to invite you to celebrate with us the most special day of our lives. It would be an honor to have you present at this important moment.
          </p>
        </div>
        
        <div className="absolute bottom-8 left-0 right-0 flex justify-center animate-bounce">
          <div className="flex flex-col items-center">
            <p className="font-display text-[10px] tracking-[0.2em] uppercase mb-2 text-primary">Scroll</p>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5C2018" strokeWidth="1.5">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
