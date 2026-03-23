"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().optional(),
  projectType: z.string().min(1, "Please select a project type"),
  budget: z.string().min(1, "Please select a budget range"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  async function onSubmit(data: ContactFormData) {
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus("sent");
        reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="text-center py-8">
        <div className="text-4xl mb-4">✦</div>
        <p className="text-white font-medium">Message sent!</p>
        <p className="text-white/40 text-sm mt-1">
          We&apos;ll get back to you soon.
        </p>
      </div>
    );
  }

  const inputClasses =
    "w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-lg text-white placeholder:text-white/40 focus:outline-none focus:border-[var(--neon-cyan)] focus:ring-2 focus:ring-[var(--neon-cyan)]/30 transition-colors cursor-pointer";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" style={{ pointerEvents: "auto" }}>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <input
            type="text"
            placeholder="Name"
            className={inputClasses}
            style={{ fontFamily: "var(--font-geist-sans)" }}
            {...register("name")}
          />
          {errors.name && (
            <p className="text-red-400 text-xs mt-1 ml-1">{errors.name.message}</p>
          )}
        </div>
        <div>
          <input
            type="email"
            placeholder="Email"
            className={inputClasses}
            style={{ fontFamily: "var(--font-geist-sans)" }}
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-400 text-xs mt-1 ml-1">{errors.email.message}</p>
          )}
        </div>
      </div>
      <div>
        <input
          type="text"
          placeholder="Company"
          className={inputClasses}
          style={{ fontFamily: "var(--font-geist-sans)" }}
          {...register("company")}
        />
        {errors.company && (
          <p className="text-red-400 text-xs mt-1 ml-1">{errors.company.message}</p>
        )}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <select
            className={inputClasses}
            style={{ fontFamily: "var(--font-geist-sans)" }}
            {...register("projectType")}
          >
            <option value="">Project Type</option>
            <option value="branding">Branding</option>
            <option value="web">Web Development</option>
            <option value="video">Video Production</option>
            <option value="social">Social Media</option>
            <option value="ads">Paid Advertising</option>
            <option value="content">Content Strategy</option>
            <option value="full">Full Package</option>
          </select>
          {errors.projectType && (
            <p className="text-red-400 text-xs mt-1 ml-1">{errors.projectType.message}</p>
          )}
        </div>
        <div>
          <select
            className={inputClasses}
            style={{ fontFamily: "var(--font-geist-sans)" }}
            {...register("budget")}
          >
            <option value="">Budget Range</option>
            <option value="5k-10k">$5K - $10K</option>
            <option value="10k-25k">$10K - $25K</option>
            <option value="25k-50k">$25K - $50K</option>
            <option value="50k+">$50K+</option>
          </select>
          {errors.budget && (
            <p className="text-red-400 text-xs mt-1 ml-1">{errors.budget.message}</p>
          )}
        </div>
      </div>
      <div>
        <textarea
          placeholder="Tell us about your project..."
          rows={4}
          className={`${inputClasses} resize-none`}
          style={{ fontFamily: "var(--font-geist-sans)" }}
          {...register("message")}
        />
        {errors.message && (
          <p className="text-red-400 text-xs mt-1 ml-1">{errors.message.message}</p>
        )}
      </div>
      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full py-4 rounded-xl text-lg font-semibold text-black bg-[var(--neon-cyan)] hover:brightness-110 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 glow-box-cyan cursor-pointer"
        style={{ fontFamily: "var(--font-geist-sans)" }}
      >
        {status === "sending" ? "Sending..." : "Send Message"}
      </button>
      {status === "error" && (
        <p className="text-red-400 text-xs text-center">
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  );
}
