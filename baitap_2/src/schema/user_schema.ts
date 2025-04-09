import { z } from "zod";
import { addressSchema } from "./address_schema";

export const userSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(1, "Full name is required")
    .refine((value) => !/\d/.test(value ?? ""), {
      message: "Full name cannnot contain numbers",
    }),
  email: z.string().email("Invalid email format"),
  addresses: z.array(addressSchema),
});
