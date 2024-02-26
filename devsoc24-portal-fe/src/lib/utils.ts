import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getTime(time: number) {
  if (time < 60) {
    if (time < 10) {
      return `0:0${time}`;
    } else {
      return `0:${time}`;
    }
  } else {
    const mins = Math.floor(time / 60);
    if (mins === 0) return `${mins}:00`;
    else return `${mins}:${time % 60}`;
  }
}
