import { z } from "zod";
import { addressSchema } from "./address_schema";

export const userSchema = z.object({
  fullName: z.string().trim().min(1, "Full name is required"),
  email: z.string().email("Invalid email format"),
  addresses: z.array(addressSchema),
});
