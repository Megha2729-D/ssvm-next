"use client";

import { useState, useEffect, useRef } from "react";

const BASE_IMAGE_URL = "/assets/images/";

const images = [
    "/assets/images/banner/image-2.jpg",
    "/assets/images/banner/image-3.jpg",
    "/assets/images/banner/image-4.jpg",
    "/assets/images/banner/image-5.jpg",
];

export default function Hero() {
    const [isMobile, setIsMobile] = useState(false);
    const [stackImages, setStackImages] = useState(images);
    const [animating, setAnimating] = useState(false);
    const [hoverImages, setHoverImages] = useState([]);

    const imageIndex = useRef(0);
    const lastPos = useRef({ x: 0, y: 0 });
    const mobileGalleryRef = useRef(null);

    // ✅ Detect mobile
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener("resize", checkMobile);

        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    // ✅ Mobile animation (fly-in)
    useEffect(() => {
        if (!isMobile || !mobileGalleryRef.current) return;

        const cards = mobileGalleryRef.current.querySelectorAll(".stack_card");

        cards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add(index % 2 === 0 ? "fly-left" : "fly-right");
            }, index * 150);
        });

        const totalDelay = (cards.length - 1) * 150 + 600;

        setTimeout(() => {
            mobileGalleryRef.current.classList.add("active");
        }, totalDelay);
    }, [isMobile]);

    // ✅ Desktop hover images
    const handleMouseMove = (e) => {
        if (isMobile) return;

        const distance = Math.hypot(
            e.clientX - lastPos.current.x,
            e.clientY - lastPos.current.y
        );

        if (distance < 200) return;

        lastPos.current = { x: e.clientX, y: e.clientY };

        const newImage = {
            id: Date.now(),
            src: images[imageIndex.current % images.length],
            x: e.clientX,
            y: e.clientY,
        };

        imageIndex.current++;

        setHoverImages((prev) => [...prev, newImage]);

        setTimeout(() => {
            setHoverImages((prev) =>
                prev.filter((img) => img.id !== newImage.id)
            );
        }, 1000);
    };

    // ✅ Swipe
    const touchStartX = useRef(0);
    const touchEndX = useRef(0);

    const handleTouchStart = (e) =>
        (touchStartX.current = e.touches[0].clientX);

    const handleTouchMove = (e) =>
        (touchEndX.current = e.touches[0].clientX);

    const handleTouchEnd = () => {
        const deltaX = touchEndX.current - touchStartX.current;

        if (Math.abs(deltaX) > 50) {
            animateTopCard(deltaX < 0 ? "left" : "right");
        }
    };

    const animateTopCard = (direction) => {
        if (animating) return;
        setAnimating(true);

        const topCard = document.querySelector(".stack_card.top");
        if (!topCard) return;

        topCard.classList.add(
            direction === "left" ? "swipe-left" : "swipe-right"
        );

        setTimeout(() => {
            topCard.classList.remove("swipe-left", "swipe-right");

            setStackImages((prev) => {
                const arr = [...prev];
                const first = arr.shift();
                arr.push(first);
                return arr;
            });

            setAnimating(false);
        }, 400);
    };

    return (
        <section id="home">
            <div className="main_content">
                <div className="top_section">
                    <div className="container">
                        <div className="banner_content_parent">
                            <div className="row justify-content-center pb-4">
                                <div className="col-lg-8">

                                    {/* Top Image */}
                                    <div className="row justify-content-center">
                                        <div className="col-lg-3 col-6 py-3">
                                            <img
                                                src={`${BASE_IMAGE_URL}thug-of-war.gif`}
                                                className="w-100"
                                                alt=""
                                            />
                                        </div>
                                    </div>

                                    {/* Heading */}
                                    <div className="banner_content">
                                        <div
                                            className="anim_heading_wrapper"
                                            onMouseMove={handleMouseMove}
                                        >
                                            <div className="anim_heading">
                                                <img
                                                    src={`${BASE_IMAGE_URL}banner-anim-cont.gif`}
                                                    className="w-100"
                                                    alt=""
                                                />
                                            </div>
                                        </div>

                                        {isMobile && (
                                            <p>
                                                SSVM brings together talent, innovation, and
                                                opportunities to help you build and flex your future.
                                            </p>
                                        )}
                                    </div>

                                    {/* Mobile Cards */}
                                    {isMobile && (
                                        <div
                                            className="mobile_gallery"
                                            ref={mobileGalleryRef}
                                            onTouchStart={handleTouchStart}
                                            onTouchMove={handleTouchMove}
                                            onTouchEnd={handleTouchEnd}
                                        >
                                            {stackImages.map((img, index) => {
                                                let className = "stack_card";
                                                const orderClass = ["top", "second", "third", "fourth"];

                                                if (index < 4) className += ` ${orderClass[index]}`;

                                                return (
                                                    <img key={img} src={img} className={className} />
                                                );
                                            })}
                                        </div>
                                    )}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Desktop floating images */}
            {!isMobile && (
                <div className="hover-images-container">
                    {hoverImages.map((img) => (
                        <img
                            key={img.id}
                            src={img.src}
                            className="floating-img"
                            style={{
                                left: img.x,
                                top: img.y,
                                position: "fixed",
                                pointerEvents: "none",
                                zIndex: 9999,
                            }}
                        />
                    ))}
                </div>
            )}
        </section>
    );
}