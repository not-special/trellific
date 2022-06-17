import { configureStore } from "@reduxjs/toolkit";
import boardsReducer from "../features/boards/boards";
import listsReducer from "../features/lists/lists";
import cardsReducer from "../features/cards/cards";
import activeCardIdReducer from "../features/cards/activeCardId";

const store = configureStore({
  reducer: {
    boards: boardsReducer,
    lists: listsReducer,
    cards: cardsReducer,
    activeCardId: activeCardIdReducer, 
  },
});

export default store;
