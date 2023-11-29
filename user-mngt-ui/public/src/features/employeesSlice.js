import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const USERS_API_BASE_URL = "http://localhost:8080/api/v1/users";

export const fetchEmployees = createAsyncThunk(
  "employees/fetchEmployees",
  async () => {
    const response = await fetch(USERS_API_BASE_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch employees");
    }
    const employees = await response.json();
    // console.log(employees);
    return employees;
  }
);

export const fetchEmployeesByDepartment = createAsyncThunk(
  "employees/fetchEmployeesByDepartment",
  async (departmentId) => {
    const response = await fetch(
      `${USERS_API_BASE_URL}/department/${departmentId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch employees by department");
    }
    const employees = await response.json();
    return employees;
  }
);

export const employeesSlice = createSlice({
  name: "employees",
  initialState: {
    employees: [],
    status: "idle", // 'idle', 'loading', 'succeeded', 'failed'
    error: null,
  },
  extraReducers: {
    [fetchEmployees.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchEmployees.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.employees = action.payload;
    },
    [fetchEmployees.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },

    [fetchEmployeesByDepartment.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchEmployeesByDepartment.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.employees = action.payload;
    },
    [fetchEmployeesByDepartment.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

export default employeesSlice.reducer;
