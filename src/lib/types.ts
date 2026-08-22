export type VehicleCategory = "car" | "bike";

export type VehicleType = "SUV" | "Hatchback" | "Sedan" | "Cruiser" | "Adventure" | "Tempo Traveller";

export type TransmissionType = "Manual" | "Automatic";

export type FuelType = "Petrol" | "Diesel" | "EV";

export interface CancellationTier {
  daysBefore: number; // e.g. 7 days before
  refundPercent: number; // e.g. 100% refund
  description: string;
}

export interface Vehicle {
  id: string;
  name: string;
  category: VehicleCategory;
  type: VehicleType;
  tagline: string;
  images: string[];
  seatingCapacity: number;
  transmission: TransmissionType;
  fuelType: FuelType;
  rentalPricePerDay: number;
  securityDeposit: number;
  minDurationDays: number;
  pickupDropLocations: string[];
  inclusions: string[];
  exclusions: string[];
  requiredDocuments: string[];
  rentalRules: string[];
  cancellationPolicyTiers: CancellationTier[];
  isFeatured: boolean;
  totalUnits: number;
  bookedUnits: number;
  mileageLimit: string; // e.g. "Unlimited kms within Northeast"
  engineCC?: string; // e.g. "452 cc" for bikes or "2184 cc" for cars
}

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  distance?: string;
  accommodation?: string;
  meals?: string;
}

export interface FAQItem {
  id: string;
  category: "rental" | "tour" | "general";
  question: string;
  answer: string;
}

export interface SharedTour {
  id: string;
  title: string;
  slug: string;
  destinationId: string;
  destinationName: string;
  tripFormat: "car" | "bike"; // "car" for 4x4 SUV Group Trips, "bike" for Motorcycle Expeditions
  vehicleProvided: string; // e.g. "Mahindra Thar 4x4" or "Royal Enfield Himalayan 450"
  route: string; // e.g. "Guwahati -> Shillong -> Cherrapunji -> Dawki -> Guwahati"
  durationDays: number;
  durationNights: number;
  startDates: string[]; // ISO date strings
  pricePerPerson: number;
  totalSeats: number;
  seatsBooked: number;
  heroImage: string;
  gallery: string[];
  shortHighlights: string[];
  itinerary: ItineraryDay[];
  inclusions: string[];
  exclusions: string[];
  pickupDropPoints: string[];
  accommodationDetails: string;
  importantNotes: string[];
  cancellationPolicy: CancellationTier[];
  faqs: FAQItem[];
  isFeatured: boolean;
}

export type Tour = SharedTour;

export interface PopularPlace {
  name: string;
  description: string;
  image: string;
}

export interface SuggestedRoute {
  name: string;
  duration: string;
  description: string;
}

export interface Destination {
  id: string;
  name: string;
  slug: string;
  stateName: string;
  tagline: string;
  coverImage: string;
  gallery: string[];
  overview: string;
  bestTimeToVisit: string;
  popularPlaces: PopularPlace[];
  suggestedRoutes: SuggestedRoute[];
  availableTourIds: string[];
  availableVehicleIds: string[];
  travelTips: string[];
  faqs: FAQItem[];
}

export interface CustomerReview {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  comment: string;
  itemType: "vehicle" | "tour";
  itemName: string;
  avatar: string;
  verified: boolean;
}

export interface RentalEnquiryPayload {
  fullName: string;
  phoneNumber: string;
  whatsAppNumber: string;
  email: string;
  vehicleId: string;
  startDate: string;
  endDate: string;
  pickupLocation: string;
  dropLocation: string;
  numberOfTravellers: number;
  message?: string;
}

export interface SharedTourEnquiryPayload {
  fullName: string;
  phoneNumber: string;
  email: string;
  tourId: string;
  preferredDate: string;
  numberOfTravellers: number;
  pickupLocation: string;
  specialRequirements?: string;
  message?: string;
}

export interface AvailabilityStatusInfo {
  status: "Available Today" | "Filling Fast" | "Few Seats Left" | "Fully Booked";
  seatsRemaining: number;
  badgeColor: string; // Tailwind class
  label: string;
}

export type EnquiryStatus = "New" | "Contacted" | "Confirmed" | "Cancelled";

export interface Enquiry {
  id: string;
  type: "rental" | "tour";
  customerName: string;
  phone: string;
  email: string;
  relatedItemName: string;
  relatedItemId?: string;
  submittedDate: string;
  status: EnquiryStatus;
  message?: string;
  startDate?: string;
  endDate?: string;
  pickupLocation?: string;
  dropLocation?: string;
  preferredBatch?: string;
  numberOfTravellers?: number;
}

// =============================================================================
// GROUP EXPEDITION BATCHES & PASSENGER MANIFEST (ROSTER MANAGEMENT)
// =============================================================================
export type BatchStatus =
  | "Upcoming"
  | "Filling Fast"
  | "Sold Out"
  | "Departed / In Progress"
  | "Completed"
  | "Cancelled";

export type PassengerTripStatus =
  | "Applied / Pending"
  | "Advance Paid (30%)"
  | "Fully Paid"
  | "Boarded / Departed"
  | "On Tour"
  | "Completed"
  | "No Show"
  | "Cancelled";

export type PaymentStatus = "Pending Advance" | "Advance Paid" | "Fully Paid" | "Refunded";

export type PermitStatus =
  | "Verified & Issued"
  | "Documents Under Review"
  | "Documents Pending"
  | "Not Required";

export interface Passenger {
  id: string;
  batchId: string;
  tourId: string;
  tourTitle: string;
  name: string;
  age?: number;
  gender?: "Male" | "Female" | "Other";
  phone: string;
  email: string;
  city: string;
  emergencyContact: string;
  idProofType: string; // "Aadhaar" | "Passport" | "Driving License"
  permitStatus: PermitStatus;
  paymentStatus: PaymentStatus;
  tripStatus: PassengerTripStatus;
  assignedVehicle: string; // e.g. "Thar 4x4 #01 (Lead)", "Thar 4x4 #02", "RE Himalayan #03"
  seatNumber: string; // e.g. "Seat 1A", "Seat 2B", "Bike #03 Pilot"
  isSoloTraveller: boolean;
  dietaryPreference?: string; // "Veg" | "Non-Veg" | "Jain"
  notes?: string;
  joinedAt: string;
}

export interface TourBatch {
  id: string;
  tourId: string;
  tourTitle: string;
  tripFormat: "car" | "bike";
  startDate: string; // e.g. "2026-09-15"
  endDate: string; // e.g. "2026-09-20"
  totalSeats: number;
  bookedSeats: number;
  status: BatchStatus;
  leadCaptainName: string;
  leadCaptainPhone: string;
  leadVehicle: string;
  assignedVehicles: string[];
  startLocation: string;
  endLocation: string;
}

