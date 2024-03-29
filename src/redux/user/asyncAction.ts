import { apiGetUserCurrent } from "@/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getUserCurrent = createAsyncThunk(
  "user/current",
  async (_, { rejectWithValue }) => {
    const response = await apiGetUserCurrent();
    if (response?.data.error === 1) return rejectWithValue(response);
    if (response?.data.error === 2) return rejectWithValue(response);
    if (response?.data.error === 0) return response.data.userData;
  }
);
