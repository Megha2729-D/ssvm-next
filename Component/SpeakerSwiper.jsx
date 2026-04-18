"use client";

import { useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay } from "swiper/modules";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

import "@/app/styles/speakerSwiper.css";
import TitleReveal from "@/Component/TitleReveal";

import "swiper/css";
import "swiper/css/effect-coverflow";

gsap.registerPlugin(ScrollTrigger);

const BASE_IMAGE_URL = "https://ssvm-new.onrender.com/assets/images/";

export default function SpeakerSwiper() {
    const sectionRef = useRef(null);

    const speakers = [
        { img: `/assets/images/speakers.jpeg` },
        { img: `/assets/images/speakers.jpeg` },
        { img: `/assets/images/speakers.jpeg` },
        { img: `/assets/images/speakers.jpeg` },
        { img: `/assets/images/speakers.jpeg` },
        { img: `/assets/images/speakers.jpeg` },
        { img: `/assets/images/speakers.jpeg` },
        { img: `/assets/images/speakers.jpeg` },
        { img: `/assets/images/speakers.jpeg` },
        { img: `/assets/images/speakers.jpeg` },
        { img: `/assets/images/speakers.jpeg` },
        { img: `/assets/images/speakers.jpeg` },
        { img: `/assets/images/speakers.jpeg` },
        { img: `/assets/images/speakers.jpeg` },
        { img: `/assets/images/speakers.jpeg` }
    ];

    useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            ScrollTrigger.create({
                trigger: sectionRef.current,
                start: "top 80%",
                end: "bottom top",
                scrub: true,
                onUpdate: (self) => {
                    const progress = self.progress;
                    const lines =
                        sectionRef.current.querySelectorAll(".main_heading_about");

                    if (progress > 0.23 && progress < 0.9) {
                        const localProgress = (progress - 0.23) / (0.9 - 0.23);

                        lines.forEach((line, lineIndex) => {
                            const letters = line.querySelectorAll(".letter");

                            letters.forEach((letter, i) => {
                                const delay =
                                    lineIndex * 0.2 + i * 0.04;
                                const p = Math.min(
                                    Math.max(localProgress - delay, 0),
                                    1
                                );

                                gsap.set(letter, {
                                    x: (1 - p) * 40,
                                    skewX: (1 - p) * 10,
                                    opacity: p,
                                });
                            });
                        });
                    }
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="section_container speaker_swiper py-5"
            id="speakers"
        >
            {/* TEXT */}
            <div className="row justify-content-center">
                <div className="col-lg-5">
                    <div className="speaker_description_main text-center text-white">
                        <span className="section-sub-title text-uppercase small fw-bold">
                            <img
                                src={`${BASE_IMAGE_URL}favicon.png`}
                                alt="icon"
                            />
                            Voices of Innovation
                        </span>

                        <div data-aos="fade-up">
                            <TitleReveal
                                text="Speakers"
                                className="main_heading_about text-c1"
                            />
                            <p>
                                The SSVM Transforming India Conclave 2026 is a
                                premier gathering of visionary leaders,
                                industry trailblazers, and social entrepreneurs.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* SWIPER */}
            <Swiper
                modules={[EffectCoverflow, Autoplay]}
                effect="coverflow"
                grabCursor={true}
                centeredSlides={true}
                slidesPerView="auto"
                loop={true}
                spaceBetween={50}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                coverflowEffect={{
                    rotate: 0,
                    stretch: 0,
                    depth: 100,
                    modifier: 3,
                    slideShadows: true,
                }}
                className="speakerSwiper"
            >
                {speakers.map((item, index) => (
                    <SwiperSlide key={index} className="speaker-slide">
                        {/* OPTION 1 (Recommended) */}
                        <Image
                            src={item.img}
                            alt="speaker"
                            width={300}
                            height={400}
                            className="w-100"
                        />

                        {/* OPTION 2 (if Image causes config issue) */}
                        {/* <img src={item.img} alt="speaker" /> */}
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
}