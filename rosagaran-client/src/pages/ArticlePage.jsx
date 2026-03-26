import Button from '../components/Button';

const ArticlePage = () => {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 sm:px-6 lg:px-8">
      <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
              Articles
            </p>
            <h1 className="max-w-xl text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
              Insights on product design, content, and growth strategy
            </h1>
            <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-600 sm:text-base">
              Explore practical guides from our studio team. Each article shares frameworks and examples you can apply to websites, app experiences, and digital campaigns.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button to="/" variant="primary">
                Back Home
              </Button>
              <Button to="/about">Meet the Team</Button>
            </div>
          </div>
          <img
            src="https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80"
            alt="Notebook and keyboard for content writing"
            className="h-full min-h-72 w-full rounded-2xl object-cover"
          />
        </div>
      </section>

      <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            Featured Articles
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-zinc-900">Read the latest stories from our team</h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <article className="rounded-3xl border border-zinc-200 bg-zinc-50 p-4">
            <img
              src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80"
              alt="Code editor and desk setup"
              className="aspect-4/3 w-full rounded-2xl object-cover"
            />
            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Article 01
            </p>
            <h3 className="mt-2 text-lg font-semibold text-zinc-900">Design systems for faster shipping</h3>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              Learn how reusable components reduce design debt and keep teams aligned across pages and features.
            </p>
            <Button className="mt-4">Read More</Button>
          </article>

          <article className="rounded-3xl border border-zinc-200 bg-zinc-50 p-4">
            <img
              src="https://images.unsplash.com/photo-1486312338219-ce68e2c6b696?auto=format&fit=crop&w=900&q=80"
              alt="Person writing content on laptop"
              className="aspect-4/3 w-full rounded-2xl object-cover"
            />
            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Article 02
            </p>
            <h3 className="mt-2 text-lg font-semibold text-zinc-900">Writing homepage copy that converts</h3>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              A practical breakdown of headlines, supporting paragraphs, and calls to action that drive action.
            </p>
            <Button className="mt-4">Read More</Button>
          </article>

          <article className="rounded-3xl border border-zinc-200 bg-zinc-50 p-4">
            <img
              src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=900&q=80"
              alt="Team meeting around a laptop"
              className="aspect-4/3 w-full rounded-2xl object-cover"
            />
            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Article 03
            </p>
            <h3 className="mt-2 text-lg font-semibold text-zinc-900">How to run productive design sprints</h3>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              Structure workshops, define hypotheses, and move from ideas to tested prototypes in one week.
            </p>
            <Button className="mt-4">Read More</Button>
          </article>

          <article className="rounded-3xl border border-zinc-200 bg-zinc-50 p-4">
            <img
              src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=900&q=80"
              alt="Laptop with analytics and dashboard screens"
              className="aspect-4/3 w-full rounded-2xl object-cover"
            />
            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Article 04
            </p>
            <h3 className="mt-2 text-lg font-semibold text-zinc-900">Post-launch metrics that matter</h3>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              Track engagement and behavior using a simple analytics stack to improve pages continuously.
            </p>
            <Button className="mt-4">Read More</Button>
          </article>
        </div>
      </section>
    </div>
  );
};

export default ArticlePage;