import React, { useContext, useEffect, useRef, useLayoutEffect } from "react";
import Link from "next/link";
import { Home_icon } from "../../../public/assets/icons/Icon_svg";

import useMediaQuery from "../../hooks/useMediaQueries";
import Navigation from "./navigation/navigation/Navigation";
import Hamburger_menu from "./hamburger_menu/Hamburger_menu";
import Account_user from "./account_user/Account_user";
import Lang_select from "./lang_select/Lang_select";

import S from "./Header.module.scss";

function Header() {
  const isMobil = useMediaQuery("(max-width: 1139px)");
  const isTablet = useMediaQuery("(min-width: 1140px)");

  return (
    <header className={`${S.wrapper}`}>
      <div className={`${S.content} primary_content`}>
        {/* Header Content */}
        {isTablet && (
          <>
            <Navigation />
          </>
        )}

        <div className={S.nav_right}>
          <Lang_select></Lang_select>

          {isTablet && <Account_user></Account_user>}
          {isMobil && (
            <>
              <Link href="/" className={S.home_button}>
                <a className={S.home_button}>
                  <Home_icon />
                </a>
              </Link>

              <Hamburger_menu></Hamburger_menu>
            </>
          )}
        </div>

        {/* Header Content END */}
      </div>
    </header>
  );
}

export default Header;
