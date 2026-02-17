'use client';

import { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import { createClient } from '@/utils/supabase/client';
import { Loader2, DollarSign } from 'lucide-react';

interface PaymentModalProps {
    jobId: string;
    isOpen: boolean;
    onClose: () => void;
    onPaymentComplete: () => void;
}

export function PaymentModal({ jobId, isOpen, onClose, onPaymentComplete }: PaymentModalProps) {
    const [loading, setLoading] = useState(false);
    const [amount, setAmount] = useState('');
    const [method, setMethod] = useState('');
    const [reference, setReference] = useState('');
    const supabase = createClient();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!amount || !method) return;

        setLoading(true);
        try {
            // 1. Insert Payment Record
            const { error: paymentError } = await supabase
                .from('payments')
                .insert({
                    job_id: jobId,
                    amount: parseFloat(amount),
                    method: method as any,
                    reference: reference || null,
                    currency: 'USD', // Default for now
                    status: 'Pending' // Requires verification
                });

            if (paymentError) throw paymentError;

            // 2. Update Job Card Balances (RPC or simple calculation)
            // For simplicity in Phase 4, we fetch current, calc, and update.
            // Ideally this is a Postgres Trigger.

            // Fetch current job to get current totals
            const { data: job, error: fetchError } = await supabase
                .from('job_cards')
                .select('paid_amount, total_amount')
                .eq('id', jobId)
                .single();

            if (fetchError) throw fetchError;

            const newPaid = (job.paid_amount || 0) + parseFloat(amount);
            const newStatus = newPaid >= (job.total_amount || 0) ? 'Paid' : 'Partial';

            const { error: updateError } = await supabase
                .from('job_cards')
                .update({
                    paid_amount: newPaid,
                    payment_status: newStatus
                })
                .eq('id', jobId);

            if (updateError) throw updateError;

            onPaymentComplete();
            onClose();
            // Reset form
            setAmount('');
            setMethod('');
            setReference('');

        } catch (error) {
            console.error('Error processing payment:', error);
            alert('Error recording payment');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="bg-slate-900 border-slate-800 text-white sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Registrar Pago</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                    <div className="space-y-2">
                        <Label>Monto (USD)</Label>
                        <div className="relative">
                            <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-slate-500" />
                            <Input
                                type="number"
                                step="0.01"
                                placeholder="0.00"
                                className="pl-10 bg-slate-950 border-slate-700"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Método de Pago</Label>
                        <Select value={method} onValueChange={setMethod} required>
                            <SelectTrigger className="bg-slate-950 border-slate-700">
                                <SelectValue placeholder="Seleccionar..." />
                            </SelectTrigger>
                            <SelectContent className="bg-slate-900 border-slate-800 text-white">
                                <SelectItem value="Pago_Movil">Pago Móvil</SelectItem>
                                <SelectItem value="Zelle">Zelle</SelectItem>
                                <SelectItem value="Binance">Binance Pay (USDT)</SelectItem>
                                <SelectItem value="Cashea">Cashea</SelectItem>
                                <SelectItem value="Cash">Efectivo</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label>Referencia / Hash</Label>
                        <Input
                            placeholder="Ej. 123456"
                            className="bg-slate-950 border-slate-700"
                            value={reference}
                            onChange={(e) => setReference(e.target.value)}
                        />
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="ghost" onClick={onClose} className="hover:bg-slate-800 text-slate-300">
                            Cancelar
                        </Button>
                        <Button type="submit" className="bg-primary hover:bg-primary/90 text-white" disabled={loading}>
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Registrar
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
