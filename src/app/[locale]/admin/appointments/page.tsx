'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription
} from '@/components/ui/dialog';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Calendar, Clock, Car, User, Phone, Mail, FileText, ClipboardList } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

// Mock Data Type
type Appointment = {
    id: string;
    customer: string;
    email: string;
    phone: string;
    vehicle: string;
    plate: string;
    service: 'Diagnostic' | 'Maintenance';
    date: string;
    time: string;
    status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
    notes?: string;
    history?: string;
};

// Mock Data
const appointments: Appointment[] = [
    {
        id: 'APT-001',
        customer: 'Carlos Pérez',
        email: 'carlos@example.com',
        phone: '+58 412-1234567',
        vehicle: 'Toyota Corolla',
        plate: 'AD452X',
        service: 'Maintenance',
        date: '2024-03-20',
        time: '08:00 AM',
        status: 'Confirmed',
        notes: 'Cliente reporta ruido en suspensión delantera.',
        history: '2 visitas previas. Último servicio: Cambio de aceite (Enero 2024).'
    },
    {
        id: 'APT-002',
        customer: 'Maria Rodriguez',
        email: 'maria@example.com',
        phone: '+58 414-9876543',
        vehicle: 'JAC T8 Pro',
        plate: 'AB123CD',
        service: 'Diagnostic',
        date: '2024-03-20',
        time: '10:00 AM',
        status: 'Pending',
        notes: 'Check engine encendido. Posible falla de sensores.',
        history: 'Primera visita.'
    },
    {
        id: 'APT-003',
        customer: 'Pedro Mendez',
        email: 'pedro@example.com',
        phone: '+58 424-5555555',
        vehicle: 'Ford Explorer',
        plate: 'XYZ-987',
        service: 'Maintenance',
        date: '2024-03-21',
        time: '02:00 PM',
        status: 'Cancelled',
    },
    {
        id: 'APT-004',
        customer: 'Ana Silva',
        email: 'ana@example.com',
        phone: '+58 416-1112233',
        vehicle: 'Chery Tiggo 7',
        plate: 'EFG-456',
        service: 'Diagnostic',
        date: '2024-03-22',
        time: '09:00 AM',
        status: 'Pending',
    },
    {
        id: 'APT-005',
        customer: 'Luis Gomez',
        email: 'luis@example.com',
        phone: '+58 412-9988776',
        vehicle: 'Mitsubishi Montero',
        plate: 'LMN-789',
        service: 'Maintenance',
        date: '2024-03-22',
        time: '11:00 AM',
        status: 'Confirmed',
    },
];

const getStatusColor = (status: string) => {
    switch (status) {
        case 'Confirmed': return 'bg-emerald-500/15 text-emerald-500 hover:bg-emerald-500/25 border-emerald-500/20';
        case 'Pending': return 'bg-amber-500/15 text-amber-500 hover:bg-amber-500/25 border-amber-500/20';
        case 'Completed': return 'bg-blue-500/15 text-blue-500 hover:bg-blue-500/25 border-blue-500/20';
        case 'Cancelled': return 'bg-red-500/15 text-red-500 hover:bg-red-500/25 border-red-500/20';
        default: return 'bg-slate-500/15 text-slate-500';
    }
};

export default function AppointmentsPage() {
    const t = useTranslations('Admin.appointments');
    const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-white">{t('title')}</h2>
                    <p className="text-slate-400">{t('subtitle')}</p>
                </div>
                <Button className="bg-primary hover:bg-primary/90 text-white">
                    {t('newAppointment')}
                </Button>
            </div>

            <div className="rounded-md border border-slate-800 bg-slate-900/50">
                <Table>
                    <TableHeader className="bg-slate-900">
                        <TableRow className="border-slate-800 hover:bg-slate-900">
                            <TableHead className="text-slate-400">{t('table.id')}</TableHead>
                            <TableHead className="text-slate-400">{t('table.customer')}</TableHead>
                            <TableHead className="text-slate-400">{t('table.vehicle')}</TableHead>
                            <TableHead className="text-slate-400">{t('table.service')}</TableHead>
                            <TableHead className="text-slate-400">{t('table.date')}</TableHead>
                            <TableHead className="text-slate-400">{t('table.status')}</TableHead>
                            <TableHead className="text-right text-slate-400">{t('table.actions')}</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {appointments.map((apt) => (
                            <TableRow
                                key={apt.id}
                                className="border-slate-800 hover:bg-slate-800/50 cursor-pointer transition-colors"
                                onClick={() => setSelectedAppointment(apt)}
                            >
                                <TableCell className="font-medium text-slate-300">{apt.id}</TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2 text-white">
                                        <User className="w-4 h-4 text-slate-500" />
                                        {apt.customer}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex flex-col">
                                        <span className="text-white flex items-center gap-2">
                                            <Car className="w-3 h-3 text-slate-500" /> {apt.vehicle}
                                        </span>
                                        <span className="text-xs text-slate-500 ml-5">{apt.plate}</span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge variant="outline" className="border-slate-700 text-slate-300">
                                        {apt.service}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <div className="flex flex-col text-sm">
                                        <span className="text-white flex items-center gap-2">
                                            <Calendar className="w-3 h-3 text-slate-500" /> {apt.date}
                                        </span>
                                        <span className="text-slate-500 flex items-center gap-2">
                                            <Clock className="w-3 h-3" /> {apt.time}
                                        </span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge className={`${getStatusColor(apt.status)} border`}>
                                        {t(`status.${apt.status.toLowerCase()}` as any)}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0 text-slate-400 hover:text-white">
                                                <span className="sr-only">Open menu</span>
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="bg-slate-900 border-slate-800 text-slate-300">
                                            <DropdownMenuLabel>{t('table.actions')}</DropdownMenuLabel>
                                            <DropdownMenuItem
                                                className="hover:bg-slate-800 focus:bg-slate-800 cursor-pointer"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setSelectedAppointment(apt);
                                                }}
                                            >
                                                {t('actions.viewDetails')}
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                className="hover:bg-slate-800 focus:bg-slate-800 cursor-pointer"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                {t('actions.edit')}
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator className="bg-slate-800" />
                                            <DropdownMenuItem
                                                className="text-emerald-500 hover:bg-emerald-950/30 focus:bg-emerald-950/30 cursor-pointer"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                {t('actions.confirm')}
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                className="text-red-500 hover:bg-red-950/30 focus:bg-red-950/30 cursor-pointer"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                {t('actions.cancel')}
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Detailed View Modal */}
            <Dialog open={!!selectedAppointment} onOpenChange={(open) => !open && setSelectedAppointment(null)}>
                <DialogContent className="bg-slate-900 text-white border-slate-800 sm:max-w-[600px]">
                    <DialogHeader>
                        <DialogTitle className="text-xl flex items-center gap-2">
                            {t('details.title')}
                            <span className="text-slate-400 text-sm font-normal">#{selectedAppointment?.id}</span>
                        </DialogTitle>
                        <DialogDescription className="text-slate-400">
                            {selectedAppointment && t(`status.${selectedAppointment.status.toLowerCase()}` as any)}
                        </DialogDescription>
                    </DialogHeader>

                    {selectedAppointment && (
                        <div className="grid gap-6 py-4">
                            {/* Customer & Vehicle Info */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <h4 className="text-sm font-medium text-slate-400">{t('details.customerInfo')}</h4>
                                    <div className="flex items-center gap-2">
                                        <User className="w-4 h-4 text-primary" />
                                        <span className="font-medium">{selectedAppointment.customer}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-slate-300">
                                        <Mail className="w-3 h-3 text-slate-500" />
                                        <span>{selectedAppointment.email}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-slate-300">
                                        <Phone className="w-3 h-3 text-slate-500" />
                                        <span>{selectedAppointment.phone}</span>
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <h4 className="text-sm font-medium text-slate-400">{t('details.vehicleInfo')}</h4>
                                    <div className="flex items-center gap-2">
                                        <Car className="w-4 h-4 text-primary" />
                                        <span className="font-medium">{selectedAppointment.vehicle}</span>
                                    </div>
                                    <div className="text-sm text-slate-300 pl-6">
                                        Plate: <span className="font-mono text-slate-400">{selectedAppointment.plate}</span>
                                    </div>
                                </div>
                            </div>

                            <Separator className="bg-slate-800" />

                            {/* Service Details */}
                            <div className="space-y-2">
                                <h4 className="text-sm font-medium text-slate-400">{t('details.serviceInfo')}</h4>
                                <div className="flex items-center justify-between bg-slate-800/50 p-3 rounded-lg border border-slate-800">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                            <ClipboardList className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="font-medium">{selectedAppointment.service}</p>
                                            <p className="text-xs text-slate-400 flex items-center gap-1">
                                                <Calendar className="w-3 h-3" /> {selectedAppointment.date} at {selectedAppointment.time}
                                            </p>
                                        </div>
                                    </div>
                                    <Badge variant="outline" className="border-primary/20 text-primary bg-primary/5">
                                        Scheduled
                                    </Badge>
                                </div>
                            </div>

                            {/* Notes & History */}
                            <div className="grid gap-4">
                                {selectedAppointment.notes && (
                                    <div className="space-y-1">
                                        <h4 className="text-sm font-medium text-slate-400 flex items-center gap-2">
                                            <FileText className="w-3 h-3" /> {t('details.notes')}
                                        </h4>
                                        <p className="text-sm text-slate-300 bg-slate-950 p-3 rounded-md border border-slate-800">
                                            {selectedAppointment.notes}
                                        </p>
                                    </div>
                                )}

                                {selectedAppointment.history && (
                                    <div className="space-y-1">
                                        <h4 className="text-sm font-medium text-slate-400">{t('details.history')}</h4>
                                        <p className="text-xs text-slate-400">
                                            {selectedAppointment.history}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
