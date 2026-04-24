import Button from '../../components/Button';

const AboutPage = () => {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 sm:px-6 lg:px-8">
      <section className="overflow-hidden rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <img
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80"
            alt="Creative team collaborating in an office"
            className="h-full min-h-72 w-full rounded-2xl object-cover"
          />

          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
              About
            </p>
            <h1 className="max-w-xl text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
              We design thoughtful digital products for modern brands.
            </h1>
            <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-600 sm:text-base">
              Rosagaran Studio is a multidisciplinary team of product designers, developers, and storytellers. We partner with startups and growing businesses to create websites and digital platforms that are simple, beautiful, and effective.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button to="/" variant="primary">
                Back Home
              </Button>
              <Button to="/articles">Open Articles</Button>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            Studio at a glance
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-zinc-900">Our values and numbers</h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-5">
            <p className="text-2xl font-bold text-zinc-900">7+</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Years of work
            </p>
          </div>
          <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-5">
            <p className="text-2xl font-bold text-zinc-900">50+</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Projects delivered
            </p>
          </div>
          <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-5">
            <p className="text-2xl font-bold text-zinc-900">22</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Team members
            </p>
          </div>
          <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-5">
            <p className="text-2xl font-bold text-zinc-900">4.9/5</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Avg client rating
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
              What we do
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-zinc-900">Services built around outcomes</h2>

            <div className="mt-6 space-y-4">
              <article className="rounded-3xl border border-zinc-200 bg-zinc-50 p-5">
                <h3 className="text-lg font-semibold text-zinc-900">Discovery and Research</h3>
                <p className="mt-3 text-sm leading-6 text-zinc-600">
                  We interview stakeholders, analyze competitors, and define success metrics so every design decision is grounded in real goals.
                </p>
              </article>

              <article className="rounded-3xl border border-zinc-200 bg-zinc-50 p-5">
                <h3 className="text-lg font-semibold text-zinc-900">Design and Prototyping</h3>
                <p className="mt-3 text-sm leading-6 text-zinc-600">
                  From early wireframes to high-fidelity mockups, we craft interfaces that communicate clearly and perform well across devices.
                </p>
              </article>

              <article className="rounded-3xl border border-zinc-200 bg-zinc-50 p-5">
                <h3 className="text-lg font-semibold text-zinc-900">Launch and Continuous Growth</h3>
                <p className="mt-3 text-sm leading-6 text-zinc-600">
                  We continue with optimization sprints, analytics reviews, and iterative improvements that help products keep growing.
                </p>
              </article>
            </div>
          </div>

          <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">Behind the scenes</p>
            <img
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1000&q=80"
              alt="Project workshop with sticky notes and planning board"
              className="mt-5 h-56 w-full rounded-2xl object-cover"
            />
            <p className="mt-4 text-sm leading-6 text-zinc-600">
              Every project starts with a collaborative workshop where we align brand direction, user needs, and business priorities. This process keeps delivery focused and transparent.
            </p>
            <Button className="mt-5" to="/articles">
              View Insights
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;