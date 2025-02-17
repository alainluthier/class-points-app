'use client';
 
import { useEffect } from 'react';
import Breadcrumbs from '../ui/breadcrumbs';
 
export default function Error({
  error
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error);
  }, [error]);
 
  return (
    <main className="flex h-full flex-col items-center justify-center mt-20">
        <h2 className="text-center">Mensaje: No se encontró al cliente</h2>
      <Breadcrumbs
              breadcrumbs={[
                { label: 'Volver', href: '/' }
              ]}
            />

        
      
    </main>
  );
}