import Image from "next/image";
import React from "react";

export default function Logo({ className }: { className: string }) {
  return (
    <Image
      src="/images/cclogo.svg"
      alt=""
      height={80}
      width={80}
      className={className}
    />
  );
}
