import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6">
      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(var(--neon-cyan) 1px, transparent 1px), linear-gradient(90deg, var(--neon-cyan) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative text-center">
        <h1
          className="glitch-text text-8xl md:text-[12rem] font-bold tracking-[-0.06em] text-white mb-4"
          data-text="404"
        >
          404
        </h1>
        <p className="text-lg text-white/40 mb-8">
          This page doesn&apos;t exist in our dimension.
        </p>
        <Link
          href="/"
          className="inline-block px-8 py-4 rounded-xl text-base font-medium text-black bg-[var(--neon-cyan)] hover:brightness-110 transition-all glow-box-cyan"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
