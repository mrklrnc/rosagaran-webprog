import { Link } from 'react-router-dom';
import Button from '../components/Button';

function NotFoundPage({ layoutShell = true }) {
  return (
    <div
      className={[
        'text-zinc-900',
        layoutShell ? '' : 'min-h-screen bg-zinc-100',
      ]
        .join(' ')
        .trim()}
    >
      {!layoutShell && (
        <header className="border-b border-zinc-200 bg-white/95 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
            <Link to="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-900 bg-zinc-900 text-xs font-bold tracking-widest text-white">
                RS
              </div>
              <span className="text-sm font-bold uppercase tracking-[0.18em]">Rosagaran Studio</span>
            </Link>
            <Link
              to="/"
              className="text-[10px] font-semibold uppercase tracking-[0.24em] text-zinc-600 transition hover:text-zinc-900"
            >
              Back to home
            </Link>
          </div>
        </header>
      )}

      <div className={layoutShell ? '' : 'border-b border-zinc-200'}>
        <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
            <div>
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
                404 · Page not found
              </p>
              <h1 className="text-4xl font-bold leading-tight text-zinc-900 sm:text-5xl">
                This page wandered off the map.
              </h1>
              <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-600 sm:text-base">
                The URL may be mistyped, or the content moved. Try the homepage, browse articles, or use
                the navigation above to get back on track.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button to="/" variant="primary">
                  Go home
                </Button>
                <Button to="/articles">Read articles</Button>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-3xl border-2 border-zinc-900 bg-zinc-200 shadow-[8px_8px_0_0_rgb(24_24_27)]">
              <img
                src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80"
                alt="Dimly lit creative workspace suggesting a missing page"
                className="aspect-4/3 w-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-zinc-900/55 via-transparent to-transparent" />
              <p className="absolute bottom-4 left-4 right-4 text-sm font-medium text-white drop-shadow-sm">
                We will keep the coffee warm while you find your way back.
              </p>
            </div>
          </div>
        </section>
      </div>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">Popular next steps</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <Link
              to="/about"
              className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5 transition hover:border-zinc-900"
            >
              <h2 className="text-base font-semibold text-zinc-900">About the studio</h2>
              <p className="mt-2 text-sm leading-6 text-zinc-600">Learn how we approach design and content partnerships.</p>
            </Link>
            <Link
              to="/articles"
              className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5 transition hover:border-zinc-900"
            >
              <h2 className="text-base font-semibold text-zinc-900">Article library</h2>
              <p className="mt-2 text-sm leading-6 text-zinc-600">Practical notes on React, UX, and shipping work.</p>
            </Link>
            <a
              href="mailto:hello@rosagaran.studio"
              className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5 transition hover:border-zinc-900"
            >
              <h2 className="text-base font-semibold text-zinc-900">Say hello</h2>
              <p className="mt-2 text-sm leading-6 text-zinc-600">Tell us what you are building—we read every note.</p>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default NotFoundPage;
