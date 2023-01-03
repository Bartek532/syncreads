import Document, { Html, Head, Main, NextScript } from "next/document";

import type { DocumentContext } from "next/document";

export default class MyDocument extends Document {
  static override async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);

    return { ...initialProps };
  }

  override render() {
    return (
      <Html lang="en-EN" dir="ltr">
        <Head></Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
