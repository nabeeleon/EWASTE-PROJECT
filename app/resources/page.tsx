import Resources from '@/components/Resources'

export default function ResourcesPage() {
  return (
    <main className="min-h-screen text-white tech-gradient grid-background">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold text-red-500 mb-8">DEBUG: Resources Page Loaded</h1>
        <Resources />
      </div>
    </main>
  )
} 