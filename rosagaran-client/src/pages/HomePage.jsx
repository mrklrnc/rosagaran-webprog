import Button from '../components/Button';

const HomePage = () => {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 sm:px-6 lg:px-8">
      <section className="overflow-hidden rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
              Home
            </p>
            <h1 className="max-w-xl text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
              Build digital experiences with design, strategy, and engaging content.
            </h1>
            <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-600 sm:text-base">
              Rosagaran Studio helps teams transform ideas into meaningful products. We blend branding, UI design, and content direction to launch websites that feel clear, useful, and memorable.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button to="/about" variant="primary">
                Explore About
              </Button>
              <Button to="/articles">Read Articles</Button>
            </div>
          </div>

          <img
            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80"
            alt="Designer workspace with laptop and planning notes"
            className="h-full min-h-72 w-full rounded-2xl object-cover"
          />
        </div>
      </section>

      <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            Studio Impact
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-zinc-900">What we have delivered so far</h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-5">
            <p className="text-2xl font-bold text-zinc-900">35+</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Client Projects
            </p>
          </div>
          <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-5">
            <p className="text-2xl font-bold text-zinc-900">14</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Countries Reached
            </p>
          </div>
          <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-5">
            <p className="text-2xl font-bold text-zinc-900">120+</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Published Assets
            </p>
          </div>
          <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-5">
            <p className="text-2xl font-bold text-zinc-900">98%</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Partner Satisfaction
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            Featured Services
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-zinc-900">How we help teams ship better products</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <article className="rounded-3xl border border-zinc-200 bg-zinc-50 p-4">
            <img
              src="https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=900&q=80"
              alt="UX designer prototyping a mobile interface"
              className="aspect-4/3 w-full rounded-2xl object-cover"
            />
            <h3 className="mt-4 text-lg font-semibold text-zinc-900">UX and Product Design</h3>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              We map user journeys, build wireframes, and design polished interfaces focused on conversion and usability.
            </p>
            <Button className="mt-4" variant="primary">
              View Service
            </Button>
          </article>

          <article className="rounded-3xl border border-zinc-200 bg-zinc-50 p-4">
            <img
              src="https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&w=900&q=80"
              alt="Team discussing content strategy and analytics"
              className="aspect-4/3 w-full rounded-2xl object-cover"
            />
            <h3 className="mt-4 text-lg font-semibold text-zinc-900">Content and Messaging</h3>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              Our writers shape clear narratives for landing pages, campaigns, and product stories that connect with the right audience.
            </p>
            <Button className="mt-4" variant="primary">
              View Service
            </Button>
          </article>

          <article className="rounded-3xl border border-zinc-200 bg-zinc-50 p-4">
            <img
              src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=80"
              alt="Workspace with reports and growth planning"
              className="aspect-4/3 w-full rounded-2xl object-cover"
            />
            <h3 className="mt-4 text-lg font-semibold text-zinc-900">Launch and Growth Support</h3>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              We support teams after launch with page optimization, performance reviews, and creative iteration.
            </p>
            <Button className="mt-4" variant="primary">
              View Service
            </Button>
          </article>
        </div>
      </section>
    </div>
  );
};

export default HomePage;