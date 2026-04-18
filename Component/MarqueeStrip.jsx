"use client";

import React from "react";

const MarqueeStrip = () => {
    return (
        <section>
            <div className="marquee-strip">
                <div className="marquee-inner">
                    <h2 className="event-strip">
                        <span>September</span>
                        <span className="lit">2026</span>
                        <span>Location:</span>
                        <span className="lit">SSVM World School, Coimbatore</span>
                        <span className="divider">|</span>

                        <span>September</span>
                        <span className="lit">2026</span>
                        <span>Location:</span>
                        <span className="lit">SSVM World School, Coimbatore</span>
                        <span className="divider">|</span>
                    </h2>
                </div>
            </div>
        </section>
    );
};

export default MarqueeStrip;