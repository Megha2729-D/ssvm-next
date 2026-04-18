"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import SplitType from "split-type";
import "@/app/styles/preloader.css";

const Preloader = () => {
    const textRef = useRef(null);

    useLayoutEffect(() => {
        const element = textRef.current;

        // Split text into chars
        const split = new SplitType(element, { types: "chars" });
        const chars = split.chars;

        // Initial state
        gsap.set(chars, {
            opacity: 0,
            x: 120,
            rotation: 10,
            willChange: "transform",
        });

        // Animate
        requestAnimationFrame(() => {
            gsap.to(chars, {
                opacity: 1,
                x: 0,
                rotation: 0,
                duration: 1,
                ease: "power3.out",
                stagger: 0.07,
                force3D: true,
            });
        });

        return () => {
            split.revert();
        };
    }, []);

    return (
        <div className="main-fader">
            <div className="loader w-100">
                <h1 ref={textRef} className="banner_text">
                    Loading...
                </h1>
            </div>
        </div>
    );
};

export default Preloader;