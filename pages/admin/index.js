import React from "react";
import withAuth from "../../engine/context/withAuth/WithAuth";
import Head from "next/head";

import S from "./Admin.module.scss";

import Admin_header, { TabContent } from "./header/Admin_header";
import SubDotMenuProvider from "../../engine/context/subDotMenu/SubdotMenu";

function DashBoard() {
  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="My heart in my Art" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="mainContent">
        <Admin_header></Admin_header>
        <section className="primary_content">
          <div className={` ${S.wrapper}`}>
            <SubDotMenuProvider>
              <TabContent></TabContent>
            </SubDotMenuProvider>
          </div>
        </section>
      </main>
    </>
  );
}

export default withAuth(DashBoard);
