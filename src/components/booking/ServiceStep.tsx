'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Wrench, Stethoscope } from 'lucide-react';

interface ServiceStepProps {
    onNext: (service: string) => void;
    onBack: () => void;
}

export function ServiceStep({ onNext, onBack }: ServiceStepProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card
                className="cursor-pointer hover:border-primary transition-all bg-slate-800 border-slate-700 group"
                onClick={() => onNext('diagnostic')}
            >
                <CardContent className="flex flex-col items-center justify-center p-8 space-y-4">
                    <Stethoscope className="w-16 h-16 text-slate-400 group-hover:text-primary transition-colors" />
                    <h3 className="text-xl font-bold text-white">Diagnóstico</h3>
                    <p className="text-center text-slate-400 text-sm">
                        Revisión completa para identificar fallas desconocidas.
                    </p>
                </CardContent>
            </Card>

            <Card
                className="cursor-pointer hover:border-neon-orange transition-all bg-slate-800 border-slate-700 group"
                onClick={() => onNext('maintenance')}
            >
                <CardContent className="flex flex-col items-center justify-center p-8 space-y-4">
                    <Wrench className="w-16 h-16 text-slate-400 group-hover:text-neon-orange transition-colors" />
                    <h3 className="text-xl font-bold text-white">Mantenimiento</h3>
                    <p className="text-center text-slate-400 text-sm">
                        Cambio de aceite, filtros, frenos y servicios preventivos.
                    </p>
                </CardContent>
            </Card>

            <div className="col-span-1 md:col-span-2 flex justify-start">
                <Button variant="ghost" onClick={onBack} className="text-slate-400 hover:text-white">
                    Atrás
                </Button>
            </div>
        </div>
    );
}
