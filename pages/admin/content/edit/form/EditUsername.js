import React, { useContext, useState, useRef } from "react";
import { Exclamation } from "../../../../../assets/icons/Icon_svg";
import { AuthContext } from "../../../../../engine/context/auth/AuthProvider";
import { LanguageContext } from "../../../../../engine/context/language/LanguageContext";

import S from "./../EditProfil.module.scss";
import Modal_body from "../../../../../engine/component/modal/Modal_body";
import { ModalContext } from "../../../../../engine/context/modal/ModalProvider";
import EditWithAuth from "../EditWithAuth";
import { regexAlphNum } from "../../../../../data/regex";
import {
  editDisplayName,
  editProfil,
} from "../../../../../data/pages/admin/editProfil/lang_editProfil";

export default function EditUsername() {
  const { currentUser, updateProfil } = useContext(AuthContext);
  const { modal, openModal, closeModal } = useContext(ModalContext);
  const { lang } = useContext(LanguageContext);

  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [editUser, setEditUser] = useState(false);

  const inputRef = useRef();

  async function handleEditUsername(e, username) {
    e.preventDefault();

    if (
      inputRef.current.value &&
      inputRef.current.value !== currentUser.username
    ) {
      const res = await updateProfil({ displayName: username });

      if (res.error.code === "auth/user-not-found") {
        setError(`${editDisplayName.error.userNotFound[lang]}`);
        setTimeout(() => {
          setError("");
        }, 2200);
        return;
      }

      if (res.succes) {
        setInfo(`${editDisplayName.success.change[lang]}`);
        setEditUser(false);
        closeModal();
        setTimeout(() => {
          setInfo("");
        }, 1500);

        return;
      }
    }
  }

  function reAuth(e) {
    e.preventDefault();

    const username = inputRef.current.value;

    if (username === "" || username.lenght < 3) {
      setError(`${editDisplayName.error.userNotFound[lang]}`);
      setTimeout(() => {
        setError("");
      }, 1500);
      return;
    }

    if (!username.match(regexAlphNum)) {
      setError(`${editDisplayName.error.regex[lang]}`);
      setTimeout(() => {
        setError("");
      }, 1500);
      return;
    }

    if (username === currentUser.displayName) {
      setError(`${editDisplayName.error.similar[lang]}`);
      setTimeout(() => {
        setError("");
      }, 1500);
      return;
    }
    setEditUser(true);
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
            <label htmlFor="email">{editProfil.displayName.label[lang]}</label>
            <input
              type="text"
              id="pseudo"
              name="pseudo"
              placeholder={
                currentUser
                  ? currentUser.displayName
                  : `${editProfil.displayName.placeHolder[lang]}`
              }
              defaultValue={currentUser ? currentUser.displayName : ""}
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
            {editProfil.displayName.btn[lang]}
          </button>
        </div>
      </form>

      {/** We pass to the content of the modal box, the new value and the script
        control of the component that will launch the api call transmitted by
        the provider.*/}

      {modal.embed && editUser && (
        <Modal_body title="Validation de sécurité">
          <EditWithAuth
            editProfil={handleEditUsername}
            newVal={inputRef.current.value}
          />
        </Modal_body>
      )}
    </>
  );
}
