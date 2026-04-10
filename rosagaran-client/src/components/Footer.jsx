import { Link, NavLink } from 'react-router-dom';

const footerLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Articles', to: '/articles' },
];

const Footer = () => {
  return (
    <footer className="border-t border-zinc-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr_1fr] lg:gap-12">
          <div>
            <Link to="/" className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full border border-zinc-900 bg-zinc-900 text-xs font-bold tracking-widest text-white">
                RS
              </div>
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-zinc-900">
                  Rosagaran Studio
                </p>
                <p className="text-xs text-zinc-500">Digital design and content lab</p>
              </div>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-7 text-zinc-600">
              We craft interfaces, narratives, and launch-ready experiences for teams who care about clarity and polish.
            </p>
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">Explore</p>
            <ul className="mt-4 flex flex-col gap-2">
              {footerLinks.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    className={({ isActive }) =>
                      [
                        'text-sm font-medium transition',
                        isActive ? 'text-zinc-900' : 'text-zinc-600 hover:text-zinc-900',
                      ].join(' ')
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">Studio</p>
            <ul className="mt-4 flex flex-col gap-2 text-sm text-zinc-600">
              <li>hello@rosagaran.studio</li>
              <li>Remote-first · APAC hours</li>
              <li className="pt-2">
                <Link to="/this-link-is-intentionally-broken" className="font-medium text-zinc-600 hover:text-zinc-900">
                  Broken link (test 404)
                </Link>
              </li>
              <li className="pt-2">
                <span className="mr-2 rounded-full border border-zinc-200 bg-zinc-50 px-2 py-1 text-[10px] font-semibold uppercase tracking-widest text-zinc-600">
                  New
                </span>
                <span className="text-zinc-500">Article drops weekly</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-zinc-200 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-zinc-500">
            © {new Date().getFullYear()} Rosagaran Studio. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-4 text-xs text-zinc-500">
            <span className="cursor-default rounded-full border border-zinc-200 px-3 py-1">Privacy</span>
            <span className="cursor-default rounded-full border border-zinc-200 px-3 py-1">Terms</span>
            <span className="cursor-default rounded-full border border-zinc-200 px-3 py-1">Accessibility</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
