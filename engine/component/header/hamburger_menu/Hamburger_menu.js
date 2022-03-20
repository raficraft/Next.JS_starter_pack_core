import React, { useContext } from "react";
import { ModalContext } from "../../../../engine/context/modal/ModalProvider";

import S from "./Hamburger_menu.module.scss";

export default function Hamburger_menu() {
  const { openModal } = useContext(ModalContext);
  return (
    <div
      className={S.hamburger}
      onClick={() => {
        openModal("nav_alt");
      }}
    >
      <span></span>
    </div>
  );
}
