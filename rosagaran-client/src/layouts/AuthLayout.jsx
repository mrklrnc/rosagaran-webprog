import { NavLink, Outlet } from 'react-router-dom';

const AUTH_IMAGE_URL =
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80';

const AuthLayout = () => {
  return (
    <section className="min-h-screen bg-[#f4f6ff] text-zinc-900">
      <div className="grid min-h-screen w-full lg:grid-cols-2">
        <main className="flex items-center bg-white px-6 py-10 sm:px-10 lg:px-16">
          <div className="mx-auto w-full max-w-md">
            <NavLink to="/" className="mb-10 inline-flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-indigo-600 text-sm font-bold text-white">
                RS
              </span>
              <div>
                <p className="text-sm font-semibold text-zinc-900">Rosagaran Studio</p>
                <p className="text-xs text-zinc-500">Welcome back</p>
              </div>
            </NavLink>
            <Outlet />
          </div>
        </main>

        <aside className="hidden items-center justify-center bg-[#f4f6ff] p-10 lg:flex">
          <div className="w-full max-w-2xl">
            <div className="rounded-3xl bg-[#f4f6ff] p-6">
              <img
                src={AUTH_IMAGE_URL}
                alt="Workspace illustration"
                className="h-auto w-full rounded-2xl"
              />
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default AuthLayout;  