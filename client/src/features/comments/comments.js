import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCard } from "../cards/cards";
import apiClient from "../../lib/ApiClient";

const initialState = [];

export const createComment = createAsyncThunk("comments/createComment", async (args) => {
  const { cardId, text } = args;
  const data = await apiClient.createComment({ cardId, text });
  return data;
});

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCard.fulfilled, (state, action) => {
      return action.payload.comments; 
    });
    builder.addCase(createComment.fulfilled, (state, action) => {
      return state.concat(action.payload);
    })
  }
});

export default commentsSlice.reducer;
