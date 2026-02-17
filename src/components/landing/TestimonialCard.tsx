'use client';

import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { Star, Quote } from 'lucide-react';
import Image from 'next/image';

interface TestimonialCardProps {
    name: string;
    car: string;
    text: string;
    image: string;
    index: number;
}

export function TestimonialCard({ name, car, text, image, index }: TestimonialCardProps) {
    return (
        <div className="h-full">
            <SpotlightCard className="h-full border-white/5 bg-white/5">
                <div className="p-6 flex flex-col h-full relative">
                    {/* Decorative Quote Icon behind */}
                    <Quote className="absolute top-6 right-6 w-12 h-12 text-primary/40 rotate-180" />

                    {/* Header: Avatar + Info */}
                    <div className="flex items-center gap-4 mb-6 relative z-10">
                        <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-primary/20 p-0.5">
                            <div className="w-full h-full rounded-full overflow-hidden relative">
                                <Image
                                    src={image}
                                    alt={name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-foreground">{name}</h3>
                            <p className="text-sm text-primary/80 font-medium">{car}</p>
                        </div>
                    </div>

                    {/* Content: Text */}
                    <div className="flex-grow mb-6 relative z-10">
                        <p className="text-muted-foreground italic leading-relaxed">
                            "{text}"
                        </p>
                    </div>

                    {/* Footer: Stars */}
                    <div className="mt-auto flex gap-1">
                        {[...Array(5)].map((_, j) => (
                            <Star
                                key={j}
                                className="w-4 h-4 fill-primary text-primary"
                            />
                        ))}
                    </div>
                </div>
            </SpotlightCard>
        </div>
    );
}
