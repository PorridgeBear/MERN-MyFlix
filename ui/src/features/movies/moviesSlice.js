import { createSlice } from '@reduxjs/toolkit'

export const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    list: []
  },
  reducers: {
    load: (state, action) => {
      state.list = action.payload.movies;
    }
  }
})

export const { load } = moviesSlice.actions

export default moviesSlice.reducer

export const selectMovies = state => state.movies.list
