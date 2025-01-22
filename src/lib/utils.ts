import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const createID = (collection) => {
  try {
    if (!collection.length)
      throw new Error('Array is empty. Cannot create an ID.');

    const maxId = collection.reduce((current, next) =>
      current.id > next.id ? current : next
    ).id;
    return maxId + 1;
  } catch (e) {
    console.error('Error creating ID:', e);
    return 0;
  }
};