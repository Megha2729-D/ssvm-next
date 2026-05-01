"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import SplitType from "split-type";

export default function PreloaderTextReveal({
    text,
    className = "",
    style = {},
}) {
    const textRef = useRef(null);

    useLayoutEffect(() => {
        if (!textRef.current) return;

        const split = new SplitType(textRef.current, {
            types: "chars",
        });

        const chars = split.chars;

        gsap.set(chars, {
            opacity: 0,
            x: 120,
            rotation: 10,
            willChange: "transform, opacity",
        });

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
    }, [text]);

    return (
        <div style={{ overflow: "hidden" }}>
            <h1 ref={textRef} className={className} style={style}>
                {text}
            </h1>
        </div>
    );
}
