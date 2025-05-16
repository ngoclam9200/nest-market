 
import * as diacritics from 'diacritics';

export function formatSlug(text: string): string {
  return diacritics
    .remove(text) // Remove accents
    .toLowerCase() // Convert to lowercase
    .replace(/[^a-z0-9\s]/g, '') // Remove non-alphanumeric characters except spaces
    .trim() // Remove leading and trailing spaces
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+$/, ''); // Remove trailing hyphens (if any)
}

// Example usage
 