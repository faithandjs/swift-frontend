import { createSlice } from "@reduxjs/toolkit";
import { payloadType } from "../type";

const browser = typeof window === "object";
const initialState = {
  username: browser
    ? localStorage.getItem("swift_username")
      ? JSON.parse(localStorage.getItem("swift_username")!)
      : ""
    : "",
  avatar: browser
    ? localStorage.getItem("swift_avatar")
      ? JSON.parse(localStorage.getItem("swift_avatar")!)
      : ""
    : "",
  password: "",
  email: "",
  id: "",
};
// JSON.parse(localStorage.getItem('swift_username'))
console.log(browser);
export const DetailsSlice = createSlice({
  name: "detailsSlice",
  initialState,
  reducers: {
    setDetails: (state, action) => {
      const { type, det } = action.payload;
      if (type === payloadType.AVATAR) {
        state.avatar = det;
        localStorage.setItem("swift_avatar", JSON.stringify(det));
      }
      if (type === payloadType.EMAIL) {
        state.email = det;
      }
      if (type === payloadType.PASSWORD) {
        state.password = det;
      }
      if (type === payloadType.USERNAME) {
        state.username = det;
        localStorage.setItem("swift_username", JSON.stringify(det));
      }
      if (type === payloadType.ID) {
        state.id = det;
      }
    },
  },
});

export const detailsSliceDets = (state: any) => state.detailsSlice;
export const { setDetails } = DetailsSlice.actions;
export default DetailsSlice.reducer;
