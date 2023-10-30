import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateStatusStrings(word: string) {
  const vowels = 'aeiouAEIOU';

  const endsWithVowel = vowels.includes(word[word.length - 1]);

  const submitting = endsWithVowel
    ? `${word}ing...`
    : `${word.slice(0, -1)}ing...`;

  return {
    default: word,
    submitting,
  };
}
