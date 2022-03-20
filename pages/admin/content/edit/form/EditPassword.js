import React, { useContext, useState, useRef } from "react";
import { Exclamation } from "../../../../../assets/icons/Icon_svg";
import { AuthContext } from "../../../../../engine/context/auth/AuthProvider";
import { LanguageContext } from "../../../../../engine/context/language/LanguageContext";
import { ModalContext } from "../../../../../engine/context/modal/ModalProvider";
import {
  editProfil,
  editPass,
} from "../../../../../data/pages/admin/editProfil/lang_editProfil";
import { regexPwd } from "../../../../../data/regex";
import Modal_body from "../../../../../engine/component/modal/Modal_body";
import EditWithAuth from "../EditWithAuth";

import S from "./../EditProfil.module.scss";

export default function EditPassword() {
  const { currentUser, updatePwd } = useContext(AuthContext);
  const { modal, openModal, closeModal } = useContext(ModalContext);
  const { lang } = useContext(LanguageContext);

  const [error, setError] = useState("");
  const [errorConfirm, setErrorConfirm] = useState("");
  const [info, setInfo] = useState("");
  const [editPwd, setEditPwd] = useState(false);

  const inputPwd = useRef();
  const inputCompare = useRef();

  async function handleEditPwd(e, pwd) {
    e.preventDefault();
    if (inputPwd && inputCompare && inputPwd !== inputCompare) {
      const res = await updatePwd(pwd);

      //auth/user-not-found

      if (res.error.code === "auth/user-not-found") {
        setError(`${editPass.error.userNotFound[lang]}`);
        setTimeout(() => {
          setError("");
        }, 2200);
        return;
      }

      if (res.succes) {
        setError(`${editPass.success.change[lang]}`);
        setEditUser(false);
        closeModal();
        setTimeout(() => {
          setInfo("");
        }, 1500);
      }
    }
  }

  function reAuth(e) {
    e.preventDefault();

    const pwd = inputPwd.current.value;
    const confirm = inputCompare.current.value;

    /*Error with pwd fields*/

    if (pwd === "") {
      setError(`${editPass.error.noValue[lang]}`);
      setTimeout(() => {
        setError("");
      }, 1500);
      return;
    }

    /*Error with confirm fields*/

    if (confirm === "") {
      setErrorConfirm(`${editPass.error.noValue[lang]}`);
      setTimeout(() => {
        setErrorConfirm("");
      }, 1500);
      return;
    }

    /** Check both */
    if (confirm !== pwd) {
      setErrorConfirm(`${editPass.error.notIdentical[lang]}`);
      setTimeout(() => {
        setErrorConfirm("");
      }, 1500);
      return;
    }

    /** Check format */
    if (!pwd.match(regexPwd)) {
      setError(`${editPass.error.regexPwd[lang]}`);
      setTimeout(() => {
        setError("");
      }, 1500);
      return;
    }

    if (!confirm.match(regexPwd)) {
      setErrorConfirm(`${editPass.error.regexConfirm[lang]}`);
      setTimeout(() => {
        setErrorConfirm("");
      }, 1500);
      return;
    }

    setEditPwd(true);
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
            <input
              type="password"
              id="password"
              name="password"
              placeholder={editProfil.pwd.pwd[lang]}
              ref={inputPwd}
            />
            {/*Manage error or info message */}
            {error && (
              <div className={`erroText input_infoBubble`}>
                <span className="icon">
                  <Exclamation></Exclamation>
                </span>
                <p>{error}</p>
              </div>
            )}
            {info && (
              <div className={`textInfo input_infoBubble`}>
                <span className="icon">
                  <Exclamation></Exclamation>
                </span>
                <p>{info}</p>
              </div>
            )}
          </div>

          <div className={`bloc_input ${S.bloc_input}`}>
            <input
              type="password"
              id="confirmPwd"
              name="confirmPwd"
              placeholder={editProfil.pwd.confirm[lang]}
              ref={inputCompare}
            />
            {errorConfirm && (
              <div className={`erroText input_infoBubble`}>
                <span className="icon">
                  <Exclamation></Exclamation>
                </span>
                <p>{errorConfirm}</p>
              </div>
            )}
          </div>
          <footer>
            <button className="btn_sub btn_primary" type="submit">
              {editProfil.pwd.btn[lang]}
            </button>
          </footer>
        </div>
        <p className={S.errorText}>{editProfil.pwd.advertText[lang]}</p>
      </form>

      {/** We pass to the content of the modal box, the new value and the script
        control of the component that will launch the api call transmitted by
        the provider.*/}

      {modal.embed && editPwd && (
        <Modal_body title="Validation de sécurité">
          <EditWithAuth
            editProfil={handleEditPwd}
            newVal={inputPwd.current.value}
          />
        </Modal_body>
      )}
    </>
  );
}
