'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { LucideIcon, ArrowRight } from 'lucide-react';
import Image from 'next/image';

import { SpotlightCard } from '@/components/ui/SpotlightCard';

import { useTranslations } from 'next-intl';

interface ServiceCardProps {
    title: string;
    icon: LucideIcon;
    desc: string;
    longDesc: string;
    image: string; // URL
}

export function ServiceCard({ title, icon: Icon, desc, longDesc, image }: ServiceCardProps) {
    const t = useTranslations('Navigation');

    return (
        <Dialog>
            <DialogTrigger asChild>
                <motion.div
                    whileHover={{
                        scale: 1.05,
                        rotateX: 5,
                        rotateY: 5,
                        z: 50,
                    }}
                    custom={title} // Just to trigger re-renders if needed
                    className="cursor-pointer perspective-1000 h-full"
                    style={{ transformStyle: 'preserve-3d' }}
                >
                    <SpotlightCard className="h-full border-white/5 bg-white/5">
                        <div className="p-6 flex flex-col h-full">
                            <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                                <Icon className="w-6 h-6 text-primary" />
                            </div>
                            <h3 className="text-xl font-bold text-foreground mb-2">{title}</h3>
                            <p className="text-muted-foreground text-sm mb-4 flex-grow">{desc}</p>
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
                            alt={title}
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent md:bg-gradient-to-r" />
                        <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8 z-10">
                            <h2 className="text-2xl md:text-3xl font-bold text-white mb-1">{title}</h2>
                            <div className="h-1 w-12 bg-primary rounded-full" />
                        </div>
                    </div>

                    {/* Content Section - Right on Desktop, Bottom on Mobile */}
                    <div className="p-6 md:p-8 flex flex-col h-full bg-card/95 backdrop-blur-sm">
                        <DialogHeader className="mb-4">
                            <DialogTitle className="sr-only">{title}</DialogTitle> {/* Hidden accessibly as title is on image now */}
                        </DialogHeader>

                        <div className="flex-grow overflow-y-auto max-h-[60vh] md:max-h-[none] pr-2 custom-scrollbar">
                            <DialogDescription className="text-muted-foreground text-base leading-relaxed">
                                {longDesc}
                            </DialogDescription>
                        </div>

                        <div className="mt-6 pt-4 border-t border-border flex justify-end">
                            <Button className="bg-primary hover:bg-primary/90 text-white w-full md:w-auto transform transition-transform active:scale-95 shadow-[0_0_15px_rgba(255,77,0,0.3)]">
                                {t('requestService')} <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
