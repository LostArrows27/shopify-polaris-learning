import { z } from "zod";

export const addressSchema = z.object({
  id: z.string(),
  address: z.string().trim().min(1, "Address is required"),
  city: z.string().trim().min(1, "City name is required"),
});
