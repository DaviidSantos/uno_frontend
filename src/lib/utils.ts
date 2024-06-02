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

export const parseIdSaToUnifiedFormat = (input: string): string => {
  const cleanedInput = input.replace(/[^A-Za-z0-9/]/g, '');
  const parts = cleanedInput.split('/');

  if (parts.length === 1) return cleanedInput;

  const countryCode = parts[0].replace('-', '');
  const year = parts[1];
  return `${countryCode}${year}`;
}

export const parseIdSaToOriginalFormat = (input: string): string => {
  const sa = input.substring(0, 2);
  const code = input.substring(2);

  return `${sa}-${code.substring(0, 4)}/${code.substring(4)}`;
}
