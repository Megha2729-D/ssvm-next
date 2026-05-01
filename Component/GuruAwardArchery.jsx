"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import lottie from "lottie-web";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import TitleReveal from "./TitleReveal";
import "@/app/styles/archer.css";
import "@/app/styles/guruaward.css";
import "@/app/styles/GuruAwardArchery.css";

gsap.registerPlugin(ScrollTrigger);

const BASE_IMAGE_URL = "https://www.ssvmtransformingindia.com/assets/images/";

export default function GuruAwardArchery() {
    const lottieRef = useRef(null);
    const sectionRef = useRef(null);
    const headingRef = useRef(null);
    const textRef = useRef(null);
    const animRef = useRef(null);

    useEffect(() => {
        if (!lottieRef.current) return;

        let scrollTrigger;

        const init = async () => {
            const isMobile = window.innerWidth < 768;

            const path = isMobile
                ? "/assets/json/archer_mobile.json"
                : "/assets/json/archer_desktop.json";

            const res = await fetch(path);
            const data = await res.json();

            animRef.current = lottie.loadAnimation({
                container: lottieRef.current,
                renderer: "svg",
                loop: isMobile,
                autoplay: isMobile,
                animationData: data,
            });
            animRef.current.addEventListener("DOMLoaded", () => {

                // ✅ Force layout calculation
                document.body.getBoundingClientRect();

                // ✅ Delay to ensure DOM + styles are ready
                setTimeout(() => {

                    ScrollTrigger.refresh();

                    if (!isMobile) {
                        const totalFrames = animRef.current.totalFrames;

                        scrollTrigger = ScrollTrigger.create({
                            trigger: sectionRef.current,
                            start: "top top",
                            end: "+=250%",
                            scrub: true,
                            pin: true,
                            pinType: "fixed",          // ⭐ IMPORTANT FIX
                            anticipatePin: 1,

                            onUpdate: ({ progress }) => {
                                const frame = totalFrames * progress;
                                animRef.current.goToAndStop(frame, true);

                                // Heading
                                gsap.to(headingRef.current, {
                                    opacity: progress > 0.1 ? 0 : 1,
                                    y: progress > 0.1 ? -20 : 0,
                                    duration: 0.3,
                                    overwrite: true,
                                });

                                // Text
                                gsap.to(textRef.current, {
                                    opacity: progress > 0.4 ? 1 : 0,
                                    y: progress > 0.4 ? 0 : 40,
                                    duration: 0.5,
                                    overwrite: true,
                                });
                            },

                            onLeave: () => {
                                animRef.current.goToAndStop(totalFrames - 1, true);
                            },
                        });

                        // ✅ FINAL refresh after setup
                        ScrollTrigger.refresh();
                    }

                }, 200); // ⏱ small delay fixes 90% of Next issues
            });
        };

        init();

        return () => {
            animRef.current?.destroy();
            scrollTrigger?.kill();
        };
    }, []);

    const handleAwardSelect = (category, type = "") => {
        const typeParam = type ? `&type=${type}` : "";
        router.push(`/register?category=${category}${typeParam}`);
    };

    return (
        <section
            ref={sectionRef}
            className="guru_award_archery archer-wrapper"
            id="awards"
        >
            <div ref={headingRef} className="archery_main_heading">
                <span className="section-sub-title text-uppercase fw-bold">
                    <Image
                        src={`${BASE_IMAGE_URL}favicon.png`}
                        alt="SSVM"
                        width={24}
                        height={24}
                    />
                    Awards
                </span>

                <TitleReveal
                    text="Honoring Authentic Excellence"
                    className="reveal_heading text-c1 mt-2"
                />
            </div>

            <div className="w-100">
                <div className="archer-section top-0">
                    <div ref={lottieRef} className="lottie-container" />
                </div>

                <div className="archery_anim_content">
                    <div ref={textRef} className="archer-text">
                        <Image
                            src={`${BASE_IMAGE_URL}ssvm-guru-award.gif`}
                            alt="SSVM Guru Award"
                            width={500}
                            height={500}
                            unoptimized
                        />

                        <div data-aos="fade-up">
                            <TitleReveal
                                text="Inspirational Guru Awards 2026"
                                className="reveal_heading text-c1"
                            />

                            <p>
                                While students are the future, educators are the force shaping
                                that future. The Inspirational Guru Awards honour educators who
                                go beyond teaching subjects—and instead shape mindsets,
                                character, and confidence.
                            </p>

                            <div className="col-lg-12 guru_award_parent">
                                <div className="d-flex flex-lg-row flex-column justify-content-between w-100">
                                    <div className="d-flex flex-column align-items-center justify-content-center mt-lg-0 mt-2">
                                        <button
                                            onClick={() => handleAwardSelect("guru", "internal")}
                                            className="btn-primary"
                                        >
                                            <span>Register – Internal</span>
                                        </button>
                                        <small className="mt-3 px-2 text-white text-center small">
                                            Internal Category – Open to teachers from SSVM Institutions
                                        </small>
                                    </div>

                                    <div className="mt-lg-0 mt-4 d-flex flex-column align-items-center justify-content-center">
                                        <button
                                            onClick={() =>
                                                handleAwardSelect("guru", "external")
                                            }
                                            className="btn-ghost"
                                        >
                                            <span>Register – External</span>
                                        </button>
                                        <small className="mt-3 px-2 text-white text-center small">
                                            External Category – Open to teachers from other schools and
                                            institutions
                                        </small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
