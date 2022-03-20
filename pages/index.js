import React from "react";
import Head from "next/head";
import Index_content from "./Index_content";

export default function Home() {
  return (
    <>
      <Head>
        <title>David Michel. Géobiologie Loire 42</title>
        <meta name="description" content="My heart in my Art" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="mainContent">
        <section className="content">
          <h1>NEXt.JS Starter Pack</h1>
          <Index_content></Index_content>
        </section>
      </main>
    </>
  );
}
