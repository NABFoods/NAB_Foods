// Reference:  https://redux-toolkit.js.org/tutorials/typescript#use-typed-hooks-in-components
// Define Root State & Dispatch Types

import { configureStore } from '@reduxjs/toolkit'
// ...

export const store = configureStore({
  reducer: {  
    //... put featuresNames : sliceReducersNames key:value pairs here. BMA 
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch