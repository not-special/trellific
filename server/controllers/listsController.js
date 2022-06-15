const List = require("../models/list");
const HttpError = require("../models/httpError");
const { validationResult } = require("express-validator");
const Board = require("../models/board");

const createList = async (req, res, next) => {
  // TODO: Add validation and error checking
  const docList = await List.create({
    title: req.body.list.title,
  })
  await Board.findByIdAndUpdate(
    req.body.boardId,
    { $push: { lists: docList._id } },
    { new: true, useFindAndModify: false } 
  )
  res.status(201)
  res.json(docList)
}

exports.createList = createList;
