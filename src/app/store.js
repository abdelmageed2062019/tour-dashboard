import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import usersReducer from "./users/userSlice";
import toursReducer from "./tours/toursSlice";
// import bookingsReducer from "./bookings/bookingsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    tours: toursReducer,
    //     bookings: bookingsReducer,
  },
});

export default store;
