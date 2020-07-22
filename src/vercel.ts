import 'isomorphic-unfetch';

export const getCanonicalUrl = async (): Promise<string> => {
  const vercelUrl = process.env.VERCEL_URL;
  const apiToken = process.env.VCL_API_TOKEN;

  // fetch deployment info
  const res = await fetch(
    `https://api.vercel.com/v11/now/deployments/get?url=${vercelUrl}`,
    {
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
    }
  );
  if (res.ok) {
    const deployInfo = await res.json();
    console.log({ vercelUrl });
    console.log('got deployment info', deployInfo);
    const [firstAlias] = deployInfo?.alias || [];
    if (firstAlias) return firstAlias;
  }
  // we couldn't find an alias, just use CURRENT_URL
  return vercelUrl;
};
