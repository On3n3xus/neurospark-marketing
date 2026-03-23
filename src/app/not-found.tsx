import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
      <div className="text-center">
        <h1 className="text-8xl md:text-[12rem] font-bold tracking-[-0.06em] text-text-primary/10">
          404
        </h1>
        <p className="text-lg text-text-secondary mb-8 -mt-4">
          This page doesn&apos;t exist.
        </p>
        <Link href="/" className="btn-pill px-8 py-3">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
