import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Address } from '@/types/app.type';

// Define the state type
interface AddressState {
  addresses: Address[];
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: AddressState = {
  addresses: [],
  loading: false,
  error: null,
};

// Create the address slice
const addressSlice = createSlice({
  name: 'addresses',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setAddresses: (state, action: PayloadAction<Address[]>) => {
      state.addresses = action.payload;
      state.loading = false;
      state.error = null;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setLoading, setAddresses, setError } = addressSlice.actions;
export default addressSlice.reducer;