import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, CalendarCheck, DollarSign, Activity } from 'lucide-react';

export default function AdminDashboard() {
    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold tracking-tight text-white">Dashboard</h2>
                <p className="text-slate-400">Overview of shop performance and daily activities.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="bg-slate-900 border-slate-800">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-200">Total Appointments</CardTitle>
                        <CalendarCheck className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">12</div>
                        <p className="text-xs text-slate-400">+2 from yesterday</p>
                    </CardContent>
                </Card>

                <Card className="bg-slate-900 border-slate-800">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-200">Active Jobs</CardTitle>
                        <Activity className="h-4 w-4 text-neon-orange" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">5</div>
                        <p className="text-xs text-slate-400">3 in progress, 2 waiting</p>
                    </CardContent>
                </Card>

                <Card className="bg-slate-900 border-slate-800">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-200">Weekly Revenue</CardTitle>
                        <DollarSign className="h-4 w-4 text-emerald-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">$2,450</div>
                        <p className="text-xs text-slate-400">+15% from last week</p>
                    </CardContent>
                </Card>

                <Card className="bg-slate-900 border-slate-800">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-200">New Clients</CardTitle>
                        <Users className="h-4 w-4 text-blue-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">8</div>
                        <p className="text-xs text-slate-400">+4 this month</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
