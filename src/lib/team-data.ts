export interface TeamMember {
  id: string;
  name: string;
  role: string;
  color: string;
  image?: string;
}

export const team: TeamMember[] = [
  { id: "m1", name: "Alex Drummond", role: "Founder & Creative Director", color: "#00f0ff" },
  { id: "m2", name: "Mia Tanaka", role: "Head of Strategy", color: "#ff00aa" },
  { id: "m3", name: "Jordan Blake", role: "Lead Developer", color: "#8b5cf6" },
  { id: "m4", name: "Priya Sharma", role: "Video Production Lead", color: "#00ff88" },
  { id: "m5", name: "Leo Martinez", role: "Paid Media Specialist", color: "#4444ff" },
  { id: "m6", name: "Nadia Osei", role: "Social Media Director", color: "#00f0ff" },
];

export const stats = [
  { label: "Years in Business", value: "6+" },
  { label: "Projects Delivered", value: "200+" },
  { label: "Happy Clients", value: "85+" },
  { label: "Team Members", value: "12" },
];
