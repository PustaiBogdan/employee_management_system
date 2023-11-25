import { configureStore } from "@reduxjs/toolkit";
import editModalReducer from "../features/editModalSlice";

export default configureStore({
  reducer: {
    editModal: editModalReducer,
  },
});
