export interface SignUpRequestTrackBody {
  address?: string;
  zip_code?: string;
  name?: string;
  user_id?: string;
  phone?: string;
  mobile_phone?: string;
  boss_site_profile_url?: string;
  user_email?: string;
  user_full_name?: string;
  pipedrive_user_type?: "Buyer";
}

export interface Person {
  email: string;
  name: string;
}

export interface Address {
  address: string;
  zip_code: string;
}
