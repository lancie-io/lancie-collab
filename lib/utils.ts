import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateStatusStrings(word: string) {
  const vowels = 'aeiouAEIOU';

  const endsWithVowel = vowels.includes(word[word.length - 1]);

  const submitting = endsWithVowel
    ? `${word.slice(0, -1)}ing...`
    : `${word}ing...`;

  return {
    default: word,
    submitting,
  };
}

export function idGenerator(): string {
  return Math.floor(Math.random() * 100001).toString();
}

export function slugify(str: string) {
  if (!str) return '';
  return str
    .toLowerCase() // Convert the string to lowercase
    .trim() // Trim spaces at the beginning and end of the string
    .replace(/[^a-z0-9\s]/g, '') // Remove non-alphanumeric characters (excluding spaces)
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with a single hyphen
    .replace(/^-|-$/g, ''); // Remove leading and trailing hyphens if present
}
