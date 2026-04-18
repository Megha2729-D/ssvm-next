"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import "swiper/css";
import TitleReveal from "@/Component/TitleReveal";

export default function MediaCoverage({ slides = [
    {
        id: 1,
        image: "./assets/images/media/Andhra-Jyothi.jpg",
    },
    {
        id: 2,
        image: "./assets/images/media/comail.png",
    },
    {
        id: 3,
        image: "./assets/images/media/Deepika-Emblem.png",
    },
    {
        id: 4,
        image: "./assets/images/media/dinakaran.png",
    },
    {
        id: 5,
        image: "./assets/images/media/dinamalar.png",
    },
    {
        id: 6,
        image: "./assets/images/media/dinamani-logo.webp",
    },
    {
        id: 7,
        image: "./assets/images/media/makkal.jpeg",
    },
    {
        id: 9,
        image: "./assets/images/media/Malai_Murasu.webp",
    },
    {
        id: 10,
        image: "./assets/images/media/malai-malar.webp",
    },
    {
        id: 11,
        image: "./assets/images/media/Malayalamanorama.png",
    },
    {
        id: 12,
        image: "./assets/images/media/Mathrubhumi_English.webp",
    },
    {
        id: 13,
        image: "./assets/images/media/Thanthi.png",
    },
    {
        id: 14,
        image: "./assets/images/media/The-Hindu-Logo.jpg",
    },
    {
        id: 15,
        image: "./assets/images/media/The-Hindu-Tamil.jpg",
    },
    {
        id: 16,
        image: "./assets/images/media/thinathanti.png",
    },
    {
        id: 17,
        image: "./assets/images/media/tm_logo.webp",
    },
    {
        id: 18,
        image: "./assets/images/media/TNIE.webp",
    },
    {
        id: 19,
        image: "./assets/images/media/ttof.png",
    },
] }) {
    return (
        <section className="media_coverage pb-4">
            <div data-aos="fade-up" data-aos-delay="200">
                <TitleReveal
                    text="Media Coverage"
                    className="heading_about text-c1 text-center small_sm_abt_heading"
                />
            </div>

            <div className="pt-4" data-aos="fade-up" data-aos-delay="300">
                <Swiper
                    modules={[Autoplay, FreeMode]}
                    loop={true}
                    freeMode={true}
                    speed={4000}
                    autoplay={{
                        delay: 0,
                        disableOnInteraction: false,
                    }}
                    spaceBetween={50}
                    allowTouchMove={false}
                    breakpoints={{
                        0: { slidesPerView: 2 },
                        480: { slidesPerView: 2 },
                        680: { slidesPerView: 4 },
                        768: { slidesPerView: 5 },
                        1024: { slidesPerView: 5 },
                        1280: { slidesPerView: 6 },
                        1600: { slidesPerView: 6 },
                    }}
                >
                    {slides.map((item) => (
                        <SwiperSlide key={item.id}>
                            <div className="slide-card">
                                <img src={item.image} alt="media" />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}