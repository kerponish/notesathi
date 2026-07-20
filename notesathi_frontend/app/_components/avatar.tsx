import Image from "next/image";
import { resolveMediaUrl } from "@/lib/utils/media";

export default function Avatar({
  name,
  email,
  src,
  size = 36,
  className = "",
  fallbackClassName = "bg-slate-900 text-white",
}: {
  name?: string;
  email?: string;
  src?: string;
  size?: number;
  className?: string;
  fallbackClassName?: string;
}) {
  const url = resolveMediaUrl(src);
  const initial = (name?.trim()?.[0] || email?.[0] || "U").toUpperCase();
  const dimension = { width: size, height: size };

  if (url) {
    return (
      <Image
        src={url}
        alt=""
        width={size}
        height={size}
        className={`shrink-0 rounded-full object-cover ${className}`}
        style={dimension}
      />
    );
  }

  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-full font-medium ${fallbackClassName} ${className}`}
      style={dimension}
    >
      {initial}
    </div>
  );
}
