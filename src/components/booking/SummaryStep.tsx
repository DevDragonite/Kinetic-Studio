'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { CheckCircle2, Car, Wrench, CalendarClock } from 'lucide-react';

interface SummaryStepProps {
    data: {
        vehicle: any;
        service: string | null;
        date: Date | null;
        time: string | null;
    };
    onBack: () => void;
}

export function SummaryStep({ data, onBack }: SummaryStepProps) {
    const { vehicle, service, date, time } = data;

    return (
        <div className="space-y-8">
            <div className="text-center space-y-2">
                <h3 className="text-2xl font-bold text-white">Confirma tu Cita</h3>
                <p className="text-slate-400">Revisa los detalles antes de agendar.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                {/* Vehicle Card */}
                <Card className="bg-slate-800 border-slate-700">
                    <CardContent className="p-6 flex flex-col items-center text-center space-y-3">
                        <Car className="w-10 h-10 text-primary" />
                        <div>
                            <p className="text-sm text-slate-400">Vehículo</p>
                            <p className="font-semibold text-white text-lg">{vehicle?.brand?.toUpperCase()} {vehicle?.model}</p>
                            <p className="text-slate-300">{vehicle?.plate}</p>
                        </div>
                    </CardContent>
                </Card>

                {/* Service Card */}
                <Card className="bg-slate-800 border-slate-700">
                    <CardContent className="p-6 flex flex-col items-center text-center space-y-3">
                        <Wrench className="w-10 h-10 text-neon-orange" />
                        <div>
                            <p className="text-sm text-slate-400">Servicio</p>
                            <p className="font-semibold text-white text-lg capitalize">{service}</p>
                            <p className="text-slate-300">
                                {service === 'diagnostic' ? 'Revisión General' : 'Mantenimiento Preventivo'}
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Date Card */}
                <Card className="bg-slate-800 border-slate-700">
                    <CardContent className="p-6 flex flex-col items-center text-center space-y-3">
                        <CalendarClock className="w-10 h-10 text-emerald-400" />
                        <div>
                            <p className="text-sm text-slate-400">Fecha y Hora</p>
                            <p className="font-semibold text-white text-lg">
                                {date && format(date, 'PPP', { locale: es })}
                            </p>
                            <p className="text-slate-300">{time}</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="flex justify-between items-center bg-primary/10 p-4 rounded-lg border border-primary/20">
                <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-primary" />
                    <span className="text-slate-200 text-sm">
                        Al confirmar, recibirás un comprobante digital en tu correo.
                    </span>
                </div>

            </div>

            <div className="flex justify-between pt-4">
                <Button variant="ghost" onClick={onBack} className="text-slate-400 hover:text-white">
                    Atrás
                </Button>
                <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg shadow-lg shadow-primary/20">
                    Confirmar Agendamiento
                </Button>
            </div>
        </div>
    );
}
