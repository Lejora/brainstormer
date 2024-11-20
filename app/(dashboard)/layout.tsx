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
      <Sidebar />
      <div className="pl-[270px] h-full w-full">
        <Header />
        {children}
      </div>
    </main>
  )
}