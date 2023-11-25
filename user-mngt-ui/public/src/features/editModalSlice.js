import { createSlice } from "@reduxjs/toolkit";

export const editModalSlice = createSlice({
  name: "editModal",
  initialState: {
    isOpen: false,
  },
  reducers: {
    setOpen: (state, action) => {
      state.isOpen = action.payload;
    },
  },
});

// export const editModalState = (state) => state.editModalState.value;
export const { setOpen } = editModalSlice.actions;
export default editModalSlice.reducer;
