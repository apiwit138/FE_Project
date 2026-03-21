import { configureStore, combineReducers } from '@reduxjs/toolkit';
import bookReducer from './features/bookSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // ใช้ Local Storage

// 1. สร้าง Root Reducer โดยรวม Reducers ทั้งหมดเข้าด้วยกัน
const rootReducer = combineReducers({
  bookSlice: bookReducer,
});

// 2. ตั้งค่า Persist Configuration
const persistConfig = {
  key: 'root',
  storage,
};

// 3. สร้าง Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 4. สร้าง Store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// 5. สร้าง Persistor สำหรับใช้ใน Provider
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;