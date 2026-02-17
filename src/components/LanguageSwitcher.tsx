'use client';

import { usePathname, useRouter } from '@/i18n/routing';
import { useLocale } from 'next-intl';
import { useParams } from 'next/navigation';
import { useTransition } from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

export function LanguageSwitcher() {
    const locale = useLocale();
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const pathname = usePathname();
    const params = useParams();

    function onSelectChange(nextLocale: string) {
        startTransition(() => {
            router.replace(
                // @ts-expect-error -- TypeScript will validate that only known `params`
                // are used in combination with a given `pathname`. Since the two will
                // always match for the current route, we can skip runtime checks.
                { pathname, params },
                { locale: nextLocale, scroll: false }
            );
        });
    }

    const languages = {
        en: { label: 'English', flag: 'https://flagcdn.com/w40/us.png' },
        es: { label: 'Español', flag: 'https://flagcdn.com/w40/ve.png' },
        pt: { label: 'Português', flag: 'https://flagcdn.com/w40/br.png' }
    };

    const currentLang = languages[locale as keyof typeof languages] || languages.en;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-slate-800 hover:text-white h-10 px-3 text-slate-300 gap-2">
                <img
                    src={currentLang.flag}
                    alt={currentLang.label}
                    className="w-5 h-auto rounded-sm object-cover"
                />
                <span className="hidden md:inline font-semibold">{currentLang.label}</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-slate-900 border-slate-800 text-slate-200 min-w-[150px]">
                {Object.entries(languages).map(([key, { label, flag }]) => (
                    <DropdownMenuItem
                        key={key}
                        onClick={() => onSelectChange(key)}
                        disabled={isPending}
                        className={`cursor-pointer flex items-center gap-3 px-3 py-2 hover:bg-slate-800 focus:bg-slate-800 ${locale === key ? 'text-primary font-bold bg-slate-800/50' : ''
                            }`}
                    >
                        <img src={flag} alt={label} className="w-5 h-auto rounded-sm shadow-sm" />
                        {label}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
