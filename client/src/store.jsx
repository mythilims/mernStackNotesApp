// store.js
import { configureStore } from '@reduxjs/toolkit';
import authSlice from './features/authSlice';
import noteSlice from './features/noteSlice';

// // 🔐 Token Middleware
// const authTokenMiddleware = (store) => (next) => (action) => {
//   const token = localStorage.getItem('token');
//   if (token && typeof action === 'object') {
//     action.meta = { ...(action.meta || {}), token };
//   }
//   return next(action);
// };

// // 🧾 Logger Middleware
// const loggerMiddleware = (store) => (next) => (action) => {
//   console.log('➡️ Dispatching:', action.type);
//   const result = next(action);
//   console.log('✅ Next State:', store.getState());
//   return result;
// };

const store = configureStore({
  reducer: {
    auth: authSlice,
    notes:noteSlice
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(loggerMiddleware, authTokenMiddleware),
});

export default store;
