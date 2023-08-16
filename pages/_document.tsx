import { createGetInitialProps } from "@mantine/next";
import Document, { Head, Html, Main, NextScript } from "next/document";

const getInitialProps = createGetInitialProps();

export default class _Document extends Document {
  static getInitialProps = getInitialProps;

  render() {
    return (
      <Html style={{ fontFamily: "sans-serif" }}>
        <Head />
        <body style={{ overflowY: "hidden" }}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
