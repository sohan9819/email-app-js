import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Action
export const fetchEmails = createAsyncThunk('fetchEmails', async () => {
  const response = await fetch('https://flipkart-email-mock.vercel.app');
  return response.json();
});

const emailSlice = createSlice({
  name: 'email',
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchEmails.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchEmails.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload.list;
    });
    builder.addCase(fetchEmails.rejected, (state, action) => {
      console.log('Error ', action.payload);
      state.isError = true;
    });
  },
});

export const { setIsFavourite, setIsRead } = emailSlice.actions;

export default emailSlice.reducer;
