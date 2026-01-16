import { 
  ShieldCheck, 
  FileCheck, 
  IndianRupee, 
  UserCheck, 
  HardHat, 
  PencilRuler, 
  Truck, 
  Scale,
  Clock,
  CheckCircle2,
  Smartphone,
  ClipboardCheck,
  FileText,
  Users,
  Headphones
} from "lucide-react";

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Cost Calculator", href: "/calculator" },
  { label: "Services", href: "/services" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const SERVICES = [
  {
    title: "Home Planning & Design Guidance",
    description: "We help you plan a home that is practical, buildable, and aligned with your plot size, budget, and future needs.",
    icon: PencilRuler,
  },
  {
    title: "Full Home Construction Support",
    description: "We support you throughout the home construction journey — coordinating work on-site, timelines, and execution flow.",
    icon: HardHat,
  },
  {
    title: "Project Progress Tracking",
    description: "You receive regular updates from the site so you have visibility into how your home is progressing.",
    icon: Smartphone,
  },
];

export const VALUE_PILLARS = [
  {
    title: "Verified Professionals",
    description: "Only trusted, background-checked contractors & architects.",
    icon: UserCheck,
  },
  {
    title: "Milestone-Based Payments",
    description: "Pay safely as work progresses.",
    icon: IndianRupee,
  },
  {
    title: "Real-Time Tracking",
    description: "Daily updates, photos, and timeline transparency.",
    icon: Smartphone,
  },
  {
    title: "Quality Checks",
    description: "Stage-wise inspections for assured build quality.",
    icon: ClipboardCheck,
  },
  {
    title: "Transparent Pricing",
    description: "Clear budgets, no hidden charges.",
    icon: FileText,
  },
  {
    title: "Personalized Builder Match",
    description: "Get the right team based on your needs.",
    icon: Users,
  },
  {
    title: "End-to-End Support",
    description: "From planning to handover, everything in one platform.",
    icon: Headphones,
  },
];

export const PROCESS_STEPS = [
  {
    step: 1,
    title: "Share Plot Details",
    description: "Tell us about your plot location, size, and your dream home requirements.",
  },
  {
    step: 2,
    title: "Get Transparent Estimate",
    description: "Receive a detailed cost breakdown and project timeline within 48 hours.",
  },
  {
    step: 3,
    title: "Sign & Start",
    description: "Approve the design and contract to kickstart the construction.",
  },
  {
    step: 4,
    title: "Track & Handover",
    description: "Monitor progress online and move into your quality-assured home.",
  },
];

export const WHY_CHOOSE_US = [
  { title: "Clear cost planning to reduce last-minute surprises", icon: CheckCircle2 },
  { title: "Stage-wise payment structure aligned with progress", icon: CheckCircle2 },
  { title: "Full project visibility through digital updates", icon: CheckCircle2 },
  { title: "Carefully vetted professionals with periodic quality checks", icon: CheckCircle2 },
];

export const PROJECT_SNIPPETS = [
  {
    id: 1,
    title: "Modern Villa in Indore",
    description: "3BHK | 2400 sq.ft | Delivered in 11 Months",
    image: "modern_finished_home_exterior_for_hero_section.png" // Placeholder ref
  },
  {
    id: 2,
    title: "Contemporary Duplex",
    description: "4BHK | 3200 sq.ft | Delivered in 14 Months",
    image: "completed_villa_exterior_for_portfolio.png" // Placeholder ref
  },
  {
    id: 3,
    title: "Luxury Interior Finish",
    description: "Interior Project | Premium Materials",
    image: "modern_living_room_interior_for_project_snippet.png" // Placeholder ref
  }
];
