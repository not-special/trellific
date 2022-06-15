const List = require("../models/list");
const HttpError = require("../models/httpError");
const { validationResult } = require("express-validator");
const Board = require("../models/board");

const createList = async (req, res, next) => {
  // TODO: Add validation and error checking
  const docList = await List.create({
    title: req.body.list.title,
    boardId: req.body.boardId
  })
  await Board.findByIdAndUpdate(
    req.body.boardId,
    { $push: { lists: docList._id } },
    { new: true, useFindAndModify: false } 
  )
  const { __v, cards, ...response } = docList._doc
  res.status(201)
  res.json(response)
}

exports.createList = createList;
