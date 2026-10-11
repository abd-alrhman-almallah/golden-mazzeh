import { useRef, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthField from "./AuthField";
import { brand } from "../../data/brand";
import { AuthError } from "../../services/authService";
import { useAuthStore } from "../../store/authStore";
import { toast } from "../../store/toastStore";
import { getPostAuthRedirect } from "../../utils/authRedirect";
import { focusFirstInvalid } from "../../utils/focus";
import { getFirstName } from "../../utils/user";
import { isValidEmail } from "../../utils/validation";

interface LoginValues {
  email: string;
  password: string;
  rememberMe: boolean;
}

type LoginErrors = Partial<Record<"email" | "password", string>>;

function validate(values: LoginValues): LoginErrors {
  const errors: LoginErrors = {};

  if (!values.email.trim()) {
    errors.email = "Please enter your email address.";
  } else if (!isValidEmail(values.email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!values.password) {
    errors.password = "Please enter your password.";
  }

  return errors;
}

function LoginForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const login = useAuthStore((state) => state.login);
  const [values, setValues] = useState<LoginValues>({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // A ref blocks repeated submits instantly (state updates are not immediate)
  const isSubmittingRef = useRef(false);

  // Errors appear after the first submit, then update live as the user edits
  const errors = hasSubmitted ? validate(values) : {};

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, type, value, checked } = event.target;
    setValues((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));
    setSubmitError(null);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmittingRef.current) return;

    setHasSubmitted(true);
    setSubmitError(null);

    if (Object.keys(validate(values)).length > 0) {
      focusFirstInvalid();
      return;
    }

    isSubmittingRef.current = true;
    setIsSubmitting(true);

    try {
      const user = await login({
        email: values.email,
        password: values.password,
        rememberMe: values.rememberMe,
      });
      toast.success(`Welcome back, ${getFirstName(user.fullName)}.`);
      // Back to the page the user originally wanted (or the home page)
      navigate(getPostAuthRedirect(location.state), { replace: true });
    } catch (error) {
      setSubmitError(
        error instanceof AuthError
          ? error.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      isSubmittingRef.current = false;
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <form
        className="gh-auth__form"
        noValidate
        onSubmit={(event) => {
          void handleSubmit(event);
        }}
      >
        <AuthField
          id="gh-login-email"
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          value={values.email}
          onChange={handleChange}
          error={errors.email}
        />

        <AuthField
          id="gh-login-password"
          label="Password"
          name="password"
          type="password"
          autoComplete="current-password"
          value={values.password}
          onChange={handleChange}
          error={errors.password}
        />

        <div className="gh-auth__row">
          <label className="gh-auth__check">
            <input
              type="checkbox"
              name="rememberMe"
              checked={values.rememberMe}
              onChange={handleChange}
            />
            <span>Remember me</span>
          </label>
          {/* Password recovery is not implemented yet: tell the user honestly */}
          <button
            type="button"
            className="gh-auth__link-btn"
            onClick={() => toast.info("Password recovery isn't available yet.")}
          >
            Forgot password?
          </button>
        </div>

        <button
          type="submit"
          className="gh-auth__submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>

        {submitError && (
          <p className="gh-auth__error" role="alert">
            {submitError}
          </p>
        )}
      </form>

      <p className="gh-auth__switch">
        New to {brand.name}?{" "}
        <Link to="/register" className="gh-auth__link">
          Create an account
        </Link>
      </p>
    </>
  );
}

export default LoginForm;