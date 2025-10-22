const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

/**
 * Converts a relative image path to a full URL using the API base URL
 * @param {string} imagePath - The image path from the API (e.g., "/images/products/...")
 * @returns {string} - The full URL to the image
 */
export function getImageUrl(imagePath) {
  if (!imagePath) return '';

  // If it's already a full URL (starts with http:// or https://), return as-is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }

  // If it starts with /, remove it as we'll add it with the base URL
  const path = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;

  return `${API_BASE_URL}/${path}`;
}

export { API_BASE_URL };
