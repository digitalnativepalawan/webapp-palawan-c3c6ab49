import { createFileRoute, Link } from "@tanstack/react-router";
import { useContent } from "@/store/content";
import { AdminTrigger } from "@/components/AdminPanel";

export const Route = createFileRoute("/terms")({ component: TermsPage });

function TermsPage() {
  const { content } = useContent();
  return (
    <main className="min-h-screen bg-background text-ink">
      <header className="px-6 lg:px-10 pt-6 pb-4 text-[10px] uppercase tracking-[0.14em] border-b border-line">
        <Link to="/" className="text-ink-dim hover:text-accent">← BACK</Link>
      </header>
      <article
        className="legal-prose max-w-3xl mx-auto px-6 lg:px-10 py-10 text-ink"
        dangerouslySetInnerHTML={{ __html: content.legal?.terms || "" }}
      />
      <AdminTrigger />
    </main>
  );
}
