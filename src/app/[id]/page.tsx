import { Suspense } from "react";
import Table from "@/app/ui/puntos/table";
import { PuntosTableSkeleton } from "@/app/ui/skeletons";
import { fetchPuntosPages } from "@/app/lib/data";
import Pagination from "@/app/ui/puntos/pagination";
import AppLogo from "../ui/logo";
export default async function Page(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const id = params.id;
    const currentPage = 1;
    const totalPages = await fetchPuntosPages(id);
    return (
      <main className="flex min-h-screen flex-col p-6">
            <div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-52">
              <AppLogo/>
            </div>
    
        <div className="w-full mt-6">
          <Suspense key={id + currentPage} fallback={<PuntosTableSkeleton />}>
            <Table tag={id} currentPage={currentPage} />
          </Suspense>
          <div className="mt-5 flex w-full justify-center">
            <Pagination totalPages={totalPages} />
          </div>
        </div>
      
      </main>
      );
}

