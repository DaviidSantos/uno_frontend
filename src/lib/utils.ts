import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const parseCnpj = (input: string): string => {
  // Remove all non-numeric characters using a regular expression
  const numericOnly = input.replace(/\D/g, '');

  return numericOnly;
}
