import { BookingWizard } from '@/components/booking/BookingWizard';
import { setRequestLocale } from 'next-intl/server';
import { createClient } from '@/utils/supabase/server';
import { redirect } from '@/i18n/routing';

export default async function BookingPage(props: { params: Promise<{ locale: string }> }) {
    const params = await props.params;
    const {
        locale
    } = params;
    setRequestLocale(locale);

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect({ href: '/auth/login', locale });
    }

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
            <BookingWizard />
        </div>
    );
}
