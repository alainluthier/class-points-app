'use client';

import { FechaDB } from '@/app/lib/definitions';
import { formatDateToLocal } from '@/app/lib/utils';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';


export default function Fecha({ dates }: { dates: FechaDB[] }) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    function handleSearch(term: string) {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set('fecha', term);
        } else {
            params.delete('fecha');
        }
        replace(`${pathname}?${params.toString()}`);
    }

    return (
        <div className="w-full max-w-sm min-w-[200px]">
            <label htmlFor="fechaAsistencia"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Fecha de Asistencia
            </label>
            <select
                key={"date-select"}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                onChange={(e) => {
                    handleSearch(e.target.value);
                }}
                defaultValue={searchParams.get('fecha')?.toString()}
            >
                <option value="" disabled>
                    Seleccione una fecha
                </option>

                {
                    dates.map((date) => (
                        <option value={formatDateToLocal(date.date)} key={formatDateToLocal(date.date)}>
                            {formatDateToLocal(date.date)}
                        </option>
                    ))
                }
            </select>
        </div>
    );
}

