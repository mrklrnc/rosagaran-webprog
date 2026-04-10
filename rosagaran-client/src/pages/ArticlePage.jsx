import { useParams } from 'react-router-dom';
import Button from '../components/Button';
import articles from '../assets/article-content.js';

function ArticlePage() {
    const { name } = useParams();
    const article = articles.find(article => article.name === name);

    if (!article) {
        return (
            <div className="flex w-full flex-col gap-6">
                <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
                    <div className="mx-auto max-w-3xl">
                        <h1 className="text-3xl font-bold text-zinc-900">Article not found</h1>
                        <Button to="/articles" className="mt-6">Back to Articles</Button>
                    </div>
                </section>
            </div>
        );
    }

    return (
        <div className="flex w-full flex-col gap-6">
            <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
                <div className="max-w-3xl">
                    <div className="mb-4">
                        <Button to="/articles"> Back to Articles</Button>
                    </div>
                    <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
                        Article
                    </p>
                    <h1 className="text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
                        {article.title}
                    </h1>
                    <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-zinc-500">
                        {article.publishedAt && <span>{article.publishedAt}</span>}
                        {article.publishedAt && article.readTime && (
                            <span className="hidden sm:inline" aria-hidden>
                                ·
                            </span>
                        )}
                        {article.readTime && <span>{article.readTime}</span>}
                    </div>
                    {article.excerpt && (
                        <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-600">{article.excerpt}</p>
                    )}
                </div>
            </section>

            <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
                <div className="mx-auto max-w-3xl">
                    {article.coverImage && (
                        <div className="mb-8 overflow-hidden rounded-[1.25rem] border-2 border-zinc-900 bg-zinc-200 shadow-[6px_6px_0_0_rgb(24_24_27)]">
                            <img
                                src={article.coverImage}
                                alt={article.coverAlt ?? ''}
                                className="aspect-4/3 w-full object-cover"
                            />
                        </div>
                    )}

                    <div className="prose prose-sm max-w-none space-y-4 text-zinc-700">
                        {article.content.map((paragraph, index) => (
                            <p key={index} className="text-base leading-7 text-zinc-700 whitespace-pre-wrap">
                                {paragraph}
                            </p>
                        ))}
                    </div>

                    <div className="mt-8 border-t-2 border-zinc-900 pt-6">
                        <Button to="/articles">Back to Articles</Button>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default ArticlePage;