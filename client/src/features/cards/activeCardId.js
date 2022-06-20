import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../lib/ApiClient";

const initialState = null;

export const activateCardId = createAsyncThunk("cards/activateCard", async (args) => {
  const { cardId } = args;

  if (cardId) {
    const data = await apiClient.getCard({ cardId });
    return data;
  }
  return null;
});

const activeCardIdSlice = createSlice({
  name: "activeCard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(activateCardId.fulfilled, (state, action) => {
      if (action.payload) {
        return action.payload._id;
      }
      return null;
    })
  }
});

export default activeCardIdSlice.reducer;