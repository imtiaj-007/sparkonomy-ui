import Navbar from '@/layout/Navbar'
import Header from '@/layout/Header'
import Footer from '@/layout/Footer'

interface LayoutProps {
    children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="flex flex-col md:flex-row w-full min-h-screen bg-(--brand-p1)/20">
            <Navbar />
            <main className="flex-1 max-h-screen bg-background rounded-t-4xl md:rounded-t-none md:rounded-l-4xl p-4 md:p-6 lg:p-8 overflow-y-auto">
                <Header />
                {children}
                <Footer />
            </main>
        </div>
    )
}

export default Layout
