import { Link, useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import Button from "../../components/Button";
import { signIn } from "../../auth/auth";
import { createUser, loginUser } from "../../services/UserService";
import { validateUserForm } from "../../utils/userValidation";

const inputClasses =
  "mt-2 w-full rounded-xl border border-zinc-300 bg-zinc-100 px-4 py-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-zinc-900 focus:bg-zinc-50";

const actionButtonClassName = "w-full rounded-xl py-3 text-[13px] tracking-[0.2em]";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const canSubmit = useMemo(() => {
    return (
      firstName.trim().length > 0 &&
      lastName.trim().length > 0 &&
      email.trim().length > 0 &&
      username.trim().length > 0 &&
      contactNumber.trim().length > 0 &&
      address.trim().length > 0 &&
      password.length >= 8 &&
      !isSubmitting
    );
  }, [address, contactNumber, email, firstName, isSubmitting, lastName, password, username]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const nextFirst = firstName.trim();
    const nextLast = lastName.trim();
    const nextEmail = email.trim();
    const nextUsername = username.trim();
    const nextContactNumber = contactNumber.trim();
    const nextAddress = address.trim();

    if (!nextFirst) return setError("Please enter your first name.");
    if (!nextLast) return setError("Please enter your last name.");
    if (!nextEmail) return setError("Please enter your email.");
    if (!nextEmail.includes("@")) return setError("Please enter a valid email.");
    if (!nextUsername) return setError("Please enter a username.");
    if (!nextAddress) return setError("Please enter your address.");

    const validationErrors = validateUserForm({
      contactNumber: nextContactNumber,
      username: nextUsername,
      password,
    });

    if (validationErrors.contactNumber) return setError(validationErrors.contactNumber);
    if (validationErrors.username) return setError(validationErrors.username);
    if (validationErrors.password) return setError(validationErrors.password);

    setIsSubmitting(true);
    try {
      await createUser({
        firstName: nextFirst,
        lastName: nextLast,
        age: "18",
        gender: "Prefer not to say",
        contactNumber: nextContactNumber,
        email: nextEmail,
        type: "editor",
        username: nextUsername,
        password,
        address: nextAddress,
        isActive: true,
      });

      const { data } = await loginUser({ email: nextEmail, password });
      signIn({ user: data.user, token: data.token });
      navigate("/dashboard", { replace: true });
    } catch (error) {
      setError(error.response?.data?.message || "Unable to create your account right now. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">Sign Up</h1>
      <p className="mt-3 text-sm leading-6 text-zinc-600">
        Create your account with the same monochrome layout pattern and shared button treatment.
      </p>

      <form className="mt-8 space-y-5" onSubmit={onSubmit}>
        {error && (
          <div role="alert" className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
            {error}
          </div>
        )}
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="first-name" className="text-sm font-medium text-zinc-700">
              First Name
            </label>
            <input
              id="first-name"
              type="text"
              placeholder="Placeholder"
              autoComplete="given-name"
              className={inputClasses}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="last-name" className="text-sm font-medium text-zinc-700">
              Last Name
            </label>
            <input
              id="last-name"
              type="text"
              placeholder="Placeholder"
              autoComplete="family-name"
              className={inputClasses}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label htmlFor="signup-email" className="text-sm font-medium text-zinc-700">
            Email
          </label>
          <input
            id="signup-email"
            type="email"
            placeholder="Placeholder"
            autoComplete="email"
            className={inputClasses}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="signup-username" className="text-sm font-medium text-zinc-700">
              Username
            </label>
            <input
              id="signup-username"
              type="text"
              placeholder="Placeholder"
              autoComplete="username"
              className={inputClasses}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="signup-contact" className="text-sm font-medium text-zinc-700">
              Contact Number
            </label>
            <input
              id="signup-contact"
              type="text"
              placeholder="Placeholder"
              className={inputClasses}
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label htmlFor="signup-address" className="text-sm font-medium text-zinc-700">
            Address
          </label>
          <input
            id="signup-address"
            type="text"
            placeholder="Placeholder"
            className={inputClasses}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="signup-password" className="text-sm font-medium text-zinc-700">
            Password
          </label>
          <input
            id="signup-password"
            type="password"
            placeholder="Placeholder"
            autoComplete="new-password"
            className={inputClasses}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className="mt-2 text-xs leading-5 text-zinc-500">
            Use a secure password with letters, numbers, and symbols.
          </p>
        </div>

        <Button type="submit" variant="primary" className={actionButtonClassName} disabled={!canSubmit}>
          {isSubmitting ? "Creating..." : "Create Account"}
        </Button>

        <div className="grid gap-3 pt-2 sm:grid-cols-2">
          <Button type="button" variant="secondary" className={actionButtonClassName}>
            Sign Up with Google
          </Button>
          <Button type="button" variant="secondary" className={actionButtonClassName}>
            Sign Up with Apple
          </Button>
        </div>
      </form>

      <div className="mt-8 border-t border-zinc-200 pt-6 text-sm text-zinc-600">
        Already have an account?{" "}
        <Link to="/auth/signin" className="font-semibold text-zinc-900 transition hover:text-zinc-600">
          Log In
        </Link>
      </div>
    </>
  );
};

export default SignUpPage;
