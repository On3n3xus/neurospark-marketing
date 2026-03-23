"use client";

interface CTAButtonProps {
  label: string;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "secondary" | "outline";
}

export default function CTAButton({ label, onClick, className = "", variant = "primary" }: CTAButtonProps) {
  const baseClasses = "font-medium rounded-full transition-all duration-300 active:scale-95";
  
  const variants = {
    primary: "bg-[var(--neon-cyan)] text-black px-6 py-3 hover:brightness-110 hover:shadow-[0_0_20px_var(--neon-cyan)] glow-box-cyan",
    secondary: "bg-white/10 text-white hover:bg-white/20 px-6 py-3 backdrop-blur-md border border-white/10",
    outline: "border border-[var(--neon-cyan)] text-[var(--neon-cyan)] hover:bg-[var(--neon-cyan)]/10 px-6 py-3",
  };

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      // Default behavior: smooth scroll to the bottom contact form
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  return (
    <button 
      onClick={handleClick}
      className={`${baseClasses} ${variants[variant]} ${className}`}
      style={{ fontFamily: "var(--font-geist-sans)", pointerEvents: "auto" }}
    >
      {label}
    </button>
  );
}
