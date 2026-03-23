"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  projectType: z.string().optional(),
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
      <div className="text-center py-12">
        <div className="text-4xl mb-4 text-green-500">✓</div>
        <p className="text-text-primary font-semibold text-lg">Thank you!</p>
        <p className="text-text-secondary text-sm mt-1">
          We&apos;ll be in touch within 24 hours.
        </p>
      </div>
    );
  }

  const inputClasses =
    "w-full bg-surface-alt border border-border rounded-xl px-4 py-3 text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 transition-colors";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <input
            type="text"
            placeholder="Name"
            className={inputClasses}
            {...register("name")}
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1 ml-1">
              {errors.name.message}
            </p>
          )}
        </div>
        <div>
          <input
            type="email"
            placeholder="Email"
            className={inputClasses}
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1 ml-1">
              {errors.email.message}
            </p>
          )}
        </div>
      </div>
      <div>
        <select className={inputClasses} {...register("projectType")}>
          <option value="">Project Type</option>
          <option value="branding">Branding</option>
          <option value="web">Web Development</option>
          <option value="video">Video Production</option>
          <option value="social">Social Media</option>
          <option value="ads">Paid Advertising</option>
          <option value="content">Content Strategy</option>
          <option value="full">Full Service</option>
        </select>
      </div>
      <div>
        <textarea
          placeholder="Tell us about your project..."
          rows={4}
          className={`${inputClasses} resize-none`}
          {...register("message")}
        />
        {errors.message && (
          <p className="text-red-500 text-xs mt-1 ml-1">
            {errors.message.message}
          </p>
        )}
      </div>
      <button
        type="submit"
        disabled={status === "sending"}
        className="btn-pill w-full py-3.5 text-[15px] font-medium disabled:opacity-50"
      >
        {status === "sending" ? "Sending..." : "Send Message"}
      </button>
      {status === "error" && (
        <p className="text-red-500 text-sm text-center">
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  );
}
