"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
      <div className="text-center">
        <div className="text-5xl mb-6">⚠</div>
        <h1 className="text-2xl font-semibold text-text-primary mb-2">
          Something went wrong
        </h1>
        <p className="text-text-secondary mb-8">
          An unexpected error occurred. Please try again.
        </p>
        <button onClick={reset} className="btn-pill px-8 py-3 cursor-pointer">
          Try Again
        </button>
      </div>
    </div>
  );
}
