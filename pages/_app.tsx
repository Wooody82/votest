import "../public/css/styles.css";
import React from "react";
import { AppProps } from 'next/app'

export default function HomePage({ Component, pageProps }: AppProps) {
  return (
    <Component {...pageProps} />
  );
}