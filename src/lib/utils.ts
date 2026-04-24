import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatWeight(weight: number): string {
  return `${weight}kg`;
}

export function calculateProgress(current: number, target: number): number {
  const diff = Math.abs(current - target);
  if (diff === 0) return 100;
  return Math.min(Math.max((diff / current) * 100, 10), 100);
}
