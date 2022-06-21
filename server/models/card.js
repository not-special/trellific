const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CardSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'The Card title is required']
    },
    listId: {
      type: Schema.Types.ObjectId,
      ref: "List"
    },
    boardId: {
      type: Schema.Types.ObjectId,
      ref: "Board"
    },
    dueDate: {
      type: Date,
      default: null
    },
    labels: [
      {
        type: String
      }
    ],
    description: {
      type: String,
      default: ""
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
    },
    archived: {
      type: Boolean,
      default: false
    },
    completed: {
      type: Boolean,
      default: false
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment"
      }
    ],
    actions: [
      {
        type: String // // TODO: update type to reference commends type?
      }
    ],
  }
  , { timestamps: true }
);

const Card = mongoose.model('Card', CardSchema);

module.exports = Card;
