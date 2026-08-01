"use client";

import { useEffect, useState } from "react";

// 9 PM on the wedding day, Cairo time. The +03:00 offset is written out so the
// countdown ends at the same real moment for guests in any timezone — Egypt is
// on EEST (UTC+3) in August.
const TARGET_TIME = new Date("2026-08-02T21:00:00+03:00").getTime();

export default function CountdownSection() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Returns false once the big day arrives, so the interval can stop.
    const tick = () => {
      const difference = TARGET_TIME - Date.now();

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return false;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000)
      });
      return true;
    };

    // Run once up front so the numbers aren't stuck on 00 for the first second.
    if (!tick()) return;

    const interval = setInterval(() => {
      if (!tick()) clearInterval(interval);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-12 bg-white flex flex-col items-center justify-center px-8">
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
    </section>
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
