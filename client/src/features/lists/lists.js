import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchBoard } from "../boards/boards"; 
import apiClient from "../../lib/ApiClient";

const initialState = [];

export const createList = createAsyncThunk("lists/createList", async (newList, callback) => {
    const data = await apiClient.createList(newList);
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
      console.log("listSlice createList.fulfilled action.payload: ", action.payload)
      state.push(action.payload);
    })
  },
});

export default listSlice.reducer;
