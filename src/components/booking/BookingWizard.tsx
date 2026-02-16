'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { VehicleStep } from './VehicleStep';
import { ServiceStep } from './ServiceStep';
import { DateTimeStep } from './DateTimeStep';
import { SummaryStep } from './SummaryStep';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function BookingWizard() {
    const [step, setStep] = useState(1);
    const t = useTranslations('Booking');

    const nextStep = () => setStep(s => s + 1);
    const prevStep = () => setStep(s => s - 1);

    // State for booking data
    const [bookingData, setBookingData] = useState({
        vehicle: null as any,
        service: null as string | null,
        date: null as Date | null,
        time: null as string | null
    });

    const handleVehicleSelect = (vehicle: any) => {
        setBookingData(prev => ({ ...prev, vehicle }));
        nextStep();
    };

    const handleServiceSelect = (service: string) => {
        setBookingData(prev => ({ ...prev, service }));
        nextStep();
    };

    const handleDateTimeSelect = (date: Date, time: string) => {
        setBookingData(prev => ({ ...prev, date, time }));
        nextStep();
    };

    return (
        <div className="w-full max-w-5xl mx-auto p-4">
            <Card className="bg-slate-900 border-slate-800 text-white shadow-2xl">
                <CardHeader>
                    <CardTitle className="text-2xl text-primary text-center">
                        {step === 1 && t('steps.vehicle')}
                        {step === 2 && t('steps.service')}
                        {step === 3 && t('steps.datetime')}
                        {step === 4 && t('steps.summary')}
                    </CardTitle>

                    {/* Progress Indicator */}
                    <div className="flex justify-center gap-2 mt-4">
                        {[1, 2, 3, 4].map((i) => (
                            <div
                                key={i}
                                className={`h-1 w-12 rounded-full transition-all duration-300 ${i <= step ? 'bg-primary' : 'bg-slate-700'
                                    }`}
                            />
                        ))}
                    </div>
                </CardHeader>
                <CardContent className="min-h-[400px] p-6">
                    <div className="animate-in fade-in zoom-in-95 duration-300">
                        {step === 1 && <VehicleStep onNext={handleVehicleSelect} />}
                        {step === 2 && <ServiceStep onNext={handleServiceSelect} onBack={prevStep} />}
                        {step === 3 && <DateTimeStep onNext={handleDateTimeSelect} onBack={prevStep} />}
                        {step === 4 && <SummaryStep data={bookingData} onBack={prevStep} />}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
