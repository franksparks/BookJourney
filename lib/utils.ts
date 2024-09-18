import { ReadStatus } from "@prisma/client";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const menuItems = [
  { label: "Read", value: ReadStatus.READ },
  { label: "Currently reading", value: ReadStatus.READING },
  { label: "Want to read", value: ReadStatus.WANT_TO_READ },
];

export function getResponsiveValues() {
  const height = window.innerHeight;

  if (height > 1000) {
    return {
      booksPerPage: 4,
      imageSize: "large",
    };
  } else {
    return {
      booksPerPage: 3,
      imageSize: "small",
    };
  }
}
