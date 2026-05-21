import { Link, useLocation, useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import Button from "../../components/Button";
import { signIn } from "../../auth/auth";
import { loginUser } from "../../services/UserService";

const inputClasses =
  "mt-2 w-full rounded-xl border border-zinc-300 bg-zinc-100 px-4 py-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-zinc-900 focus:bg-zinc-50";

const actionButtonClassName = "w-full rounded-xl py-3 text-[11px] tracking-[0.2em]";

const SignInPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const signupMessage = location.state?.message;

  const canSubmit = useMemo(() => {
    return email.trim().length > 0 && password.length >= 8 && !isSubmitting;
  }, [email, password, isSubmitting]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const nextEmail = email.trim();
    if (!nextEmail) return setError("Please enter your email.");
    if (!nextEmail.includes("@")) return setError("Please enter a valid email.");
    if (password.length < 8) return setError("Password must be at least 8 characters.");

    setIsSubmitting(true);
    try {
      const { data } = await loginUser({ email: nextEmail, password });
      signIn({ user: data.user, token: data.token, remember });
      navigate("/dashboard", { replace: true });
    } catch (error) {
      setError(error.response?.data?.message || "Unable to sign in right now. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">Log In</h1>
      <p className="mt-3 text-sm leading-6 text-zinc-600">
        Access your account using the same monochrome wireframe language used across the site.
      </p>

      <form className="mt-8 space-y-5" onSubmit={onSubmit}>
        {signupMessage && (
          <div role="status" className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
            {signupMessage}
          </div>
        )}
        {error && (
          <div role="alert" className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
            {error}
          </div>
        )}
        <div>
          <label htmlFor="signin-email" className="text-sm font-medium text-zinc-700">
            Email Address
          </label>
          <input
            id="signin-email"
            type="email"
            placeholder="Placeholder"
            autoComplete="email"
            className={inputClasses}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="signin-password" className="text-sm font-medium text-zinc-700">
            Password
          </label>
          <input
            id="signin-password"
            type="password"
            placeholder="Placeholder"
            autoComplete="current-password"
            className={inputClasses}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className="mt-2 text-xs leading-5 text-zinc-500">
            It must be a combination of minimum 8 letters, numbers, and symbols.
          </p>
        </div>

        <div className="flex items-center justify-between gap-4 text-sm">
          <label className="flex items-center gap-2 text-zinc-600">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-zinc-300 accent-zinc-900"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
            />
            <span>Remember me</span>
          </label>
          <button type="button" className="font-medium text-zinc-700 transition hover:text-zinc-900">
            Forgot Password?
          </button>
        </div>

        <Button type="submit" variant="primary" className={actionButtonClassName} disabled={!canSubmit}>
          {isSubmitting ? "Logging In..." : "Log In"}
        </Button>

        <div className="grid gap-3 pt-2 sm:grid-cols-2">
          <Button type="button" variant="secondary" className={actionButtonClassName}>
            Log In with Google
          </Button>
          <Button type="button" variant="secondary" className={actionButtonClassName}>
            Log In with Apple
          </Button>
        </div>
      </form>

      <div className="mt-8 border-t border-zinc-200 pt-6 text-sm text-zinc-600">
        No account yet?{" "}
        <Link to="/auth/signup" className="font-semibold text-zinc-900 transition hover:text-zinc-600">
          Sign Up
        </Link>
      </div>
    </>
  );
};

export default SignInPage;
