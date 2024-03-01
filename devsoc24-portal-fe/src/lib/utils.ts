import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function secondsToHms(d: number) {
  d = Number(d);
  const h = Math.floor(d / 3600);
  const m = Math.floor((d % 3600) / 60);
  const s = Math.floor((d % 3600) % 60);

  const hDisplay = h > 0 ? h + ":" : "";
  const mDisplay = m > 0 ? m + ":" : "0:";
  const sDisplay = s > 9 ? s : "0" + s;
  return hDisplay + mDisplay + sDisplay;
}

