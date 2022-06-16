import axios from "axios";
import * as routes from "../constants/ApiRoutes";

function logError(errorResponse) {
  const response = errorResponse.response;

  if (response && response.data && response.data.error) {
    console.error(`HTTP Error: ${response.data.error}`);
  } else {
    console.error("Error: ", errorResponse);
  }
}

axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
axios.defaults.headers.common["Accept"] = "application/json";

const apiClient = {
  getBoards: async () => {
    try {
      const { data } = await axios.get(routes.BOARDS_INDEX_URL);
      return data;
    } catch (e) {
      logError(e);
    }
  },
  createBoard: async (board) => {
    try {
      const { data } = await axios.post(routes.CREATE_BOARD_URL, { board });
      return data;
    } catch (e) {
      logError(e);
    }
  },
  getBoard: async (id) => {
    try {
      const { data } = await axios.get(`${routes.BOARD_URL}/${id}`);
      return data;
    } catch (e) {
      logError(e);
    }
  },
  createList: async ({boardId, title}) => {
    try {
      const { data } = await axios.post(`${routes.CREATE_LIST_URL}`, { "boardId": boardId, "list": {"title": title }});
      return data;
    } catch (e) {
      logError(e);
    }
  },
  editList: async (args) => { 
    const reqBody = {};

    for (let [key, value] of Object.entries(args)) {
      if (value !== undefined && key !== 'listId') {
        reqBody[key] = value;
      }
    }

    try {
      const { data } = await axios.put(`${routes.EDIT_LIST_URL}/${args["listId"]}`, reqBody );
      return data;
    } catch (e) {
      logError(e)
    }
  } 
};

export default apiClient;
