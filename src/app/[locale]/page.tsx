'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing'; // Correct Link import
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { HeroBackground } from '@/components/landing/HeroBackground';
import { ServiceCard } from '@/components/landing/ServiceCard';
import { BrandCard } from '@/components/landing/BrandCard';
import { TestimonialCard } from '@/components/landing/TestimonialCard';
import { LandingHeader } from '@/components/layout/LandingHeader';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import {
  Wrench,
  Car,
  ShieldCheck,
  Search,
  ArrowRight,
  Star,
  Phone,
  MapPin,
  Clock,
  Instagram,
  Facebook,
  Lock,
  Loader2
} from 'lucide-react';
import { useRouter } from '@/i18n/routing'; // Correct Router import
import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { User } from '@supabase/supabase-js';

export default function Home() {
  const t = useTranslations('HomePage');
  const tNav = useTranslations('Navigation');
  const tServices = useTranslations('Services');
  const tBrands = useTranslations('Brands');
  const tTestimonials = useTranslations('Testimonials');
  const tFooter = useTranslations('Footer');

  const tAllies = useTranslations('Allies');

  const router = useRouter();
  const [plate, setPlate] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoadingUser(false);
    };
    checkUser();
  }, []);

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (plate.trim()) {
      router.push(`/track/${plate.trim().toUpperCase()}`);
    }
  };

  const services = [
    {
      title: tServices('preventive.title'),
      icon: Clock,
      desc: tServices('preventive.desc'),
      longDesc: tServices('preventive.longDesc'),
      image: 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?q=80&w=1000&auto=format&fit=crop'
    },
    {
      title: tServices('diagnosis.title'),
      icon: Search,
      desc: tServices('diagnosis.desc'),
      longDesc: tServices('diagnosis.longDesc'),
      image: '/images/diagnostico-computarizado.webp'
    },
    {
      title: tServices('brakes.title'),
      icon: ShieldCheck,
      desc: tServices('brakes.desc'),
      longDesc: tServices('brakes.longDesc'),
      image: '/images/frenos.jpg'
    },
    {
      title: tServices('alignment.title'),
      icon: Car,
      desc: tServices('alignment.desc'),
      longDesc: tServices('alignment.longDesc'),
      image: '/images/alineacion.jpg'
    },
  ];

  const brands = [
    {
      name: 'Toyota',
      origin: 'https://flagcdn.com/w40/jp.png',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Toyota_carlogo.svg',
      desc: tBrands('toyota.desc'),
      specialties: tBrands.raw('toyota.specs') as string[],
      image: '/images/linea-toyota.jpg',
      technicalLabel: tBrands('technicalSpec')
    },
    {
      name: 'JAC Motors',
      origin: 'https://flagcdn.com/w40/cn.png',
      logo: '/images/logo-jac.jpg',
      desc: tBrands('jac.desc'),
      specialties: tBrands.raw('jac.specs') as string[],
      image: '/images/linea-jac.jpg',
      technicalLabel: tBrands('technicalSpec')
    },
    {
      name: 'Mitsubishi',
      origin: 'https://flagcdn.com/w40/jp.png',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/5/5a/Mitsubishi_logo.svg',
      desc: tBrands('mitsubishi.desc'),
      specialties: tBrands.raw('mitsubishi.specs') as string[],
      image: '/images/linea-mitsubishi.jpg',
      technicalLabel: tBrands('technicalSpec')
    },
    {
      name: 'Ford',
      origin: 'https://flagcdn.com/w40/us.png',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Ford_logo_flat.svg',
      desc: tBrands('ford.desc'),
      specialties: tBrands.raw('ford.specs') as string[],
      image: '/images/linea-ford.jpg',
      technicalLabel: tBrands('technicalSpec')
    },
  ];

  const allies = [
    {
      name: 'Bosch',
      origin: 'https://flagcdn.com/w40/de.png',
      logo: '/images/Bosch-logo.svg.png',
      desc: tAllies('bosch.desc'),
      specialties: tAllies.raw('bosch.specs') as string[],
      image: '/images/repuestos-bosch.jpg',
      technicalLabel: tAllies('technicalSpec')
    },
    {
      name: 'Motul',
      origin: 'https://flagcdn.com/w40/fr.png',
      logo: '/images/Motul_logo.svg.png',
      desc: tAllies('motul.desc'),
      specialties: tAllies.raw('motul.specs') as string[],
      image: '/images/motul.jpg',
      technicalLabel: tAllies('technicalSpec')
    },
    {
      name: 'Denso',
      origin: 'https://flagcdn.com/w40/jp.png',
      logo: '/images/DENSO-main-logo-web.jpg',
      desc: tAllies('denso.desc'),
      specialties: tAllies.raw('denso.specs') as string[],
      image: '/images/denso.webp',
      technicalLabel: tAllies('technicalSpec')
    },
    {
      name: 'KYB',
      origin: 'https://flagcdn.com/w40/jp.png',
      logo: '/images/kyb-logo-500x275.png',
      desc: tAllies('kyb.desc'),
      specialties: tAllies.raw('kyb.specs') as string[],
      image: '/images/kayaba.jpg',
      technicalLabel: tAllies('technicalSpec')
    },
  ];


  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-white">
      <LandingHeader />

      {/* HERO SECTION */}
      <section className="relative h-[800px] flex items-center justify-center overflow-hidden">
        <HeroBackground />

        <ScrollReveal className="container mx-auto px-4 relative z-10 text-center mt-20">
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium backdrop-blur-md">
            {t('subtitle')}
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 drop-shadow-lg">
            {t.rich('title', {
              br: () => <br />,
              span: (chunks) => <span className="bg-gradient-to-r from-primary via-orange-400 to-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-[background-pan_3s_linear_infinite] font-extrabold">{chunks}</span>
            })}
          </h1>
          <p className="text-lg md:text-xl text-slate-200 max-w-2xl mx-auto mb-10 leading-relaxed drop-shadow-md">
            {t('description')}
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            {loadingUser ? (
              <Button size="lg" disabled className="h-14 px-8 text-lg bg-primary/50 text-white w-full md:w-auto">
                <Loader2 className="w-5 h-5 animate-spin" />
              </Button>
            ) : !user ? (
              <Link href="/auth/login">
                <Button size="lg" className="h-14 px-8 text-lg bg-primary hover:bg-primary/90 text-white shadow-[0_0_30px_rgba(255,140,0,0.5)] w-full md:w-auto border-none transition-transform hover:scale-105 active:scale-95">
                  {t('loginButton')}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            ) : (
              <Link href="/book">
                <Button size="lg" className="h-14 px-8 text-lg bg-primary hover:bg-primary/90 text-white shadow-[0_0_30px_rgba(255,140,0,0.5)] w-full md:w-auto border-none transition-transform hover:scale-105 active:scale-95">
                  {t('ctaPrimary')}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            )}

            <a href="#track" className="w-full md:w-auto">
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg border-white/20 bg-white/5 backdrop-blur-sm text-slate-100 hover:bg-white/10 w-full md:w-auto transition-transform hover:scale-105 active:scale-95">
                <Search className="mr-2 w-5 h-5" />
                {t('ctaSecondary')}
              </Button>
            </a>
          </div>
        </ScrollReveal>

        {/* Gradient Overlay for bottom blend */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
      </section>

      {/* TRANSPARENCY SECTION */}
      <section className="py-12 border-b border-border bg-card/40 backdrop-blur-sm">
        <ScrollReveal className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
            <ShieldCheck className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-3">{t('transparency.title')}</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t('transparency.desc')}
          </p>
        </ScrollReveal>
      </section>

      {/* SERVICES GRID */}
      <section id="servicios" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold !text-primary mb-4">{tServices('title')}</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">{tServices('subtitle')}</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service, idx) => (
                <ServiceCard key={idx} {...service} />
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* SPECIALIZED BRANDS */}
      <section id="marcas" className="py-20 border-y border-border bg-card/20">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-2xl font-bold text-foreground mb-16 text-center opacity-80 uppercase tracking-widest">{tBrands('title')}</h2>
            <div className="grid md:grid-cols-4 gap-12 items-center justify-items-center">
              {brands.map((brand, idx) => (
                <BrandCard key={idx} {...brand} />
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* TRACKING SECTION */}
      <section id="track" className="py-24 relative overflow-hidden bg-background">
        <div className="absolute inset-0 bg-primary/5 -skew-y-3 transform origin-left scale-110 pointer-events-none" />

        <div className="container mx-auto px-4 relative">
          <ScrollReveal className="max-w-3xl mx-auto bg-card rounded-2xl p-8 md:p-12 border border-border shadow-2xl relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 p-12 opacity-5">
              <Wrench className="w-64 h-64 text-foreground" />
            </div>

            <div className="text-center mb-8 relative z-10">
              <h2 className="text-3xl font-bold text-foreground mb-2">{t('trackInfo')}</h2>
              <p className="text-muted-foreground">{t('trackDesc')}</p>
            </div>

            {loadingUser ? (
              <div className="flex justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : !user ? (
              <div className="flex flex-col items-center justify-center py-8 text-center relative z-10 bg-background/50 rounded-xl border border-border border-dashed">
                <Lock className="w-12 h-12 text-muted-foreground mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-2">{t('trackRestrictedTitle')}</h3>
                <p className="text-muted-foreground mb-6 max-w-md">{t('trackRestrictedMessage')}</p>
                <div className="flex gap-4">
                  <Link href="/auth/login">
                    <Button className="bg-primary hover:bg-primary/90 text-white">{t('loginButton')}</Button>
                  </Link>
                  <Link href="/book">
                    <Button variant="outline" className="border-border text-muted-foreground">{tNav('book')}</Button>
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleTrackSubmit} className="flex flex-col md:flex-row gap-4 relative z-10">
                <Input
                  placeholder={t('trackPlaceholder')}
                  value={plate}
                  onChange={(e) => setPlate(e.target.value)}
                  className="h-14 text-lg bg-input border-border text-center md:text-left uppercase font-mono tracking-wider focus:ring-primary text-foreground"
                />
                <Button type="submit" size="lg" className="h-14 px-8 text-lg bg-primary hover:bg-primary/90 text-white">
                  {t('trackButton')}
                </Button>
              </form>
            )}
          </ScrollReveal>
        </div>
      </section>

      {/* ALLIES / SPARE PARTS */}
      <section className="py-20 bg-card/30 border-t border-border">
        <ScrollReveal className="container mx-auto px-4">
          <h2 className="text-3xl font-bold !text-primary text-center mb-12">{tAllies('title')}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {allies.map((ally, idx) => (
              <BrandCard key={idx} {...ally} imageFit="contain" />
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 border-t border-border bg-background">
        <ScrollReveal className="container mx-auto px-4">
          <h2 className="text-3xl font-bold !text-primary text-center mb-12">{tTestimonials('title')}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: tTestimonials('client1.name'),
                car: tTestimonials('client1.car'),
                text: tTestimonials('client1.text'),
                image: "/images/baelor.webp"
              },
              {
                name: tTestimonials('client2.name'),
                car: tTestimonials('client2.car'),
                text: tTestimonials('client2.text'),
                image: "/images/geralt.jpg"
              },
              {
                name: tTestimonials('client3.name'),
                car: tTestimonials('client3.car'),
                text: tTestimonials('client3.text'),
                image: "/images/harvey.jpg"
              }
            ].map((client, i) => (
              <TestimonialCard
                key={i}
                {...client}
                index={i}
              />
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* FOOTER */}
      <footer id="contacto" className="bg-background border-t border-border pt-16 pb-8">
        <ScrollReveal className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                  <Wrench className="text-white w-5 h-5" />
                </div>
                <span className="text-xl font-bold text-foreground">KINETIC.</span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {tFooter('description')}
              </p>
            </div>

            <div>
              <h3 className="text-foreground font-bold mb-6">{tFooter('contact')}</h3>
              <ul className="space-y-4 text-sm text-muted-foreground">
                <li className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-primary" />
                  +58 412 123 4567
                </li>
                <li className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-primary" />
                  Los Chaguaramos, Caracas
                </li>
                <li className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-primary" />
                  Lun - Sab: 8:00 AM - 5:00 PM
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-foreground font-bold mb-6">{tFooter('services')}</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary">{tServices('diagnosis.title')}</a></li>
                <li><a href="#" className="hover:text-primary">{tServices('preventive.title')}</a></li>
                <li><a href="#" className="hover:text-primary">Electricidad Automotriz</a></li>
                <li><a href="#" className="hover:text-primary">{tServices('brakes.title')}</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-foreground font-bold mb-6">{tFooter('follow')}</h3>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 bg-muted rounded-full flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-muted rounded-full flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-muted-foreground">
            <p>&copy; 2024 Kinetic Studio C.A. {tFooter('rights')}</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-foreground">Términos</a>
              <a href="#" className="hover:text-foreground">Privacidad</a>
            </div>
          </div>
        </ScrollReveal>
      </footer>
    </div>
  );
}
