"use client";

import React, { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import PreloaderTextReveal from "./PreloaderTextReveal";
import "@/app/styles/StudentpreneurAward.css";

gsap.registerPlugin(ScrollTrigger);

const BASE_IMAGE_URL = "https://www.ssvmtransformingindia.com/assets/images/";

const sectionsData = [
    {
        title: "Sports & Performance",
        desc: [
            "Wearables or apps that track recovery, sleep, and readiness for young athletes",
            "AI-powered coaching tools that adapt training plans based on performance data",
            "Platforms that connect amateur sports players to local coaches or training partners",
            "Injury prevention tools using movement analysis",
        ],
    },
    {
        title: "Mental Wellness",
        desc: [
            "Stress and anxiety management tools designed specifically for students",
            "Gamified meditation or breathwork experiences for teenagers",
            "Peer support platforms that combine community with mental health resources",
            "Tools that help students identify and manage performance anxiety before exams or competitions",
        ],
    },
    {
        title: "Nutrition & Food",
        desc: [
            "Affordable, healthy meal planning services tailored for school-going teens",
            "Healthy snack brands designed for students: low sugar, high protein, school-friendly",
            "Apps that decode food labels in simple, relatable language for young consumers",
            "Subscription models for nutritious snacks targeting school canteens or hostels",
            "Platforms connecting local farmers to school kitchens for fresher, healthier meals",
            "Farmer-to-family models delivering fresh, whole foods to urban households",
        ],
    },
    {
        title: "Accessibility & Inclusion",
        desc: [
            "Adaptive sports programs or equipment for differently-abled students",
            "Low-cost fitness solutions for underserved communities without gym access",
            "Making sports accessible to girls in underserved communities",
            "Subsidised nutrition programs for underfed student athletes",
            "Vernacular-language wellness content for first-generation health-conscious youth",
            "A rental model for sports gear so cost is no barrier to participation",
        ],
    },
    {
        title: "Services & Experiences",
        desc: [
            "After-school fitness coaching programs for younger children run by teens",
            "Yoga, breathwork, or mindfulness sessions delivered in schools or communities",
            "Personal training or group fitness services for working parents or seniors",
            "Sports camps that combine physical training with mental resilience workshops",
            "Ergonomic study and posture products that reduce physical strain",
            "Herbal or natural recovery balms, drinks, or supplements rooted in traditional Indian wellness",
        ],
    },
    {
        title: "Social Expertises",
        desc: [
            "Community gardens that supply fresh produce to school kitchens",
            "Training local women as certified fitness or wellness coaches",
            "Programmes that bring lesser-known traditional Indian sports back into schools",
            "Peer-led running clubs, cycling groups, or sports collectives in schools",
            "Tournaments or challenges designed to promote physical activity and inclusion",
        ],
    },
    {
        title: "Behavioural & Habit Science",
        desc: [
            "Habit-stacking tools that make healthy routines stick for teenagers",
            "Social fitness challenges designed around school or friend groups",
            "Reward-based platforms that incentivise movement, hydration, or sleep consistency",
            "Local wellness festivals or sports leagues that bring neighbourhoods together",
        ],
    },
];

export default function StudentpreneurAward() {
    const router = useRouter();
    const containerRef = useRef(null);
    const footerRef = useRef(null);

    const handleAwardSelect = (category, type = "") => {
        const typeParam = type ? `&type=${type}` : "";
        router.push(`/register?category=${category}${typeParam}`);
    };

    useEffect(() => {
        const ctx = gsap.context(() => {
            const sections = gsap.utils.toArray(".sp-section");
            const images = gsap.utils.toArray(".sp-bg");
            const outer = gsap.utils.toArray(".sp-outer");
            const inner = gsap.utils.toArray(".sp-inner");

            const tl = gsap.timeline({
                defaults: { duration: 1.2, ease: "power2.inOut" },
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "+=5000",
                    scrub: 1,
                    pin: true,
                },
            });

            gsap.set(outer, { yPercent: 100 });
            gsap.set(inner, { yPercent: -100 });

            sections.forEach((section, i) => {
                tl.to([outer[i], inner[i]], {
                    yPercent: 0,
                })
                    .fromTo(
                        images[i],
                        { yPercent: 15, scale: 1.2 },
                        { yPercent: 0, scale: 1 },
                        "<"
                    )
                    .from(
                        section.querySelector(".sp-content"),
                        {
                            y: 60,
                            opacity: 0,
                        },
                        "<0.2"
                    );
            });

            const cta = document.querySelector(".fixed-cta");

            ScrollTrigger.create({
                trigger: footerRef.current,
                start: "top bottom",
                onEnter: () => cta?.classList.add("is-fixed"),
                onLeaveBack: () => cta?.classList.remove("is-fixed"),
            });
        }, containerRef);

        return () => {
            ctx.revert();
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, []);

    return (
        <div className="student_award_sec">
            <div className="sp-container" ref={containerRef}>
                <div className="section-container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8 d-flex align-items-center">
                            <div className="intro-content text-white text-center">
                                <PreloaderTextReveal
                                    text="Areas of Inspiration"
                                    className="heading_about text-center text-c1"
                                    style={{ display: "block" }}
                                />

                                <p className="mt-4">
                                    Your venture doesn't need to be a technology product. A physical
                                    product, a service, a community initiative, or a social
                                    enterprise counts just as much.
                                </p>
                                <p>Here are some areas to spark your thinking:</p>
                            </div>
                        </div>
                    </div>
                </div>

                {sectionsData.map((item, i) => (
                    <section className={`sp-section section-${i}`} key={i}>
                        <div className="sp-outer">
                            <div className="sp-inner">
                                <div className="sp-bg">
                                    <div className="sp-content">
                                        <h2>{item.title}</h2>
                                        <ul>
                                            {item.desc.map((point, idx) => (
                                                <li key={idx}>{point}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                ))}
            </div>

            <div
                ref={footerRef}
                className="row justify-content-center align-items-center my-4 my-lg-0 px-2"
            >
                <div className="col-lg-6">
                    <div className="d-flex justify-content-center align-items-center">
                        <p className="fw-bold text-center mt-3 text-white">
                            The strongest ideas will often sit at the crossover between two or
                            more of these areas: for instance, mental wellness through sport,
                            or nutrition as performance fuel for academic success. Teams whose
                            ventures reflect the Flex Your Future spirit will find themselves
                            at the heart of the conversation at SSVM Transforming India
                            Conclave '26.
                        </p>
                    </div>
                </div>
            </div>

            <div className="cta-wrapper mb-5">
                <div className="fixed-cta guru_award_parent">
                    <div className="row">
                        <div className="col-lg-6 d-flex flex-column justify-content-center align-items-center">
                            <button
                                onClick={() =>
                                    handleAwardSelect("studentpreneur", "internal")
                                }
                                className="btn-primary"
                            >
                                <span>Register – Internal</span>
                            </button>
                            <p className="mb-0 text-white text-center small mt-2">
                                Internal Category – Open to students from SSVM Institutions
                            </p>
                        </div>

                        <div className="col-lg-6 mt-lg-0 mt-4 d-flex flex-column justify-content-center align-items-center">
                            <button
                                onClick={() =>
                                    handleAwardSelect("studentpreneur", "external")
                                }
                                className="btn-ghost"
                            >
                                <span>Register – External</span>
                            </button>
                            <p className="mb-0 text-white text-center small mt-2">
                                External Category – Open to students from other schools and
                                institutions
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}