interface Person {
  email: string;
  name: string;
}
interface Address {
  address: string;
  zip_code: string;
}

interface SignUpRequestTrackBody {
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

interface InputConfig {
  readonly key: string;
  readonly label: string;
  readonly handleGenerate: () => string;
}

interface InputProps {
  readonly label: string;
  readonly value: string;
  readonly onChange: (newValue: string) => void;
}

interface MainComponentProps {
  readonly inputs: InputConfig[];
}
