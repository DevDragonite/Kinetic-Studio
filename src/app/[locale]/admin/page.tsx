'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, CalendarCheck, DollarSign, Activity } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export default function AdminDashboard() {
    const t = useTranslations('Admin.dashboard');

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold tracking-tight text-foreground">{t('title')}</h2>
                <p className="text-muted-foreground">{t('subtitle')}</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Link href="/admin/appointments">
                    <Card className="bg-card border-border hover:bg-card/80 transition-colors cursor-pointer">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-foreground">{t('totalAppointments')}</CardTitle>
                            <CalendarCheck className="h-4 w-4 text-primary" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-foreground">12</div>
                            <p className="text-xs text-muted-foreground">+2 {t('fromYesterday')}</p>
                        </CardContent>
                    </Card>
                </Link>

                <Link href="/admin/jobs">
                    <Card className="bg-card border-border hover:bg-card/80 transition-colors cursor-pointer">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-foreground">{t('activeJobs')}</CardTitle>
                            <Activity className="h-4 w-4 text-neon-orange" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-foreground">5</div>
                            <p className="text-xs text-muted-foreground">3 {t('inProgress')}, 2 {t('waiting')}</p>
                        </CardContent>
                    </Card>
                </Link>

                <Card className="bg-card border-border hover:bg-card/80 transition-colors">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-foreground">{t('weeklyRevenue')}</CardTitle>
                        <DollarSign className="h-4 w-4 text-emerald-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-foreground">$2,450</div>
                        <p className="text-xs text-muted-foreground">+15% {t('fromLastWeek')}</p>
                    </CardContent>
                </Card>

                <Card className="bg-card border-border hover:bg-card/80 transition-colors">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-foreground">{t('newClients')}</CardTitle>
                        <Users className="h-4 w-4 text-blue-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-foreground">8</div>
                        <p className="text-xs text-muted-foreground">+4 {t('thisMonth')}</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
