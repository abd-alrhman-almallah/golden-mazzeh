interface ErrorStateProps {
  title?: string;
  /** A short, user-friendly sentence (never a technical message) */
  message: string;
  /** When provided, a retry button is shown */
  onRetry?: () => void;
  retryLabel?: string;
}

const styles = `
.gh-errorstate {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 24px;
  text-align: center;
  background: #FDFDFD;
  border: 1px solid #601E34;
  border-radius: 2px;
}
.gh-errorstate__icon {
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  margin-bottom: 16px;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 18px;
  font-weight: 700;
  color: #601E34;
  border: 1px solid #601E34;
  border-radius: 50%;
}
.gh-errorstate__title {
  margin: 0 0 8px;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 20px;
  font-weight: 700;
  color: #04364F;
}
.gh-errorstate__text {
  margin: 0 auto 24px;
  max-width: 400px;
  font-size: 15px;
  line-height: 1.6;
  color: #04364F;
}
.gh-errorstate__text:last-child {
  margin-bottom: 0;
}
.gh-errorstate__btn {
  display: inline-block;
  padding: 12px 24px;
  background: #601E34;
  color: #FDFDFD;
  font: inherit;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  white-space: nowrap;
  border: 1px solid #601E34;
  border-radius: 2px;
  cursor: pointer;
  transition: background 0.2s ease, border-color 0.2s ease;
}
.gh-errorstate__btn:hover {
  background: #04364F;
  border-color: #04364F;
}
.gh-errorstate__btn:focus-visible {
  outline: 2px solid #601E34;
  outline-offset: 3px;
}
`;

function ErrorState({
  title = "Something went wrong",
  message,
  onRetry,
  retryLabel = "Try again",
}: ErrorStateProps) {
  return (
    <>
      <style>{styles}</style>
      <div className="gh-errorstate" role="alert">
        <span className="gh-errorstate__icon" aria-hidden="true">
          !
        </span>
        <h3 className="gh-errorstate__title">{title}</h3>
        <p className="gh-errorstate__text">{message}</p>
        {onRetry && (
          <button
            type="button"
            className="gh-errorstate__btn"
            onClick={onRetry}
          >
            {retryLabel}
          </button>
        )}
      </div>
    </>
  );
}

export default ErrorState;