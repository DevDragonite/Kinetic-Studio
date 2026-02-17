'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog';
import Image from 'next/image';

interface BrandCardProps {
    name: string;
    logo?: string; // Currently using text, but supporting logo logic
    desc: string;
    specialties: string[];
    image: string; // Background/Feature image
}

export function BrandCard({ name, desc, specialties, image }: BrandCardProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <motion.div
                    whileHover={{ scale: 1.1, textShadow: "0px 0px 8px rgb(255,255,255)" }}
                    className="cursor-pointer group relative"
                >
                    <h3 className="text-3xl font-bold tracking-widest text-slate-500 group-hover:text-primary transition-colors duration-300">
                        {name.toUpperCase()}
                    </h3>
                </motion.div>
            </DialogTrigger>
            <DialogContent className="bg-slate-900 border-slate-800 text-white max-w-xl">
                <DialogHeader>
                    <DialogTitle className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                        {name} <span className="text-xs text-primary bg-primary/10 px-2 py-1 rounded border border-primary/20">Certified Specialist</span>
                    </DialogTitle>
                    <DialogDescription className="text-slate-400">
                        {desc}
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 mt-4">
                    <div className="relative w-full h-48 rounded-lg overflow-hidden">
                        <Image src={image} alt={name} fill className="object-cover opacity-80" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
                    </div>

                    <div>
                        <h4 className="text-sm font-bold text-white mb-2 uppercase tracking-wider">Servicios Especializados:</h4>
                        <ul className="grid grid-cols-2 gap-2">
                            {specialties.map((spec, i) => (
                                <li key={i} className="flex items-center text-sm text-slate-300">
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
