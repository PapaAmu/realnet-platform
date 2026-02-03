export const getApiBaseUrl = () => {
  // If we are on the server
  if (typeof window === 'undefined') {
    // If running in Docker (INTERNAL_API_URL set), use it.
    // Otherwise, default to localhost:8009 for local development on host machine.
    return process.env.INTERNAL_API_URL || 'http://localhost:8009';
  }
  // If we are on the client, use the public URL
  return process.env.NEXT_PUBLIC_API_BASE_URL || 'https://admin.realnet-web.co.za';
};
