import { lusitana } from "../ui/fonts";
import { Suspense } from 'react';
import { CardsSkeleton } from "../ui/skeletons";
import CardWrapper from "../ui/puntos/cards";
export default async function Page() {
    return (
        <main>
            <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
                Reporte
            </h1>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <Suspense fallback={<CardsSkeleton />}>
                <CardWrapper />
                </Suspense>
            </div>
        </main>
        // <div className="w-full">
        //     <form action="">
        //         <div className="mb-4">
        //             <select
        //                 className="peer block cursor-pointer rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
        //                 name="" id="">
        //                 <option value="lun-03-Feb">lun-03-Feb</option>
        //             </select>
        //         </div>
        //     </form>
        //     <table className="min-w-full text-gray-900">
        //         <thead className="rounded-lg text-left text-sm font-normal">
        //             <tr>
        //                 <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
        //                     Apellidos y Nombre
        //                 </th>
        //                 <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
        //                     Asistencia
        //                 </th>
        //                 <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
        //                     Puntulidad
        //                 </th>
        //                 <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
        //                     Escrituras
        //                 </th>
        //                 <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
        //                     Total
        //                 </th>
        //             </tr>
        //         </thead>
        //         <tbody className="bg-white">
        //             <tr 
        //             className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
        //                 <td className="whitespace-nowrap py-3 pl-6 pr-3">
        //                     Garcia Poma Dereck
        //                 </td>
        //                 <td>
        //                     <input type="checkbox" name="" id="" />
        //                 </td>
        //                 <td>
        //                     <input type="checkbox" name="" id="" />
        //                 </td>
        //                 <td>
        //                     <input type="checkbox" name="" id="" />
        //                 </td>
        //                 <td>
        //                     50
        //                 </td>
        //             </tr>
        //         </tbody>
        //     </table>
        // </div>
    );
}