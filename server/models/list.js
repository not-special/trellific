const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ListSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'The List title is required']
    },
    position: {
      type: Number,
      required: true,
      default: 65535
    },
    boardId: {
      type: Schema.Types.ObjectId,
      ref: "Board"
    },
    cards: [
      {
        type: Schema.Types.ObjectId,
        ref: "Card"
      }
    ]
  }
  , { timestamps: true }
);

const getLists = async (boardId) => {
  // TODO: add validation and error checking
  const docLists = await List
    .find({ boardId: boardId })
  
  return docLists
}

const getLastListPosition = async (boardId) => {
  const lists = await getLists(boardId);
  if (lists.length > 0) {
    // sort in descending order by position
    lists.sort((a, b) => b.position - a.position);
    return lists[0].position;
  }
  return 0;
}

const List = mongoose.model('List', ListSchema);
module.exports = { 
  List,
  getLastListPosition
}
