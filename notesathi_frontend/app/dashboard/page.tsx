"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    // if no Bearer token → redirect to login
    if (!token) {
      router.push("/login");
    }
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="rounded-lg bg-white p-8 shadow-md">
        <h1 className="text-3xl font-bold text-gray-800">I am Dashboard</h1>
      </div>
    </div>
  );
}
