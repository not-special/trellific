import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCard } from "../cards/cards";

const initialState = [];

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCard.fulfilled, (state, action) => {
      return action.payload.comments; 
    });
  }
});

export default commentsSlice.reducer;