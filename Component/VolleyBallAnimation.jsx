"use client";

import { useEffect, useRef } from "react";
import lottie from "lottie-web";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TitleReveal from "@/Component/TitleReveal";
import "@/app/styles/volleyball.css";

gsap.registerPlugin(ScrollTrigger);

const VolleyBallAnimation = () => {
    const lottieContainer = useRef(null);
    const sectionRef = useRef(null);
    const bottomTextRef = useRef(null);
    const middleTextRef = useRef(null);
    const centerTextRef = useRef(null);

    useEffect(() => {
        let animation;
        let trigger;

        const isMobile = window.innerWidth < 768;

        if (isMobile) {
            gsap.set(bottomTextRef.current, { opacity: 1 });
            gsap.set(middleTextRef.current, { opacity: 1 });
            gsap.set(centerTextRef.current, { opacity: 1 });
            return;
        }

        const init = async () => {
            const res = await fetch("/assets/json/volleyball_desktop.json");
            const animationData = await res.json();

            animation = lottie.loadAnimation({
                container: lottieContainer.current,
                renderer: "svg",
                loop: false,
                autoplay: false,
                animationData,
            });

            animation.addEventListener("DOMLoaded", () => {
                const totalFrames = animation.totalFrames;

                gsap.set(bottomTextRef.current, { opacity: 1 });
                gsap.set(middleTextRef.current, { opacity: 0, y: 60 });
                gsap.set(centerTextRef.current, { opacity: 0, scale: 0.1 });

                trigger = ScrollTrigger.create({
                    trigger: sectionRef.current,
                    start: "top top",
                    end: () => "+=" + window.innerHeight * 1.8,
                    scrub: true,
                    pin: true,
                    pinSpacing: true,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,

                    onUpdate: (self) => {
                        const progress = self.progress;
                        const frame = Math.min(
                            totalFrames - 1,
                            Math.floor(progress * totalFrames)
                        );

                        animation.goToAndStop(frame, true);

                        // Bottom text
                        gsap.to(bottomTextRef.current, {
                            opacity: progress > 0.5 ? 0 : 1,
                            duration: 0.3,
                            overwrite: true,
                        });

                        // Middle text
                        gsap.to(middleTextRef.current, {
                            opacity: progress > 0.6 && progress < 0.8 ? 1 : 0,
                            y: progress > 0.6 ? 0 : 60,
                            duration: 0.3,
                            overwrite: true,
                        });

                        // Center text
                        gsap.to(centerTextRef.current, {
                            opacity: progress > 0.85 ? 1 : 0,
                            scale: progress > 0.85 ? 1 : 0.1,
                            duration: 0.3,
                            overwrite: true,
                        });

                        gsap.to(sectionRef.current, {
                            backgroundColor: progress > 0.9 ? "#F2FF33" : "", duration: 0.4,
                        });
                    },

                    onLeave: () => {
                        animation.goToAndStop(totalFrames - 1, true);
                    },
                });

                ScrollTrigger.refresh();
            });
        };

        init();

        return () => {
            if (animation) animation.destroy();
            if (trigger) trigger.kill();
            ScrollTrigger.getAll().forEach((t) => t.kill());
        };
    }, []);

    return (
        <section ref={sectionRef} className="basket-section h-100">

            <div className="basket-wrapper">
                <div ref={lottieContainer} className="basket-lottie"></div>
            </div>

            <div className="volleyball_anim_content">

                {/* Bottom */}
                <div ref={bottomTextRef} className="bottom-text d-none d-md-block">
                    <TitleReveal
                        text="Shape Tomorrow Through Action"
                        className="heading_about text-c1 small_sm_abt_heading"
                    />
                </div>

                {/* Middle */}
                <div ref={middleTextRef} className="middle-text d-none d-md-flex">
                    <TitleReveal text="SSVM Transforming" className="heading_about" />
                    <TitleReveal text="India Conclave" className="heading_about" />
                    <TitleReveal text="2026" className="heading_about" />
                </div>

                {/* Center */}
                <div ref={centerTextRef} className="center-text">
                    <div className="row justify-content-center">

                        <div className="col-lg-6">
                            <img src="/assets/images/ssvm-founder-anim.gif" className="w-100" alt="" />
                        </div>

                        <div className="col-lg-12 text-center">
                            <h2 className="main_heading_about">Dr. Manimekalai Mohan</h2>
                            <h2 className="main_heading_about">Founder, SSVM Institutions</h2>
                        </div>

                    </div>
                </div>

            </div>
        </section>
    );
};

export default VolleyBallAnimation;