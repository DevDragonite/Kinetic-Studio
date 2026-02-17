'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog';
import Image from 'next/image';

import { useTranslations } from 'next-intl';

interface BrandCardProps {
    name: string;
    logo?: string;
    origin?: string;
    desc: string;
    specialties: string[];
    image: string; // Background/Feature image
    technicalLabel: string;
    imageFit?: "cover" | "contain";
}

export function BrandCard({ name, logo, origin, desc, specialties, image, technicalLabel, imageFit = "cover" }: BrandCardProps) {
    const t = useTranslations('Navigation');

    return (
        <Dialog>
            <DialogTrigger asChild>
                <motion.div
                    whileHover={{ scale: 1.15, textShadow: "0px 0px 8px rgb(255,255,255)" }}
                    className="cursor-pointer group relative flex flex-col items-center"
                >
                    <h3 className="text-3xl font-bold tracking-widest text-muted-foreground group-hover:text-primary transition-colors duration-300">
                        {name.toUpperCase()}
                    </h3>
                    <p className="text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity mt-2 font-mono uppercase">
                        {t('viewDetails')}
                    </p>
                </motion.div>
            </DialogTrigger>
            <DialogContent className="bg-card border-border text-foreground max-w-xl">
                <DialogHeader>
                    <div className="flex justify-between items-start">
                        <DialogTitle className="text-3xl font-bold text-foreground mb-2 flex flex-col gap-1">
                            {name}
                            {origin && <span className="text-sm font-normal text-muted-foreground">{origin}</span>}
                        </DialogTitle>
                        {logo && (
                            <div className="relative w-16 h-16 bg-white/10 rounded-full p-2">
                                <Image src={logo} alt={name} fill className="object-contain p-2" />
                            </div>
                        )}
                    </div>
                    <DialogDescription className="text-muted-foreground mt-4">
                        {desc}
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 mt-4">
                    <div className="relative w-full h-48 rounded-lg overflow-hidden border border-border bg-black/40">
                        <Image src={image} alt={name} fill className={`p-2 opacity-90 hover:scale-105 transition-transform duration-700 object-${imageFit}`} />
                    </div>

                    <div className="bg-card/50 p-4 rounded-lg border border-border">
                        <h4 className="text-sm font-bold text-primary mb-3 uppercase tracking-wider">{technicalLabel}:</h4>
                        <ul className="grid grid-cols-2 gap-y-2 gap-x-4">
                            {specialties.map((spec, i) => (
                                <li key={i} className="flex items-center text-sm text-foreground/80">
                                    <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
                                    {spec}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
