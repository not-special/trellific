const Board = require("../models/board");
const HttpError = require("../models/httpError");
const { validationResult } = require("express-validator");

const getBoards = async (req, res, next) => {
  const docBoards = await Board.find({}, "title _id createdAt updatedAt")
  res.status(200)
  res.json(docBoards);
};

const getBoard = async (req, res, next) => {
  const docBoard = await Board
    .findOne({ _id: req.params.id }, "_id title createdAt updatedAt")
    .populate({path: "lists", populate: {path: "cards"}})
    //TODO remove __v
  
  res.status(200)
  res.json(docBoard)
}

const createBoard = async (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    try {
      const docBoard = await Board.create(req.body.board)
      const { __v, lists, ...response } = docBoard._doc
      res.status(201)
      res.json(response)
    } catch (err) {
      next(new HttpError("Creating board failed, please try again", 500))
    }
  } else {
    return next(new HttpError("The input field is empty.", 404));
  }
};

exports.getBoards = getBoards;
exports.createBoard = createBoard;
exports.getBoard = getBoard;
