'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { Wrench, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';

import { createClient } from '@/utils/supabase/client';
import { User } from '@supabase/supabase-js';

export function LandingHeader() {
    const tNav = useTranslations('Navigation');
    const [scrolled, setScrolled] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [isOpen, setIsOpen] = useState(false); // State to control Sheet

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);

        // Check user session
        const supabase = createClient();
        const checkUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
        };
        checkUser();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const closeMenu = () => setIsOpen(false);

    return (
        <header className={cn(
            "fixed top-0 w-full z-50 transition-all duration-300 ease-in-out border-b",
            scrolled
                ? "bg-background/80 backdrop-blur-md border-border py-2 shadow-lg"
                : "bg-transparent border-transparent py-4"
        )}>
            <div className="container mx-auto px-4 flex items-center justify-between">
                <div className="flex items-center gap-2 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                    <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300 shadow-[0_0_15px_rgba(255,140,0,0.5)]">
                        <Wrench className="text-white w-6 h-6" />
                    </div>
                    <span className="text-2xl font-bold tracking-tighter text-foreground">
                        KINETIC<span className="text-primary">.</span>
                    </span>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
                    <a href="#servicios" className="hover:text-primary transition-colors relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-0.5 after:bg-primary after:transition-all hover:after:w-full">{tNav('services')}</a>
                    <a href="#marcas" className="hover:text-primary transition-colors relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-0.5 after:bg-primary after:transition-all hover:after:w-full">{tNav('brands')}</a>
                    <a href="#track" className="hover:text-primary transition-colors relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-0.5 after:bg-primary after:transition-all hover:after:w-full">{tNav('track')}</a>
                    <a href="#contacto" className="hover:text-primary transition-colors relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-0.5 after:bg-primary after:transition-all hover:after:w-full">{tNav('contact')}</a>
                </nav>

                <div className="flex items-center gap-4">
                    <div className="hidden md:block">
                        <LanguageSwitcher />
                    </div>

                    {/* Desktop CTA Button */}
                    <div className="hidden md:block">
                        {!user ? (
                            <Link href="/auth/login">
                                <Button className="bg-primary hover:bg-primary/90 text-white font-bold transition-transform hover:scale-105 active:scale-95 text-xs px-4 py-2 h-9 md:text-sm md:px-6 shadow-[0_0_10px_rgba(255,77,0,0.3)]">
                                    {tNav('login')}
                                </Button>
                            </Link>
                        ) : (
                            <Link href="/book">
                                <Button className="bg-primary hover:bg-primary/90 text-white font-bold transition-transform hover:scale-105 active:scale-95 text-xs px-4 py-2 h-9 md:text-sm md:px-6 shadow-[0_0_10px_rgba(255,77,0,0.3)]">
                                    {tNav('book')}
                                </Button>
                            </Link>
                        )}
                    </div>

                    {/* Mobile Menu & Language Switcher */}
                    <div className="flex items-center gap-2 md:hidden">
                        <LanguageSwitcher />

                        <Sheet open={isOpen} onOpenChange={setIsOpen}>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="text-foreground hover:bg-accent">
                                    <Menu className="w-6 h-6" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-background/95 backdrop-blur-xl border-border">
                                <SheetHeader>
                                    <SheetTitle className="text-left text-2xl font-bold tracking-tighter">
                                        KINETIC<span className="text-primary">.</span>
                                    </SheetTitle>
                                </SheetHeader>
                                <div className="flex flex-col gap-6 mt-8">
                                    <nav className="flex flex-col gap-4 text-lg font-medium text-muted-foreground">
                                        <a href="#servicios" onClick={closeMenu} className="hover:text-primary transition-colors">{tNav('services')}</a>
                                        <a href="#marcas" onClick={closeMenu} className="hover:text-primary transition-colors">{tNav('brands')}</a>
                                        <a href="#track" onClick={closeMenu} className="hover:text-primary transition-colors">{tNav('track')}</a>
                                        <a href="#contacto" onClick={closeMenu} className="hover:text-primary transition-colors">{tNav('contact')}</a>
                                    </nav>

                                    <div className="w-full h-px bg-border" />

                                    {!user ? (
                                        <Link href="/auth/login" onClick={closeMenu}>
                                            <Button className="w-full bg-primary hover:bg-primary/90 text-white font-bold text-base py-6 shadow-[0_0_15px_rgba(255,77,0,0.3)]">
                                                {tNav('login')}
                                            </Button>
                                        </Link>
                                    ) : (
                                        <Link href="/book" onClick={closeMenu}>
                                            <Button className="w-full bg-primary hover:bg-primary/90 text-white font-bold text-base py-6 shadow-[0_0_15px_rgba(255,77,0,0.3)]">
                                                {tNav('book')}
                                            </Button>
                                        </Link>
                                    )}
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </header>
    );
}
