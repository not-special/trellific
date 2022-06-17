import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = "";

export const activateCardId = createAsyncThunk("cards/activateCard", async (args) => {
  const { cardId } = args;
  return cardId;
});

const activeCardIdSlice = createSlice({
  name: "activeCard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(activateCardId.fulfilled, (state, action) => {
      return action.payload;
    })
  }
});

export default activeCardIdSlice.reducer;