'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Database } from '@/types/database';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Car, ChevronRight, Upload } from 'lucide-react';
import { JobDetailSheet } from '@/components/admin/evidence/JobDetailSheet';

type Job = Database['public']['Tables']['job_cards']['Row'];

export default function MechanicPage() {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const supabase = createClient();

    useEffect(() => {
        fetchJobs();

        const channel = supabase
            .channel('mechanic_jobs')
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'job_cards' },
                () => fetchJobs()
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    const fetchJobs = async () => {
        // Ideally filter by assigned_technician_id
        const { data, error } = await supabase
            .from('job_cards')
            .select('*')
            .order('created_at', { ascending: false });

        if (data) setJobs(data);
    };

    const handleJobClick = (job: Job) => {
        setSelectedJob(job);
        setIsSheetOpen(true);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'in_progress': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
            case 'ready': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
            default: return 'bg-slate-800 text-slate-400 border-slate-700';
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 pb-20">
            <header className="sticky top-0 z-10 bg-slate-900 border-b border-slate-800 p-4">
                <h1 className="text-xl font-bold text-white">Mis Trabajos</h1>
                <p className="text-sm text-slate-400">
                    {jobs.filter(j => j.status !== 'delivered').length} asignados hoy
                </p>
            </header>

            <main className="p-4 space-y-4">
                {jobs.map((job) => (
                    <Card
                        key={job.id}
                        onClick={() => handleJobClick(job)}
                        className="bg-slate-900 border-slate-800 active:scale-[0.98] transition-transform cursor-pointer"
                    >
                        <CardContent className="p-4 flex justify-between items-center">
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <h3 className="font-bold text-white text-lg">
                                        {job.vehicle_brand} {job.vehicle_model}
                                    </h3>
                                    <Badge variant="outline" className={`capitalize ${getStatusColor(job.status)}`}>
                                        {job.status.replace('_', ' ')}
                                    </Badge>
                                </div>
                                <p className="text-slate-400 font-mono text-sm mb-2">{job.license_plate}</p>
                                <div className="flex items-center gap-2 text-xs text-slate-500">
                                    <Clock className="w-3 h-3" />
                                    <span>Ingreso: {new Date(job.created_at).toLocaleDateString()}</span>
                                </div>
                            </div>
                            <ChevronRight className="text-slate-600 w-6 h-6" />
                        </CardContent>
                    </Card>
                ))}

                {jobs.length === 0 && (
                    <div className="text-center py-10 text-slate-500">
                        <Car className="w-12 h-12 mx-auto mb-3 opacity-20" />
                        <p>No tienes trabajos asignados.</p>
                    </div>
                )}
            </main>

            <JobDetailSheet
                job={selectedJob}
                isOpen={isSheetOpen}
                onClose={() => setIsSheetOpen(false)}
                onUpdate={fetchJobs}
            />
        </div>
    );
}
