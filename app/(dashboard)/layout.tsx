import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"

import { Header } from "./_components/header/header"
import { Sidebar } from "./_components/sidebar/sidebar"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({
  children
}: DashboardLayoutProps) {
  return (
    <main className="h-screen bg-white min-h-max flex items-center">
      <Analytics />
      <SpeedInsights />
      <Sidebar />
      <div className="pl-[270px] h-full w-full">
        <Header />
        {children}
      </div>
    </main>
  )
}