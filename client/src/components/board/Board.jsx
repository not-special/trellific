import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
// import * as actions from "../../actions/BoardActions";
import { useParams } from "react-router-dom";
import { fetchBoard } from "../../features/boards/boards";

const Board = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  let boardFound = false;
  const board = useSelector((state) => {
    console.log("state: ", state)
    boardFound = state.boards.find(b => b._id === id );
    return boardFound;
  })

  useEffect(() => {
    dispatch(fetchBoard(id));
  }, [dispatch]);

  if (boardFound) {
    return (
      <div>
        <p>{board.title}</p>
      </div>
    )
  } else {
    return (
      <div>Loading...</div>
    )
  }
}

export default Board
