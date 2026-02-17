'use client';

import { useEffect, useState, use } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Database } from '@/types/database';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Clock, Car, AlertCircle, CalendarClock } from 'lucide-react';
import Link from 'next/link';

type Job = Database['public']['Tables']['job_cards']['Row'];

const STAGES = [
    { id: 'reception', label: 'Recepción', icon: Car },
    { id: 'diagnosis', label: 'Diagnóstico', icon: AlertCircle },
    { id: 'approval', label: 'Aprobación', icon: Clock },
    { id: 'in_progress', label: 'Reparación', icon: CheckCircle2 },
    { id: 'quality_control', label: 'Control Calidad', icon: CheckCircle2 },
    { id: 'ready', label: 'Listo', icon: CheckCircle2 },
    { id: 'delivered', label: 'Entregado', icon: CheckCircle2 },
];

export default function TrackPage({ params }: { params: Promise<{ plate: string }> }) {
    const { plate } = use(params);
    const decodedPlate = decodeURIComponent(plate).toUpperCase();
    const [job, setJob] = useState<Job | null>(null);
    const [loading, setLoading] = useState(true);
    const [hasHistory, setHasHistory] = useState(false); // Track if car exists in DB but no active job
    const supabase = createClient();

    useEffect(() => {
        fetchJob();

        const channel = supabase
            .channel(`tracking_${decodedPlate}`)
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'job_cards',
                    filter: `license_plate=eq.${decodedPlate}`,
                },
                () => fetchJob()
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [decodedPlate]);

    const fetchJob = async () => {
        // 1. Try to find an ACTIVE job (not delivered)
        const { data: activeJob, error } = await supabase
            .from('job_cards')
            .select('*')
            .ilike('license_plate', decodedPlate)
            .neq('status', 'delivered') // Only active jobs
            .order('created_at', { ascending: false })
            .limit(1)
            .single();

        if (activeJob) {
            setJob(activeJob);
            setLoading(false);
            return;
        }

        // 2. If no active job, check if vehicle has ANY history (delivered jobs)
        // This confirms the plate exists in our system
        const { data: historyJob } = await supabase
            .from('job_cards')
            .select('id')
            .ilike('license_plate', decodedPlate)
            .limit(1)
            .single();

        setHasHistory(!!historyJob);
        setJob(null);
        setLoading(false);
    };

    const getCurrentStepIndex = () => {
        if (!job) return -1;
        return STAGES.findIndex(s => s.id === job.status);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
            </div>
        );
    }

    if (!job) {
        return (
            <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
                <Card className="bg-slate-900 border-slate-800 text-white max-w-md w-full">
                    <CardContent className="flex flex-col items-center p-8 space-y-4 text-center">
                        {hasHistory ? (
                            <>
                                <CheckCircle2 className="w-16 h-16 text-emerald-500" />
                                <h2 className="text-xl font-bold">Vehículo Registrado</h2>
                                <p className="text-slate-400">
                                    El vehículo <span className="text-white font-mono">{decodedPlate}</span> está en nuestra base de datos, pero <strong className="text-primary">no tiene servicios activos</strong> en este momento.
                                </p>
                            </>
                        ) : (
                            <>
                                <AlertCircle className="w-16 h-16 text-slate-500" />
                                <h2 className="text-xl font-bold">Placa No Encontrada</h2>
                                <p className="text-slate-400">
                                    No tenemos registro del vehículo <span className="text-white font-mono">{decodedPlate}</span> en nuestro sistema actual.
                                </p>
                            </>
                        )}

                        <div className="pt-4 w-full">
                            <Link href="/book">
                                <Button className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-12">
                                    <CalendarClock className="mr-2 h-5 w-5" />
                                    Agendar Cita Ahora
                                </Button>
                            </Link>
                            <Link href="/">
                                <Button variant="link" className="mt-2 text-slate-500 hover:text-white">
                                    Volver al Inicio
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    const currentStep = getCurrentStepIndex();

    return (
        <div className="min-h-screen bg-slate-950 p-4 md:p-8 flex justify-center">
            <div className="w-full max-w-3xl space-y-8">
                {/* Header Card */}
                <Card className="bg-slate-900 border-slate-800 text-white">
                    <CardHeader>
                        <div className="flex justify-between items-start">
                            <div>
                                <CardTitle className="text-3xl font-bold text-primary mb-2">
                                    {job.vehicle_brand} {job.vehicle_model}
                                </CardTitle>
                                <Badge variant="outline" className="text-lg px-4 py-1 border-slate-700 bg-slate-800/50">
                                    {job.license_plate}
                                </Badge>
                            </div>
                            <div className="text-right hidden md:block">
                                <p className="text-sm text-slate-400">Orden ID</p>
                                <p className="font-mono text-xs text-slate-500">{job.id.slice(0, 8)}</p>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-2 mb-4">
                            <span className="text-slate-400 text-sm">Estado Actual:</span>
                            <Badge className="bg-primary hover:bg-primary/90 text-white border-none text-base">
                                {STAGES.find(s => s.id === job.status)?.label || job.status}
                            </Badge>
                        </div>
                        <p className="text-slate-400 text-sm">
                            Cliente: {job.client_name}
                        </p>
                    </CardContent>
                </Card>

                {/* Progress Stepper */}
                <div className="relative">
                    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-slate-800 md:hidden"></div>

                    <div className="space-y-6 md:space-y-0 md:flex md:justify-between md:relative">
                        {/* Desktop Line */}
                        <div className="hidden md:block absolute top-5 left-0 right-0 h-0.5 bg-slate-800 -z-10"></div>

                        {STAGES.map((stage, index) => {
                            const isActive = index <= currentStep;
                            const isCurrent = index === currentStep;

                            return (
                                <div key={stage.id} className="relative flex md:flex-col items-center gap-4 md:gap-2 z-10 transition-all duration-500">
                                    <div
                                        className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${isActive
                                            ? 'bg-primary border-primary text-white shadow-[0_0_15px_rgba(255,160,0,0.5)]'
                                            : 'bg-slate-900 border-slate-700 text-slate-500'
                                            } ${isCurrent ? 'scale-125 ring-4 ring-primary/20' : ''}`}
                                    >
                                        <stage.icon className="w-5 h-5" />
                                    </div>
                                    <div className="md:text-center">
                                        <p className={`font-medium transition-colors duration-300 ${isActive ? 'text-white' : 'text-slate-500'}`}>
                                            {stage.label}
                                        </p>
                                        {isCurrent && (
                                            <p className="text-xs text-primary animate-pulse md:hidden font-bold">En proceso...</p>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
