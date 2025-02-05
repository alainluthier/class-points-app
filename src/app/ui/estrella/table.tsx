import { fetchEstrellitas } from "@/app/lib/data";
import Puntaje from "./puntaje";

export default async function EstrellaTable({  barrio,
    fecha,
    id_user,}:{
        barrio: string;
        fecha: number;
        id_user: number; 
    }){
        const attendaces = await fetchEstrellitas(barrio, fecha);
    return (
         <div className="mt-4 flow-root">
              <div className="inline-block min-w-full align-middle">
                <div className="rounded-lg bg-gray-50 p-1 md:pt-0">
                  <div className="md:hidden">
                    {attendaces?.map((att) => (
                      <div
                        key={att.id_client}
                        className="mb-2 w-full rounded-md bg-white p-2"
                      >
                        <div className="flex items-center justify-between border-b pb-2">
                          <div>
                            <div className="mb-2 flex items-center">
                              <p>{att.apellidos_nombres}</p>
                            </div>
                            <Puntaje attendance={att} id_user={id_user}/>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <table className="hidden min-w-full text-gray-900 md:table">
                    <thead className="rounded-lg text-left text-sm font-normal">
                      <tr>
                        <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                          Apellidos y Nombre
                        </th>
                        <th scope="col" className="px-3 py-5 font-medium">
                          Puntos
                        </th>
                        <th scope="col" className="px-3 py-5 font-medium">
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      {attendaces?.map((att) => (
                        <tr
                          key={att.id_client}
                          className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                        >
                          <td className="whitespace-nowrap px-3 py-3">
                            {att.apellidos_nombres}
                          </td>
                          <td>
                          <Puntaje attendance={att} id_user={id_user}/>
                          </td>
                          <td className="whitespace-nowrap px-3 py-3">
                            {att.estrella}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
    )
}

