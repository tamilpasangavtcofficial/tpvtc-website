const config = {
  // Use VITE_API_URL from .env if available, otherwise fallback to prod
  API_BASE_URL: import.meta.env.VITE_API_URL?.replace('/api', '') || 'https://tpvtc-backend-ap1v6co3p-tamilpasangavtcofficials-projects.vercel.app'
};

export default config;
