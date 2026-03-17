"use client";

import AudioPlayer from "@/components/AudioPlayer";
import HeroSection from "@/components/HeroSection";
import RevealSection from "@/components/RevealSection";
import CountdownSection from "@/components/CountdownSection";
import VenueSection from "@/components/VenueSection"
import ThankYouSection from "@/components/ThankYouSection";

export default function Home() {
  return (
    <main className="bg-white min-h-screen font-body selection:bg-primary selection:text-white">
      <AudioPlayer />
      <HeroSection />
      <RevealSection />
      <CountdownSection />
      <VenueSection />
      <ThankYouSection />
    </main>
  );
}
