import { configureStore } from "@reduxjs/toolkit";
import editModalReducer from "../features/editModalSlice";
import departmentsReducer from "../features/departmentSlice";
import employeesReducer from "../features/employeesSlice";
export default configureStore({
  reducer: {
    // editModal: editModalReducer,
    departments: departmentsReducer,
    employees: employeesReducer,
  },
});
