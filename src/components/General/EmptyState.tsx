import { Link } from "react-router-dom";

interface EmptyStateProps {
  title: string;
  text: string;
  actionLabel?: string;
  actionTo?: string;
}

const styles = `
.gh-empty {
  padding: 40px 24px;
  text-align: center;
  background: #FDFDFD;
  border: 1px dashed #93979A;
  border-radius: 2px;
}
.gh-empty__title {
  margin: 0 0 8px;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 20px;
  font-weight: 700;
  color: #04364F;
}
.gh-empty__text {
  margin: 0 auto 24px;
  max-width: 400px;
  font-size: 15px;
  line-height: 1.6;
  color: #04364F;
}
.gh-empty__text:last-child {
  margin-bottom: 0;
}
.gh-empty__btn {
  display: inline-block;
  padding: 12px 24px;
  background: #601E34;
  color: #FDFDFD;
  font: inherit;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  text-decoration: none;
  text-align: center;
  white-space: nowrap;
  border: 1px solid #601E34;
  border-radius: 2px;
  transition: background 0.2s ease, border-color 0.2s ease;
}
.gh-empty__btn:hover {
  background: #04364F;
  border-color: #04364F;
}
.gh-empty__btn:focus-visible {
  outline: 2px solid #601E34;
  outline-offset: 3px;
}
`;

function EmptyState({ title, text, actionLabel, actionTo }: EmptyStateProps) {
  return (
    <>
      <style>{styles}</style>
      <div className="gh-empty">
        <h3 className="gh-empty__title">{title}</h3>
        <p className="gh-empty__text">{text}</p>
        {actionLabel && actionTo && (
          <Link to={actionTo} className="gh-empty__btn">
            {actionLabel}
          </Link>
        )}
      </div>
    </>
  );
}

export default EmptyState;