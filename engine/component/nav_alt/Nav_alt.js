import Link from "next/link";
import React, { useContext } from "react";
import { ModalContext } from "../../context/modal/ModalProvider";
import Portal from "../../utils/portal";
import Navigation from "../navigation/Navigation";

import S from "./Nav_alt.module.scss";

export default function Nav_alt({ children }) {
  const { closeModal } = useContext(ModalContext);

  return (
    <Portal selector="#__next">
      <div className={S.wrapper}>
        <div className={S.content}>
          <header>
            {/* <Account_user /> */}
            <div
              className={S.cross_container}
              onClick={() => {
                closeModal();
              }}
            >
              <span className={S.cross}></span>
            </div>
          </header>
          <section className={S.nav_alt}>
            <Navigation css="isMobil"></Navigation>
          </section>
        </div>
      </div>
    </Portal>
  );
}
