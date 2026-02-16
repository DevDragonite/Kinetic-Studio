'use client';

import { usePathname, useRouter } from '@/i18n/routing';
import { useLocale } from 'next-intl';
import { useParams } from 'next/navigation';
import { useTransition } from 'react';

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
                { locale: nextLocale }
            );
        });
    }

    const flags = {
        en: '🇺🇸',
        es: '🇻🇪',
        pt: '🇧🇷'
    };

    return (
        <div className="flex gap-2">
            {['es', 'en', 'pt'].map((cur) => (
                <button
                    key={cur}
                    onClick={() => onSelectChange(cur)}
                    disabled={isPending}
                    className={`text-xl transition-opacity hover:opacity-100 ${locale === cur ? 'opacity-100 scale-110' : 'opacity-40 grayscale'
                        }`}
                    title={cur.toUpperCase()}
                >
                    {flags[cur as keyof typeof flags]}
                </button>
            ))}
        </div>
    );
}
