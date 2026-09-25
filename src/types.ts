export type TabType = 
  | "home" 
  | "gathering" 
  | "elders" 
  | "lore" 
  | "register" 
  | "volunteer" 
  | "donations"
  | "portal";

export interface Elder {
  id: string;
  name: string;
  title: string;
  tribe: string;
  country: string;
  region: string;
  bio: string;
  photo: string;
  wisdomQuote: string;
  targetAmount: number;
  raisedAmount: number;
  travelNeeds: string[];
  featured?: boolean;
}

export interface ActivityScheduleItem {
  id: string;
  time: string;
  title: string;
  category: "ceremony" | "storytelling" | "healing" | "youth" | "ecology";
  location: string;
  leader: string;
  description: string;
}

export interface EventInfo {
  id: string;
  title: string;
  subtitle: string;
  dates: string;
  location: string;
  theme: string;
  description: string;
  heroImage: string;
  schedule: ActivityScheduleItem[];
}

export interface WorkshopProposal {
  id: string;
  submitterName: string;
  tribeOrAffiliation: string;
  email: string;
  phone: string;
  title: string;
  category: "Herbal Medicine" | "Indigenous Farming" | "Beadwork & Craft" | "Spiritual Ecology" | "Storytelling & Lore" | "Youth Rites of Passage";
  description: string;
  format: "Interactive Workshop" | "Ceremonal Circle" | "Field Demonstration" | "Oral Presentation";
  duration: string;
  dateSubmitted: string;
  status: "Pending Review" | "Approved" | "Featured";
}

export interface LoreArticle {
  id: string;
  title: string;
  subtitle: string;
  category: "Cosmology" | "Sacred Geography" | "Mythology" | "Sacred Flora & Fauna";
  region: string;
  summary: string;
  fullText: string[];
  readTime: string;
  image: string;
  pdfTitle?: string;
  pdfSize?: string;
}

export interface Proverb {
  id: string;
  quote: string;
  tribe: string;
  country: string;
  meaning: string;
  theme: "Unity" | "Nature & Earth" | "Wisdom" | "Community" | "Patience & Courage";
  pronunciationHint?: string;
}

export interface TicketRegistration {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  country: string;
  tribalAffiliation: string;
  passType: 
    | "General Gathering (100% Free RSVP)" 
    | "Sanctuary Camping Pass (100% Free RSVP)" 
    | "Communal Meals Pass (100% Free RSVP)" 
    | "Youth & Family Circle Pass (100% Free RSVP)"
    | string;
  workshopInterests: string[];
  dialectNeeds: string;
  emergencyContact: string;
  dietaryRestrictions: string;
  dateRegistered: string;
  ticketCode: string;
}

export interface VolunteerApplication {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  country: string;
  role: "Logistics & Transport" | "Medical & First Aid" | "Dialect Translation" | "Security & Peacekeeping" | "Ceremonal & Altar Setup" | "Youth Guidance";
  languages: string;
  experience: string;
  availability: string;
  dateApplied: string;
}

export interface PartnerOrg {
  id: string;
  name: string;
  logo: string;
  category: "Ecological Conservation" | "Indigenous Rights" | "African Heritage" | "Traditional Medicine";
  website: string;
  description: string;
  country: string;
}

export interface DonationRecord {
  id: string;
  donorName: string;
  amount: number;
  currency: "USD" | "KES" | "NGN" | "ZAR" | "GHS" | "EUR";
  method: "M-Pesa" | "MTN Mobile Money" | "Flutterwave" | "PayPal" | "Stripe";
  designatedElderId?: string;
  message: string;
  date: string;
}
