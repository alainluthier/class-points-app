import type { Metadata } from "next";
import "./globals.css";
import { inter } from '@/app/ui/fonts';
export const metadata: Metadata = {
  title: "Puntos App",
  description: "Aplicación de Puntos para Clases",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body  className={`${inter.className} antialiased`}>{children}
        {children}
      </body>
    </html>
  );
}
