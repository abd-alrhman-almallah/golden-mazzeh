import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useToastStore } from "../../store/toastStore";
import type { Toast, ToastType } from "../../store/toastStore";

// The type is always shown as a word and a symbol, never by color alone
const LABELS: Record<ToastType, string> = {
  success: "Success",
  error: "Error",
  warning: "Warning",
  info: "Notice",
};

const ICONS: Record<ToastType, string> = {
  success: "✓",
  error: "✕",
  warning: "!",
  info: "i",
};

const styles = `
.gh-toasts {
  position: fixed;
  top: 88px;
  right: 24px;
  z-index: 2000;
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: min(380px, calc(100vw - 32px));
  pointer-events: none;
}
.gh-toast {
  pointer-events: auto;
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  align-items: start;
  gap: 12px;
  padding: 16px;
  background: #FDFDFD;
  color: #04364F;
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif;
  border: 1px solid rgba(4, 54, 79, 0.12);
  border-left-width: 4px;
  border-radius: 2px;
  box-shadow: 0 12px 28px rgba(4, 54, 79, 0.16);
  animation: gh-toast-in 0.25s ease;
}
.gh-toast--success {
  border-left-color: #04364F;
}
.gh-toast--error,
.gh-toast--warning {
  border-left-color: #601E34;
}
.gh-toast--info {
  border-left-color: #93979A;
}
.gh-toast__icon {
  display: grid;
  place-items: center;
  width: 28px;
  height: 28px;
  font-size: 14px;
  font-weight: 700;
  border: 1px solid transparent;
  border-radius: 50%;
}
.gh-toast--success .gh-toast__icon {
  background: #04364F;
  color: #FDFDFD;
}
.gh-toast--error .gh-toast__icon {
  background: #601E34;
  color: #FDFDFD;
}
.gh-toast--warning .gh-toast__icon {
  background: #FDFDFD;
  color: #601E34;
  border-color: #601E34;
}
.gh-toast--info .gh-toast__icon {
  background: #FDFDFD;
  color: #04364F;
  border-color: #93979A;
}
.gh-toast__content {
  min-width: 0;
}
.gh-toast__label {
  display: block;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #93979A;
}
.gh-toast__message {
  margin: 2px 0 0;
  font-size: 14px;
  line-height: 1.5;
  overflow-wrap: anywhere;
}
.gh-toast__close {
  display: grid;
  place-items: center;
  width: 28px;
  height: 28px;
  padding: 0;
  font-size: 20px;
  line-height: 1;
  color: #93979A;
  background: transparent;
  border: 0;
  border-radius: 2px;
  cursor: pointer;
  transition: color 0.2s ease;
}
.gh-toast__close:hover {
  color: #04364F;
}
.gh-toast__close:focus-visible {
  outline: 2px solid #601E34;
  outline-offset: 2px;
}

@keyframes gh-toast-in {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
@media (prefers-reduced-motion: reduce) {
  .gh-toast {
    animation: none;
  }
}
@media (max-width: 640px) {
  .gh-toasts {
    top: 80px;
    right: 16px;
    left: 16px;
    width: auto;
  }
}
`;

interface ToastItemProps {
  toast: Toast;
  onDismiss: (id: number) => void;
}

function ToastItem({ toast, onDismiss }: ToastItemProps) {
  const [isPaused, setIsPaused] = useState(false);

  // Closes by itself, unless the user is hovering or focusing the toast
  useEffect(() => {
    if (isPaused) return;

    const timer = window.setTimeout(() => onDismiss(toast.id), toast.duration);
    return () => window.clearTimeout(timer);
  }, [isPaused, toast.id, toast.duration, onDismiss]);

  const isUrgent = toast.type === "error" || toast.type === "warning";

  return (
    <div
      className={`gh-toast gh-toast--${toast.type}`}
      role={isUrgent ? "alert" : "status"}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <span className="gh-toast__icon" aria-hidden="true">
        {ICONS[toast.type]}
      </span>
      <div className="gh-toast__content">
        <span className="gh-toast__label">{LABELS[toast.type]}</span>
        <p className="gh-toast__message">{toast.message}</p>
      </div>
      <button
        type="button"
        className="gh-toast__close"
        aria-label="Dismiss notification"
        onClick={() => onDismiss(toast.id)}
      >
        <span aria-hidden="true">×</span>
      </button>
    </div>
  );
}

// Mounted once (src/main.tsx). It shows every toast created with toast.*()
function ToastViewport() {
  const toasts = useToastStore((state) => state.toasts);
  const dismiss = useToastStore((state) => state.dismiss);

  return createPortal(
    <>
      <style>{styles}</style>
      <section className="gh-toasts" aria-label="Notifications">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onDismiss={dismiss} />
        ))}
      </section>
    </>,
    document.body,
  );
}

export default ToastViewport;