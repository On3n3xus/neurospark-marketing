import Link from "next/link";
import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Insights on branding, web development, video production, and digital marketing from the Neurospark team.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen bg-background">
      {/* Nav spacer */}
      <div className="h-[52px]" />

      <main className="max-w-4xl mx-auto px-6 py-16 md:py-24">
        <div className="mb-16">
          <p className="section-label mb-3">Blog</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-[-0.03em] text-text-primary mb-4">
            Insights & Ideas
          </h1>
          <p className="text-lg text-text-secondary max-w-xl">
            Thoughts on branding, web development, video production, and growing
            businesses through creative strategy.
          </p>
        </div>

        <div className="space-y-8">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block card p-8 group"
            >
              <div className="flex items-center gap-3 mb-3">
                <time className="text-xs text-text-tertiary font-mono">
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
                <span className="text-text-tertiary">·</span>
                <span className="text-xs text-text-tertiary font-mono">
                  {post.readingTime}
                </span>
              </div>
              <h2 className="text-xl md:text-2xl font-semibold text-text-primary group-hover:text-accent transition-colors mb-2 tracking-tight">
                {post.title}
              </h2>
              <p className="text-sm text-text-secondary leading-relaxed">
                {post.excerpt}
              </p>
              <p className="text-xs text-text-tertiary mt-3">
                By {post.author}
              </p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
