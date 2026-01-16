// API Configuration
// In production, this will use the Railway backend URL
// In development, it uses relative URLs (same origin)

export const getApiBaseUrl = (): string => {
  // Check if we're in production and have a backend URL configured
  if (import.meta.env.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL;
  }
  
  // In development or if no base URL is set, use relative URLs
  // This works when frontend and backend are on the same domain
  return '';
};

export const apiUrl = (path: string): string => {
  const baseUrl = getApiBaseUrl();
  // Remove leading slash from path if baseUrl already ends with one
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return baseUrl ? `${baseUrl}/${cleanPath}` : `/${cleanPath}`;
};
