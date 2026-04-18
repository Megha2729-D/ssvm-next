"use client";

import TitleReveal from "@/Component/TitleReveal";
import "@/app/styles/guruaward.css";
import { useRouter } from "next/navigation";

const BASE_IMAGE_URL = "https://ssvm-new.onrender.com/assets/images/";

export default function GuruAward() {
    const router = useRouter();

    const handleAwardSelect = (category, type = "") => {
        const typeParam = type ? `&type=${type}` : "";
        router.push(`/register?category=${category}${typeParam}`);
    };

    return (
        <div className="guru_award_parent">
            <div className="hero-bg"></div>

            <section className="hero-wrapper">
                <div className="hero">
                    <div className="row">
                        {/* LEFT CONTENT */}
                        <div className="col-lg-7">
                            <div className="hero-text text-white">
                                <div className="eyebrow">
                                    <span className="section-sub-title text-uppercase fw-bold">
                                        <img src={`${BASE_IMAGE_URL}favicon.png`} alt="" />
                                        Celebrating Excellence
                                    </span>
                                </div>

                                <div data-aos="fade-up">
                                    <TitleReveal
                                        text="Inspirational Guru"
                                        className="heading_about text-c1"
                                        style={{ textAlign: "start" }}
                                    />
                                    <TitleReveal
                                        text="Awards"
                                        className="heading_about text-c1"
                                        style={{ textAlign: "start" }}
                                    />

                                    <div className="mt-3">
                                        <p className="hero-subtitle">
                                            While students are the future, educators are the force shaping that future.
                                        </p>
                                        <p className="hero-subtitle">
                                            The Inspirational Guru Awards honour educators who go beyond teaching subjects—and instead shape mindsets, character, and confidence.
                                        </p>

                                        <p className="hero-subtitle">
                                            These are mentors who:
                                        </p>

                                        <ul>
                                            <li>Inspire action, not just understanding</li>
                                            <li>Build resilience, not just knowledge</li>
                                            <li>Influence lives far beyond classrooms</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT IMAGE */}
                        <div className="col-lg-5">
                            <div className="hero-visual">
                                <article className="orbital-card">
                                    <div className="orbital-card-inner">
                                        <img
                                            src={`${BASE_IMAGE_URL}ssvm-guru-award.gif`}
                                            className="w-100"
                                            alt="guru award"
                                        />
                                    </div>
                                </article>
                            </div>
                        </div>

                        {/* BUTTONS */}
                        <div className="col-lg-12 mt-4">
                            <div className="hero-actions d-flex justify-content-between w-100">

                                <div className="d-flex flex-column align-items-center justify-content-center">
                                    <button
                                        onClick={() => handleAwardSelect("guru", "internal")}
                                        className="btn-primary"
                                    >
                                        <span>Register – Internal</span>
                                    </button>
                                    <p className="mt-3 text-white text-center small">
                                        Internal Category – Open to students from SSVM Institutions
                                    </p>
                                </div>

                                <div className="d-flex flex-column align-items-center justify-content-center">
                                    <button
                                        onClick={() => handleAwardSelect("guru", "external")}
                                        className="btn-ghost"
                                    >
                                        <span>Register – External</span>
                                    </button>
                                    <p className="mt-3 text-white text-center small">
                                        External Category – Open to students from other schools and institutions
                                    </p>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}