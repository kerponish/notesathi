import { BASE_URL } from "@/lib/api/axios_instance";

export function resolveMediaUrl(path?: string) {
  if (!path) return undefined;
  if (/^https?:\/\//.test(path)) return path;
  return `${BASE_URL}/${path.replace(/^\/+/, "")}`;
}
