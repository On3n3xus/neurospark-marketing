import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getPostBySlug, posts } from "@/lib/blog";
import BlogTerminalShell from "@/components/terminal/BlogTerminalShell";
import JsonLd from "@/components/terminal/JsonLd";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

const MONO = "var(--font-jetbrains-mono), ui-monospace, monospace";

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  // Dynamic MDX import — content lives in src/content/blog/[slug].mdx
  let MDXContent: React.ComponentType;
  try {
    const mod = await import(`@/content/blog/${slug}.mdx`);
    MDXContent = mod.default;
  } catch {
    notFound();
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    author: { "@type": "Person", name: post.author },
    datePublished: post.date,
    mainEntityOfPage: { "@type": "WebPage", "@id": `https://neurosparkmarketing.com/blog/${slug}` },
    inLanguage: "en-US",
  };

  return (
    <BlogTerminalShell meta={post}>
      <JsonLd data={articleSchema} />
      <MDXContent />
      <hr />
      <p style={{ fontFamily: MONO, fontSize: 11, color: "var(--ns-text-faint)", letterSpacing: "0.18em", textTransform: "uppercase" }}>
        // Read next
      </p>
      <p>
        Want this for your team?{" "}
        <Link href="/contact">Open a channel</Link> · or{" "}
        <Link href="/services">browse the modules</Link>.
      </p>
    </BlogTerminalShell>
  );
}
