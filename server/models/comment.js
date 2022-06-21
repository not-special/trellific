const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema(
  {
    text: {
      type: String,
      default: "" // TODO: return error 422 if no text is provided
    },
    cardId: {
      type: Schema.Types.ObjectId,
      ref: "Card"
    },
  }
  , { timestamps: true }
);

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;
