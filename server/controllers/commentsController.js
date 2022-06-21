const Card = require("../models/card");
const Comment = require("../models/comment");

const createComment = async (req, res, next) => {
  // TODO: Add validation and error checking  
  const docComment = await Comment.create({
    text: req.body.comment.text,
    cardId: req.body.cardId,
  })
  await Card.findByIdAndUpdate(
    req.body.cardId,
    { 
      $push: { comments: docComment._id },
      $inc: { commentsCount: 1 }
    },
    { new: true, useFindAndModify: false } 
  )
  const { __v, ...response } = docComment._doc 
  res.status(201)
  res.json(response)
};

exports.createComment = createComment;
