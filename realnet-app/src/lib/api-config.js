export const getApiBaseUrl = () => {
  // If we are on the server (Docker container), use the internal network name
  if (typeof window === 'undefined') {
    return process.env.INTERNAL_API_URL || 'http://realnet-admin';
  }
  // If we are on the client, use the public URL
  return process.env.NEXT_PUBLIC_API_BASE_URL || 'https://admin.realnet-web.co.za';
};
