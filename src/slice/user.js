import { createSlice } from '@reduxjs/toolkit';

// Function to load state from local storage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('userState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    return undefined;
  }
};

// Function to save state to local storage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('userState', serializedState);
  } catch (error) {
    console.log('Error ', error);
  }
};

const userSlice = createSlice({
  name: 'user',
  initialState: loadState() || {
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

const persistedUserReducer = (state, action) => {
  const newState = userSlice.reducer(state, action);
  saveState(newState);
  return newState;
};

export const { setRead, setFavourite } = userSlice.actions;

export default persistedUserReducer;
