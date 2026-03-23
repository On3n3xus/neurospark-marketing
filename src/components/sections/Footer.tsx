export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface px-6 py-6">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <p className="text-[13px] text-text-tertiary">
          &copy; {new Date().getFullYear()} Neurospark Marketing
        </p>
        <p className="text-[13px] text-text-tertiary hidden sm:block">
          Full-Service Creative Agency
        </p>
      </div>
    </footer>
  );
}
