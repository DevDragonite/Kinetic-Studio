import { BookingWizard } from '@/components/booking/BookingWizard';
import { setRequestLocale } from 'next-intl/server';

export default async function BookingPage(props: { params: Promise<{ locale: string }> }) {
    const params = await props.params;
    const {
        locale
    } = params;
    setRequestLocale(locale);

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
            <BookingWizard />
        </div>
    );
}
