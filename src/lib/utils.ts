import { clsx, type ClassValue } from "clsx"
import { twMerge as tailwindMergeClasses } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return tailwindMergeClasses(clsx(inputs));
}

interface CollectionItem {
  id: number;
}

export const createID = (collection: CollectionItem[]): number => {
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