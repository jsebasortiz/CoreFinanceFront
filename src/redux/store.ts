// ** Redux Imports
import rootReducer from './rootReducer'
import { configureStore } from '@reduxjs/toolkit'

// ** Configura la tienda de Redux
const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

// ** Exportar la instancia del store
export { store }

// ** Exportar RootState y AppDispatch para su uso en TypeScript
export type RootState = ReturnType<typeof store.getState> // Define el tipo del estado global (RootState)
export type AppDispatch = typeof store.dispatch // Define el tipo de dispatch (AppDispatch)
