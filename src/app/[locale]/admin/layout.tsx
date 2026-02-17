'use client';

import { useState } from 'react';
import { Link, usePathname } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import {
    LayoutDashboard,
    CalendarDays,
    Wrench,
    Package,
    Menu,
    LogOut,
    Settings
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const t = useTranslations('Admin.nav');
    const pathname = usePathname();
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    const ADMIN_NAV = [
        { name: t('dashboard'), href: '/admin', icon: LayoutDashboard },
        { name: t('appointments'), href: '/admin/appointments', icon: CalendarDays },
        { name: t('schedule'), href: '/admin/jobs', icon: Wrench },
        { name: t('inventory'), href: '/admin/inventory', icon: Package, disabled: true },
    ];

    return (
        <div className="min-h-screen bg-background flex">
            {/* Desktop Sidebar */}
            <aside className="hidden md:flex w-64 flex-col bg-sidebar border-r border-sidebar-border">
                <div className="p-6">
                    <h1 className="text-xl font-bold tracking-tighter text-sidebar-foreground">
                        KINETIC<span className="text-primary">.</span> ADMIN
                    </h1>
                </div>
                <Separator className="bg-sidebar-border" />
                <nav className="flex-1 p-4 space-y-2">
                    {ADMIN_NAV.map((item) => (
                        <Link
                            key={item.href}
                            href={item.disabled ? '#' : item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${pathname === item.href
                                ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                                : 'text-sidebar-foreground hover:text-sidebar-primary-foreground hover:bg-sidebar-primary/80'
                                } ${item.disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            <item.icon className="w-5 h-5" />
                            <span className="font-medium">{item.name}</span>
                        </Link>
                    ))}
                </nav>
                <div className="p-4 bg-sidebar-accent/50">
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Avatar>
                                    <AvatarImage src="https://github.com/shadcn.png" />
                                    <AvatarFallback>AD</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="text-sm font-medium text-sidebar-foreground">Admin User</p>
                                    <p className="text-xs text-muted-foreground">Manager</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-center">
                            <LanguageSwitcher />
                        </div>

                        <Button variant="ghost" className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-destructive/10">
                            <LogOut className="w-4 h-4 mr-2" />
                            {t('logout')}
                        </Button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Mobile Header */}
                <header className="md:hidden flex items-center justify-between p-4 bg-sidebar border-b border-sidebar-border">
                    <h1 className="text-lg font-bold text-sidebar-foreground">KINETIC ADMIN</h1>
                    <div className="flex items-center gap-2">
                        <LanguageSwitcher />
                        <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="text-sidebar-foreground">
                                    <Menu className="w-6 h-6" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="bg-sidebar border-sidebar-border text-sidebar-foreground">
                                <nav className="flex flex-col gap-4 mt-8">
                                    {ADMIN_NAV.map((item) => (
                                        <Link
                                            key={item.href}
                                            href={item.disabled ? '#' : item.href}
                                            onClick={() => setIsMobileOpen(false)}
                                            className={`flex items-center gap-3 px-4 py-3 rounded-lg ${pathname === item.href
                                                ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                                                : 'text-sidebar-foreground hover:bg-sidebar-accent'
                                                }`}
                                        >
                                            <item.icon className="w-5 h-5" />
                                            <span>{item.name}</span>
                                        </Link>
                                    ))}
                                </nav>
                            </SheetContent>
                        </Sheet>
                    </div>
                </header>

                <main className="flex-1 overflow-auto p-4 md:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
