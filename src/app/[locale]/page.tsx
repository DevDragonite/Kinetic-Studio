'use client';

import { useTranslations } from 'next-intl';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { useState } from 'react';
import { useRouter } from '@/i18n/routing';

export default function Home() {
  const t = useTranslations('HomePage');
  const router = useRouter();
  const [plate, setPlate] = useState('');

  const handleTrack = () => {
    if (plate.trim()) {
      router.push(`/track/${plate.trim()}`);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-white selection:bg-neon-orange selection:text-white">
      {/* Navbar Placeholder */}
      <nav className="absolute top-0 w-full z-50 flex justify-between items-center p-6 container mx-auto">
        <div className="text-2xl font-bold tracking-tighter text-white">
          KINETIC<span className="text-primary">.</span>
        </div>
        <div className="flex items-center gap-4">
          <LanguageSwitcher />
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden">

        {/* Background Gradients */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] mix-blend-screen animate-pulse" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-neon-orange/10 rounded-full blur-[120px] mix-blend-screen" />
        </div>

        <div className="relative z-10 flex flex-col items-center text-center space-y-8 px-4 max-w-4xl mx-auto">
          <div className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-slate-300 backdrop-blur-sm mb-4">
            Version 1.0 • Caracas, VE
          </div>
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-white drop-shadow-2xl">
            {t('title')}
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 font-light tracking-wide max-w-2xl">
            {t('subtitle')}
          </p>

          {/* Tracking Bar */}
          <div className="w-full max-w-lg mt-8 group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-neon-orange rounded-full blur opacity-30 group-hover:opacity-75 transition duration-1000"></div>
            <div className="relative w-full bg-slate-900 border border-slate-800 p-2 rounded-full flex shadow-2xl items-center">
              <input
                type="text"
                placeholder={t('trackPlaceholder')}
                value={plate}
                onChange={(e) => setPlate(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleTrack()}
                className="flex-1 bg-transparent border-none text-white px-6 py-3 focus:outline-none placeholder:text-slate-500 font-medium uppercase"
              />
              <button
                onClick={handleTrack}
                className="bg-primary hover:bg-primary/90 text-white font-bold rounded-full px-8 py-3 transition-all duration-300 shadow-lg hover:shadow-primary/25"
              >
                {t('trackButton')}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
