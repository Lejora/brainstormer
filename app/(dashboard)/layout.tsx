import { Header } from "./_components/header/header"
import { Sidebar } from "./_components/sidebar/sidebar"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({
  children
}: DashboardLayoutProps) {
  return (
    <main className="h-screen bg-gray-50 min-h-max">
      <Sidebar />
      <div className="pl-[250px] h-full">
        <Header />
        {children}
      </div>
    </main>
  )
}