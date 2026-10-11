import { toast } from "../../store/toastStore";

interface AdminAction {
  label: string;
  danger?: boolean;
  disabled?: boolean;
}

interface AdminActionsProps {
  /** Used for accessible labels, e.g. "Deluxe Room" or "booking GH-10482" */
  subject: string;
  actions: AdminAction[];
}

const styles = `
.gh-aactions {
  display: flex;
  flex-wrap: nowrap;
  gap: 8px;
}
.gh-aactions__btn {
  padding: 7px 14px;
  font: inherit;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.06em;
  color: #04364F;
  background: #FDFDFD;
  border: 1px solid rgba(4, 54, 79, 0.3);
  border-radius: 2px;
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
}
.gh-aactions__btn:hover:not(:disabled) {
  background: #04364F;
  border-color: #04364F;
  color: #FDFDFD;
}
.gh-aactions__btn--danger {
  color: #601E34;
  border-color: rgba(96, 30, 52, 0.4);
}
.gh-aactions__btn--danger:hover:not(:disabled) {
  background: #601E34;
  border-color: #601E34;
  color: #FDFDFD;
}
.gh-aactions__btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
.gh-aactions__btn:focus-visible {
  outline: 2px solid #601E34;
  outline-offset: 2px;
}

/* Touch screens: larger tap targets */
@media (pointer: coarse) {
  .gh-aactions__btn {
    min-height: 44px;
    padding: 10px 16px;
  }
}
`;

// These actions are not implemented yet: clicking tells the user so honestly
function AdminActions({ subject, actions }: AdminActionsProps) {
  return (
    <>
      <style>{styles}</style>
      <div className="gh-aactions">
        {actions.map((action) => (
          <button
            key={action.label}
            type="button"
            disabled={action.disabled}
            aria-label={`${action.label} ${subject}`}
            className={
              action.danger
                ? "gh-aactions__btn gh-aactions__btn--danger"
                : "gh-aactions__btn"
            }
            onClick={() => toast.info(`${action.label} isn't available yet.`)}
          >
            {action.label}
          </button>
        ))}
      </div>
    </>
  );
}

export default AdminActions;