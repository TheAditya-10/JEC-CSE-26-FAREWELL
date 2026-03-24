import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function buildFlowUrl(
  pathname: string,
  params: {
    userId?: string;
    companion?: boolean;
    parentUserId?: string | null;
  }
) {
  const searchParams = new URLSearchParams();

  if (params.userId) {
    searchParams.set("user_id", params.userId);
  }

  if (params.companion) {
    searchParams.set("companion", "true");
  }

  if (params.parentUserId) {
    searchParams.set("parent_id", params.parentUserId);
  }

  const query = searchParams.toString();
  return query ? `${pathname}?${query}` : pathname;
}
