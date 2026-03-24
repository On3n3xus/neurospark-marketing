import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getAllPosts, getPostBySlug } from "@/lib/blog";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Dynamic import of MDX content
  let Content: React.ComponentType;
  try {
    const mdxModule = await import(`@/content/blog/${slug}.mdx`);
    Content = mdxModule.default;
  } catch {
    notFound();
  }

  // JSON-LD Article schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: "Neurospark Marketing",
    },
    description: post.excerpt,
  };

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Nav */}
      <nav className="sticky top-0 z-40 px-6 py-4 bg-surface/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link
            href="/blog"
            className="text-sm text-text-secondary hover:text-accent transition-colors"
          >
            ← Blog
          </Link>
          <span className="text-xs text-text-tertiary font-mono">
            {post.readingTime}
          </span>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-6 py-16">
        {/* Header */}
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <time className="text-sm text-text-tertiary font-mono">
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <span className="text-text-tertiary">·</span>
            <span className="text-sm text-text-tertiary">{post.author}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-[-0.03em] text-text-primary mb-4">
            {post.title}
          </h1>
          <p className="text-lg text-text-secondary">{post.excerpt}</p>
        </header>

        <div className="h-px bg-border mb-12" />

        {/* MDX Content */}
        <article className="prose-neurospark">
          <Content />
        </article>

        {/* CTA */}
        <div className="mt-16 pt-8 border-t border-border text-center">
          <p className="text-text-secondary mb-4">Enjoyed this article?</p>
          <Link href="/#contact" className="btn-pill px-8 py-3">
            Work with Us
          </Link>
        </div>
      </main>
    </div>
  );
}
