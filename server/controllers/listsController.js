const List = require("../models/list");
const HttpError = require("../models/httpError");
const { validationResult } = require("express-validator");

const createList = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    List.create({
      title: req.body.list.title,
      doc: req.body.boardId,
      docModel: "Board"
    })
    .then((list) => {
      List.find({_id: list._id}, "title _id createAt updatedAt").then(
        (list) => res.json({ list })
      )
    })
    .catch((err) => {
      next(new HttpError("Creating list failed, please try again", 500))
    })
  } else {
    return next(new HttpError("The input field is empty.", 404));
  }
}

exports.createList = createList;