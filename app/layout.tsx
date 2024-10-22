import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import ResponsiveNav from "@/components/navigation/ResponsiveNav"
import { ThemeProvider } from 'next-themes'
import { AuthProvider } from '@/contexts/auth-context'
import Script from 'next/script'
import ErrorBoundary from "@/components/ErrorBoundary"
import { AIChatbot } from "@/components/chat/AIChatbot"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "J&S Travels - Your Adventure Awaits",
    template: "%s | J&S Travels"
  },
  description: "Join J&S on their exciting travel adventures around the world. Plan your trips, discover new destinations, and make unforgettable memories.",
  icons: {
    icon: '/favicon.ico',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
          strategy="beforeInteractive"
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthProvider>
            <ErrorBoundary>
              <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
                <ResponsiveNav />
                <main className="container mx-auto px-4 py-8 flex-grow">
                  {children}
                </main>
                <AIChatbot />
              </div>
            </ErrorBoundary>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}