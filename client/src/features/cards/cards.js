import { createSlice } from "@reduxjs/toolkit";
import { fetchBoard } from "../boards/boards"; 

const initialState = [];

const cardSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBoard.fulfilled, (state, action) => {
      return action.payload.lists.reduce((acc, list) => {
        const { cards } = list;
        return [...acc, ...cards];
      }, [])
    })

  },
});

export default cardSlice.reducer;
