'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Image from 'next/image';

const images = [
    'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=2000&auto=format&fit=crop', // Engine/Mechanic
    'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2000&auto=format&fit=crop', // Modern Car
    'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?q=80&w=2000&auto=format&fit=crop', // Workshop Tools
    'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=2000&auto=format&fit=crop'  // Electronics/Detail
];

export function HeroBackground() {
    const [visibleIndex, setVisibleIndex] = useState(0);

    useEffect(() => {
        // Cycle through images every 5 seconds
        const interval = setInterval(() => {
            setVisibleIndex((prev) => (prev + 1) % images.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="absolute inset-0 z-0 overflow-hidden">
            <div className="absolute inset-0 bg-background/70 z-10" /> {/* Overlay for text readability */}

            {images.map((img, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 50 }} // Slide from right slightly
                    animate={{
                        opacity: index === visibleIndex ? 0.65 : 0,
                        x: index === visibleIndex ? 0 : -50, // Parallax-like movement
                        scale: index === visibleIndex ? 1.05 : 1
                    }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="absolute inset-0"
                >
                    <Image
                        src={img}
                        alt="Background"
                        fill
                        className="object-cover brightness-[1.25]"
                        priority={index === 0}
                    />
                </motion.div>
            ))}
        </div>
    );
}
