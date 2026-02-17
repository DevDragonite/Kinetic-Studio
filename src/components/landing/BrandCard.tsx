'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog';
import { LucideIcon, ArrowRight } from 'lucide-react';
import Image from 'next/image';

import { useTranslations } from 'next-intl';

import { SpotlightCard } from '@/components/ui/SpotlightCard';

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
                    whileHover={{ scale: 1.05 }}
                    className="cursor-pointer group relative flex flex-col items-center h-full"
                >
                    <SpotlightCard className="h-full border-white/5 bg-white/5">
                        <div className="p-4 md:p-6 flex flex-col h-full">
                            <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                                {logo ? (
                                    <div className="relative w-8 h-8">
                                        <Image src={logo} alt={name} fill className="object-contain opacity-80 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                ) : (
                                    <img src={origin} alt="Flag" className="w-8 h-auto object-cover rounded shadow-sm opacity-80 group-hover:opacity-100" />
                                )}
                            </div>
                            <h3 className="text-xl font-bold text-foreground mb-2">{name}</h3>
                            <p className="text-muted-foreground text-xs md:text-sm mb-4 flex-grow flex items-center gap-2">
                                {origin && <img src={origin} alt="Flag" className="w-4 h-auto rounded-[1px] opacity-70" />}
                                <span className="text-primary/50">•</span> {technicalLabel}
                            </p>
                            <div className="mt-auto flex items-center text-primary text-xs font-bold uppercase tracking-wider opacity-80 group-hover:opacity-100 transition-opacity">
                                {t('viewDetails')} <ArrowRight className="ml-1 w-3 h-3" />
                            </div>
                        </div>
                    </SpotlightCard>
                </motion.div>
            </DialogTrigger>
            <DialogContent className="bg-card border-border text-foreground max-w-4xl p-0 overflow-hidden sm:rounded-2xl">
                <div className="grid md:grid-cols-2 h-full">
                    {/* Image Section - Left on Desktop, Top on Mobile */}
                    <div className="relative w-full h-48 md:h-auto bg-muted">
                        <Image
                            src={image}
                            alt={name}
                            fill
                            className={`object-${imageFit}`}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent md:bg-gradient-to-r" />
                        <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8 z-10">
                            <h2 className="text-2xl md:text-3xl font-bold text-white mb-1">{name}</h2>
                            <div className="h-1 w-12 bg-primary rounded-full" />
                        </div>
                    </div>

                    {/* Content Section - Right on Desktop, Bottom on Mobile */}
                    <div className="p-6 md:p-8 flex flex-col h-full bg-card/95 backdrop-blur-sm">
                        <DialogHeader className="mb-4">
                            <div className="flex justify-between items-start">
                                <div>
                                    <DialogTitle className="sr-only">{name}</DialogTitle>
                                    {logo && (
                                        <div className="relative w-16 h-16 bg-white/10 rounded-lg p-2 mb-2">
                                            <Image src={logo} alt={name} fill className="object-contain" />
                                        </div>
                                    )}
                                </div>
                                {origin && (
                                    <img
                                        src={origin}
                                        alt="Origin Flag"
                                        className="w-8 h-auto rounded shadow-sm opacity-90"
                                    />
                                )}
                            </div>
                        </DialogHeader>

                        <div className="flex-grow overflow-y-auto max-h-[60vh] md:max-h-[none] pr-2 custom-scrollbar">
                            <DialogDescription className="text-muted-foreground text-sm leading-relaxed mb-6">
                                {desc}
                            </DialogDescription>

                            <div className="bg-muted/30 p-4 rounded-lg border border-border/50">
                                <h4 className="text-xs font-bold text-primary mb-3 uppercase tracking-wider flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                                    {technicalLabel}
                                </h4>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4">
                                    {specialties.map((spec, i) => (
                                        <li key={i} className="flex items-center text-xs md:text-sm text-foreground/80">
                                            <span className="w-1 h-1 bg-primary/50 rounded-full mr-2" />
                                            {spec}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="mt-6 pt-4 border-t border-border flex justify-end">
                            <p className="text-xs text-muted-foreground italic flex items-center">
                                <span className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                                {t('viewDetails')}
                            </p>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
