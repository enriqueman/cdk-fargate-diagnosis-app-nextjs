
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css"
export const metadata = {
  title: 'Sistema de Diagnóstico Médico',
  description: 'Herramienta para diagnóstico médico basado en síntomas',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <main className="min-h-screen">
            {children}
          </main>
        </TooltipProvider>
      </body>
    </html>
  );
}