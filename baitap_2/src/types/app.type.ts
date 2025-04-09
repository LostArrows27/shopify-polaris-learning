import { userSchema } from "@/schema/user_schema";
import { StatusCodes } from "http-status-codes";
import type { z } from "zod";

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

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type ServerResponse = {
  status: StatusCodes;
  message: string;
  data?: UserFormData;
};
