import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { UserState } from "~/types/app.type";

// NOTE: use persist -> store data in localStorage (default)
export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      fullName: "",
      email: "",
      addresses: [{ id: "1", address: "", city: "" }],

      setUserInfo: (fullName, email) => set({ fullName, email }),

      addAddress: (address) =>
        set((state) => ({
          addresses: [...state.addresses, address],
        })),

      updateAddress: (id, updatedAddress) =>
        set((state) => ({
          addresses: state.addresses.map((addr) =>
            addr.id === id ? updatedAddress : addr
          ),
        })),

      removeAddress: (id) =>
        set((state) => ({
          addresses: state.addresses.filter((addr) => addr.id !== id),
        })),

      setAddresses: (addresses) => set({ addresses }),

      reset: () => set({ fullName: "", email: "", addresses: [] }),
    }),
    {
      name: "user-storage",
    }
  )
);
