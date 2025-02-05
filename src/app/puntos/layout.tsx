
import { auth } from "@/auth";
import SideNav from "../ui/puntos/sidenav";
export default async function Layout({ children}: { children: React.ReactNode}) {
  const session = await auth();
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav rol={session?.user?.role||''} />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}
