"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Vehicle, SharedTour, Destination, Enquiry, EnquiryStatus } from "@/lib/types";
import { VEHICLES_DATA, SHARED_TOURS_DATA, DESTINATIONS_DATA, MOCK_ENQUIRIES_DATA } from "@/lib/data";

export interface GalleryItem {
  id: string;
  url: string;
  alt: string;
  category: "vehicle" | "tour" | "destination" | "uploaded";
  entityName: string;
  isUploaded?: boolean;
}

interface DataContextType {
  vehicles: Vehicle[];
  tours: SharedTour[];
  destinations: Destination[];
  enquiries: Enquiry[];
  galleryImages: GalleryItem[];
  
  // Vehicles CRUD
  addVehicle: (vehicle: Vehicle) => void;
  updateVehicle: (id: string, vehicle: Partial<Vehicle>) => void;
  deleteVehicle: (id: string) => void;
  
  // Tours CRUD
  addTour: (tour: SharedTour) => void;
  updateTour: (id: string, tour: Partial<SharedTour>) => void;
  deleteTour: (id: string) => void;

  // Destinations CRUD
  updateDestination: (id: string, destination: Partial<Destination>) => void;
  
  // Enquiries CRUD
  updateEnquiryStatus: (id: string, status: EnquiryStatus) => void;
  deleteEnquiry: (id: string) => void;
  addEnquiry: (enquiry: Omit<Enquiry, "id" | "submittedDate">) => void;

  // Gallery
  addGalleryImage: (image: { url: string; alt: string; category: "vehicle" | "tour" | "destination" | "uploaded"; entityName: string }) => void;
  deleteGalleryImage: (id: string) => void;

  // Demo Auth
  isAdminLoggedIn: boolean;
  loginAdmin: () => void;
  logoutAdmin: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// Helper to extract initial gallery images from existing data
function getInitialGallery(): GalleryItem[] {
  const items: GalleryItem[] = [];

  // From Vehicles
  VEHICLES_DATA.forEach((v) => {
    v.images.forEach((img, idx) => {
      items.push({
        id: `gal-v-${v.id}-${idx}`,
        url: img,
        alt: `${v.name} - Fleet View ${idx + 1}`,
        category: "vehicle",
        entityName: v.name,
      });
    });
  });

  // From Tours
  SHARED_TOURS_DATA.forEach((t) => {
    items.push({
      id: `gal-t-hero-${t.id}`,
      url: t.heroImage,
      alt: `${t.title} - Hero Cover`,
      category: "tour",
      entityName: t.title,
    });
    t.gallery.forEach((img, idx) => {
      items.push({
        id: `gal-t-${t.id}-${idx}`,
        url: img,
        alt: `${t.title} - Expedition View ${idx + 1}`,
        category: "tour",
        entityName: t.title,
      });
    });
  });

  // From Destinations
  DESTINATIONS_DATA.forEach((d) => {
    items.push({
      id: `gal-d-cover-${d.id}`,
      url: d.coverImage,
      alt: `${d.name} - State Cover`,
      category: "destination",
      entityName: d.name,
    });
  });

  return items;
}

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [vehicles, setVehicles] = useState<Vehicle[]>(VEHICLES_DATA);
  const [tours, setTours] = useState<SharedTour[]>(SHARED_TOURS_DATA);
  const [destinations, setDestinations] = useState<Destination[]>(DESTINATIONS_DATA);
  const [enquiries, setEnquiries] = useState<Enquiry[]>(MOCK_ENQUIRIES_DATA);
  const [galleryImages, setGalleryImages] = useState<GalleryItem[]>(getInitialGallery());
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem("majestic_admin_auth");
      if (stored === "true") {
        setIsAdminLoggedIn(true);
      }
    }
  }, []);

  const loginAdmin = () => {
    setIsAdminLoggedIn(true);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("majestic_admin_auth", "true");
    }
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("majestic_admin_auth");
    }
  };

  // Vehicles
  const addVehicle = (vehicle: Vehicle) => {
    setVehicles((prev) => [vehicle, ...prev]);
    // Also add images to gallery
    if (vehicle.images?.length) {
      const newImgs: GalleryItem[] = vehicle.images.map((url, i) => ({
        id: `gal-v-${vehicle.id}-${Date.now()}-${i}`,
        url,
        alt: `${vehicle.name} - Vehicle View`,
        category: "vehicle",
        entityName: vehicle.name,
      }));
      setGalleryImages((prev) => [...newImgs, ...prev]);
    }
  };

  const updateVehicle = (id: string, updated: Partial<Vehicle>) => {
    setVehicles((prev) =>
      prev.map((v) => (v.id === id ? ({ ...v, ...updated } as Vehicle) : v))
    );
  };

  const deleteVehicle = (id: string) => {
    setVehicles((prev) => prev.filter((v) => v.id !== id));
  };

  // Tours
  const addTour = (tour: SharedTour) => {
    setTours((prev) => [tour, ...prev]);
    if (tour.heroImage) {
      setGalleryImages((prev) => [
        {
          id: `gal-t-${tour.id}-${Date.now()}`,
          url: tour.heroImage,
          alt: `${tour.title} - Cover`,
          category: "tour",
          entityName: tour.title,
        },
        ...prev,
      ]);
    }
  };

  const updateTour = (id: string, updated: Partial<SharedTour>) => {
    setTours((prev) =>
      prev.map((t) => (t.id === id ? ({ ...t, ...updated } as SharedTour) : t))
    );
  };

  const deleteTour = (id: string) => {
    setTours((prev) => prev.filter((t) => t.id !== id));
  };

  // Destinations
  const updateDestination = (id: string, updated: Partial<Destination>) => {
    setDestinations((prev) =>
      prev.map((d) => (d.id === id ? ({ ...d, ...updated } as Destination) : d))
    );
  };

  // Enquiries
  const updateEnquiryStatus = (id: string, status: EnquiryStatus) => {
    setEnquiries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status } : e))
    );
  };

  const deleteEnquiry = (id: string) => {
    setEnquiries((prev) => prev.filter((e) => e.id !== id));
  };

  const addEnquiry = (enquiryData: Omit<Enquiry, "id" | "submittedDate">) => {
    const todayStr = new Date().toISOString().split("T")[0];
    const newEnq: Enquiry = {
      ...enquiryData,
      id: `enq-${Date.now().toString().slice(-4)}`,
      submittedDate: todayStr,
      status: "New",
    };
    setEnquiries((prev) => [newEnq, ...prev]);
  };

  // Gallery
  const addGalleryImage = (image: {
    url: string;
    alt: string;
    category: "vehicle" | "tour" | "destination" | "uploaded";
    entityName: string;
  }) => {
    const newImg: GalleryItem = {
      id: `gal-upload-${Date.now()}`,
      ...image,
      isUploaded: true,
    };
    setGalleryImages((prev) => [newImg, ...prev]);
  };

  const deleteGalleryImage = (id: string) => {
    setGalleryImages((prev) => prev.filter((g) => g.id !== id));
  };

  return (
    <DataContext.Provider
      value={{
        vehicles,
        tours,
        destinations,
        enquiries,
        galleryImages,
        addVehicle,
        updateVehicle,
        deleteVehicle,
        addTour,
        updateTour,
        deleteTour,
        updateDestination,
        updateEnquiryStatus,
        deleteEnquiry,
        addEnquiry,
        addGalleryImage,
        deleteGalleryImage,
        isAdminLoggedIn,
        loginAdmin,
        logoutAdmin,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
}
