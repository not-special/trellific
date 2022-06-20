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

export const editList = createAsyncThunk("lists/editList", async (args) => {
  const {listId, title, position, callback } = args;
  const data = await apiClient.editList({listId, title, position});
  if (callback) {
    callback();
  }
  return data;
})

const listSlice = createSlice({
  name: "lists",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBoard.fulfilled, (state, action) => {
      const cleanedPayload = [];

      action.payload.lists.forEach(list => {
        const { cards, ...otherProps } = list;
        cleanedPayload.push(otherProps);
      });

      return cleanedPayload;
    });
    builder.addCase(createList.fulfilled, (state, action) => {
      state.push(action.payload);
    });
    builder.addCase(editList.fulfilled, (state, action) => {
      const filteredState = state.filter(list => list._id !== action.payload._id);
      return filteredState.concat(action.payload);
    });
  },
});

export default listSlice.reducer;
