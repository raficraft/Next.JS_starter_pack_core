import React, { useContext } from "react";
import { ModalContext } from "../../../..//engine/context/modal/ModalProvider";
import Nav_alt from "../navigation/nav_alt/Nav_alt";

import S from "./Hamburger_menu.module.scss";

//Hamburger menu and nav_mobil

export default function Hamburger_menu() {
  const { modal, openModal } = useContext(ModalContext);

  return (
    <>
      <div
        className={S.hamburger}
        onClick={() => {
          openModal("nav_alt");
        }}
      >
        <span></span>
      </div>
      {modal.nav_alt && <Nav_alt></Nav_alt>}
    </>
  );
}
