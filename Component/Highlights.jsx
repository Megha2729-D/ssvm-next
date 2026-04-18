"use client";

import { useEffect, useRef, useState } from "react";
import TitleReveal from "@/Component/TitleReveal";

export default function Highlights({
    videos = [
        "6qpZGsod9dk",
        "d43oTWwyK_g",
        "lA-mD4EEG9Y",
    ],
}) {
    const [index, setIndex] = useState(0);
    const iframeRef = useRef(null);

    useEffect(() => {
        const handleMessage = (event) => {
            if (!event.data) return;

            try {
                const data =
                    typeof event.data === "string"
                        ? JSON.parse(event.data)
                        : event.data;

                if (data.event === "onStateChange" && data.info === 0) {
                    setIndex((prev) => (prev + 1) % videos.length);
                }
            } catch (e) { }
        };

        window.addEventListener("message", handleMessage);
        return () => window.removeEventListener("message", handleMessage);
    }, [videos.length]);

    return (
        <section>
            <div className="py-5 section_container">
                <div data-aos="fade-up" data-aos-delay="200">
                    <TitleReveal
                        text="Past Edition Highlights"
                        className="heading_about text-center text-c1 small_sm_abt_heading"
                    />
                </div>

                <div className="row g-4 mt-4" data-aos="fade-up" data-aos-delay="300">
                    {videos.map((id, i) => (
                        <div className="col-md-4 my-4" key={i}>
                            <iframe
                                ref={i === index ? iframeRef : null}
                                width="100%"
                                height="220"
                                src={`https://www.youtube.com/embed/${id}?enablejsapi=1&rel=0&autoplay=${i === index ? 1 : 0}&mute=1`}
                                title="YouTube video"
                                frameBorder="0"
                                allow="autoplay; encrypted-media"
                                allowFullScreen
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}