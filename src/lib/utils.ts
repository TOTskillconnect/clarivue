import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const COLORS = {
  primary: '#7FDCD7',
  primaryHover: '#04ADA4',
  accent: '#4b63eb',
  sky: '#acbaff',
  purple: '#caa1e8',
} as const; 