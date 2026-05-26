const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    name: { type: String, required: true, unique: true, trim: true, lowercase: true },
    excerpt: { type: String, default: "", trim: true },
    publishedAt: { type: String, default: "", trim: true },
    readTime: { type: String, default: "", trim: true },
    coverImage: { type: String, default: "", trim: true },
    coverAlt: { type: String, default: "", trim: true },
    content: {
      type: [String],
      default: [],
      validate: {
        validator: (value) => Array.isArray(value) && value.every((item) => typeof item === "string"),
        message: "Content must be an array of strings.",
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Article || mongoose.model("Article", articleSchema);
