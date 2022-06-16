import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchBoard } from "../boards/boards"; 
import apiClient from "../../lib/ApiClient";

const initialState = [];

export const createList = createAsyncThunk("lists/createList", async (args) => {
    const {title, boardId, callback} = args;
    const data = await apiClient.createList({title, boardId});
    if (callback) {
      callback();
    }
    return data;
  }
);

const listSlice = createSlice({
  name: "lists",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBoard.fulfilled, (state, action) => {
      return action.payload.lists
    }),
    builder.addCase(createList.fulfilled, (state, action) => {
      state.push(action.payload);
    })
  },
});

export default listSlice.reducer;
