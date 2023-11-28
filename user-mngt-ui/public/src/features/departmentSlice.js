// features/departmentsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const DEPARTMENTS_API_BASE_URL = "http://localhost:8080/api/v1/departments";

export const fetchDepartments = createAsyncThunk(
  "departments/fetchDepartments",
  async () => {
    const response = await fetch(DEPARTMENTS_API_BASE_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch departments");
    }
    const departments = await response.json();
    return departments;
  }
);

export const departmentsSlice = createSlice({
  name: "departments",
  initialState: {
    departments: [],
    status: "idle", // 'idle', 'loading', 'succeeded', 'failed'
    error: null,
  },
  extraReducers: {
    [fetchDepartments.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchDepartments.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.departments = action.payload;
    },
    [fetchDepartments.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

export default departmentsSlice.reducer;
