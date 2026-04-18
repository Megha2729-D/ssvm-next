"use client";

import Hero from "@/Component/Hero";
import VolleyBallAnimation from "@/Component/VolleyBallAnimation";
import MarqueeStrip from "@/Component/MarqueeStrip";
import HorseAnimation from "@/Component/HorseAnimation";
import SpeakerSwiper from "@/Component/SpeakerSwiper";
import ArcherScrollAnimation from "@/Component/ArcherScrollAnimation";
import GuruAward from "@/Component/GuruAward";
import AboutSection from "@/Component/AboutSection";
import MediaCoverage from "@/Component/MediaCoverage";
import Highlights from "@/Component/Highlights";
import MattersSection from "@/Component/MattersSection";
// import other components also

export default function Page() {
  return (
    <>
      <Hero />
      <VolleyBallAnimation />
      <MarqueeStrip />
      <HorseAnimation />
      <SpeakerSwiper />
      <ArcherScrollAnimation />
      <GuruAward />
      <AboutSection />
      <MediaCoverage />
      <Highlights />
      <MattersSection />
    </>
  );
}