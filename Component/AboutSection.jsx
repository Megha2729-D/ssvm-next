"use client";

import Image from "next/image";

const BASE_IMAGE_URL = "https://ssvm-new.onrender.com/assets/images/";

export default function AboutSection() {
    return (
        <section className="about_section py-3" id="about">
            <div className="section_container text-white py-5">
                <div className="about_box">
                    <div className="row g-4 align-items-center">

                        {/* LEFT */}
                        <div className="col-xl-6 d-flex align-items-center">
                            <div className="about__image">
                                <div className="about_img_wrapper">
                                    <Image
                                        src="/assets/images/about-img.jpg"
                                        alt="About SSVM"
                                        fill
                                        className="about_img"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* RIGHT */}
                        <div className="col-xl-6">
                            <div className="about__content ps-lg-4">

                                <span className="section-sub-title fw-bold text-white">
                                    <img src={`${BASE_IMAGE_URL}favicon.png`} alt="" />
                                    About Us
                                </span>

                                <div data-aos="fade-up">
                                    <h2 className="about_heading text-c1">
                                        About SSVM Institutions
                                    </h2>

                                    <p className="mt-4">
                                        SSVM Institutions have consistently stood at the intersection of academic excellence and future-focused education. With a strong belief that education must extend beyond classrooms, SSVM has built a culture that nurtures curiosity, leadership, and real-world thinking.
                                    </p>

                                    <p>
                                        Across campuses, the focus has always been clear: shape individuals who don’t just succeed in exams, but thrive in life. From entrepreneurship and innovation to sports and holistic development, SSVM students are encouraged to explore, experiment, and evolve.
                                    </p>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}