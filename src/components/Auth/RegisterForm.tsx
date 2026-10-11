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
import { MIN_PASSWORD_LENGTH, isValidEmail } from "../../utils/validation";

interface RegisterValues {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

type RegisterErrors = Partial<Record<keyof RegisterValues, string>>;

function validate(values: RegisterValues): RegisterErrors {
  const errors: RegisterErrors = {};

  if (!values.fullName.trim()) {
    errors.fullName = "Please enter your full name.";
  }

  if (!values.email.trim()) {
    errors.email = "Please enter your email address.";
  } else if (!isValidEmail(values.email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!values.password) {
    errors.password = "Please enter a password.";
  } else if (values.password.length < MIN_PASSWORD_LENGTH) {
    errors.password = `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`;
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = "Please confirm your password.";
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = "Passwords do not match.";
  }

  if (!values.acceptTerms) {
    errors.acceptTerms = "You must accept the terms to continue.";
  }

  return errors;
}

function RegisterForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const register = useAuthStore((state) => state.register);
  const [values, setValues] = useState<RegisterValues>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailTakenError, setEmailTakenError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // A ref blocks repeated submits instantly (state updates are not immediate)
  const isSubmittingRef = useRef(false);

  // Errors appear after the first submit, then update live as the user edits
  const errors: RegisterErrors = hasSubmitted ? validate(values) : {};
  if (!errors.email && emailTakenError) {
    errors.email = emailTakenError;
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, type, value, checked } = event.target;
    setValues((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (name === "email") {
      setEmailTakenError(null);
    }
    setSubmitError(null);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmittingRef.current) return;

    setHasSubmitted(true);
    setEmailTakenError(null);
    setSubmitError(null);

    if (Object.keys(validate(values)).length > 0) {
      focusFirstInvalid();
      return;
    }

    isSubmittingRef.current = true;
    setIsSubmitting(true);

    try {
      const user = await register({
        fullName: values.fullName,
        email: values.email,
        password: values.password,
      });
      toast.success(
        `Welcome to ${brand.name}, ${getFirstName(user.fullName)}. Your account has been created.`,
      );
      // Back to the page the user originally wanted (or the home page)
      navigate(getPostAuthRedirect(location.state), { replace: true });
    } catch (error) {
      if (error instanceof AuthError && error.code === "email-taken") {
        setEmailTakenError(error.message);
        focusFirstInvalid();
      } else {
        setSubmitError("Something went wrong. Please try again.");
      }
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
          id="gh-register-name"
          label="Full Name"
          name="fullName"
          type="text"
          autoComplete="name"
          value={values.fullName}
          onChange={handleChange}
          error={errors.fullName}
        />

        <AuthField
          id="gh-register-email"
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          value={values.email}
          onChange={handleChange}
          error={errors.email}
        />

        <AuthField
          id="gh-register-password"
          label="Password"
          name="password"
          type="password"
          autoComplete="new-password"
          hint={`Use at least ${MIN_PASSWORD_LENGTH} characters.`}
          value={values.password}
          onChange={handleChange}
          error={errors.password}
        />

        <AuthField
          id="gh-register-confirm"
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          value={values.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
        />

        <div className="gh-auth__field">
          <label className="gh-auth__check">
            <input
              type="checkbox"
              name="acceptTerms"
              checked={values.acceptTerms}
              onChange={handleChange}
              aria-invalid={Boolean(errors.acceptTerms)}
              aria-describedby={
                errors.acceptTerms ? "gh-register-terms-error" : undefined
              }
            />
            <span>
              {/* TEMPORARY: /terms and /privacy show the "Page not found" page */}
              I agree to the{" "}
              <Link
                to="/terms"
                className="gh-auth__link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Terms
              </Link>{" "}
              and{" "}
              <Link
                to="/privacy"
                className="gh-auth__link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Privacy Policy
              </Link>
            </span>
          </label>
          {errors.acceptTerms && (
            <p
              id="gh-register-terms-error"
              className="gh-auth__error"
              role="alert"
            >
              {errors.acceptTerms}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="gh-auth__submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creating Account..." : "Create Account"}
        </button>

        {submitError && (
          <p className="gh-auth__error" role="alert">
            {submitError}
          </p>
        )}
      </form>

      <p className="gh-auth__switch">
        Already have an account?{" "}
        <Link to="/login" className="gh-auth__link">
          Login
        </Link>
      </p>
    </>
  );
}

export default RegisterForm;