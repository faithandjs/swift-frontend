import { createSlice } from "@reduxjs/toolkit";
import { payloadType } from "../type";
const initialState = {
  username: "",
  password: "",
  email: "",
  avatar: "",
  id: ''
};
export const DetailsSlice = createSlice({
  name: "detailsSlice",
  initialState,
  reducers: {
    setDetails: (state, action) => {
      const { type, det } = action.payload;
      console.log(type, det);
      if (type === payloadType.AVATAR) state.avatar = det;
      if (type === payloadType.EMAIL) state.email = det;
      if (type === payloadType.PASSWORD) state.password = det;
      if (type === payloadType.USERNAME) state.username = det;
      if (type === payloadType.ID) state.id = det;
    },
  },
});

export const detailsSliceDets = (state: any) => state.detailsSlice;
export const { setDetails } = DetailsSlice.actions;
export default DetailsSlice.reducer
