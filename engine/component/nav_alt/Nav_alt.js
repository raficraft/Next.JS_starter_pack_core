import Link from "next/link";
import React, { useContext } from "react";
import { ModalContext } from "../../../engine/context/modal/ModalProvider";
import Portal from "../../utils/portal";
import Navigation from "../navigation/Navigation";
import Style_mobil from "../navigation/Nav_mobil.module.scss";

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
            <Navigation css={Style_mobil}></Navigation>
          </section>
        </div>
      </div>
    </Portal>
  );
}
