import React, { useContext } from "react";

import { DashboardContext } from "../../../engine/context/Admin/DashboardContext";
import { LanguageContext } from "../../../engine/context/language/LanguageContext";
import { ModalContext } from "../../../engine/context/modal/ModalProvider";

import { nav_admin } from "../../../data/pages/admin/editProfil/nav_admin";

import Upload_image from "../../../engine/component/form/Upload_image/Upload_image";
import Modal_body from "../../../engine/component/modal/Modal_body";

import EditProfil from "../content/edit/EditProfil";

import S from "./Admin_header.module.scss";

import {
  AccountCircle,
  CheckBold,
  Edit_icon,
  NewBox,
} from "../../../assets/icons/Icon_svg";
import Review_checked from "../content/review_checked/Review_checked";
import Last_review from "../content/last_review/Last_review";
import Handle_review from "../component/handle_review/Handle_review";

function Admin_header() {
  const { handleTabs, tabs } = useContext(DashboardContext);
  const { modal, openModal } = useContext(ModalContext);
  const { lang } = useContext(LanguageContext);

  return (
    <>
      <section className={S.wrapper}>
        <header className={` primary_content ${S.profil_header}`}>
          <form className={`${S.profil_header__form}`}>
            <div className={`${S.profil_header__upload}`}>
              <AccountCircle
                onClick={() => {
                  openModal("upload_image");
                }}
              ></AccountCircle>
            </div>
          </form>
          <div className={`${S.profil_header__body}`}>
            <h1>{nav_admin.header.title[lang]}</h1>
          </div>
        </header>
        <div className={S.nav_wrapper}>
          <nav className={`primary_content ${S.nav_admin}`}>
            <Tabs className={S.test}>
              <button
                onClick={() => {
                  handleTabs("edit");
                }}
                className={`${S.btn} ${tabs === "edit" ? S.active : null}`}
              >
                <Edit_icon></Edit_icon>
                Edit
              </button>
              <button
                onClick={() => {
                  handleTabs("last_review");
                }}
                className={`${S.btn} ${
                  tabs === "last_review" ? S.active : null
                }`}
              >
                <NewBox></NewBox>
                En attente...
              </button>
              <button
                onClick={() => {
                  handleTabs("review_checked");
                }}
                className={`${S.btn} ${
                  tabs === "review_checked" ? S.active : null
                }`}
              >
                <CheckBold></CheckBold>
                Avis Valider
              </button>
            </Tabs>
          </nav>
        </div>
      </section>
      {modal.upload_image && (
        <Modal_body>
          <Upload_image></Upload_image>
        </Modal_body>
      )}
    </>
  );
}

export default Admin_header;

export function Tabs({ children }) {
  return <>{children}</>;
}

export function TabContent() {
  const { tabs } = useContext(DashboardContext);
  {
    switch (tabs) {
      case "last_review":
        return (
          <Last_review>
            <Handle_review active={false}></Handle_review>
          </Last_review>
        );
      case "review_checked":
        return (
          <Review_checked>
            <Handle_review active={true}></Handle_review>
          </Review_checked>
        );
      default:
        return (
          <>
            <EditProfil></EditProfil>;
            <aside>
              <h1>ASIDE CONTAINER</h1>
            </aside>
            ;
          </>
        );
    }
  }
}
