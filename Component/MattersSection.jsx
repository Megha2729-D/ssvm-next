"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import TitleReveal from "@/Component/TitleReveal";
import "@/app/styles/matters.css";

gsap.registerPlugin(ScrollTrigger);

const MattersSection = () => {
    const sectionRef = useRef(null);
    const containerRef = useRef(null);

    const [isMobile, setIsMobile] = useState(false);

    // ✅ Detect screen size safely (client only)
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener("resize", checkMobile);

        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            // Background parallax (desktop only)
            if (!isMobile) {
                gsap.to(".matters-bg-text", {
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 1,
                    },
                    x: -200,
                    opacity: 0.1,
                });
            }

            // Cards animation
            // gsap.from(".matter-card", {
            //     scrollTrigger: {
            //         trigger: containerRef.current,
            //         start: isMobile ? "top 90%" : "top 80%",
            //         toggleActions: "play none none none",
            //     },
            //     y: 50,
            //     opacity: 0,
            //     duration: 0.8,
            //     stagger: isMobile ? 0.1 : 0.2,
            //     ease: "power3.out",
            // });

        }, sectionRef);

        return () => ctx.revert();
    }, [isMobile]);

    const values = [
        {
            title: "Expose",
            text: "Expose students to real-world thinking early",
            icon: "bi-lightbulb",
            color: "#F2FF33"
        },
        {
            title: "Encourage",
            text: "Encourage independent, bold decision-making",
            icon: "bi-rocket-takeoff",
            color: "#ffffff"
        },
        {
            title: "Bridge",
            text: "Bridge the gap between education and execution",
            icon: "bi-link-45deg",
            color: "#F2FF33"
        },
        {
            title: "Recognise",
            text: "Recognise effort, initiative, and progress",
            icon: "bi-trophy",
            color: "#ffffff"
        }
    ];

    return (
        <section
            ref={sectionRef}
            className="matters_section py-4 position-relative overflow-hidden"
            style={{
                minHeight: isMobile ? "auto" : "100vh",
                display: "flex",
                alignItems: "center",
                padding: isMobile ? "60px 0" : "0"
            }}
        >

            {/* Background Text */}
            {!isMobile && (
                <div className="matters-bg-text position-absolute w-100 text-nowrap">
                    CONCLAVE MATTERS
                </div>
            )}

            <div className="section_container position-relative">
                <div className="row justify-content-center mb-lg-5">
                    <div className="col-lg-10 text-center">
                        <span className="section-sub-title text-uppercase text-white small fw-bold mb-3 d-block">
                            Why It Matters
                        </span>

                        <TitleReveal text="Why This Conclave" className="heading_about text-c1" />
                        <TitleReveal text="Matters" className="heading_about text-c1" />

                        <p className="lead text-white-50 mx-auto">
                            Most platforms <b>talk to students</b>. <br />
                            This one <span style={{ color: "#F2FF33" }}>builds with them</span>.
                        </p>
                    </div>
                </div>

                <div ref={containerRef} className="row g-4 mt-4 justify-content-center">
                    {values.map((item, index) => (
                        <div key={index} className="col-lg-3 col-md-6 col-11" data-aos="fade-up">
                            <div className="matter-card p-4">
                                <div className="icon-wrapper mb-lg-4 mb-3 d-inline-flex align-items-center justify-content-center" style={{
                                    width: isMobile ? "50px" : "60px",
                                    height: isMobile ? "50px" : "60px",
                                    borderRadius: "16px",
                                    backgroundColor: index % 2 === 0 ? "rgba(242,255,51,0.1)" : "rgba(255,255,255,0.05)",
                                    color: item.color,
                                    fontSize: isMobile ? "1.2rem" : "1.5rem"
                                }}>
                                    <i className={`bi ${item.icon}`}></i>
                                </div>

                                <TitleReveal text={item.title} className="text-c1 mb-2" />

                                <p className="text-white-50">{item.text}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="row mt-5 justify-content-center">
                    <div className="col-lg-8 text-center">
                        <div className="matter_tag p-lg-4 p-3 mt-4 rounded-4">
                            <p className="text-white mb-0">
                                If students are expected to shape the future,
                                they need platforms that treat them like they already can.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    );
};

export default MattersSection;