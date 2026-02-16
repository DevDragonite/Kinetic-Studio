'use client';

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
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Calendar, Clock, Car, User } from 'lucide-react';

// Mock Data Type
type Appointment = {
    id: string;
    customer: string;
    vehicle: string;
    plate: string;
    service: 'Diagnostic' | 'Maintenance';
    date: string;
    time: string;
    status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
};

// Mock Data
const appointments: Appointment[] = [
    {
        id: 'APT-001',
        customer: 'Carlos Pérez',
        vehicle: 'Toyota Corolla',
        plate: 'AD452X',
        service: 'Maintenance',
        date: '2024-03-20',
        time: '08:00 AM',
        status: 'Confirmed',
    },
    {
        id: 'APT-002',
        customer: 'Maria Rodriguez',
        vehicle: 'JAC T8 Pro',
        plate: 'AB123CD',
        service: 'Diagnostic',
        date: '2024-03-20',
        time: '10:00 AM',
        status: 'Pending',
    },
    {
        id: 'APT-003',
        customer: 'Pedro Mendez',
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
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-white">Appointments</h2>
                    <p className="text-slate-400">Manage incoming bookings and schedule.</p>
                </div>
                <Button className="bg-primary hover:bg-primary/90 text-white">
                    New Appointment
                </Button>
            </div>

            <div className="rounded-md border border-slate-800 bg-slate-900/50">
                <Table>
                    <TableHeader className="bg-slate-900">
                        <TableRow className="border-slate-800 hover:bg-slate-900">
                            <TableHead className="text-slate-400">ID</TableHead>
                            <TableHead className="text-slate-400">Customer</TableHead>
                            <TableHead className="text-slate-400">Vehicle</TableHead>
                            <TableHead className="text-slate-400">Service</TableHead>
                            <TableHead className="text-slate-400">Date & Time</TableHead>
                            <TableHead className="text-slate-400">Status</TableHead>
                            <TableHead className="text-right text-slate-400">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {appointments.map((apt) => (
                            <TableRow key={apt.id} className="border-slate-800 hover:bg-slate-800/50">
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
                                        {apt.status}
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
                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                            <DropdownMenuItem className="hover:bg-slate-800 focus:bg-slate-800 cursor-pointer">
                                                View Details
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="hover:bg-slate-800 focus:bg-slate-800 cursor-pointer">
                                                Edit Booking
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator className="bg-slate-800" />
                                            <DropdownMenuItem className="text-emerald-500 hover:bg-emerald-950/30 focus:bg-emerald-950/30 cursor-pointer">
                                                Confirm
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="text-red-500 hover:bg-red-950/30 focus:bg-red-950/30 cursor-pointer">
                                                Cancel
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
