"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6">
      <div className="text-center">
        <div className="text-6xl mb-6 glow-magenta">⚠</div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">
          Something went wrong
        </h1>
        <p className="text-white/40 mb-8">
          An unexpected error occurred. Please try again.
        </p>
        <button
          onClick={reset}
          className="inline-block px-8 py-4 rounded-xl text-base font-medium text-black bg-[var(--neon-cyan)] hover:brightness-110 transition-all glow-box-cyan cursor-pointer"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
