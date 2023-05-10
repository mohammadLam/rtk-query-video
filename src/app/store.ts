import { configureStore } from '@reduxjs/toolkit'
import apiSlice from '../features/api/slice'

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer
  },
  middleware: defaultMiddlewares => defaultMiddlewares().concat(apiSlice.middleware)
})

export default store
