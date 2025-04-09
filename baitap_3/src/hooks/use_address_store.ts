import { AppDispatch, RootState } from "@/libs/stores/address_store";
import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";

export const useAddressStoreDispatch = () => useDispatch<AppDispatch>();
export const useAddressStoreSelector: TypedUseSelectorHook<RootState> = useSelector;
