import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

interface QuoteState {
  content: string
  author: string
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: QuoteState = {
  content: '',
  author: '',
  status: 'idle',
  error: null
}

export const fetchQuote = createAsyncThunk('quotes/fetchQuote', async () => {
  const response = await fetch('https://api.quotable.io/quotes/random')
  if (!response.ok) {
    throw new Error('Failed to fetch quote')
  }
  return response.json()
})

const quotesSlice = createSlice({
  name: 'quotes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuote.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchQuote.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.content = action.payload.content
        state.author = action.payload.author
      })
      .addCase(fetchQuote.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'Failed to fetch quote'
      })
  }
})

export default quotesSlice.reducer