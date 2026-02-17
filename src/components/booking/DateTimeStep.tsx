'use client';

import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface DateTimeStepProps {
    onNext: (date: Date, time: string) => void;
    onBack: () => void;
}

const TIME_SLOTS = [
    "08:00", "09:00", "10:00", "11:00",
    "13:00", "14:00", "15:00", "16:00"
];

export function DateTimeStep({ onNext, onBack }: DateTimeStepProps) {
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [time, setTime] = useState<string | null>(null);

    return (
        <div className="flex flex-col md:flex-row gap-8">
            {/* Calendar Section */}
            <div className="flex-1">
                <h3 className="text-lg font-semibold mb-4 text-white">Selecciona una Fecha</h3>
                <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        className="rounded-md border-none text-white"
                        disabled={(date) => date < new Date() || date.getDay() === 0}
                        locale={es}
                    />
                </div>
            </div>

            {/* Time Slots Section */}
            <div className="flex-1">
                <h3 className="text-lg font-semibold mb-4 text-white">Horario Disponible</h3>
                <div className="grid grid-cols-2 gap-3">
                    {TIME_SLOTS.map((slot) => (
                        <Button
                            key={slot}
                            variant={time === slot ? "default" : "outline"}
                            className={`w-full ${time === slot ? 'bg-primary text-white' : 'bg-transparent text-slate-300 border-slate-600 hover:bg-slate-800'}`}
                            onClick={() => setTime(slot)}
                        >
                            {slot}
                        </Button>
                    ))}
                </div>

                <div className="mt-8 flex justify-end gap-4">
                    <Button variant="ghost" onClick={onBack} className="text-slate-400 hover:text-white">
                        Atrás
                    </Button>
                    <Button
                        disabled={!date || !time}
                        onClick={() => date && time && onNext(date, time)}
                        className="bg-primary hover:bg-primary/90"
                    >
                        Confirmar Cita
                    </Button>
                </div>
            </div>
        </div>
    );
}
