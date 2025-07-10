import type React from "react"
import type { Metadata } from "next"
import './globals.css'
import { Inter } from 'next/font/google'
import { Toaster } from "@/components/ui/sonner"
import { Providers } from "@/components/providers/Providers"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "NetLearn | Apprenez les Réseaux",
  description: "Plateforme d'apprentissage interactive pour maîtriser les technologies réseau",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning className="dark">
      <head>
        <link rel="icon" href="/favicon/image.png" />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <Providers>
          {children}
        </Providers>
        <Toaster />
      </body>
    </html>
  );
} 