import { fechaNumero, formatDate } from "@/app/lib/utils"
import Table from "@/app/ui/estrella/table"
import { lusitana } from "@/app/ui/fonts"
import { AsistenciaTableSkeleton } from "@/app/ui/skeletons"
import { auth } from "@/auth"
import { Suspense } from "react"

export default async function Page() {
    const hoy_numero = fechaNumero(new Date())
    const session = await auth();
    return (
        <div className="w-full">
            <div className="block w-full items-center justify-between">
                <h1 className={`${lusitana.className} text-2xl`}>
                    Estrellitas
                </h1>
                <h2 className={`${lusitana.className} text-lg`}>
                    Fecha: {formatDate(hoy_numero)}
                </h2>
            </div>
            <Suspense key={hoy_numero} fallback={<AsistenciaTableSkeleton />}>
                <Table barrio={session?.user?.ward || ''} fecha={hoy_numero} id_user={session?.user?.id_user || 0} />
            </Suspense>
        </div>
    )
}

