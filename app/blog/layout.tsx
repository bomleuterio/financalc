import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-4 py-12">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
}
