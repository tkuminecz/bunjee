import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { enhanceDocument } from '~lib/next-mui-jss';
import { getCanonicalUrl } from '~/vercel';
import { getBaseUrl } from '~/helpers';

const redirectToCanonicalUrl = async ctx => {
  if (ctx.req) {
    // we are server-side
    const currentHost = ctx.req.headers.host;
    const canonicalUrl = await getCanonicalUrl();
    if (currentHost !== canonicalUrl) {
      // we're not on the canonical url, redirect
      const destUrl = `${getBaseUrl(canonicalUrl)}${ctx.req.url}`;
      // eslint-disable-next-line no-console
      console.warn(
        `Not at canonical url (${currentHost}), redirecting to ${destUrl}`
      );
      ctx.res.writeHead(302, {
        Location: destUrl,
      });
      ctx.res.end();
    }
  }
};

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    await redirectToCanonicalUrl(ctx);
    return Document.getInitialProps(ctx);
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default enhanceDocument(MyDocument);
