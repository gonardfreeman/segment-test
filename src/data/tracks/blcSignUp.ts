import { nanoid } from "nanoid";

import {
  createRandomAddress,
  createCompanyName,
  createPhone,
  createRandomPerson,
  createRandomUserId,
  createURL,
} from "..";

import type { SignUpRequestTrackBody } from "@/typings";

export function createBLCSignUpTrack({
  zip_code,
  address,
  user_email,
  user_full_name,
  name = createCompanyName(),
  user_id = createRandomUserId(),
  phone = createPhone(),
  mobile_phone = createPhone(),
  boss_site_profile_url = createURL(),
}: SignUpRequestTrackBody): SignUpRequestTrackBody {
  if (!zip_code || !address) {
    const { zip_code: zip, address: addr } = createRandomAddress();
    zip_code = zip;
    address = addr;
  }
  if (!user_email || !user_full_name) {
    const { email, name } = createRandomPerson();
    user_email = email;
    user_full_name = name;
  }
  return {
    address,
    zip_code,
    name,
    user_id,
    phone,
    mobile_phone,
    boss_site_profile_url,
    user_email,
    user_full_name,
    pipedrive_user_type: "Buyer",
  };
}

export const BLC_SIGN_UP_TRACK_INPUTS = [
  {
    name: "address",
    label: "Address",
    key: nanoid(),
    handleGenerate: () => createRandomAddress(),
  },
  {
    name: "zip_code",
    label: "Zip Code",
    key: nanoid(),
    handleGenerate: () => createRandomAddress(),
  },
  {
    name: "name",
    label: "Company Name",
    key: nanoid(),
    handleGenerate: () => createCompanyName(),
  },
  {
    name: "user_id",
    label: "User Id",
    key: nanoid(),
    handleGenerate: () => createRandomUserId(),
  },
  {
    name: "phone",
    label: "Phone",
    key: nanoid(),
    handleGenerate: () => createPhone(),
  },
  {
    name: "mobile_phone",
    label: "Mobile Phone",
    key: nanoid(),
    handleGenerate: () => createPhone(),
  },
  {
    name: "boss_site_profile_url",
    label: "Profile URL",
    key: nanoid(),
    handleGenerate: () => createURL(),
  },
  {
    name: "user_email",
    label: "User Email",
    key: nanoid(),
    handleGenerate: () => createRandomPerson().email,
  },
  {
    name: "user_full_name",
    label: "User Name",
    key: nanoid(),
    handleGenerate: () => createRandomPerson().name,
  },
];
