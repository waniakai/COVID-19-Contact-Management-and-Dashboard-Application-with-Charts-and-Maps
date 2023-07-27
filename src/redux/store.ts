import { configureStore } from '@reduxjs/toolkit';
import contactsReducer from './contactSlice';

// Load the state from local storage, if available
const persistedStateJSON = localStorage.getItem('reduxState');
let persistedState = {};
if (persistedStateJSON) {
  persistedState = JSON.parse(persistedStateJSON);
}

// Create the Redux store
export const store = configureStore({
  reducer: {
    contacts: contactsReducer,
  },
  preloadedState: persistedState,
});

// Save the state to local storage whenever the store state changes
store.subscribe(() => {
  const state = store.getState();
  const serializedState = JSON.stringify(state);
  localStorage.setItem('reduxState', serializedState);
});

// Export the RootState type
export type RootState = ReturnType<typeof store.getState>;
