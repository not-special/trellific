const List = require("../models/list");
const HttpError = require("../models/httpError");
const { validationResult } = require("express-validator");
const Card = require("../models/card");

const createCard = async (req, res, next) => {
  // TODO: Add validation and error checking  
  const docCard = await Card.create({
    title: req.body.card.title,
  })
  await List.findByIdAndUpdate(
    req.body.listId,
    { $push: { cards: docCard._id } },
    { new: true, useFindAndModify: false } 
  )
  res.status(201)
  res.json(docCard)
}

exports.createCard = createCard;
