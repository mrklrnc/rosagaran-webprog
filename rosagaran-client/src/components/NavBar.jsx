import { NavLink } from 'react-router-dom';

const links = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Articles', to: '/articles' },
];

const navLinkClassName = ({ isActive }) =>
  [
    'rounded-full border px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] transition',
    isActive
      ? 'border-zinc-900 bg-zinc-900 text-zinc-50 shadow-sm'
      : 'border-transparent text-zinc-500 hover:border-zinc-300 hover:bg-zinc-100 hover:text-zinc-900',
  ].join(' ');

const NavBar = () => {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-zinc-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <NavLink to="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-900 bg-zinc-900 text-xs font-bold tracking-widest text-white">
            RS
          </div>
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-zinc-900">Rosagaran Studio</p>
            <p className="text-xs text-zinc-500">Digital design and content lab</p>
          </div>
        </NavLink>

        <div className="flex flex-wrap items-center justify-end gap-3">
          <nav className="flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-2 py-1 shadow-sm">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={navLinkClassName}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <NavLink
              to="/auth/signin"
              className="rounded-full border border-zinc-300 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-zinc-700 transition hover:border-zinc-900 hover:text-zinc-900"
            >
              Sign In
            </NavLink>
            <NavLink
              to="/auth/signup"
              className="rounded-full border border-zinc-900 bg-zinc-900 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-zinc-50 transition hover:bg-zinc-700"
            >
              Sign Up
            </NavLink>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
