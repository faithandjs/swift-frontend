import { configureStore } from "@reduxjs/toolkit";
import DetailsSliceReducer from "../features/detailsSlice";
export const store = configureStore({
  reducer: {
    detailsSlice: DetailsSliceReducer,
  },
});
