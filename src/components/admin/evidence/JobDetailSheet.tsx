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
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { EvidenceUploader } from './EvidenceUploader';
import { PaymentModal } from '../payments/PaymentModal';
import { useState } from 'react';
import { PlusCircle, DollarSign } from 'lucide-react';

type Job = Database['public']['Tables']['job_cards']['Row'];

interface JobDetailSheetProps {
    job: Job | null;
    isOpen: boolean;
    onClose: () => void;
    onUpdate: () => void;
}

export function JobDetailSheet({ job, isOpen, onClose, onUpdate }: JobDetailSheetProps) {
    const [isPaymentOpen, setIsPaymentOpen] = useState(false);

    if (!job) return null;

    return (
        <>
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

                    <Tabs defaultValue="details" className="w-full">
                        <TabsList className="bg-slate-900 border-slate-800 w-full grid grid-cols-2">
                            <TabsTrigger value="details">Detalles y Fotos</TabsTrigger>
                            <TabsTrigger value="payments">Pagos ({job.payment_status})</TabsTrigger>
                        </TabsList>

                        <TabsContent value="details" className="space-y-6 mt-6">
                            {/* Details */}
                            <div>
                                <h3 className="text-sm font-semibold mb-3 text-slate-400 uppercase tracking-wider">Información</h3>
                                <div className="bg-slate-900 rounded-lg p-4 border border-slate-800 space-y-2">
                                    <p className="text-sm text-slate-300 flex justify-between">
                                        <span className="text-slate-500">Prioridad:</span>
                                        <span>{job.priority}</span>
                                    </p>
                                    <p className="text-sm text-slate-300 flex justify-between">
                                        <span className="text-slate-500">Ingreso:</span>
                                        <span>{new Date(job.created_at).toLocaleDateString()}</span>
                                    </p>
                                </div>
                            </div>

                            <Separator className="bg-slate-800" />

                            {/* Evidence */}
                            <div>
                                <h3 className="text-sm font-semibold mb-4 text-slate-400 uppercase tracking-wider flex items-center gap-2">
                                    Evidencia
                                    <Badge className="bg-slate-800 text-slate-300 hover:bg-slate-700 border-none">
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
                        </TabsContent>

                        <TabsContent value="payments" className="space-y-6 mt-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-slate-900 p-4 rounded-lg border border-slate-800">
                                    <p className="text-xs text-slate-500 mb-1">Total a Pagar</p>
                                    <p className="text-2xl font-bold text-white">${job.total_amount || '0.00'}</p>
                                </div>
                                <div className="bg-slate-900 p-4 rounded-lg border border-slate-800">
                                    <p className="text-xs text-slate-500 mb-1">Pagado</p>
                                    <p className="text-2xl font-bold text-emerald-400">${job.paid_amount || '0.00'}</p>
                                </div>
                            </div>

                            <div className="flex justify-between items-center bg-slate-900/50 p-3 rounded-lg border border-slate-800">
                                <span className="text-sm text-slate-400">Estado de Deuda</span>
                                <Badge variant={job.payment_status === 'Paid' ? 'default' : 'destructive'}>
                                    {job.payment_status === 'Paid' ? 'SOLVENTE' : 'PENDIENTE'}
                                </Badge>
                            </div>

                            <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white" onClick={() => setIsPaymentOpen(true)}>
                                <DollarSign className="w-4 h-4 mr-2" />
                                Registrar Pago
                            </Button>

                            {/* Placeholder for Payment History List */}
                            <div className="text-center py-8 text-slate-600 text-sm">
                                No hay historial de transacciones detallado visible en esta vista rápida.
                            </div>
                        </TabsContent>
                    </Tabs>

                </SheetContent>
            </Sheet>

            <PaymentModal
                jobId={job.id}
                isOpen={isPaymentOpen}
                onClose={() => setIsPaymentOpen(false)}
                onPaymentComplete={onUpdate}
            />
        </>
    );
}
