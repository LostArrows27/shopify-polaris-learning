import { UserState } from "@/types/app.type";
import { create } from "zustand";

// NOTE: use persist -> store data in localStorage (default)
export const useUserInformation = create<UserState>()((set) => ({
  fullName: "",
  email: "",
  addresses: [],

  setUserInfo: (fullName, email) => set({ fullName, email }),

  setAddresses: (addresses) => set({ addresses }),

  reset: () => set({ fullName: "", email: "", addresses: [] }),
}));
