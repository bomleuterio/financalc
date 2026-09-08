import Nav from './Nav';
import Footer from './Footer';

interface Props {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export default function StaticPage({ title, subtitle, children }: Props) {
  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-4 py-12">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
            {subtitle && <p className="mt-2 text-muted-foreground text-lg">{subtitle}</p>}
          </div>
          <div className="space-y-4 text-sm leading-relaxed text-foreground/90 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-foreground [&_h2]:mt-8 [&_h2]:mb-2 [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-foreground [&_h3]:mt-4 [&_h3]:mb-1 [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 [&_li]:leading-relaxed">
            {children}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
