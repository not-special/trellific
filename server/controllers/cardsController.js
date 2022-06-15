const List = require("../models/list");
const HttpError = require("../models/httpError");
const { validationResult } = require("express-validator");
const Card = require("../models/card");

const createCard = async (req, res, next) => {
  // TODO: Add validation and error checking  
  const docCard = await Card.create({
    // TODO: Add boardId (need GET)
    title: req.body.card.title,
    listId: req.body.listId
  })
  await List.findByIdAndUpdate(
    req.body.listId,
    { $push: { cards: docCard._id } },
    { new: true, useFindAndModify: false } 
  )
  const { __v, ...response } = docCard._doc 
  res.status(201)
  res.json(response)
}

exports.createCard = createCard;
