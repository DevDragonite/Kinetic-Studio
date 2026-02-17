'use client';

import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter, Link } from '@/i18n/routing';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { UserPlus, Loader2, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useTranslations } from 'next-intl';

export default function RegisterPage() {
    const t = useTranslations('Register');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const supabase = createClient();
    const { toast } = useToast();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: name,
                },
            },
        });

        if (error) {
            toast({
                title: t('errorTitle'),
                description: error.message,
                variant: "destructive",
            });
            setLoading(false);
            return;
        }

        toast({
            title: t('successTitle'),
            description: t('successMessage'),
        });

        // Redirect to login or home, but usually sign up requires email verification
        // For now, let's redirect to login so they can check their email
        router.push('/auth/login');
        router.refresh();
    };

    return (
        <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
            {/* Background Decoration */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-950 z-0" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 blur-[100px] rounded-full pointer-events-none" />

            {/* Back to Home Button */}
            <div className="w-full max-w-md mb-6 relative z-20">
                <Link href="/" className="inline-flex items-center text-slate-400 hover:text-primary transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    {t('backToHome')}
                </Link>
            </div>

            <Card className="w-full max-w-md bg-slate-900 border-slate-800 relative z-10 shadow-2xl">
                <CardHeader className="text-center pb-2">
                    <div className="mx-auto w-12 h-12 bg-primary rounded-xl flex items-center justify-center mb-4 transform -rotate-3 shadow-lg shadow-primary/20">
                        <UserPlus className="text-white w-6 h-6" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-white">{t('title')}</CardTitle>
                    <CardDescription>{t('subtitle')}</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleRegister} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">{t('nameLabel')}</label>
                            <Input
                                type="text"
                                placeholder={t('namePlaceholder')}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="bg-slate-950 border-slate-700 text-white"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">{t('emailLabel')}</label>
                            <Input
                                type="email"
                                placeholder={t('emailPlaceholder')}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="bg-slate-950 border-slate-700 text-white"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">{t('passwordLabel')}</label>
                            <Input
                                type="password"
                                placeholder={t('passwordPlaceholder')}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="bg-slate-950 border-slate-700 text-white"
                                required
                            />
                        </div>
                        <Button
                            type="submit"
                            className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-11 mt-2"
                            disabled={loading}
                        >
                            {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                            {loading ? t('loadingButton') : t('submitButton')}
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-center border-t border-slate-800 pt-6">
                    <p className="text-sm text-slate-400">
                        {t('hasAccount')}{' '}
                        <Link href="/auth/login" className="text-primary hover:underline font-medium">
                            {t('loginLink')}
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}
