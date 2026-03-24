import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-6 mt-10">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-semibold tracking-tight mb-4 mt-8">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-semibold mb-3 mt-6">{children}</h3>
    ),
    p: ({ children }) => (
      <p className="text-base leading-relaxed text-text-secondary mb-4">
        {children}
      </p>
    ),
    a: ({ href, children }) => (
      <a
        href={href}
        className="text-accent underline underline-offset-4 hover:text-accent/80"
      >
        {children}
      </a>
    ),
    ul: ({ children }) => (
      <ul className="list-disc pl-6 mb-4 space-y-1 text-text-secondary">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal pl-6 mb-4 space-y-1 text-text-secondary">
        {children}
      </ol>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-accent/30 pl-4 italic text-text-secondary my-6">
        {children}
      </blockquote>
    ),
    code: ({ children }) => (
      <code className="bg-surface-alt px-1.5 py-0.5 rounded text-sm font-mono text-text-primary">
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre className="bg-[#1d1d1f] text-white rounded-xl p-4 overflow-x-auto mb-6 text-sm">
        {children}
      </pre>
    ),
    ...components,
  };
}
