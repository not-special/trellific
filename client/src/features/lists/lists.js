import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchBoard } from "../boards/boards"; 
import apiClient from "../../lib/ApiClient";

const initialState = [];

export const createList = createAsyncThunk("lists/createList", async (newList) => {
    const data = await apiClient.createList(newList);
    console.log("before callback")
    // console.log("callback: ", callback)
    // if (callback) {
    //   callback();
    // }
    console.log("after callback")
    console.log("data: ", data)
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
      console.log("action: ", action)
      console.log("state: ", state)
      state.push(action.payload);
    })
  },
});

export default listSlice.reducer;
