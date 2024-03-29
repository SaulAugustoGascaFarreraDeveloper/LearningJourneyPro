import { cn } from '@/lib/utils'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import { Providers } from '@/components/Providers'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({ subsets: ['latin'] })


export const metadata: Metadata = {
  title: 'Learning Journey',
  description: 'Generated by Saul Augusto Gasca Farrera',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={cn(inter.className,"antialiased min-h-screen pt-16")}>
        <Providers>

          <Navbar />
          {children}

          <Toaster />

        </Providers>
        
      </body>
    </html>
  )
}
