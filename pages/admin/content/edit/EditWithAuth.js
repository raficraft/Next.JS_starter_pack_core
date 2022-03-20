import React, { useContext, useState, useRef } from "react";
import { accountForm } from "../../../../data/accountForm/accountForm";
import S from "./../../../../engine/component/form/Form.module.scss";
import { ModalContext } from "../../../../engine/context/modal/ModalProvider";
import { AuthContext } from "../../../../engine/context/auth/AuthProvider";
import { LanguageContext } from "../../../../engine/context/language/LanguageContext";
import { Exclamation } from "../../../../assets/icons/Icon_svg";

/**
 * This component is used to reconnect the currentUser for edit her profil
 *  this process is a security of firebase SDK (v9) *
 *
 * The component is use for edit [email,displayName and password]
 */

export default function EditWithAuth(props) {
  const { editProfil, newVal } = { ...props };

  const { closeModal } = useContext(ModalContext);
  const { currentUser, signin } = useContext(AuthContext);
  const { lang } = useContext(LanguageContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const inputRef = useRef();

  async function handleEdit(e) {
    e.preventDefault();

    //manage auth/too-many-requests ????

    const pwd = inputRef.current.value;

    if (pwd === "") {
      setError("Veuillez saisir votre mot de passe");
      setTimeout(() => {
        setError("");
      }, 1500);
      return;
    }

    try {
      const res = await signin(currentUser.email, pwd, false);
      editProfil(e, newVal);
      await signin(currentUser.email, pwd, false);
    } catch (error) {
      if (error.code === "auth/wrong-password") {
        setError(`Mauvais mot de passe.`);
        setTimeout(() => {
          setError("");
        }, 2200);
        return;
      }
    }
  }

  return (
    <form
      className={S.account_user}
      onSubmit={(e) => {
        handleEdit(e);
      }}
    >
      <p className="errotText">
        Veuillez saisir votre mot de passe pour valider ce changement.
      </p>
      <div className="bloc_input">
        <label htmlFor="pwd">{accountForm.signin.pwd[lang]}</label>

        <input type="password" name="pwd" id="pwd" ref={inputRef} />
        {/*Manage error or info message */}
        {error && (
          <div className="error_text info_bubble">
            <span className="icon">
              <Exclamation></Exclamation>
            </span>
            <p>{error}</p>
          </div>
        )}
      </div>

      {/* Sub button */}
      <button className="btn_sub btn_big" type="submit">
        {loading ? "loading" : "Apliquer la modification"}
      </button>
    </form>
  );
}
