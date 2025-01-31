import { lusitana } from '@/app/ui/fonts';
import { AsistenciaTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import Fecha from './fecha';
import { fetchDates } from '@/app/lib/data';
import Table from '@/app/ui/ganar/table';
import { formatDateToLocal } from '@/app/lib/utils';
export default async function Page(props: {
  searchParams?: Promise<{
    fecha?: string;
  }>;
}) {
    const listDates = await fetchDates();
    const searchParams = await props.searchParams;
    const fecha = searchParams?.fecha || formatDateToLocal(listDates[0].date.toISOString());
    const barrio='16 de Julio'
    return (
        <div className="w-full">
          <div className="flex w-full items-center justify-between">
            <h1 className={`${lusitana.className} text-2xl`}>
                Asistencia Clases
            </h1>
          </div>
          <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
            <Fecha dates={listDates} />
          </div>
           <Suspense key={fecha} fallback={<AsistenciaTableSkeleton />}>
            <Table barrio={barrio} fecha={fecha} />
          </Suspense>
        </div>
      );
}