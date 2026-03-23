export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  color: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    quote:
      "Neurospark completely transformed our brand. The website they built generates 3x more leads than our previous one, and the design still gets compliments daily.",
    name: "Sarah Chen",
    role: "CEO",
    company: "Meridian Fintech",
    color: "#00f0ff",
  },
  {
    id: "t2",
    quote:
      "Their video production team is unreal. They delivered 500+ personalized videos using Remotion that drove our open rates through the roof. True innovators.",
    name: "Marcus Rivera",
    role: "Head of Marketing",
    company: "Synthwave Studios",
    color: "#ff00aa",
  },
  {
    id: "t3",
    quote:
      "We went from 2K to 180K followers in 8 months. Neurospark doesn't just manage social — they engineer growth with precision and creativity.",
    name: "Aisha Patel",
    role: "Founder",
    company: "Cipher Security",
    color: "#8b5cf6",
  },
  {
    id: "t4",
    quote:
      "The paid ad campaigns Neurospark ran achieved 340% ROAS across all platforms. They understand data as well as they understand design.",
    name: "James Nakamura",
    role: "VP of Growth",
    company: "Quantum Commerce",
    color: "#00ff88",
  },
];
