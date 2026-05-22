export interface MenuItem {
  id: number;
  name: string;
  name_ar: string;
  description: string;
  description_ar: string;
  price: string;
  category: "appetizers" | "mains" | "desserts" | "drinks";
  category_display: string;
  image: string | null;
  image_url: string | null;
  is_featured: boolean;
  is_available: boolean;
  spice_level: number;
  calories: number | null;
  prep_time: number | null;
}

export interface ReservationForm {
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  guests: number;
  notes: string;
}

export interface ReservationResponse {
  success: boolean;
  message: string;
  reservation_id?: number;
  errors?: Record<string, string[]>;
}

export type MenuCategory = "all" | "appetizers" | "mains" | "desserts" | "drinks";
