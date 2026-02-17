'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { Users, CalendarCheck, DollarSign, Activity, TrendingUp } from 'lucide-react';
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
                    <SpotlightCard className="h-full border-white/5 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
                        <div className="p-6">
                            <div className="flex flex-row items-center justify-between space-y-0 pb-2 mb-2">
                                <h3 className="text-sm font-medium text-foreground">{t('totalAppointments')}</h3>
                                <CalendarCheck className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-foreground">12</div>
                                <p className="text-xs text-muted-foreground">+2 {t('fromYesterday')}</p>
                            </div>
                        </div>
                    </SpotlightCard>
                </Link>

                <Link href="/admin/jobs">
                    <SpotlightCard className="h-full border-white/5 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
                        <div className="p-6">
                            <div className="flex flex-row items-center justify-between space-y-0 pb-2 mb-2">
                                <h3 className="text-sm font-medium text-foreground">{t('activeJobs')}</h3>
                                <Activity className="h-4 w-4 text-neon-orange group-hover:scale-110 transition-transform" />
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-foreground">5</div>
                                <p className="text-xs text-muted-foreground">3 {t('inProgress')}, 2 {t('waiting')}</p>
                            </div>
                        </div>
                    </SpotlightCard>
                </Link>

                <Dialog>
                    <DialogTrigger asChild>
                        <div className="cursor-pointer h-full">
                            <SpotlightCard className="h-full border-white/5 bg-white/5 hover:bg-white/10 transition-colors group">
                                <div className="p-6">
                                    <div className="flex flex-row items-center justify-between space-y-0 pb-2 mb-2">
                                        <h3 className="text-sm font-medium text-foreground">{t('weeklyRevenue')}</h3>
                                        <DollarSign className="h-4 w-4 text-emerald-500 group-hover:scale-110 transition-transform" />
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-foreground">$2,450</div>
                                        <p className="text-xs text-muted-foreground">+15% {t('fromLastWeek')}</p>
                                    </div>
                                </div>
                            </SpotlightCard>
                        </div>
                    </DialogTrigger>
                    <DialogContent className="bg-card/95 backdrop-blur-xl border-border max-w-2xl">
                        <DialogHeader>
                            <DialogTitle className="text-2xl font-bold text-foreground flex items-center gap-2">
                                <DollarSign className="w-6 h-6 text-emerald-500" />
                                {t('weeklyRevenue')}
                            </DialogTitle>
                            <DialogDescription className="text-muted-foreground">
                                Desglose detallado de los ingresos de esta semana.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="grid gap-6 py-4">
                            {/* Mock Chart Area */}
                            <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                                <div className="flex items-center justify-between mb-6">
                                    <h4 className="text-sm font-medium text-muted-foreground">Rendimiento Semanal</h4>
                                    <div className="flex items-center text-emerald-500 text-sm font-bold bg-emerald-500/10 px-2 py-1 rounded">
                                        <TrendingUp className="w-4 h-4 mr-1" />
                                        +15%
                                    </div>
                                </div>
                                <div className="h-40 flex items-end justify-between gap-2 px-2">
                                    {[35, 60, 45, 80, 55, 75, 90].map((h, i) => (
                                        <div key={i} className="w-full bg-primary/20 hover:bg-primary/40 transition-colors rounded-t-sm relative group" style={{ height: `${h}%` }}>
                                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs text-foreground opacity-0 group-hover:opacity-100 transition-opacity bg-background px-2 py-1 rounded border border-border">
                                                ${h * 40}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex justify-between mt-2 text-xs text-muted-foreground px-1">
                                    <span>Lun</span><span>Mar</span><span>Mié</span><span>Jue</span><span>Vie</span><span>Sáb</span><span>Dom</span>
                                </div>
                            </div>

                            {/* Recent Transactions List */}
                            <div className="space-y-4">
                                <h4 className="text-sm font-medium text-foreground">Últimas Transacciones</h4>
                                {[
                                    { id: '#TRX-982', client: 'Baelor T.', service: 'Mantenimiento Preventivo', amount: '$450.00', date: 'Hace 2h' },
                                    { id: '#TRX-981', client: 'Geralt R.', service: 'Diagnóstico 4x4', amount: '$120.00', date: 'Hace 5h' },
                                    { id: '#TRX-980', client: 'Harvey S.', service: 'Cambio de Frenos', amount: '$380.00', date: 'Ayer' },
                                ].map((tx, i) => (
                                    <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs">
                                                {tx.client.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-foreground">{tx.client}</p>
                                                <p className="text-xs text-muted-foreground">{tx.service}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-bold text-foreground">{tx.amount}</p>
                                            <p className="text-xs text-muted-foreground">{tx.date}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>

                <SpotlightCard className="h-full border-white/5 bg-white/5 hover:bg-white/10 transition-colors group">
                    <div className="p-6">
                        <div className="flex flex-row items-center justify-between space-y-0 pb-2 mb-2">
                            <h3 className="text-sm font-medium text-foreground">{t('newClients')}</h3>
                            <Users className="h-4 w-4 text-blue-400 group-hover:scale-110 transition-transform" />
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-foreground">8</div>
                            <p className="text-xs text-muted-foreground">+4 {t('thisMonth')}</p>
                        </div>
                    </div>
                </SpotlightCard>
            </div>
        </div>
    );
}
