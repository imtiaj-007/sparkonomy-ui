import Layout from '@/layout'
import { CirclePlus } from 'lucide-react'
import KeyOverview from '@/components/KeyOverview'

function App() {
    return (
        <Layout>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4 md:py-12">
                <div className="space-y-4">
                    <div className="flex flex-col items-center bg-gray-100 rounded-4xl md:rounded-2xl lg:rounded-xl p-8">
                        <CirclePlus className="text-(--brand-p1) size-10 mb-4" />
                        <h3 className="text-2xl font-medium bg-gradient-to-b from-(--brand-p2) via-(--brand-p1) to-(--brand-p3) bg-clip-text text-transparent">
                            Create New Invoice
                        </h3>
                        <p className="text-sm">
                            Start by creating and sending new invoice
                        </p>
                    </div>
                    <p className="text-center text-(--brand-p1) text-sm font-medium">
                        Or Upload an existing invoice and set payment reminder
                    </p>
                </div>
                <div className="flex flex-col items-center gap-4">
                    <KeyOverview />
                </div>
            </div>
        </Layout>
    )
}

export default App
