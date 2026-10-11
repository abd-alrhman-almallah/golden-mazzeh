import type { InputHTMLAttributes } from "react";

interface AuthFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  error?: string;
  /** Helper text shown under the field while there is no error */
  hint?: string;
}

const styles = `
.gh-auth__hint {
  margin: 0;
  font-size: 13px;
  line-height: 1.5;
  color: #93979A;
}
`;

// Styled by the .gh-auth__* rules defined in AuthLayout.tsx
function AuthField({ id, label, error, hint, ...inputProps }: AuthFieldProps) {
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined;

  return (
    <>
      <style>{styles}</style>
      <div className="gh-auth__field">
        <label className="gh-auth__label" htmlFor={id}>
          {label}
        </label>
        <input
          id={id}
          className={
            error ? "gh-auth__input gh-auth__input--invalid" : "gh-auth__input"
          }
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          {...inputProps}
        />
        {error ? (
          <p id={`${id}-error`} className="gh-auth__error" role="alert">
            {error}
          </p>
        ) : hint ? (
          <p id={`${id}-hint`} className="gh-auth__hint">
            {hint}
          </p>
        ) : null}
      </div>
    </>
  );
}

export default AuthField;