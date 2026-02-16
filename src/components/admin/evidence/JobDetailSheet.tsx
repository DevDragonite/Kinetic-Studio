'use client';

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription
} from '@/components/ui/sheet';
import { Database } from '@/types/database';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { EvidenceUploader } from './EvidenceUploader';
import { useState } from 'react';

type Job = Database['public']['Tables']['job_cards']['Row'];

interface JobDetailSheetProps {
    job: Job | null;
    isOpen: boolean;
    onClose: () => void;
    onUpdate: () => void;
}

export function JobDetailSheet({ job, isOpen, onClose, onUpdate }: JobDetailSheetProps) {
    if (!job) return null;

    return (
        <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <SheetContent className="w-[400px] sm:w-[540px] bg-slate-950 border-slate-800 text-white overflow-y-auto">
                <SheetHeader className="mb-6">
                    <div className="flex items-center gap-3 mb-2">
                        <Badge variant="outline" className="border-primary text-primary">
                            {job.status.replace('_', ' ')}
                        </Badge>
                        <span className="text-xs text-slate-500 font-mono">ID: {job.id.slice(0, 8)}</span>
                    </div>
                    <SheetTitle className="text-2xl font-bold text-white">
                        {job.vehicle_brand} {job.vehicle_model}
                    </SheetTitle>
                    <SheetDescription className="text-slate-400">
                        Placa: <strong className="text-white">{job.license_plate}</strong> • Cliente: {job.client_name}
                    </SheetDescription>
                </SheetHeader>

                <div className="space-y-8">
                    {/* Mechanics / Details Placeholder */}
                    <div>
                        <h3 className="text-lg font-semibold mb-3">Detalles del Trabajo</h3>
                        <div className="bg-slate-900 rounded-lg p-4 border border-slate-800 space-y-2">
                            <p className="text-sm text-slate-300"><span className="text-slate-500">Prioridad:</span> {job.priority}</p>
                            <p className="text-sm text-slate-300"><span className="text-slate-500">Ingreso:</span> {new Date(job.created_at).toLocaleDateString()}</p>
                        </div>
                    </div>

                    <Separator className="bg-slate-800" />

                    {/* Evidence Section */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            Evidencia Fotográfica
                            <Badge className="bg-slate-800 text-slate-300 hover:bg-slate-700">
                                {(job.before_photos?.length || 0) + (job.after_photos?.length || 0)}
                            </Badge>
                        </h3>

                        <div className="space-y-6">
                            <EvidenceUploader
                                jobId={job.id}
                                type="before"
                                currentPhotos={job.before_photos}
                                onUploadComplete={onUpdate}
                            />

                            <Separator className="bg-slate-800/50" />

                            <EvidenceUploader
                                jobId={job.id}
                                type="after"
                                currentPhotos={job.after_photos}
                                onUploadComplete={onUpdate}
                            />
                        </div>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}
