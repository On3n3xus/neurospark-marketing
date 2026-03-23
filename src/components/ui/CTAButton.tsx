"use client";

import Link from "next/link";

interface CTAButtonProps {
  label: string;
  href?: string;
  className?: string;
}

export default function CTAButton({
  label,
  href = "#contact",
  className = "",
}: CTAButtonProps) {
  return (
    <Link href={href} className={`btn-pill ${className}`}>
      {label}
    </Link>
  );
}
