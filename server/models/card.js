const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CardSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'The List title is required']
    },
    listId: {
      type: ObjectId,
      ref: "List"
    },
    boardtId: {
      type: ObjectId,
      ref: "Board"
    },
    dueDate: {
      type: Date,
      required: false
    },
    labels: [
      {
        type: String
      }
    ],
    description: {
      type: String,
      required: false
    },
    commentsCount: {
      type: Number,
      required: true,
      default: 0
    },
    position: {
      type: Number,
      required: true,
      default: 65535
    }
  }
  , { timestamps: true }
);

const Card = mongoose.model('Card', CardSchema);

module.exports = Card;