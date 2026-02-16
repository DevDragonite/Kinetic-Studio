'use client';

import { useState } from 'react';
import { Link, usePathname } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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

const ADMIN_NAV = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Appointments', href: '/admin/appointments', icon: CalendarDays },
    { name: 'Job Cards', href: '/admin/jobs', icon: Wrench },
    { name: 'Inventory', href: '/admin/inventory', icon: Package, disabled: true },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    return (
        <div className="min-h-screen bg-slate-950 flex">
            {/* Desktop Sidebar */}
            <aside className="hidden md:flex w-64 flex-col bg-slate-900 border-r border-slate-800">
                <div className="p-6">
                    <h1 className="text-xl font-bold tracking-tighter text-white">
                        KINETIC<span className="text-primary">.</span> ADMIN
                    </h1>
                </div>
                <Separator className="bg-slate-800" />
                <nav className="flex-1 p-4 space-y-2">
                    {ADMIN_NAV.map((item) => (
                        <Link
                            key={item.href}
                            href={item.disabled ? '#' : item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${pathname === item.href
                                ? 'bg-primary/10 text-primary'
                                : 'text-slate-400 hover:text-white hover:bg-slate-800'
                                } ${item.disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            <item.icon className="w-5 h-5" />
                            <span className="font-medium">{item.name}</span>
                        </Link>
                    ))}
                </nav>
                <div className="p-4 bg-slate-800/50">
                    <div className="flex items-center gap-3">
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>AD</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="text-sm font-medium text-white">Admin User</p>
                            <p className="text-xs text-slate-400">Manager</p>
                        </div>
                    </div>
                    <Button variant="ghost" className="w-full mt-4 justify-start text-red-400 hover:text-red-300 hover:bg-red-950/30">
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                    </Button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Mobile Header */}
                <header className="md:hidden flex items-center justify-between p-4 bg-slate-900 border-b border-slate-800">
                    <h1 className="text-lg font-bold text-white">KINETIC ADMIN</h1>
                    <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="text-white">
                                <Menu className="w-6 h-6" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="bg-slate-900 border-slate-800 text-white">
                            <nav className="flex flex-col gap-4 mt-8">
                                {ADMIN_NAV.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.disabled ? '#' : item.href}
                                        onClick={() => setIsMobileOpen(false)}
                                        className={`flex items-center gap-3 px-4 py-3 rounded-lg ${pathname === item.href
                                            ? 'bg-primary/10 text-primary'
                                            : 'text-slate-400 hover:text-white'
                                            }`}
                                    >
                                        <item.icon className="w-5 h-5" />
                                        <span>{item.name}</span>
                                    </Link>
                                ))}
                            </nav>
                        </SheetContent>
                    </Sheet>
                </header>

                <main className="flex-1 overflow-auto p-4 md:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
