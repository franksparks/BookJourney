"use client";

import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <div className="bg-sky-600 h-50 text-white p-2 text-center">
      <p>&copy; {year} Copyright</p>
      <div className="gap-5 flex flex-row justify-center">
        <Link href="https://github.com/franksparks" target="_blank">
          Ferran Bals
        </Link>
        <Link href="https://github.com/MadameSheema" target="_blank">
          Gloria Hornero
        </Link>
        <Link href="https://github.com/Luisantonio88" target="_blank">
          Luis Antonio Castro
        </Link>
        <Link href="https://github.com/vedderzeznick" target="_blank">
          Martín Alarcón
        </Link>
      </div>
    </div>
  );
}
