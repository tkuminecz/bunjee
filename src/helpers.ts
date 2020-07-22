export const getBaseUrl = (url: string): string => {
  const useHttps = process.env.USE_HTTPS === 'true';
  const protocol = useHttps ? 'https://' : 'http://';
  return `${protocol}${url}`;
};
