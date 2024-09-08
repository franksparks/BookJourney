"use client";

import React from "react";

interface StyledButtonProps {
    onClick: () => void;
}
export default function StyledButton({ onClick }: StyledButtonProps) {
  return (
    <a
      href="#_"
      className="relative inline-flex items-center justify-start py-1 pl-2 pr-6 overflow-hidden font-semibold text-blue-600 transition-all duration-150 ease-in-out rounded hover:pl-10 hover:pr-6 bg-gray-50 group"
        onClick={onClick}
    >
      <span className="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-blue-600 group-hover:h-full"></span>
      <span className="absolute right-0 pr-2 duration-200 ease-out group-hover:translate-x-12">
        <svg
          className="w-3 h-3 text-green-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14 5l7 7m0 0l-7 7m7-7H3"
          ></path>
        </svg>
      </span>
      <span className="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
        <svg
          className="w-3 h-3 text-green-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14 5l7 7m0 0l-7 7m7-7H3"
          ></path>
        </svg>
      </span>
      <span className="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white text-xs mr-2">
        New!
      </span>
    </a>
  );
}
