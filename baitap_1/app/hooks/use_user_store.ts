import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { UserState } from "~/types/app.type";

// NOTE: use persist -> store data in localStorage (default)
export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      fullName: undefined,
      email: undefined,
      addresses: [{ id: "1", address: "", city: "" }],

      setUserInfo: (fullName, email) => set({ fullName, email }),

      setAddresses: (addresses) => set({ addresses }),

      reset: () =>
        set({ fullName: undefined, email: undefined, addresses: [] }),
    }),
    {
      name: "user-storage",
    }
  )
);
