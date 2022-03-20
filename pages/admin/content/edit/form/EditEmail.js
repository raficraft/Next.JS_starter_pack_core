import React, { useContext, useState, useRef } from "react";
import { Exclamation } from "../../../../../assets/icons/Icon_svg";
import { AuthContext } from "../../../../../engine/context/auth/AuthProvider";
import { LanguageContext } from "../../../../../engine/context/language/LanguageContext";
import { ModalContext } from "../../../../../engine/context/modal/ModalProvider";
import {
  editEmail,
  editProfil,
} from "../../../../../data/pages/admin/editProfil/lang_editProfil";
import { regexEmail } from "../../../../../data/regex";
import Modal_body from "../../../../../engine/component/modal/Modal_body";
import EditWithAuth from "../EditWithAuth";

import G from "./../../../../../Sass/abstract/global.module.scss";
import S from "./../EditProfil.module.scss";

export default function EditEmail() {
  const { currentUser, updateUserEmail } = useContext(AuthContext);
  const { modal, openModal, closeModal } = useContext(ModalContext);
  const { lang } = useContext(LanguageContext);

  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [editMail, setEditMail] = useState(false);

  const inputRef = useRef();

  /**Call FireBase API */
  async function handleEditEmail(e) {
    e.preventDefault();

    const email = inputRef.current.value;

    /** Check control is OK call API */

    if (
      inputRef.current.value &&
      inputRef.current.value !== currentUser.email
    ) {
      const res = await updateUserEmail(email);

      if (res.error.code === "auth/invalid-email") {
        setError(`${editEmail.error.emailInvalid[lang]}`);
        setTimeout(() => {
          setError("");
        }, 2200);
      }

      if (res.error.code === "auth/email-already-in-use") {
        setError(`${editEmail.error.alReadyUse[lang]}`);
        setTimeout(() => {
          setError("");
        }, 2200);
        return;
      }

      if (res.error.code === "auth/requires-recent-login") {
        setInfo(`${editEmail.error.reAuthRequired[lang]}`);
        setTimeout(() => {
          setError("");
        }, 2200);
        return;
      }

      if (res.succes) {
        setInfo(`${editEmail.error.reAuthRequired[lang]}`);
        closeModal();
        setEditMail(false);
        setTimeout(() => {
          setInfo("");
        }, 2200);

        return;
      }
    }
  }

  function reAuth(e) {
    e.preventDefault();

    const email = inputRef.current.value;

    if (!email.match(regexEmail)) {
      setError(`${editEmail.error.emailInvalid[lang]}`);
      setTimeout(() => {
        setError("");
      }, 2200);
      return;
    }

    if (email === currentUser.email) {
      setError(`${editEmail.error.emailInvalid[lang]}`);
      setTimeout(() => {
        setError("");
      }, 2200);
      return;
    }
    setEditMail(true);
    openModal("embed");
  }

  return (
    <>
      <form
        onSubmit={(e) => {
          reAuth(e);
        }}
      >
        <div className={S.form_content}>
          <div className={`bloc_input ${S.bloc_input}`}>
            <label htmlFor="email">{editProfil.email.label[lang]}</label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder={
                currentUser
                  ? currentUser.email
                  : `${editProfil.email.placeholder[lang]}`
              }
              defaultValue={currentUser ? currentUser.email : ""}
              ref={inputRef}
            />

            {/*Manage error or info message */}
            {error && (
              <div className="errorText input_infoBubble">
                <span className="icon">
                  <Exclamation></Exclamation>
                </span>
                <p>{error}</p>
              </div>
            )}
            {info && (
              <div className="textInfo input_infoBubble">
                <span className="icon">
                  <Exclamation></Exclamation>
                </span>
                <p>{info}</p>
              </div>
            )}
          </div>

          <button className="btn_sub btn_primary" type="submit">
            {editProfil.email.btn[lang]}
          </button>
        </div>
      </form>

      {/** We pass to the content of the modal box, the new value and the script
        control of the component that will launch the api call transmitted by
        the provider.*/}

      {modal.embed && editMail && (
        <Modal_body title="Validation de sécurité">
          <EditWithAuth
            editProfil={handleEditEmail}
            newVal={inputRef.current.value}
          />
        </Modal_body>
      )}
    </>
  );
}
