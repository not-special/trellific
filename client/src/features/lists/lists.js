import { createSlice } from "@reduxjs/toolkit";
import { fetchBoard } from "../boards/boards"; 

const initialState = [];

const listSlice = createSlice({
  name: "lists",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBoard.fulfilled, (state, action) => {
      return action.payload.lists
    })

  },
});

export default listSlice.reducer;
