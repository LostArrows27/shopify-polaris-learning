import type { z } from "zod";
import type { userSchema } from "~/schema/user_schema";

export type Address = {
  id: string;
  address: string;
  city: string;
};

export interface UserState {
  fullName: string | undefined;
  email: string | undefined;
  addresses: Address[];
  setUserInfo: (fullName: string, email: string) => void;
  setAddresses: (addresses: Address[]) => void;
  reset: () => void;
}

export type UserFormData = z.infer<typeof userSchema>;
