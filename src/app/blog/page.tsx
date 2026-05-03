import Link from "next/link";
import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import TerminalShell from "@/components/terminal/TerminalShell";
import PageHero from "@/components/terminal/PageHero";

const MONO = "var(--font-jetbrains-mono), ui-monospace, monospace";
const DISPLAY = "var(--font-space-grotesk), system-ui, sans-serif";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Field notes from Neurospark — AI marketing operator playbooks, case files, and tactical breakdowns for small and mid-size teams.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <TerminalShell>
      <PageHero
        route="blog"
        title="Field notes."
        intro="Operator playbooks, case files, and tactical breakdowns for small and mid-size marketing teams."
      />
      <section style={{ paddingBottom: 80 }}>
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            border: "1px solid var(--ns-line)",
          }}
        >
          {posts.map((post, i) => (
            <li
              key={post.slug}
              style={{
                borderBottom:
                  i < posts.length - 1 ? "1px solid var(--ns-line)" : "none",
              }}
            >
              <Link
                href={`/blog/${post.slug}`}
                className="post-row"
                style={{
                  display: "grid",
                  gridTemplateColumns: "60px 1fr 160px 80px 40px",
                  gap: 20,
                  alignItems: "center",
                  padding: "26px 24px",
                  textDecoration: "none",
                  color: "inherit",
                  transition: "background .2s",
                }}
              >
                <div
                  style={{
                    fontFamily: MONO,
                    fontSize: 11,
                    color: "var(--ns-violet)",
                    letterSpacing: "0.18em",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: DISPLAY,
                      fontWeight: 500,
                      fontSize: 20,
                      color: "var(--ns-text)",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {post.title}
                  </div>
                  <div
                    style={{
                      marginTop: 4,
                      fontFamily: MONO,
                      fontSize: 11,
                      color: "var(--ns-text-dim)",
                    }}
                  >
                    {post.excerpt}
                  </div>
                </div>
                <div
                  style={{
                    fontFamily: MONO,
                    fontSize: 10,
                    color: "var(--ns-text-faint)",
                    letterSpacing: "0.15em",
                  }}
                >
                  {post.author}
                </div>
                <div
                  style={{
                    fontFamily: MONO,
                    fontSize: 10,
                    color: "var(--ns-text-faint)",
                    letterSpacing: "0.15em",
                  }}
                >
                  {post.readingTime}
                </div>
                <div
                  className="post-arr"
                  style={{
                    color: "var(--ns-text-faint)",
                    textAlign: "right",
                  }}
                >
                  ↗
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <style>{`
        .post-row:hover { background: rgba(124,92,255,0.04); }
        .post-row:hover .post-arr { color: var(--ns-violet); }
        @media (max-width: 880px) {
          .post-row { grid-template-columns: 40px 1fr 30px !important; gap: 12px !important; }
          .post-row > *:nth-child(3), .post-row > *:nth-child(4) { display: none; }
        }
      `}</style>
    </TerminalShell>
  );
}
