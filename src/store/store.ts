import { configureStore } from '@reduxjs/toolkit'
import tasksReducer from '../features/tasks/tasksSlice'
import quotesReducer from '../features/quotes/quotesSlice'

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    quotes: quotesReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch