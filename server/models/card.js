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

const getCards = async (listId) => {
  const docCards = await Card
    .find({ listId: listId })
  
  return docCards;
}

const getLastCardPosition = async (listId) => {
  const cards = await getCards(listId);
  if (cards.length > 0) {
    // sort in descending order by position
    cards.sort((a, b) => b.position - a.position);
    return cards[0].position;
  }
  return 0;
}

const Card = mongoose.model('Card', CardSchema);

module.exports = {
  Card,
  getLastCardPosition
}
