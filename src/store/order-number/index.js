import { createSlice } from "@reduxjs/toolkit";

const orderNumberSlice = createSlice({
  name: "orderNumber",
  initialState: {
    orderNumber: null,
  },
  reducers: {
    setOrderNumber(state, action) {
      state.orderNumber = action.payload;
    },
  },
});

export const { setOrderNumber } = orderNumberSlice.actions;
export default orderNumberSlice.reducer;
