import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const parseCnpj = (input: string): string => {
  const numericOnly = input.replace(/\D/g, '');

  return numericOnly;
}

export const parseStringToCnpj = (input: string): string => {
  const numbersOnly = input.replace(/\D/g, '');
  const formattedString = numbersOnly.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');

  return formattedString;
}
