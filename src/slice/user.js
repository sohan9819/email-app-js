import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    readed: [],
    favourites: [],
  },
  reducers: {
    setRead: (state, action) => {
      switch (action.payload.type) {
        case 'read':
          state.readed.push(action.payload.id);
          break;
        case 'unread':
          state.readed = state.readed.filter(
            (emailId) => emailId !== action.payload.id
          );
          break;
        default:
          break;
      }
    },
    setFavourite: (state, action) => {
      switch (action.payload.type) {
        case 'favourite':
          state.favourites.push(action.payload.id);
          break;
        case 'dislike':
          state.favourites = state.favourites.filter(
            (emailId) => emailId !== action.payload.id
          );
          break;
        default:
          break;
      }
    },
  },
});

export const { setRead, setFavourite } = userSlice.actions;

export default userSlice.reducer;
