import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Action
export const fetchEmailDetail = createAsyncThunk(
  'fetchEmailDetail',
  async (emailId) => {
    const response = await fetch(
      `https://flipkart-email-mock.vercel.app/?id=${emailId}`
    );
    return response.json();
  }
);

export const emailDetailSlice = createSlice({
  name: 'emailDetail',
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
    detail: null,
  },
  reducers: {
    selectEmail: (state, action) => {
      state.data = action.payload;
    },
    deSelectEmail: (state, action) => {
      state.data = null;
      state.detail = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchEmailDetail.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchEmailDetail.fulfilled, (state, action) => {
      state.isLoading = false;
      state.detail = action.payload.body;
    });
    builder.addCase(fetchEmailDetail.rejected, (state, action) => {
      console.log('Error ', action.payload);
      state.isError = true;
    });
  },
});

export const { selectEmail, deSelectEmail } = emailDetailSlice.actions;

export default emailDetailSlice.reducer;
