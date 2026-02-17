'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { LucideIcon, ArrowRight } from 'lucide-react';
import Image from 'next/image';

interface ServiceCardProps {
    title: string;
    icon: LucideIcon;
    desc: string;
    longDesc: string;
    image: string; // URL
}

export function ServiceCard({ title, icon: Icon, desc, longDesc, image }: ServiceCardProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <motion.div
                    whileHover={{
                        scale: 1.05,
                        rotateX: 5,
                        rotateY: 5,
                        z: 50,
                        boxShadow: "0px 10px 30px rgba(0, 132, 255, 0.2)"
                    }}
                    custom={title} // Just to trigger re-renders if needed
                    className="cursor-pointer perspective-1000"
                    style={{ transformStyle: 'preserve-3d' }}
                >
                    <Card className="bg-slate-950 border-slate-800 h-full overflow-hidden transition-colors hover:border-primary/50">
                        <CardContent className="p-6 flex flex-col h-full bg-slate-950/50 backdrop-blur-sm">
                            <div className="w-12 h-12 bg-slate-900 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
                                <Icon className="w-6 h-6 text-primary" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
                            <p className="text-slate-400 text-sm mb-4 flex-grow">{desc}</p>
                            <div className="mt-auto flex items-center text-primary text-xs font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                                Ver Detalles <ArrowRight className="ml-1 w-3 h-3" />
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </DialogTrigger>
            <DialogContent className="bg-slate-900 border-slate-800 text-white max-w-2xl">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-primary mb-2">{title}</DialogTitle>
                    <DialogDescription className="text-slate-400 text-base">
                        {longDesc}
                    </DialogDescription>
                </DialogHeader>
                <div className="relative w-full h-64 mt-4 rounded-lg overflow-hidden border border-slate-800">
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-700"
                    />
                </div>
                <div className="mt-6 flex justify-end">
                    <Button className="bg-primary hover:bg-primary/90 text-white">
                        Solicitar este servicio
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
