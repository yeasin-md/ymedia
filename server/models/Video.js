const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const VideoSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    channelName: { type: String, required: true },
    title: { type: String, required: true },
    origin: { type: String, required: true },
    singer: { type: String },
    description: { type: String },
    reviews: [
      {
        review: String,
        user: { type: ObjectId, ref: 'User' },
        commentator: String,
        createdAt: {
          type: Date,
          default: Date.now(),
        },
      },
    ],
    likes: [
      {
        liked: Boolean,
        likedUser: { type: ObjectId, ref: 'User' },
        likedUsername: String,
        createdAt: {
          type: Date,
          default: Date.now(),
        },
      },
    ],
    link: { type: String, required: true },
    cName: { type: Array },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Video', VideoSchema);
