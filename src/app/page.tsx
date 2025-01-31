'use client'
import { useRouter } from 'next/navigation'
import { useState } from "react";
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { lusitana } from '@/app/ui/fonts';
import AppLogo from "./ui/logo";
import {
  Scanner
} from "@yudiel/react-qr-scanner";


export default function Home() {
  const router = useRouter()
  const [deviceId] = useState<string | undefined>(undefined);
  const [pause, setPause] = useState(false);

  const handleScan = async (data: string) => {
    setPause(true);
    try {
      router.push('/'+data)
    } catch (error: unknown) {
      console.log(error);
    } finally {
      setPause(false);
    }
  };
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-52">
        <AppLogo/>
      </div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
          <p
            className={`${lusitana.className} text-xl text-gray-800 md:text-3xl md:leading-normal`}
          >
            <strong>Bienvenido a la App Puntos</strong>. Inicia sesión si eres maestro o escanea el QR de tu tarjeta para ver tu saldo.
          </p>
          <Link
            href="/login"
            className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
          >
            <span>Iniciar Sesión</span> <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
        </div>
        <div className="flex items-center justify-center mr-10 md:w-3/5 md:px-28 md:py-12">
          <Scanner
            formats={[
              "qr_code",
              "micro_qr_code",
              "rm_qr_code"
            ]}
            constraints={{
              deviceId: deviceId,
            }}
            onScan={(detectedCodes) => {
              handleScan(detectedCodes[0].rawValue);
            }}
            onError={(error) => {
              console.log(`onError: ${error}'`);
            }}
            styles={{ container: { height: "360px", width: "300px",margin: "auto" }}}
            components={{
              audio: true,
              onOff: true,
              torch: true,
              zoom: true,
              finder: true,
              tracker: undefined,
            }}
            allowMultiple={true}
            scanDelay={2000}
            paused={pause}
          />
        </div>
      </div>
    </main>
  );
}
