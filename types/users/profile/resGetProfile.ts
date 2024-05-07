export interface OpeningHour {
  hours_id: number;
  FRIDAY_OPEN: string | null;
  MONDAY_OPEN: string | null;
  SUNDAY_OPEN: string | null;
  FRIDAY_CLOSE: string | null;
  MONDAY_CLOSE: string | null;
  SUNDAY_CLOSE: string | null;
  TUESDAY_OPEN: string | null;
  SATURDAY_OPEN: string | null;
  THURSDAY_OPEN: string | null;
  TUESDAY_CLOSE: string | null;
  SATURDAY_CLOSE: string | null;
  THURSDAY_CLOSE: string | null;
  WEDNESDAY_OPEN: string | null;
  WEDNESDAY_CLOSE: string | null;
}

export interface OneProfile {
  id: number;
  account_name: string;
  phone_number: string;
  email: string;
  verified: string;
  img: string;
  bio: string | null;
  imgs: string[] | null;
  total_raings_no: number;
  opening_hours: OpeningHour[];
  user_has_reviewed?: number;
}

export interface ResGetProfile {
  result: OneProfile[];
}

// get my profile

export interface MyProfile {
  id: number;
  img: string;
  account_name: string;
  phone_number: string;
  account_type: "seller" | "buyer";
  email: string;
  address?: string;
  tag?: string;
}

export interface ResMyProfile {
  result: MyProfile[];
}
