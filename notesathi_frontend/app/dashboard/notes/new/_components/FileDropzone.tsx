"use client";

import { useRef, useState } from "react";
import { FileText, UploadCloud, X } from "lucide-react";

function formatSize(bytes: number) {
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function FileDropzone({
  label,
  hint,
  accept,
  maxSizeMB,
  file,
  onFileSelect,
  progress,
}: {
  label: string;
  hint: string;
  accept: string;
  maxSizeMB: number;
  file: File | null;
  onFileSelect: (file: File | null) => void;
  progress?: number;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState("");

  const handleFile = (candidate: File | undefined) => {
    if (!candidate) return;
    if (candidate.size > maxSizeMB * 1024 * 1024) {
      setError(`File must be under ${maxSizeMB}MB`);
      return;
    }
    setError("");
    onFileSelect(candidate);
  };

  if (file) {
    return (
      <div className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 p-4">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-100 text-violet-600">
          <FileText className="h-4 w-4" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-slate-900">
            {file.name}
          </p>
          <p className="text-xs text-slate-400">
            {formatSize(file.size)}
            {typeof progress === "number" ? ` · ${progress}%` : ""}
          </p>
          {typeof progress === "number" && (
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full rounded-full bg-violet-600 transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
        </div>
        <button
          type="button"
          aria-label="Remove file"
          onClick={() => onFileSelect(null)}
          className="shrink-0 text-slate-400 transition-colors hover:text-slate-700"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <div>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          handleFile(e.dataTransfer.files?.[0]);
        }}
        className={`flex flex-col items-center rounded-xl border-2 border-dashed px-6 py-8 text-center transition-colors ${
          dragging ? "border-violet-400 bg-violet-50" : "border-slate-200"
        }`}
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-violet-50 text-violet-600">
          <UploadCloud className="h-5 w-5" />
        </div>
        <p className="mt-3 text-sm font-semibold text-slate-900">{label}</p>
        <p className="mt-1 text-xs text-slate-400">{hint}</p>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="mt-4 flex h-9 items-center rounded-lg border border-slate-200 px-4 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
        >
          Browse Files
        </button>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          className="hidden"
          onChange={(e) => handleFile(e.target.files?.[0])}
        />
      </div>
      {error && <p className="mt-2 text-xs text-red-500">{error}</p>}
    </div>
  );
}
