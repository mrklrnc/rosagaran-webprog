import fallbackArticles from "../assets/article-content";

const STORAGE_KEY = "rosagaran.articles";

export function slugifyArticleName(value = "") {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getStoredArticles() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return fallbackArticles;

    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length ? parsed : fallbackArticles;
  } catch {
    return fallbackArticles;
  }
}

export function saveArticles(articles) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(articles));
  return articles;
}

export function upsertArticle(article, existingName) {
  const currentArticles = getStoredArticles();
  const articleName = slugifyArticleName(article.name || article.title);
  const nextArticle = {
    ...article,
    name: articleName,
    content: Array.isArray(article.content)
      ? article.content
      : String(article.content || "")
          .split("\n")
          .map((paragraph) => paragraph.trim())
          .filter(Boolean),
  };

  const nextArticles = currentArticles.some((item) => item.name === existingName)
    ? currentArticles.map((item) => (item.name === existingName ? nextArticle : item))
    : [nextArticle, ...currentArticles];

  return saveArticles(nextArticles);
}

export function deleteArticle(name) {
  const nextArticles = getStoredArticles().filter((article) => article.name !== name);
  return saveArticles(nextArticles);
}
