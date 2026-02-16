'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface VehicleStepProps {
    onNext: (vehicle: any) => void;
}

const BRANDS = [
    { id: 'jac', name: 'JAC', logo: '🚙' }, // Placeholder emoji
    { id: 'toyota', name: 'Toyota', logo: '🚗' },
    { id: 'changan', name: 'Changan', logo: '🚘' },
    { id: 'chery', name: 'Chery', logo: '🏎️' },
    { id: 'mitsubishi', name: 'Mitsubishi', logo: '🚔' },
    { id: 'nissan', name: 'Nissan', logo: '🚍' },
    { id: 'honda', name: 'Honda', logo: '🚖' },
    { id: 'other', name: 'Otro', logo: '❓' },
];

export function VehicleStep({ onNext }: VehicleStepProps) {
    const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
    const [details, setDetails] = useState({
        model: '',
        year: '',
        plate: '',
        vin: ''
    });

    const isFormValid = selectedBrand && details.model && details.year && details.plate;

    return (
        <div className="space-y-8">
            {/* Brand Grid */}
            <div>
                <h3 className="text-lg font-semibold mb-4 text-white">Marca del Vehículo</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {BRANDS.map((brand) => (
                        <Card
                            key={brand.id}
                            className={`cursor-pointer transition-all border-slate-700 bg-slate-800 hover:bg-slate-750 ${selectedBrand === brand.id ? 'border-primary ring-2 ring-primary ring-offset-2 ring-offset-slate-900' : 'hover:border-slate-500'
                                }`}
                            onClick={() => setSelectedBrand(brand.id)}
                        >
                            <CardContent className="flex flex-col items-center justify-center p-4">
                                <span className="text-4xl mb-2">{brand.logo}</span>
                                <span className="font-medium text-slate-200">{brand.name}</span>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Details Form (Only show if brand selected) */}
            {selectedBrand && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="space-y-2">
                        <Label htmlFor="model" className="text-slate-300">Modelo</Label>
                        <Input
                            id="model"
                            placeholder="Ej. T8 Pro / Corolla"
                            className="bg-slate-800 border-slate-700 text-white focus:border-primary"
                            value={details.model}
                            onChange={(e) => setDetails({ ...details, model: e.target.value })}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="year" className="text-slate-300">Año</Label>
                        <Input
                            id="year"
                            placeholder="Ej. 2024"
                            type="number"
                            className="bg-slate-800 border-slate-700 text-white focus:border-primary"
                            value={details.year}
                            onChange={(e) => setDetails({ ...details, year: e.target.value })}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="plate" className="text-slate-300">Placa</Label>
                        <Input
                            id="plate"
                            placeholder="Ej. AD452X"
                            className="bg-slate-800 border-slate-700 text-white focus:border-primary"
                            value={details.plate}
                            onChange={(e) => setDetails({ ...details, plate: e.target.value })}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="vin" className="text-slate-300">VIN (Opcional)</Label>
                        <Input
                            id="vin"
                            placeholder="Últimos 6 dígitos"
                            className="bg-slate-800 border-slate-700 text-white focus:border-primary"
                            value={details.vin}
                            onChange={(e) => setDetails({ ...details, vin: e.target.value })}
                        />
                    </div>

                    <div className="col-span-1 md:col-span-2 flex justify-end mt-4">
                        <Button
                            className="bg-primary hover:bg-primary/90 text-white px-8"
                            disabled={!isFormValid}
                            onClick={() => onNext({ brand: selectedBrand, ...details })}
                        >
                            Continuar
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
