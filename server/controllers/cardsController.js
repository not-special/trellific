const List = require("../models/list");
const HttpError = require("../models/httpError");
const { validationResult } = require("express-validator");
const Card = require("../models/card");

const createCard = async (req, res, next) => {
  // TODO: Add validation and error checking  
  const docList = await List.findById(req.body.listId);

  const docCard = await Card.create({
    title: req.body.card.title,
    listId: req.body.listId,
    boardId: docList.boardId,
  })
  await List.findByIdAndUpdate(
    req.body.listId,
    { $push: { cards: docCard._id } },
    { new: true, useFindAndModify: false } 
  )
  const { __v, ...response } = docCard._doc 
  res.status(201)
  res.json(response)
};

const getCard = async (req, res, next) => {
  // TODO: add validation and error checking
  const docCard = await Card
    .findById(req.params.id)
    .populate({path: "comments"})
    .populate({path: "actions"});
  
    const { __v, ...response } = docCard._doc 
  res.status(200); 
  res.json(response);
}

exports.createCard = createCard;
exports.getCard = getCard;
