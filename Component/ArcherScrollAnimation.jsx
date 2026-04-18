"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import lottie from "lottie-web";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TitleReveal from "@/Component/TitleReveal";
import "@/app/styles/archer.css";

gsap.registerPlugin(ScrollTrigger);

export default function ArcherScrollAnimation() {
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

    return (
        <section ref={sectionRef} className="archer-wrapper" id="awards">

            {/* Heading */}
            <div ref={headingRef} className="archery_main_heading">
                <span className="section-sub-title text-uppercase fw-bold">
                    <img src="/assets/images/favicon.png" alt="" />
                    Awards
                </span>

                <TitleReveal
                    text="Recognising True Excellence"
                    className="reveal_heading text-c1 mt-2"
                />
            </div>

            {/* Lottie */}
            <div className="archer-section">
                <div ref={lottieRef} className="lottie-container"></div>
            </div>

            {/* Content */}
            <div className="archery_anim_content">
                <div ref={textRef} className="archer-text">
                    <img src="/assets/images/ssvm-student-award.gif" alt="" />

                    <TitleReveal text="Studentpreneur Awards 2026" className="reveal_heading text-c1" />
                    <p>The Studentpreneur Awards is an initiative that encourages students to start thinking and acting like entrepreneurs early. It gives them a platform to showcase ideas they are actively working on and motivates them to take action instead of just thinking. The goal is to build confidence, real-world skills, and a mindset of creating and solving problems from a young age.</p>

                    <Link href="/studentpreneur-award">
                        <button className="btn-primary ssvm_reg_butt">
                            Register
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    );
}