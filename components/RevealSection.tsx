"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import confetti from "canvas-confetti";

export default function RevealSection() {
  const [revealedCount, setRevealedCount] = useState(0);
  const hasConfettiFired = useRef(false);

  const handleCircleReveal = useCallback(() => {
    setRevealedCount((prev) => prev + 1);
  }, []);

  useEffect(() => {
    if (revealedCount === 3 && !hasConfettiFired.current) {
      hasConfettiFired.current = true;

      // Fire confetti in primary color theme
      const duration = 3000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ["#5C2018", "#8B3A2F", "#C4756A", "#D4A59A", "#FAF8F5"],
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ["#5C2018", "#8B3A2F", "#C4756A", "#D4A59A", "#FAF8F5"],
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };

      frame();
    }
  }, [revealedCount]);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center py-8 px-8 bg-secondary relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#5C2018 2px, transparent 2px)', backgroundSize: '40px 40px' }} />
      
      <div className="text-center mb-8 relative z-10">
        <h2 className="font-script text-4xl md:text-5xl mb-4 text-primary">Reveal</h2>
        <p className="font-body text-sm tracking-[0.15em] uppercase text-primary">Scratch to discover the date</p>
      </div>

      <div className="flex gap-4 md:gap-10 relative z-10">
        {["2", "August", "2026"].map((text, idx) => (
          <ScratchCircle key={idx} text={text} onReveal={handleCircleReveal} />
        ))}
      </div>

      <p className={`font-script text-2xl md:text-3xl mt-8 text-primary relative z-10 transition-all duration-1000 ${
        revealedCount === 3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}>
        We&apos;re getting married!
      </p>
    </section>
  );
}

function ScratchCircle({ text, onReveal }: { text: string; onReveal: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "#5C2018";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    let isDrawing = false;
    
    const scratch = (x: number, y: number) => {
      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.arc(x, y, 35, 0, Math.PI * 2);
      ctx.fill();

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      let transparentPixels = 0;
      for (let i = 3; i < imageData.data.length; i += 4) {
        if (imageData.data[i] === 0) transparentPixels++;
      }
      const percent = transparentPixels / (canvas.width * canvas.height);
      if (percent > 0.4 && !isRevealed) {
        setIsRevealed(true);
        onReveal();
        canvas.style.opacity = "0";
        setTimeout(() => {
          canvas.style.display = "none";
        }, 700);
      }
    };

    const handlePointerDown = (e: PointerEvent) => {
      isDrawing = true;
      const rect = canvas.getBoundingClientRect();
      scratch(e.clientX - rect.left, e.clientY - rect.top);
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!isDrawing) return;
      const rect = canvas.getBoundingClientRect();
      scratch(e.clientX - rect.left, e.clientY - rect.top);
    };

    const handlePointerUp = () => {
      isDrawing = false;
    };

    canvas.addEventListener("pointerdown", handlePointerDown);
    canvas.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);

    return () => {
      canvas.removeEventListener("pointerdown", handlePointerDown);
      canvas.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [isRevealed, onReveal]);

  return (
    <div className="relative flex flex-col items-center">
      <div className="relative w-26 h-26 md:w-32 md:h-32 rounded-full overflow-hidden shadow-md">
        <div className="absolute inset-0 flex items-center justify-center bg-white">
          <span className="font-display text-2xl md:text-3xl text-primary">{text}</span>
        </div>
        <canvas 
          ref={canvasRef}
          width="150" 
          height="150" 
          className="absolute inset-0 w-full h-full cursor-pointer transition-opacity duration-700"
          style={{ touchAction: "none" }}
        />
      </div>
    </div>
  );
}

