"use client";

import confetti from "canvas-confetti";
import { useEffect, useRef, useState } from "react";

const CONFETTI_COLORS = ["#5C2018", "#8B3A2F", "#C4756A", "#D4A59A", "#FAF8F5"];

// 9 PM on the wedding day, Cairo time. The +03:00 offset is written out so the
// countdown ends at the same real moment for guests in any timezone — Egypt is
// on EEST (UTC+3) in August.
const TARGET_TIME = new Date("2026-08-02T21:00:00+03:00").getTime();

// Midnight closes the night out. After this the section turns into a keepsake
// instead of still claiming the celebration is on.
const CELEBRATION_END = new Date("2026-08-03T00:00:00+03:00").getTime();

type Phase = "before" | "during" | "after";

const phaseAt = (now: number): Phase =>
  now < TARGET_TIME ? "before" : now < CELEBRATION_END ? "during" : "after";

export default function CountdownSection() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [phase, setPhase] = useState<Phase>("before");
  const hasCelebrated = useRef(false);

  useEffect(() => {
    const tick = () => {
      const now = Date.now();
      const current = phaseAt(now);
      setPhase(current);

      if (current === "before") {
        const difference = TARGET_TIME - now;
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }

      return current;
    };

    // Run once up front so the numbers aren't stuck on 00 for the first second.
    const initial = tick();

    if (initial !== "before") {
      // Arrived after the countdown already ran out — no confetti here,
      // RevealSection already greets these guests with its own.
      hasCelebrated.current = true;
    }
    if (initial === "after") return;

    const interval = setInterval(() => {
      const current = tick();

      if (current === "after") {
        clearInterval(interval);
        return;
      }
      if (current !== "during" || hasCelebrated.current) return;

      // Someone is watching the moment it hits zero — give them a send-off.
      hasCelebrated.current = true;
      const end = Date.now() + 3000;
      const frame = () => {
        confetti({ particleCount: 3, angle: 60, spread: 55, origin: { x: 0 }, colors: CONFETTI_COLORS });
        confetti({ particleCount: 3, angle: 120, spread: 55, origin: { x: 1 }, colors: CONFETTI_COLORS });
        if (Date.now() < end) requestAnimationFrame(frame);
      };
      frame();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-12 bg-white flex flex-col items-center justify-center px-8">
      {phase === "during" && (
        <div className="flex flex-col items-center text-center">
          <h2 className="font-script text-5xl md:text-6xl mb-4 text-primary">
            Today is the Day
          </h2>
          <Ornament />
          <p className="font-display text-xl md:text-2xl text-primary">
            The celebration has begun
          </p>
          <p className="font-body text-sm tracking-wide mt-4 text-primary/80">
            Al Loaloaa Village — we can&apos;t wait to see you
          </p>
        </div>
      )}

      {phase === "after" && (
        <div className="flex flex-col items-center text-center">
          <h2 className="font-script text-5xl md:text-6xl mb-4 text-primary">
            Just Married
          </h2>
          <Ornament />
          <p className="font-script text-3xl md:text-4xl text-primary">
            Ahmed &amp; Reham
          </p>
          <p className="font-body text-xs tracking-[0.2em] uppercase mt-4 text-primary/70">
            August 2, 2026
          </p>
        </div>
      )}

      {phase === "before" && (
        <>
          <div className="text-center mb-10">
            <h2 className="font-script text-4xl md:text-5xl mb-2 text-primary">Countdown</h2>
          </div>
          <div className="flex gap-4 md:gap-8">
            <TimeUnit value={timeLeft.days} label="Days" />
            <TimeUnit value={timeLeft.hours} label="Hours" />
            <TimeUnit value={timeLeft.minutes} label="Min" />
            <TimeUnit value={timeLeft.seconds} label="Sec" />
          </div>
          <p className="font-body text-sm tracking-wide mt-10 text-primary">
            Until the big day
          </p>
        </>
      )}
    </section>
  );
}

function Ornament() {
  return (
    <div className="flex items-center gap-3 mb-5">
      <span className="block w-12 h-px bg-primary/40" />
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-primary">
        <path d="M12 21s-7.5-4.9-9.4-9A5.3 5.3 0 0 1 12 6.6a5.3 5.3 0 0 1 9.4 5.4C19.5 16.1 12 21 12 21Z" />
      </svg>
      <span className="block w-12 h-px bg-primary/40" />
    </div>
  );
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center border rounded-lg mb-2 border-primary">
        <span className="font-display text-2xl md:text-3xl text-primary">
          {value.toString().padStart(2, '0')}
        </span>
      </div>
      <span className="font-body text-[10px] md:text-xs tracking-[0.15em] uppercase text-primary">
        {label}
      </span>
    </div>
  );
}
