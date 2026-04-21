// Mock data + types for HealthPadi — mirrors Django REST schema
// Swap these for real /api/* calls when wiring backend.

export type PriceSource = "provider" | "community";

export interface Facility {
  id: string;
  name: string;
  type: "Hospital" | "Clinic" | "Diagnostic Center" | "Pharmacy";
  city: string;
  state: string;
  address: string;
  phone: string;
  is_verified: boolean;
  is_claimed: boolean;
  rating: number;
  reviews_count: number;
  image_url?: string;
}

export interface FacilityProcedure {
  id: string;
  facility_id: string;
  facility: Facility;
  procedure_name: string;
  category: string;
  price_ngn: number;
  price_source: PriceSource;
  is_stale: boolean;
  updated_at: string; // ISO
}

export interface Report {
  id: string;
  facility_id: string;
  facility_name: string;
  procedure_name: string;
  advertised_price: number;
  charged_price: number;
  status: "pending" | "reviewing" | "resolved";
  created_at: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning";
  created_at: string;
  read: boolean;
}

const facilities: Facility[] = [
  { id: "f1", name: "Reddington Hospital", type: "Hospital", city: "Lagos", state: "Lagos", address: "12 Idowu Martins St, Victoria Island", phone: "+234 1 271 5000", is_verified: true, is_claimed: true, rating: 4.8, reviews_count: 412 },
  { id: "f2", name: "Lagoon Hospitals", type: "Hospital", city: "Lagos", state: "Lagos", address: "8 Marine Rd, Apapa", phone: "+234 1 460 7800", is_verified: true, is_claimed: true, rating: 4.6, reviews_count: 318 },
  { id: "f3", name: "St. Nicholas Hospital", type: "Hospital", city: "Lagos", state: "Lagos", address: "57 Campbell St, Lagos Island", phone: "+234 1 460 0070", is_verified: true, is_claimed: false, rating: 4.5, reviews_count: 256 },
  { id: "f4", name: "Garki Hospital", type: "Hospital", city: "Abuja", state: "FCT", address: "Tafawa Balewa Way, Garki", phone: "+234 9 461 0490", is_verified: true, is_claimed: true, rating: 4.4, reviews_count: 189 },
  { id: "f5", name: "Cedarcrest Hospitals", type: "Hospital", city: "Abuja", state: "FCT", address: "Plot 24 Cadastral Zone, Apo", phone: "+234 9 461 9000", is_verified: true, is_claimed: true, rating: 4.7, reviews_count: 224 },
  { id: "f6", name: "UCH Ibadan", type: "Hospital", city: "Ibadan", state: "Oyo", address: "Queen Elizabeth Rd, Ibadan", phone: "+234 2 241 0088", is_verified: true, is_claimed: false, rating: 4.2, reviews_count: 521 },
  { id: "f7", name: "BridgeClinic Fertility", type: "Clinic", city: "Lagos", state: "Lagos", address: "66 Oduduwa Way, Ikeja GRA", phone: "+234 1 295 0000", is_verified: false, is_claimed: false, rating: 4.3, reviews_count: 87 },
  { id: "f8", name: "Clina-Lancet Diagnostics", type: "Diagnostic Center", city: "Lagos", state: "Lagos", address: "10 Amodu Ojikutu, Victoria Island", phone: "+234 1 270 5060", is_verified: true, is_claimed: true, rating: 4.6, reviews_count: 198 },
];

const procedures: Omit<FacilityProcedure, "facility">[] = [
  { id: "p1", facility_id: "f1", procedure_name: "Chest X-Ray", category: "Imaging", price_ngn: 18000, price_source: "provider", is_stale: false, updated_at: "2025-04-02T10:00:00Z" },
  { id: "p2", facility_id: "f2", procedure_name: "Chest X-Ray", category: "Imaging", price_ngn: 22000, price_source: "provider", is_stale: false, updated_at: "2025-04-08T10:00:00Z" },
  { id: "p3", facility_id: "f3", procedure_name: "Chest X-Ray", category: "Imaging", price_ngn: 15500, price_source: "community", is_stale: true, updated_at: "2025-02-12T10:00:00Z" },
  { id: "p4", facility_id: "f8", procedure_name: "Chest X-Ray", category: "Imaging", price_ngn: 17000, price_source: "provider", is_stale: false, updated_at: "2025-04-15T10:00:00Z" },
  { id: "p5", facility_id: "f1", procedure_name: "Full Blood Count (FBC)", category: "Laboratory", price_ngn: 7500, price_source: "provider", is_stale: false, updated_at: "2025-04-10T10:00:00Z" },
  { id: "p6", facility_id: "f2", procedure_name: "Full Blood Count (FBC)", category: "Laboratory", price_ngn: 6500, price_source: "community", is_stale: false, updated_at: "2025-04-01T10:00:00Z" },
  { id: "p7", facility_id: "f8", procedure_name: "Full Blood Count (FBC)", category: "Laboratory", price_ngn: 5500, price_source: "provider", is_stale: false, updated_at: "2025-04-12T10:00:00Z" },
  { id: "p8", facility_id: "f1", procedure_name: "MRI Scan (Brain)", category: "Imaging", price_ngn: 145000, price_source: "provider", is_stale: false, updated_at: "2025-04-05T10:00:00Z" },
  { id: "p9", facility_id: "f4", procedure_name: "MRI Scan (Brain)", category: "Imaging", price_ngn: 132000, price_source: "provider", is_stale: false, updated_at: "2025-04-09T10:00:00Z" },
  { id: "p10", facility_id: "f5", procedure_name: "MRI Scan (Brain)", category: "Imaging", price_ngn: 138000, price_source: "community", is_stale: true, updated_at: "2025-01-20T10:00:00Z" },
  { id: "p11", facility_id: "f1", procedure_name: "Malaria Test (RDT)", category: "Laboratory", price_ngn: 2500, price_source: "provider", is_stale: false, updated_at: "2025-04-14T10:00:00Z" },
  { id: "p12", facility_id: "f6", procedure_name: "Malaria Test (RDT)", category: "Laboratory", price_ngn: 1500, price_source: "community", is_stale: false, updated_at: "2025-04-11T10:00:00Z" },
  { id: "p13", facility_id: "f4", procedure_name: "CT Scan (Abdomen)", category: "Imaging", price_ngn: 95000, price_source: "provider", is_stale: false, updated_at: "2025-04-07T10:00:00Z" },
  { id: "p14", facility_id: "f5", procedure_name: "CT Scan (Abdomen)", category: "Imaging", price_ngn: 102000, price_source: "provider", is_stale: false, updated_at: "2025-04-13T10:00:00Z" },
  { id: "p15", facility_id: "f1", procedure_name: "Antenatal Registration", category: "Maternal", price_ngn: 65000, price_source: "provider", is_stale: false, updated_at: "2025-04-04T10:00:00Z" },
  { id: "p16", facility_id: "f2", procedure_name: "Antenatal Registration", category: "Maternal", price_ngn: 75000, price_source: "provider", is_stale: false, updated_at: "2025-04-06T10:00:00Z" },
  { id: "p17", facility_id: "f7", procedure_name: "IVF Cycle (Standard)", category: "Fertility", price_ngn: 1850000, price_source: "community", is_stale: false, updated_at: "2025-04-03T10:00:00Z" },
];

const facilityMap = Object.fromEntries(facilities.map((f) => [f.id, f]));

export const allProcedures: FacilityProcedure[] = procedures.map((p) => ({
  ...p,
  facility: facilityMap[p.facility_id],
}));

export const allFacilities = facilities;

export const NIGERIAN_STATES = ["All States", "Lagos", "FCT", "Oyo", "Rivers", "Kano", "Ogun", "Kaduna", "Enugu"];
export const PROCEDURE_CATEGORIES = ["All", "Imaging", "Laboratory", "Maternal", "Fertility", "Surgery", "Dental"];

export function searchProcedures(query: string, state?: string, category?: string): FacilityProcedure[] {
  const q = query.trim().toLowerCase();
  return allProcedures.filter((p) => {
    const matchQ = !q || p.procedure_name.toLowerCase().includes(q) || p.facility.name.toLowerCase().includes(q);
    const matchS = !state || state === "All States" || p.facility.state === state;
    const matchC = !category || category === "All" || p.category === category;
    return matchQ && matchS && matchC;
  });
}

export function formatNGN(n: number): string {
  return "₦" + n.toLocaleString("en-NG");
}

export const mockReports: Report[] = [
  { id: "r1", facility_id: "f1", facility_name: "Reddington Hospital", procedure_name: "Chest X-Ray", advertised_price: 18000, charged_price: 24000, status: "reviewing", created_at: "2025-04-15T09:30:00Z" },
  { id: "r2", facility_id: "f4", facility_name: "Garki Hospital", procedure_name: "MRI Scan (Brain)", advertised_price: 132000, charged_price: 145000, status: "resolved", created_at: "2025-04-10T11:20:00Z" },
];

export const mockNotifications: NotificationItem[] = [
  { id: "n1", title: "Report under review", message: "Your report on Reddington Hospital is being reviewed.", type: "info", created_at: "2025-04-18T08:00:00Z", read: false },
  { id: "n2", title: "Price updated", message: "Lagoon Hospitals updated their X-Ray price.", type: "success", created_at: "2025-04-16T14:00:00Z", read: false },
  { id: "n3", title: "Stale data alert", message: "3 procedures in your saved list are outdated.", type: "warning", created_at: "2025-04-12T10:00:00Z", read: true },
];
