import React, { useEffect } from 'react';
import { AppProps } from 'next/app';
import {
  ServerStyleSheets,
  Theme,
  ThemeProvider,
} from '@material-ui/core/styles';
import Document, { DocumentContext, DocumentInitialProps } from 'next/document';

/**
 * HOC that decorates the Next.js Document to server-render JSS
 */
export const enhanceDocument = (
  OrigDocument: typeof Document
): React.ComponentType => {
  class MyDocument extends OrigDocument {
    static async getInitialProps(
      ctx: DocumentContext
    ): Promise<DocumentInitialProps> {
      const sheets = new ServerStyleSheets();
      const originalRenderPage = ctx.renderPage;
      const renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheets.collect(<App {...props} />),
        });
      ctx.renderPage = renderPage;
      const initialProps = await OrigDocument.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: [
          ...React.Children.toArray(initialProps.styles),
          sheets.getStyleElement(),
        ],
      };
    }
  }
  return MyDocument;
};

/**
 * HOC that decorates the Next.js App to wrap the application
 * in the Material-UI theme provider
 */
export const enhanceApp = (theme: Theme) => (
  Component: React.ComponentType<AppProps>
): React.FC<AppProps> => {
  const WithMuiJss = (props: AppProps) => {
    useEffect(() => {
      const jssStyles = document.querySelector('#jss-server-side');
      if (jssStyles && jssStyles.parentElement) {
        jssStyles.parentElement.removeChild(jssStyles);
      }
    }, []);
    return (
      <ThemeProvider theme={theme}>
        <Component {...props} />
      </ThemeProvider>
    );
  };
  return WithMuiJss;
};
