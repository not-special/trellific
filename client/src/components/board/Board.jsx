import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchBoard } from "../../features/boards/boards";
import Header from "./Header";
// import CardModal from "./CardModal";
import ExistingLists from "./ExistingLists"

/*
BUG: when modal is rendered board tries to refresh in the background but 
params id refers to card... GET Request returns 200 with null payload
*/

const Board = () => {
  const { id } = useParams(); 
  const dispatch = useDispatch();
  let boardFound = false;
  const board = useSelector((state) => {
    boardFound = state.boards.find(b => b._id === id );
    return boardFound;
  });
  

  useEffect(() => {
    dispatch(fetchBoard(id));
  }, [dispatch, id]);

  if (boardFound) {
    return (
      <>
        <Header title={board.title}/>
        <main>
          <ExistingLists boardId={board._id}/>
        </main>
        {/* <CardModal /> */}
      </>
    )
  } else {
    return (
      <div>Loading...</div>
    )
  }
}

export default Board;
