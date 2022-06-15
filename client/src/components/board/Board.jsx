import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
// import * as actions from "../../actions/BoardActions";
import { useParams } from "react-router-dom";
import { fetchBoard } from "../../features/boards/boards";

const Board = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  // const board = useSelector((state) => state.Boards.filter(board => board._id === id));
  const board = useSelector((state) => {
    console.log("STATE:", state.boards);
  })

  useEffect(() => {
    console.log('Board path: ', id)
    console.log('Board: ', board);
    dispatch(fetchBoard(id));
  }, [dispatch]);

  return (
    <div>
      <p>Hey!!</p>
    </div>
  )
}

export default Board
