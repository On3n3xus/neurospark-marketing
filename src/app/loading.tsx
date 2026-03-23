export default function Loading() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div
          className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
          style={{ borderColor: "var(--neon-cyan)", borderTopColor: "transparent" }}
        />
        <p className="text-sm text-white/30 font-mono">Loading...</p>
      </div>
    </div>
  );
}
