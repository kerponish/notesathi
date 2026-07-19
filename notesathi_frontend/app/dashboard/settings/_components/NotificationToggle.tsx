"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { handleUpdateSettings } from "@/lib/actions/auth-action";

export default function NotificationToggle({
  initialEnabled,
}: {
  initialEnabled: boolean;
}) {
  const [enabled, setEnabled] = useState(initialEnabled);
  const [pending, setPending] = useState(false);

  const toggle = async () => {
    if (pending) return;
    const next = !enabled;
    setEnabled(next);
    setPending(true);

    const result = await handleUpdateSettings({ notificationsEnabled: next });
    setPending(false);

    if (!result.success) {
      setEnabled(!next);
      toast.error(result.message || "Failed to update notifications");
    }
  };

  return (
    <button
      role="switch"
      aria-checked={enabled}
      onClick={toggle}
      disabled={pending}
      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors disabled:opacity-60 ${
        enabled ? "bg-violet-600" : "bg-slate-200"
      }`}
    >
      <span
        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
          enabled ? "translate-x-5" : "translate-x-0.5"
        }`}
      />
    </button>
  );
}
