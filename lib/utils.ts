import { clsx, type ClassValue } from 'clsx';
import { Metadata } from 'next';
import { twMerge } from 'tailwind-merge';
import { COLORS } from './constants';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isValidUrl(url: string) {
  let validUrl;
  try {
    validUrl = new URL(url);
  } catch (error) {
    return false;
  }
  return true;
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
  return Math.floor(Math.random() * 1000001).toString();
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

export function capitalize(str: string): string {
  // Check if the string is empty
  if (!str) return str;

  // Capitalize the first letter and concatenate it with the rest of the string
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const isServer = () => typeof window === 'undefined';

export function getPresenceColor(connectionId: number) {
  console.log(
    'connectionId',
    connectionId,
    COLORS[connectionId % COLORS.length]
  );
  return COLORS[connectionId % COLORS.length];
}

export interface MetaDataData {
  title: string;
  description: string;
  slug?: string;
  imageUrl: string;
}

export const createMetaDataObject = (data: MetaDataData): Metadata => {
  const { title, description, imageUrl } = data;

  return {
    title: `${title}`,
    description,
    openGraph: {
      title,
      description,
      images: imageUrl,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: imageUrl,
    },
  };
};
