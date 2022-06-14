const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ListSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'The List title is required']
    },
    board: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Board"
    },
    position: {
      type: Number,
      required: true,
      default: 65535
    },
  }
  , { timestamps: true }
);

const List = mongoose.model('List', ListSchema);
module.exports = List;