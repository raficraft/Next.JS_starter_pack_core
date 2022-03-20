import S from "./../Form.module.scss";
import { useContext, useState, useRef } from "react";

import { ModalContext } from "../../../../engine/context/modal/ModalProvider";
import { AuthContext } from "../../../../engine/context/auth/AuthProvider";
import { LanguageContext } from "../../../../engine/context/language/LanguageContext";

import { errorForm } from "../../../../data/errorForm/errorForm";
import { accountForm } from "../../../../data/accountForm/accountForm";

function Signin() {
  const { closeModal, openModal } = useContext(ModalContext);
  const { lang } = useContext(LanguageContext);
  const { signin } = useContext(AuthContext);
  const [error, setError] = useState("");

  const remember = useRef(false);

  const formRef = useRef();
  const inputs = useRef([]);

  const addInputs = (el) => {
    if (el && !inputs.current.includes(el)) {
      inputs.current.push(el);
    }
  };

  function switch_modal(e) {
    e.stopPropagation();
    closeModal();
    openModal("signup");
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const isRemember = remember.current.checked;

    try {
      await signin(
        inputs.current[0].value,
        inputs.current[1].value,
        isRemember
      );
      formRef.current.reset();
      setError("");
      closeModal();
    } catch (err) {
      if (err.code === "auth/wrong-password") {
        setError(errorForm.firebase.wrongPassword[lang]);
      }

      if (err.code === "auth/user-not-found") {
        setError(errorForm.firebase.userNotFound[lang]);
      }
    }
  }

  return (
    <form
      className={S.account_user}
      onSubmit={(e) => {
        handleSubmit(e);
      }}
      ref={formRef}
    >
      {/* Field Email */}

      <div className="bloc_input">
        <label htmlFor="email">{accountForm.signin.email[lang]}</label>
        <input type="text" name="email" id="email" ref={addInputs} />
      </div>

      {/* Field PWD */}

      <div className="bloc_input">
        <label htmlFor="pwd">{accountForm.signin.pwd[lang]}</label>
        <input type="password" name="pwd" id="pwd" ref={addInputs} />
      </div>

      {/* Remember checkbox */}

      <div className="bloc_checked">
        <input type="checkbox" id="remmber" name="remember" ref={remember} />
        <label htmlFor="remember">{accountForm.signin.checked[lang]}</label>
      </div>

      {/* Error Message */}
      <div className={S.errorMessage}>
        <p className="errorText">{error}</p>
      </div>

      {/* Sub button */}
      <button className="btn_sub btn_big" type="submit">
        {accountForm.signin.button[lang]}
      </button>
      <p
        onClick={(e) => {
          switch_modal(e);
        }}
        className="text_switch"
      >
        {accountForm.signin.switchForm[lang]}
      </p>
    </form>
  );
}

export default Signin;
