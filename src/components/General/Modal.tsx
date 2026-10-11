import { useEffect, useId, useRef } from "react";
import type { ReactNode } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  /** Dialog heading, also its accessible name */
  title: string;
  children: ReactNode;
  /** Action buttons area (for example confirm and cancel) */
  footer?: ReactNode;
  closeOnOverlayClick?: boolean;
}

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

function getFocusable(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));
}

// The overlay is a flex container and the dialog uses margin: auto, so a
// dialog taller than the screen scrolls from its top instead of being cut off.
const styles = `
.gh-modal__overlay {
  position: fixed;
  inset: 0;
  z-index: 1500;
  display: flex;
  padding: 16px;
  overflow-y: auto;
  overscroll-behavior: contain;
  background: rgba(4, 54, 79, 0.5);
}
.gh-modal {
  position: relative;
  width: 100%;
  max-width: 460px;
  margin: auto;
  padding: 32px;
  background: #FDFDFD;
  color: #04364F;
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif;
  border-radius: 2px;
  box-shadow: 0 24px 56px rgba(4, 54, 79, 0.28);
  box-sizing: border-box;
}
.gh-modal *,
.gh-modal *::before,
.gh-modal *::after {
  box-sizing: border-box;
}
.gh-modal:focus {
  outline: none;
}
.gh-modal__close {
  position: absolute;
  top: 12px;
  right: 12px;
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  padding: 0;
  font-size: 24px;
  line-height: 1;
  color: #93979A;
  background: transparent;
  border: 0;
  border-radius: 2px;
  cursor: pointer;
  transition: color 0.2s ease;
}
.gh-modal__close:hover {
  color: #04364F;
}
.gh-modal__close:focus-visible {
  outline: 2px solid #601E34;
  outline-offset: 2px;
}
.gh-modal__title {
  margin: 0 40px 16px 0;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 24px;
  font-weight: 700;
  line-height: 1.2;
  color: #04364F;
  overflow-wrap: break-word;
}
.gh-modal__body {
  font-size: 15px;
  line-height: 1.7;
  color: #04364F;
  overflow-wrap: break-word;
}
.gh-modal__footer {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 28px;
}

@media (max-width: 640px) {
  .gh-modal {
    padding: 24px 20px;
  }
  .gh-modal__footer > * {
    flex: 1 1 100%;
  }
}
`;

function Modal({
  isOpen,
  onClose,
  title,
  children,
  footer,
  closeOnOverlayClick = true,
}: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);
  const titleId = useId();

  // Always call the latest onClose without restarting the effect below
  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;

    const dialog = dialogRef.current;
    if (!dialog) return;

    const previouslyFocused =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    // Lock the page scroll while the modal is open
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Move focus into the dialog: the element marked data-autofocus first
    const initialFocus =
      dialog.querySelector<HTMLElement>("[data-autofocus]") ??
      getFocusable(dialog)[0] ??
      dialog;
    initialFocus.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onCloseRef.current();
        return;
      }

      if (event.key !== "Tab") return;

      // Keep Tab / Shift+Tab inside the dialog
      const focusable = getFocusable(dialog);
      if (focusable.length === 0) {
        event.preventDefault();
        dialog.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && (active === first || active === dialog)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      // Give focus back to the element that opened the dialog
      previouslyFocused?.focus();
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <>
      <style>{styles}</style>
      <div
        className="gh-modal__overlay"
        onMouseDown={(event) => {
          if (closeOnOverlayClick && event.target === event.currentTarget) {
            onClose();
          }
        }}
      >
        <div
          ref={dialogRef}
          className="gh-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          tabIndex={-1}
        >
          <button
            type="button"
            className="gh-modal__close"
            aria-label="Close dialog"
            onClick={onClose}
          >
            <span aria-hidden="true">×</span>
          </button>
          <h2 id={titleId} className="gh-modal__title">
            {title}
          </h2>
          <div className="gh-modal__body">{children}</div>
          {footer && <div className="gh-modal__footer">{footer}</div>}
        </div>
      </div>
    </>,
    document.body,
  );
}

export default Modal;