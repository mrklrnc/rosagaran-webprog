const Article = require("../models/Article");
const articleSeeds = require("../data/articleSeeds");

function slugifyArticleName(value = "") {
  return String(value)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normalizeContent(content) {
  if (Array.isArray(content)) {
    return content.map((paragraph) => String(paragraph).trim()).filter(Boolean);
  }

  return String(content || "")
    .split("\n")
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

function normalizeArticlePayload(payload = {}) {
  return {
    title: payload.title?.trim(),
    name: slugifyArticleName(payload.name || payload.title),
    excerpt: payload.excerpt?.trim() || "",
    publishedAt: payload.publishedAt?.trim() || "",
    readTime: payload.readTime?.trim() || "",
    coverImage: payload.coverImage?.trim() || "",
    coverAlt: payload.coverAlt?.trim() || "",
    content: normalizeContent(payload.content),
  };
}

async function ensureSeedArticles() {
  const existingCount = await Article.countDocuments();
  if (!existingCount) {
    await Article.insertMany(articleSeeds);
  }
}

const getArticles = async (req, res) => {
  try {
    await ensureSeedArticles();
    const articles = await Article.find({}).sort({ createdAt: -1 });
    res.json({ articles });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getArticleBySlug = async (req, res) => {
  try {
    await ensureSeedArticles();
    const article = await Article.findOne({ name: req.params.slug.toLowerCase() });

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    res.json({ article });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createArticle = async (req, res) => {
  try {
    const payload = normalizeArticlePayload(req.body);
    const article = await Article.create(payload);
    res.status(201).json({ article });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateArticle = async (req, res) => {
  try {
    const currentArticle = await Article.findById(req.params.id);
    if (!currentArticle) {
      return res.status(404).json({ message: "Article not found" });
    }

    const payload = normalizeArticlePayload({
      ...currentArticle.toObject(),
      ...req.body,
    });

    const article = await Article.findByIdAndUpdate(req.params.id, payload, {
      new: true,
      runValidators: true,
    });

    res.json({ article });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteArticle = async (req, res) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    res.json({ message: "Article deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getArticles,
  getArticleBySlug,
  createArticle,
  updateArticle,
  deleteArticle,
};
