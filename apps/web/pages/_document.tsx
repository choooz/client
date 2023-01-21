import type { DocumentContext } from "next/document";
import Document, { Head, Html, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";

export default class MyDocument extends Document {
  // Styled-components
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html lang="kr">
        <Head>
          <link
            as="style"
            href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/variable/pretendardvariable.css"
            rel="stylesheet"
          />
          <link
            as="style"
            href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendardstatic.css"
            rel="stylesheet"
          />
          <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />
        </Head>
        <body>
          <div id="portal" />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
