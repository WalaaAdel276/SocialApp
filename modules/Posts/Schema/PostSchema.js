const { Schema } = require("mongoose");

const postSchema = new Schema(
  {
    title: String,
    content: { type: String },
    Reported_Post: {
      type: Boolean,
      default: false
    },
    Block_Post: {
      type: Boolean,
      default: false
    },
    Number_Of_Reports: {
      type: Number,
      default: 0
    },
    createdBy: { type: Schema.Types.ObjectId, ref: "users" },

  },
  {
    timestamps: true,
  }
);

module.exports = postSchema;