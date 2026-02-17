'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
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
  Facebook
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Home() {
  const t = useTranslations('Index'); // Assuming we have translations, but hardcoding provided text for now based on request
  const router = useRouter();
  const [plate, setPlate] = useState('');

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (plate.trim()) {
      router.push(`/track/${plate.trim().toUpperCase()}`);
    }
  };

  const services = [
    { title: 'Mantenimiento Preventivo', icon: Clock, desc: 'Cambio de aceite, filtros y revisión general para alargar la vida de tu motor.' },
    { title: 'Diagnóstico Computarizado', icon: Search, desc: 'Escaneo avanzado para detectar fallas en sensores, motor y sistemas eléctricos.' },
    { title: 'Frenos y Suspensión', icon: ShieldCheck, desc: 'Rectificación de discos, cambio de pastillas y ajuste de tren delantero.' },
    { title: 'Alineación y Balanceo', icon: Car, desc: 'Tecnología 3D para asegurar la estabilidad y el cuidado de tus neumáticos.' },
  ];

  const brands = [
    { name: 'Toyota', logo: '/logos/toyota.svg' }, // Placeholders
    { name: 'JAC Motors', logo: '/logos/jac.svg' },
    { name: 'Mitsubishi', logo: '/logos/mitsubishi.svg' },
    { name: 'Ford', logo: '/logos/ford.svg' },
  ];

  const allies = [
    { name: 'Bosch', type: 'Repuestos' },
    { name: 'Motul', type: 'Lubricantes' },
    { name: 'Denso', type: 'Electrónica' },
    { name: 'Kayaba', type: 'Amortiguación' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-primary selection:text-white">
      {/* HEADER */}
      <header className="absolute top-0 w-full z-50 border-b border-white/5 backdrop-blur-sm">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center transform rotate-3">
              <Wrench className="text-white w-6 h-6" />
            </div>
            <span className="text-2xl font-bold tracking-tighter text-white">
              KINETIC<span className="text-primary">.</span>
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#servicios" className="hover:text-primary transition-colors">Servicios</a>
            <a href="#marcas" className="hover:text-primary transition-colors">Especialidad</a>
            <a href="#track" className="hover:text-primary transition-colors">Rastreo</a>
            <a href="#contacto" className="hover:text-primary transition-colors">Contacto</a>
          </nav>

          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <Link href="/book">
              <Button className="hidden md:flex bg-white text-slate-950 hover:bg-slate-200 font-bold">
                Agendar Cita
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-primary/20 blur-[120px] rounded-full pointer-events-none opacity-50" />

        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium">
            Taller Multimarca Premium en Caracas
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6">
            Ingeniería Automotriz <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-500">
              De Siguiente Nivel
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Especialistas en Toyota, JAC y Ford. Diagnóstico computarizado, mantenimiento preventivo
            y mecánica ligera con los mejores estándares de calidad.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <Link href="/book">
              <Button size="lg" className="h-14 px-8 text-lg bg-primary hover:bg-primary/90 text-white shadow-[0_0_30px_rgba(255,77,0,0.3)] w-full md:w-auto">
                Reservar Diagnóstico
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <a href="#track" className="w-full md:w-auto">
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white w-full md:w-auto">
                <Search className="mr-2 w-5 h-5" />
                Consultar Estado
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section id="servicios" className="py-20 bg-slate-900/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Nuestros Servicios</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Soluciones integrales para el cuidado de tu vehículo con tecnología de punta.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, idx) => (
              <Card key={idx} className="bg-slate-950 border-slate-800 hover:border-primary/50 transition-colors group">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-slate-900 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
                    <service.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                  <p className="text-slate-400 text-sm">{service.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* SPECIALIZED BRANDS */}
      <section id="marcas" className="py-20 border-y border-white/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-white mb-10 opacity-80">Especialistas Certificados En</h2>
          <div className="flex flex-wrap justify-center gap-12 md:gap-20 items-center opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Text placeholders for now, logos would be images */}
            <h3 className="text-3xl font-bold tracking-widest hover:text-primary cursor-default">TOYOTA</h3>
            <h3 className="text-3xl font-bold tracking-widest hover:text-primary cursor-default">JAC</h3>
            <h3 className="text-3xl font-bold tracking-widest hover:text-primary cursor-default">MITSUBISHI</h3>
            <h3 className="text-3xl font-bold tracking-widest hover:text-primary cursor-default">FORD</h3>
          </div>
        </div>
      </section>

      {/* TRACKING SECTION */}
      <section id="track" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 -skew-y-3 transform origin-left scale-110 pointer-events-none" />

        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto bg-slate-900 rounded-2xl p-8 md:p-12 border border-slate-800 shadow-2xl">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">Rastreo en Tiempo Real</h2>
              <p className="text-slate-400">Ingresa la placa de tu vehículo para ver el estado de tu servicio.</p>
            </div>

            <form onSubmit={handleTrackSubmit} className="flex flex-col md:flex-row gap-4">
              <Input
                placeholder="Ej. AB123CD"
                value={plate}
                onChange={(e) => setPlate(e.target.value)}
                className="h-14 text-lg bg-slate-950 border-slate-700 text-center md:text-left uppercase font-mono tracking-wider"
              />
              <Button type="submit" size="lg" className="h-14 px-8 text-lg bg-primary hover:bg-primary/90 text-white">
                Consultar
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* ALLIES / SPARE PARTS */}
      <section className="py-20 bg-slate-900/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Nuestros Aliados Comerciales</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {allies.map((ally, idx) => (
              <div key={idx} className="flex flex-col items-center justify-center p-6 bg-slate-950 rounded-xl border border-slate-800/50">
                <span className="text-xl font-bold text-slate-300 mb-1">{ally.name}</span>
                <span className="text-xs text-primary uppercase tracking-wider">{ally.type}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Lo Que Dicen Nuestros Clientes</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="bg-slate-900 border-slate-800 p-6">
                <div className="flex gap-1 text-yellow-500 mb-4">
                  {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-slate-300 mb-6 italic">"Excelente servicio. Mi Toyota quedó como nuevo. La atención de Hely y su equipo es de primera categoría."</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-slate-400 font-bold">C{i}</div>
                  <div>
                    <p className="text-white font-bold text-sm">Cliente Verificado</p>
                    <p className="text-slate-500 text-xs">Toyota Corolla</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contacto" className="bg-slate-950 border-t border-slate-900 pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                  <Wrench className="text-white w-5 h-5" />
                </div>
                <span className="text-xl font-bold text-white">KINETIC.</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                Taller mecánico especializado en diagnósticos avanzados y mantenimiento preventivo para vehículos modernos.
              </p>
            </div>

            <div>
              <h3 className="text-white font-bold mb-6">Contacto</h3>
              <ul className="space-y-4 text-sm text-slate-400">
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
              <h3 className="text-white font-bold mb-6">Servicios</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-primary">Diagnóstico Computarizado</a></li>
                <li><a href="#" className="hover:text-primary">Mecánica Ligera</a></li>
                <li><a href="#" className="hover:text-primary">Electricidad Automotriz</a></li>
                <li><a href="#" className="hover:text-primary">Suspensión y Frenos</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-bold mb-6">Síguenos</h3>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-600">
            <p>&copy; 2024 Kinetic Studio C.A. Todos los derechos reservados.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-slate-400">Términos</a>
              <a href="#" className="hover:text-slate-400">Privacidad</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
