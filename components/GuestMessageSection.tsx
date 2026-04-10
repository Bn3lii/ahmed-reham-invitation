"use client";

import { useState } from "react";

// URL API بدل Apps Script
const API_URL = "/api/messages";

type Status = "idle" | "sending" | "success" | "error";

export default function GuestMessageSection() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async () => {
    if (!name.trim() || !message.trim()) return;
    setStatus("sending");

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), message: message.trim() }),
      });

      if (!response.ok) throw new Error("Failed to send");

      setStatus("success");
      setName("");
      setMessage("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="py-16 bg-white flex flex-col items-center justify-center px-8">

      <div className="text-center mb-10">
        <h2 className="font-script text-4xl md:text-5xl mb-2 text-primary">
          Leave a Message
        </h2>
        <p className="font-body text-[10px] md:text-xs tracking-[0.15em] uppercase text-primary">
          your words mean the world to us
        </p>
      </div>

      <div className="w-full max-w-sm md:max-w-md">
        <div className="border border-primary/20 rounded-2xl overflow-hidden">

          <div className="h-0.75 bg-primary w-full" />

          <div className="p-8 md:p-10 bg-white">
            {status === "success" ? (
              <SuccessState onReset={() => setStatus("idle")} />
            ) : (
              <>
                <div className="mb-5">
                  <label className="block font-body text-[10px] tracking-[0.15em] uppercase text-primary mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name..."
                    disabled={status === "sending"}
                    className="w-full border border-primary/25 rounded-lg px-4 py-3 font-body text-sm text-primary placeholder:text-primary/30 outline-none focus:border-primary/60 transition-colors duration-200 bg-white disabled:opacity-50"
                  />
                </div>

                <div className="mb-8">
                  <label className="block font-body text-[10px] tracking-[0.15em] uppercase text-primary mb-2">
                    Your Message
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write your heartfelt words..."
                    rows={4}
                    disabled={status === "sending"}
                    className="w-full border border-primary/25 rounded-lg px-4 py-3 font-body text-sm text-primary placeholder:text-primary/30 outline-none focus:border-primary/60 transition-colors duration-200 bg-white resize-none disabled:opacity-50"
                  />
                </div>

                {status === "error" && (
                  <p className="font-body text-xs text-red-500 text-center mb-4">
                    Something went wrong — please try again.
                  </p>
                )}

                <button
                  onClick={handleSubmit}
                  disabled={status === "sending" || !name.trim() || !message.trim()}
                  className="w-full py-3 px-6 rounded-full bg-primary text-white font-body text-xs tracking-[0.2em] uppercase transition-all duration-300 hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100"
                >
                  {status === "sending" ? (
                    <span className="flex items-center justify-center gap-2">
                      <Spinner />
                      Sending...
                    </span>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </>
            )}
          </div>

          <div className="h-px bg-primary/10 w-full" />
        </div>

        <p className="font-script text-xl text-primary/40 text-center mt-5">
          Ahmed & Reham
        </p>
      </div>
    </section>
  );
}

function SuccessState({ onReset }: { onReset: () => void }) {
  return (
    <div className="flex flex-col items-center text-center py-6">
      <div className="w-12 h-12 rounded-full border border-primary flex items-center justify-center mb-5">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
          stroke="#5C2018" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
      <h3 className="font-script text-3xl md:text-4xl text-primary mb-3">
        Thank You
      </h3>
      <p className="font-body text-sm text-primary/60 leading-relaxed mb-7 max-w-60">
        Your message has been received and will be treasured forever.
      </p>
      <button
        onClick={onReset}
        className="font-body text-[10px] tracking-[0.15em] uppercase text-primary/40 hover:text-primary border-b border-primary/20 hover:border-primary/50 transition-colors duration-200 pb-0.5"
      >
        Send another message
      </button>
    </div>
  );
}

function Spinner() {
  return (
    <svg className="animate-spin w-3.5 h-3.5" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10"
        stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
    </svg>
  );
}
