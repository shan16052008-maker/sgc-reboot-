import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { CheckCircle2, Info, X } from "lucide-react";

export interface ToastMessage {
  id: string;
  type?: "success" | "info";
  message: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export default function Toast({ toasts, onDismiss }: ToastProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (toasts.length > 0 && containerRef.current) {
      gsap.fromTo(
        containerRef.current.children,
        { y: 20, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.25, stagger: 0.08, ease: "back.out(1.5)" }
      );
    }
  }, [toasts]);

  if (toasts.length === 0) return null;

  return (
    <aside
      aria-label="Notification alerts"
      ref={containerRef}
      className="fixed bottom-20 left-1/2 -translate-x-1/2 sm:bottom-6 sm:left-6 sm:translate-x-0 z-[150] flex flex-col gap-2 pointer-events-none"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-neutral-900 text-white shadow-xl border border-neutral-800 text-xs font-medium max-w-sm"
        >
          {toast.type === "info" ? (
            <Info size={15} className="text-sky-400 shrink-0" />
          ) : (
            <CheckCircle2 size={15} className="text-emerald-400 shrink-0" />
          )}
          <span className="flex-1">{toast.message}</span>
          <button
            onClick={() => onDismiss(toast.id)}
            className="p-1 rounded-full text-neutral-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Dismiss notification"
          >
            <X size={13} />
          </button>
        </div>
      ))}
    </aside>
  );
}
