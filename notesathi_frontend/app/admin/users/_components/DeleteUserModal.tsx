"use client";

interface Props {
  open: boolean;
  loading?: boolean;
  user?: any;
  onClose: () => void;
  onDelete: () => void;
}

export default function DeleteUserModal({
  open,
  loading,
  user,
  onClose,
  onDelete,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
        <h2 className="text-xl font-bold">Delete User</h2>

        <p className="mt-4 text-gray-600">Are you sure you want to delete</p>

        <p className="mt-2 font-semibold text-red-600">{user?.fullname}</p>

        <p className="mt-2 text-sm text-gray-500">
          This action cannot be undone.
        </p>

        <div className="mt-8 flex justify-end gap-3">
          <button onClick={onClose} className="rounded-lg border px-4 py-2">
            Cancel
          </button>

          <button
            onClick={onDelete}
            disabled={loading}
            className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
