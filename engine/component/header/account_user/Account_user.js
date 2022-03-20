import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import { Logout_icon } from "../../../../assets/icons/Icon_svg";

import { AuthContext } from "../../../../engine/context/auth/AuthProvider";
import { LanguageContext } from "../../../../engine/context/language/LanguageContext";
import { ModalContext } from "../../../../engine/context/modal/ModalProvider";

import { btnLogin } from "../../../../data/accountForm/accountForm";
import { errorForm } from "../../../../data/errorForm/errorForm";

import S from "./Account_user.module.scss";

export default function Account_user() {
  const { openModal, closeModal } = useContext(ModalContext);
  const { lang } = useContext(LanguageContext);
  const { validAuth, logout, currentUser } = useContext(AuthContext);

  const router = useRouter();

  //Manage Modal
  function handle_modal(modal) {
    openModal(modal);
  }

  //firebase logout
  async function handleLogout(e) {
    try {
      await logout();
      router.push("/");
    } catch (error) {
      alert(errorForm.firebase.logoutFailed[lang]);
    }
  }

  useEffect(() => {}, [validAuth.isAuth]);

  return (
    <div className={S.user_account}>
      {/* Signin and Signup btn */}

      {!validAuth.isAuth && !currentUser ? (
        <>
          <button
            className={`${S.btn} ${S.signup}`}
            onClick={() => handle_modal("signup")}
          >
            {btnLogin.subscribe[lang]}
          </button>
          <button
            className={`${S.btn} ${S.signin}`}
            onClick={() => handle_modal("signin")}
          >
            {btnLogin.connect[lang]}
          </button>
          {/* Close all modals btn */}
        </>
      ) : (
        <>
          {/*Create User button to goes dashboard Pages*/}

          <Link href="/admin">
            <button
              className={`${S.pseudo}`}
              onClick={() => {
                closeModal();
              }}
            >
              {currentUser?.displayName}
            </button>
          </Link>
          <Logout_icon onClick={(e) => handleLogout(e)} />
        </>
      )}
    </div>
  );
}
