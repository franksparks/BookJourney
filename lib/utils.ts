import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ReadStatus } from "@prisma/client";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const menuItems = [
  { label: "Read", value: ReadStatus.READ },
  { label: "Currently reading", value: ReadStatus.READING },
  { label: "Want to read", value: ReadStatus.WANT_TO_READ },
];
