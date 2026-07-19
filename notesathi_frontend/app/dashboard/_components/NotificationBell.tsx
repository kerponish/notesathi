"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Bell, Heart, MessageCircle } from "lucide-react";
import {
  handleGetNotifications,
  handleMarkAllNotificationsRead,
  handleMarkNotificationRead,
} from "@/lib/actions/notification-action";
import { AppNotification } from "@/lib/types/notification";
import { timeAgo } from "@/lib/utils/time";

export default function NotificationBell({
  initialUnreadCount,
}: {
  initialUnreadCount: number;
}) {
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [unreadCount, setUnreadCount] = useState(initialUnreadCount);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const toggleOpen = async () => {
    const next = !open;
    setOpen(next);
    if (next && !loaded) {
      setLoading(true);
      const result = await handleGetNotifications();
      setNotifications(result.data ?? []);
      setUnreadCount(result.unreadCount ?? 0);
      setLoaded(true);
      setLoading(false);
    }
  };

  const onNotificationClick = (notification: AppNotification) => {
    if (!notification.read) {
      setUnreadCount((c) => Math.max(0, c - 1));
      setNotifications((prev) =>
        prev.map((n) => (n._id === notification._id ? { ...n, read: true } : n)),
      );
      handleMarkNotificationRead(notification._id);
    }
    setOpen(false);
  };

  const markAllRead = async () => {
    setUnreadCount(0);
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    await handleMarkAllNotificationsRead();
  };

  return (
    <div ref={containerRef} className="relative">
      <button
        aria-label="Notifications"
        onClick={toggleOpen}
        className="relative flex h-9 w-9 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
      >
        <Bell className="h-4 w-4" />
        {unreadCount > 0 && (
          <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-semibold text-white">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-11 z-50 w-80 rounded-2xl border border-slate-100 bg-white shadow-lg">
          <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
            <p className="text-sm font-semibold text-slate-900">Notifications</p>
            {unreadCount > 0 && (
              <button
                onClick={markAllRead}
                className="text-xs font-medium text-violet-600 hover:text-violet-700"
              >
                Mark all as read
              </button>
            )}
          </div>

          <div className="max-h-96 overflow-y-auto">
            {loading ? (
              <p className="px-4 py-6 text-center text-sm text-slate-400">
                Loading...
              </p>
            ) : notifications.length === 0 ? (
              <p className="px-4 py-6 text-center text-sm text-slate-400">
                No notifications yet.
              </p>
            ) : (
              notifications.map((notification) => (
                <Link
                  key={notification._id}
                  href={`/dashboard/notes/${notification.noteId?._id}`}
                  onClick={() => onNotificationClick(notification)}
                  className={`flex items-start gap-3 border-b border-slate-50 px-4 py-3 text-sm transition-colors last:border-0 hover:bg-slate-50 ${
                    notification.read ? "" : "bg-violet-50/50"
                  }`}
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-violet-100 text-violet-600">
                    {notification.type === "like" ? (
                      <Heart className="h-3.5 w-3.5" />
                    ) : (
                      <MessageCircle className="h-3.5 w-3.5" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-slate-700">
                      <span className="font-semibold text-slate-900">
                        {notification.fromUserId?.fullname || "Someone"}
                      </span>{" "}
                      {notification.type === "like" ? "liked" : "commented on"} your
                      note{" "}
                      <span className="font-medium text-slate-900">
                        &ldquo;{notification.noteId?.title || "a note"}&rdquo;
                      </span>
                    </p>
                    <p className="mt-0.5 text-xs text-slate-400">
                      {timeAgo(notification.createdAt)}
                    </p>
                  </div>
                  {!notification.read && (
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-violet-600" />
                  )}
                </Link>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
