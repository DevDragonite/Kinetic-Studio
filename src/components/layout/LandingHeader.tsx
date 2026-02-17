'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { Wrench } from 'lucide-react';
import { cn } from '@/lib/utils';

import { createClient } from '@/utils/supabase/client';
import { User } from '@supabase/supabase-js';

export function LandingHeader() {
    const tNav = useTranslations('Navigation');
    const [scrolled, setScrolled] = useState(false);
    const [user, setUser] = useState<User | null>(null);

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

                <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
                    <a href="#servicios" className="hover:text-primary transition-colors relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-0.5 after:bg-primary after:transition-all hover:after:w-full">{tNav('services')}</a>
                    <a href="#marcas" className="hover:text-primary transition-colors relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-0.5 after:bg-primary after:transition-all hover:after:w-full">{tNav('brands')}</a>
                    <a href="#track" className="hover:text-primary transition-colors relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-0.5 after:bg-primary after:transition-all hover:after:w-full">{tNav('track')}</a>
                    <a href="#contacto" className="hover:text-primary transition-colors relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-0.5 after:bg-primary after:transition-all hover:after:w-full">{tNav('contact')}</a>
                </nav>

                <div className="flex items-center gap-4">
                    <LanguageSwitcher />

                    {!user ? (
                        <Link href="/auth/login">
                            <Button className="hidden md:flex bg-background text-foreground border border-border hover:bg-muted font-bold transition-transform hover:scale-105 active:scale-95">
                                {tNav('login')}
                            </Button>
                        </Link>
                    ) : (
                        <Link href="/book">
                            <Button className="hidden md:flex bg-background text-foreground border border-border hover:bg-muted font-bold transition-transform hover:scale-105 active:scale-95">
                                {tNav('book')}
                            </Button>
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
}
