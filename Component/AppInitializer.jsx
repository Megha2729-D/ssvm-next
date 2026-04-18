"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const APP_VERSION = "1.0.5";

export default function AppInitializer() {
    useEffect(() => {
        /* ✅ Scroll refresh */
        const refreshAll = () => {
            document.body.getBoundingClientRect();
            ScrollTrigger.refresh();

            if (window.AOS) window.AOS.refresh();
        };

        window.addEventListener("load", () => {
            setTimeout(refreshAll, 500);
            setTimeout(refreshAll, 1500);
        });

        const resizeObserver = new ResizeObserver(() => {
            requestAnimationFrame(refreshAll);
        });

        resizeObserver.observe(document.body);

        [1000, 3000, 5000, 10000].forEach((delay) => {
            setTimeout(refreshAll, delay);
        });

        /* ✅ Version check */
        const savedVersion = localStorage.getItem("ssvm_version");

        if (!savedVersion) {
            localStorage.setItem("ssvm_version", APP_VERSION);
        } else if (savedVersion !== APP_VERSION) {
            console.log("New version detected. Clearing cache...");

            localStorage.setItem("ssvm_version", APP_VERSION);
            window.location.reload();
        }

        /* ✅ bfcache fix */
        const handlePageShow = (event) => {
            if (event.persisted) window.location.reload();
        };

        window.addEventListener("pageshow", handlePageShow);

        return () => {
            window.removeEventListener("pageshow", handlePageShow);
            resizeObserver.disconnect();
        };
    }, []);

    return null;
}