interface LoaderProps {
  /** Text shown (and announced to screen readers) next to the spinner */
  message?: string;
}

const styles = `
.gh-loader {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 64px 24px;
  text-align: center;
}
.gh-loader__ring {
  width: 32px;
  height: 32px;
  border: 2px solid rgba(147, 151, 154, 0.3);
  border-top-color: #601E34;
  border-radius: 50%;
  animation: gh-loader-spin 0.9s linear infinite;
}
.gh-loader__text {
  margin: 0;
  font-size: 15px;
  line-height: 1.6;
  color: #93979A;
}

@keyframes gh-loader-spin {
  to {
    transform: rotate(360deg);
  }
}
@media (prefers-reduced-motion: reduce) {
  .gh-loader__ring {
    animation: none;
    border-color: #601E34;
  }
}
`;

function Loader({ message = "Loading..." }: LoaderProps) {
  return (
    <>
      <style>{styles}</style>
      <div className="gh-loader" role="status" aria-live="polite">
        <span className="gh-loader__ring" aria-hidden="true" />
        <p className="gh-loader__text">{message}</p>
      </div>
    </>
  );
}

export default Loader;