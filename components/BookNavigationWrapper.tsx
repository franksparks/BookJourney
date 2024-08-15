"use client";

import { useRouter } from "next/navigation";
import { MouseEvent } from "react";

type WrapperProps = {
  id: string;
  children: React.ReactNode;
  clearValues?: () => void;
  handleBlur?: () => void;
};

export default function BookNavigationWrapper({
  id,
  children,
  clearValues,
  handleBlur
}: WrapperProps) {
  const router = useRouter();
  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    router.push(`/book/${id}`);
    window.scrollTo(0, 0);
    if (clearValues) clearValues();
    if (handleBlur) handleBlur();
    event.preventDefault();
  };
  return (
    <div className="cursor-pointer" onMouseDown={(event) => handleClick(event)}>
      {children}
    </div>
  );
}
