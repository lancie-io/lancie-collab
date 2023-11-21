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
