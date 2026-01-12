// lib/env.js
export const validateEnv = () => {
  const required = ['NEXT_PUBLIC_GA_MEASUREMENT_ID'];
  const missing = required.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    console.warn('Missing environment variables:', missing);
    return false;
  }
  
  return true;
};

// Call this in your app initialization if needed
validateEnv();