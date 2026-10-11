import { create } from "zustand";

export type ToastType = "success" | "error" | "warning" | "info";

export interface Toast {
  id: number;
  type: ToastType;
  message: string;
  /** Milliseconds before the toast closes by itself */
  duration: number;
}

interface ToastOptions {
  duration?: number;
}

interface ToastInput extends ToastOptions {
  type: ToastType;
  message: string;
}

interface ToastState {
  toasts: Toast[];
  show: (input: ToastInput) => number;
  dismiss: (id: number) => void;
}

// Errors and warnings stay a little longer so they can be read
const DEFAULT_DURATION: Record<ToastType, number> = {
  success: 5000,
  info: 5000,
  warning: 7000,
  error: 8000,
};

// Older toasts are dropped when more than this many are open at once
const MAX_TOASTS = 4;

let nextId = 1;

export const useToastStore = create<ToastState>()((set) => ({
  toasts: [],

  show: (input) => {
    const id = nextId++;
    const toast: Toast = {
      id,
      type: input.type,
      message: input.message,
      duration: input.duration ?? DEFAULT_DURATION[input.type],
    };

    set((state) => ({
      toasts: [...state.toasts, toast].slice(-MAX_TOASTS),
    }));

    return id;
  },

  dismiss: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    })),
}));

// Usable anywhere (components, services), no hook needed:
// toast.success("Saved.")
export const toast = {
  success: (message: string, options?: ToastOptions) =>
    useToastStore.getState().show({ ...options, type: "success", message }),
  error: (message: string, options?: ToastOptions) =>
    useToastStore.getState().show({ ...options, type: "error", message }),
  warning: (message: string, options?: ToastOptions) =>
    useToastStore.getState().show({ ...options, type: "warning", message }),
  info: (message: string, options?: ToastOptions) =>
    useToastStore.getState().show({ ...options, type: "info", message }),
};