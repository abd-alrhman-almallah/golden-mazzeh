import Modal from "./Modal";

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const styles = `
.gh-confirm__message {
  margin: 0;
}
.gh-confirm__btn {
  padding: 12px 24px;
  font: inherit;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  text-align: center;
  border: 1px solid #601E34;
  border-radius: 2px;
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
}
.gh-confirm__btn--confirm {
  background: #601E34;
  color: #FDFDFD;
}
.gh-confirm__btn--confirm:hover {
  background: #04364F;
  border-color: #04364F;
}
.gh-confirm__btn--cancel {
  background: transparent;
  color: #04364F;
  border-color: #04364F;
}
.gh-confirm__btn--cancel:hover {
  background: #04364F;
  color: #FDFDFD;
}
.gh-confirm__btn:focus-visible {
  outline: 2px solid #601E34;
  outline-offset: 3px;
}
`;

// Reusable confirmation dialog (use it instead of window.confirm).
// Focus starts on the safe choice (cancel).
function ConfirmDialog({
  isOpen,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onCancel}
      title={title}
      footer={
        <>
          <style>{styles}</style>
          <button
            type="button"
            className="gh-confirm__btn gh-confirm__btn--cancel"
            onClick={onCancel}
            data-autofocus
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            className="gh-confirm__btn gh-confirm__btn--confirm"
            onClick={onConfirm}
          >
            {confirmLabel}
          </button>
        </>
      }
    >
      <p className="gh-confirm__message">{message}</p>
    </Modal>
  );
}

export default ConfirmDialog;