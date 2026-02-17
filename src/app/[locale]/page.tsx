'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { HeroBackground } from '@/components/landing/HeroBackground';
import { ServiceCard } from '@/components/landing/ServiceCard';
import { BrandCard } from '@/components/landing/BrandCard';
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
  Lock
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { User } from '@supabase/supabase-js';

export default function Home() {
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
      title: 'Mantenimiento Preventivo',
      icon: Clock,
      desc: 'Cambio de aceite, filtros y revisión general.',
      longDesc: 'Nuestro servicio de mantenimiento preventivo incluye cambio de aceite con productos premium (Motul/Toyota), reemplazo de filtros de aire y aceite, chequeo de niveles de fluidos, y una inspección visual de 20 puntos para garantizar que tu vehículo opere en condiciones óptimas y prevenir fallas futuras.',
      image: 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?q=80&w=1000&auto=format&fit=crop'
    },
    {
      title: 'Diagnóstico Computarizado',
      icon: Search,
      desc: 'Escaneo avanzado de sensores y sistemas.',
      longDesc: 'Utilizamos escáneres de última generación compatibles con protocolos OBD-II y específicos de marca (Toyota Techstream, JAC Diag) para leer códigos de error, analizar datos en vivo de los sensores y diagnosticar fallas en motor, transmisión, ABS y airbags con precisión milimétrica.',
      image: 'https://images.unsplash.com/photo-1552656967-7a0990a1dc09?q=80&w=1000&auto=format&fit=crop'
    },
    {
      title: 'Frenos y Suspensión',
      icon: ShieldCheck,
      desc: 'Seguridad total para tu conducción.',
      longDesc: 'Servicio completo de frenos: rectificación de discos, cambio de pastillas (cerámica/semi-metálica), y purga de líquido. En suspensión, revisamos y reemplazamos amortiguadores, bujes, terminales y muñones para recuperar el confort y la estabilidad de tu vehículo.',
      image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=1000&auto=format&fit=crop'
    },
    {
      title: 'Alineación y Balanceo',
      icon: Car,
      desc: 'Tecnología 3D para estabilidad.',
      longDesc: 'Alineación computarizada 3D de alta precisión para evitar el desgaste irregular de los cauchos y asegurar que el vehículo mantenga su trayectoria. Complementado con balanceo dinámico para eliminar vibraciones en el volante a altas velocidades.',
      image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=1000&auto=format&fit=crop'
    },
  ];

  const brands = [
    {
      name: 'Toyota',
      desc: 'Expertos certificados en la marca líder japonesa. Atendemos Hilux KAVAK/REVO, Fortuner, Corolla y más.',
      specialties: ['Motores 1GR-FE', 'Transmisiones Automáticas', 'Sistema Eléctrico', 'Suspensión Old Man Emu'],
      image: 'https://images.unsplash.com/photo-1590393963481-9b7e777e4881?q=80&w=1000&auto=format&fit=crop'
    },
    {
      name: 'JAC Motors',
      desc: 'Servicio especializado para la flota moderna. Conocemos tu T8, JS4 y T6 mejor que nadie.',
      specialties: ['Turbos Diesel', 'Inyección Common Rail', 'Sensores PDF', 'Electrónica'],
      image: 'https://images.unsplash.com/photo-1627453412586-77881c1c9539?q=80&w=1000&auto=format&fit=crop' // Generic Pickup
    },
    {
      name: 'Mitsubishi',
      desc: 'Mantenimiento para leyendas del 4x4. Montero Sport y Lancer en manos expertas.',
      specialties: ['Cajas Super Select', 'Motores 6G72', 'Tren Delantero', 'Frenos ABS'],
      image: 'https://images.unsplash.com/photo-1619553765620-5c628e930f36?q=80&w=1000&auto=format&fit=crop'
    },
    {
      name: 'Ford',
      desc: 'Potencia americana, cuidado de precisión. Explorer, Super Duty y Mustang.',
      specialties: ['Motores Triton/Coyote', 'Módulos Sync', 'Cajas Automáticas', 'Electrónica Computarizada'],
      image: 'https://images.unsplash.com/photo-1553444958-867160ba10cb?q=80&w=1000&auto=format&fit=crop' // Mustang
    },
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
      <section className="relative h-[800px] flex items-center justify-center overflow-hidden">
        <HeroBackground />

        <div className="container mx-auto px-4 relative z-10 text-center mt-20">
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium backdrop-blur-md">
            Taller Multimarca Premium en Caracas
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 drop-shadow-lg">
            Ingeniería Automotriz <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-500">
              De Siguiente Nivel
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-200 max-w-2xl mx-auto mb-10 leading-relaxed drop-shadow-md">
            Especialistas en Toyota, JAC y Ford. Diagnóstico computarizado, mantenimiento preventivo
            y mecánica ligera con los mejores estándares de calidad.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <Link href="/book">
              <Button size="lg" className="h-14 px-8 text-lg bg-primary hover:bg-primary/90 text-white shadow-[0_0_30px_rgba(255,77,0,0.5)] w-full md:w-auto border-none">
                Reservar Diagnóstico
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <a href="#track" className="w-full md:w-auto">
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg border-white/20 bg-white/5 backdrop-blur-sm text-slate-100 hover:bg-white/10 w-full md:w-auto">
                <Search className="mr-2 w-5 h-5" />
                Consultar Estado
              </Button>
            </a>
          </div>
        </div>

        {/* Gradient Overlay for bottom blend */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent z-10" />
      </section>

      {/* SERVICES GRID */}
      <section id="servicios" className="py-20 bg-slate-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Nuestros Servicios</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Soluciones integrales para el cuidado de tu vehículo con tecnología de punta.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, idx) => (
              <ServiceCard key={idx} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* SPECIALIZED BRANDS */}
      <section id="marcas" className="py-20 border-y border-white/5 bg-slate-900/20">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-white mb-16 text-center opacity-80 uppercase tracking-widest">Especialistas Certificados</h2>
          <div className="grid md:grid-cols-4 gap-12 items-center justify-items-center">
            {brands.map((brand, idx) => (
              <BrandCard key={idx} {...brand} />
            ))}
          </div>
        </div>
      </section>

      {/* TRACKING SECTION */}
      <section id="track" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 -skew-y-3 transform origin-left scale-110 pointer-events-none" />

        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto bg-slate-900 rounded-2xl p-8 md:p-12 border border-slate-800 shadow-2xl relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 p-12 opacity-5">
              <Wrench className="w-64 h-64 text-white" />
            </div>

            <div className="text-center mb-8 relative z-10">
              <h2 className="text-3xl font-bold text-white mb-2">Rastreo en Tiempo Real</h2>
              <p className="text-slate-400">Consulta el estado de tu vehículo en nuestro taller.</p>
            </div>

            {!loadingUser && !user ? (
              <div className="flex flex-col items-center justify-center py-8 text-center relative z-10 bg-slate-950/50 rounded-xl border border-slate-800 border-dashed">
                <Lock className="w-12 h-12 text-slate-500 mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Acceso Restringido</h3>
                <p className="text-slate-400 mb-6 max-w-md">Para consultar el estado de su vehículo, debe ser un cliente registrado e iniciar sesión.</p>
                <div className="flex gap-4">
                  <Link href="/auth/login">
                    <Button className="bg-primary hover:bg-primary/90 text-white">Iniciar Sesión</Button>
                  </Link>
                  <Link href="/book">
                    <Button variant="outline" className="border-slate-700 text-slate-300">Agendar Cita</Button>
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleTrackSubmit} className="flex flex-col md:flex-row gap-4 relative z-10">
                <Input
                  placeholder="Ej. AB123CD"
                  value={plate}
                  onChange={(e) => setPlate(e.target.value)}
                  className="h-14 text-lg bg-slate-950 border-slate-700 text-center md:text-left uppercase font-mono tracking-wider focus:ring-primary"
                />
                <Button type="submit" size="lg" className="h-14 px-8 text-lg bg-primary hover:bg-primary/90 text-white">
                  Consultar
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ALLIES / SPARE PARTS */}
      <section className="py-20 bg-slate-900/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Nuestros Aliados Comerciales</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {allies.map((ally, idx) => (
              <div key={idx} className="flex flex-col items-center justify-center p-6 bg-slate-950 rounded-xl border border-slate-800/50 hover:border-primary/30 transition-colors group cursor-default">
                <span className="text-xl font-bold text-slate-300 mb-1 group-hover:text-white transition-colors">{ally.name}</span>
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
            {[
              {
                name: "Baelor Targaryen",
                car: "Toyota Fortuner",
                text: "El mantenimiento de mi Fortuner fue impecable. La atención al detalle en el sistema de suspensión superó mis expectativas.",
                initials: "BT"
              },
              {
                name: "Geralt de Rivia",
                car: "Mitsubishi Montero Sport",
                text: "Necesitaba un diagnóstico preciso para el sistema 4x4. Encontraron el fallo que otros talleres ignoraron. Profesionales reales.",
                initials: "GR"
              },
              {
                name: "Harvey Specter",
                car: "JAC Arena",
                text: "Eficiencia y elegancia. Mi JAC Arena necesitaba servicio de frenos urgente y lo resolvieron en tiempo récord sin sacrificar calidad.",
                initials: "HS"
              }
            ].map((client, i) => (
              <Card key={i} className="bg-slate-900 border-slate-800 p-6 hover:border-primary/30 transition-colors hover:-translate-y-1 duration-300">
                <div className="flex gap-1 text-yellow-500 mb-4">
                  {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-slate-300 mb-6 italic">"{client.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-primary font-bold border border-slate-700">
                    {client.initials}
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm">{client.name}</p>
                    <p className="text-slate-500 text-xs">{client.car}</p>
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
