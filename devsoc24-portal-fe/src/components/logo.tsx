import Image from "next/image";
import React from "react";

export default function Logo({ className }: { className: string }) {
  return (
    <Image
      src="/images/logo.svg"
      alt=""
      height={100}
      width={100}
      className={className}
    />
  );
}
