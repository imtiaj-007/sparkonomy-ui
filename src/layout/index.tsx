import Footer from '@/layout/Footer'
import Navbar from '@/layout/Navbar'

interface LayoutProps {
    children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="flex flex-col md:flex-row w-full min-h-screen bg-(--brand-p1)/20">
            <Navbar />
            <main className="flex-1 bg-background rounded-t-4xl md:rounded-t-none md:rounded-l-4xl p-8">
                {children}
                <Footer />
            </main>
        </div>
    )
}

export default Layout
