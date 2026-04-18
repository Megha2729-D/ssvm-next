"use client";

import { useEffect, useState } from "react";

// Components
import Navbar from "@/Component/Navbar";
import Footer from "@/Component/Footer";
import CustomCursor from "@/Component/CustomCursor";
import Preloader from "@/Component/Preloader";

// Animations
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AOS from "aos";
import "aos/dist/aos.css";

export default function ClientLayout({ children }) {
    const [loading, setLoading] = useState(true);

    // Bootstrap JS
    useEffect(() => {
        import("bootstrap/dist/js/bootstrap.bundle.min.js");
    }, []);

    // Preloader
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
            document.body.style.overflow = "auto";
        }, 500);

        document.body.style.overflow = "hidden";

        return () => clearTimeout(timer);
    }, []);

    // AOS
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: false,
        });
    }, []);

    // GSAP
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        gsap.config({
            autoSleep: 60,
            force3D: true,
        });

        ScrollTrigger.config({
            ignoreMobileResize: true,
        });
    }, []);

    return (
        <>
            {loading && <Preloader />}

            <CustomCursor />
            <Navbar />

            <main className="flex-1">{children}</main>

            <Footer />
        </>
    );
}