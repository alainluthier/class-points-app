import { lusitana } from '@/app/ui/fonts';
import { AsistenciaTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import Fecha from './fecha';
import { fetchDates } from '@/app/lib/data';
import Table from '@/app/ui/ganar/table';
import { fechaNumero} from '@/app/lib/utils';
import { auth } from "@/auth";
export default async function Page(props: {
  searchParams?: Promise<{
    fecha?: number;
  }>;
}) {
    const hoy_numero = fechaNumero(new Date())
    const listDates = await fetchDates();
    const searchParams = await props.searchParams;
    const fecha = searchParams?.fecha || listDates[0].fecha_numero || hoy_numero;
    const session = await auth();
    return (
        <div className="w-full">
          <div className="flex w-full items-center justify-between">
            <h1 className={`${lusitana.className} text-2xl`}>
                Asistencia Clases
            </h1>
          </div>
          <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
            <Fecha fechas={listDates} />
          </div>
           <Suspense key={fecha} fallback={<AsistenciaTableSkeleton />}>
            <Table barrio={session?.user?.ward||''} fecha={fecha} id_user={session?.user?.id_user||0}/>
          </Suspense>
        </div>
      );
}