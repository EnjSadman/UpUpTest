import { configureStore } from '@reduxjs/toolkit'
import CharaterReducer from './features/CharacterSlice/CharacterSlice';
import InfoReducer from './features/InfoSlice/InfoSlice';
import MiscReducer from './features/MiscSlice/MiscSlice';

export const store = configureStore({
  reducer: {
    characters: CharaterReducer,
    info: InfoReducer,
    misc: MiscReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch