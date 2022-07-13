import { configureStore } from '@reduxjs/toolkit'
import moviesReducer from '../features/movies/moviesSlice'
// import movieDetailsReducer from '../features/movieDetails/movieDetailsSlice'

export default configureStore({
  reducer: {
    movies: moviesReducer,
  }
})
