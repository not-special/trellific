import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchBoard } from "../../features/boards/boards";
import Header from "./Header";
import ExistingLists from "./ExistingLists"

const Board = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  let boardFound = false;
  const board = useSelector((state) => {
    boardFound = state.boards.find(b => b._id === id );
    return boardFound;
  })

  useEffect(() => {
    dispatch(fetchBoard(id));
  }, [dispatch]);

  if (boardFound) {
    return (
      <>
        <Header title={board.title}/>
        <main>
          <ExistingLists boardId={board._id}/>
        </main>
      </>
    )
  } else {
    return (
      <div>Loading...</div>
    )
  }
}

export default Board;
