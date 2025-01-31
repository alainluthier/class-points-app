import { fetchFilteredExtracts } from "@/app/lib/data";
import { inter } from "@/app/ui/fonts";
import Breadcrumbs from "../breadcrumbs";
import { formatDate } from "@/app/lib/utils";
export default async function ProcesosTable({
  tag,
  currentPage,
}: {
  tag: string;
  currentPage: number;
}) {
  const forms = await fetchFilteredExtracts(tag, currentPage);

  return (
    <div className="mt-6 flow-root">
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Volver', href: '/' },
          {
            label: forms.saldoLista[0].apellidos_nombres,
            href: `/${forms.saldoLista[0].tag}`,
            active: true,
          },
        ]}
      />
      <div className="flex w-full items-center justify-between">
        <h1 className={`${inter.className} text-2xl`}>
          Saldo: {forms.saldoNumero}
        </h1>
      </div>
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {forms.saldoLista?.map((form) => (
              <div
                key={form.fecha_numero}
                className="w-full rounded-md bg-white p-4"
              >
                <div className="flex w-full items-center justify-between">
                  <div>
                    <p className="text-xl font-medium">
                      Monto: {form.monto}
                    </p>
                    <p>{form.motivo}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between border-b pb-2 pt-2">
                  <p>{formatDate(form.fecha_numero)}</p>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Fecha
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Motivo
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Monto
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {forms.saldoLista?.map((form) => (
                <tr
                  key={form.fecha_numero}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    {formatDate(form.fecha_numero)}
                  </td>
                  <td className="text-wrap px-3 py-3">
                    {form.motivo}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {form.monto}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
