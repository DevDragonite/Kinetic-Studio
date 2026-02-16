'use client';

import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, Upload, X, Image as ImageIcon } from 'lucide-react';
import { Database } from '@/types/database';

type Job = Database['public']['Tables']['job_cards']['Row'];

interface EvidenceUploaderProps {
    jobId: string;
    type: 'before' | 'after';
    currentPhotos: string[] | null;
    onUploadComplete: () => void;
}

export function EvidenceUploader({ jobId, type, currentPhotos, onUploadComplete }: EvidenceUploaderProps) {
    const [uploading, setUploading] = useState(false);
    const supabase = createClient();

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;

        setUploading(true);
        const files = Array.from(e.target.files);
        const uploadedUrls: string[] = [];

        try {
            for (const file of files) {
                const fileExt = file.name.split('.').pop();
                const fileName = `${type}_${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
                const filePath = `${jobId}/${fileName}`;

                // 1. Upload to Storage
                const { error: uploadError } = await supabase.storage
                    .from('evidence')
                    .upload(filePath, file);

                if (uploadError) throw uploadError;

                // 2. Get Public URL
                const { data: { publicUrl } } = supabase.storage
                    .from('evidence')
                    .getPublicUrl(filePath);

                uploadedUrls.push(publicUrl);
            }

            // 3. Update Database
            const newPhotos = [...(currentPhotos || []), ...uploadedUrls];
            const column = type === 'before' ? 'before_photos' : 'after_photos';

            const { error: dbError } = await supabase
                .from('job_cards')
                .update({ [column]: newPhotos })
                .eq('id', jobId);

            if (dbError) throw dbError;

            onUploadComplete();
        } catch (error) {
            console.error('Error uploading evidence:', error);
            alert('Error uploading photos');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-slate-300 capitalize">
                    {type === 'before' ? 'Ingreso (Daños/Estado)' : 'Salida (Reparación Final)'}
                </h4>
                <div className="relative">
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        disabled={uploading}
                    />
                    <Button size="sm" variant="outline" className="gap-2" disabled={uploading}>
                        {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                        Subir Fotos
                    </Button>
                </div>
            </div>

            {currentPhotos && currentPhotos.length > 0 ? (
                <div className="grid grid-cols-3 gap-2">
                    {currentPhotos.map((url, idx) => (
                        <div key={idx} className="relative aspect-square rounded-md overflow-hidden border border-slate-700 group">
                            <img src={url} alt="Evidence" className="w-full h-full object-cover" />
                            {/* Placeholder for delete function */}
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <Button variant="destructive" size="icon" className="h-6 w-6">
                                    <X className="w-3 h-3" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="border-2 border-dashed border-slate-800 rounded-lg p-6 flex flex-col items-center justify-center text-slate-500 bg-slate-900/50">
                    <ImageIcon className="w-8 h-8 mb-2 opacity-50" />
                    <p className="text-xs">No hay fotos registradas</p>
                </div>
            )}
        </div>
    );
}
