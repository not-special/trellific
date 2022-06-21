import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchBoard } from "../boards/boards"; 
import apiClient from "../../lib/ApiClient";
// import { activateCardId } from "./activeCardId";

const initialState = [];

export const createCard = createAsyncThunk("cards/createCard", async (args) => {
  const {title, listId, callback} = args;
  const data = await apiClient.createCard({title, listId});
  if (callback) {
    callback();
  }
  return data;
});

/*
BUG: added guard clause checking for truthiness of cardId...
useEffect in CardModal component invoking fetchCard before useParams hook
assigns id to cardId
*/

export const fetchCard = createAsyncThunk("cards/fetchCard", async (args) => {
  const { cardId } = args;
  if (cardId) { // temp fix: guard clause... refactor
    const data = await apiClient.getCard({ cardId });
    return data;
  }
});

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
    });
    builder.addCase(createCard.fulfilled, (state, action) => {
      state.push(action.payload);
    });
    builder.addCase(fetchCard.fulfilled, (state, action) => {
      let filteredState = state.filter(card => card._id !== action.payload._id);
      return filteredState.concat(action.payload);
    });
  },
});

export default cardSlice.reducer;
