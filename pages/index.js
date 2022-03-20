import React from "react";
import Head from "next/head";
import Link from "next/link";

import { Home_icon } from "../public/assets/icons/Icon_svg";
import useMediaQuery from "../engine/hooks/useMediaQueries";

import Navigation from "../engine/component/navigation/Navigation";
import Hamburger_menu from "../engine/component/header/hamburger_menu/Hamburger_menu";

import S from "./../engine/component/header/Header.module.scss";
import Style_nav from "../engine/component/navigation/Nav_top.module.scss";

export default function Home() {
  const isMobil = useMediaQuery("(max-width: 1139px)");
  const isTablet = useMediaQuery("(min-width: 1140px)");
  return (
    <>
      <Head>
        <title>David Michel. Géobiologie Loire 42</title>
        <meta name="description" content="My heart in my Art" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="mainContent">
        {isTablet && <Navigation css={Style_nav} />}

        {isMobil && (
          <>
            <Link href="/" className={S.home_button}>
              <a className={S.home_button}>
                <Home_icon />
              </a>
            </Link>

            <div className={S.nav_right}>
              <Hamburger_menu></Hamburger_menu>
            </div>
          </>
        )}
        <section className="content">
          <h1>NEXt.JS Starter Pack</h1>
        </section>
      </main>
    </>
  );
}
