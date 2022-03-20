import S from "./../Form.module.scss";
import { useContext, useState, useRef } from "react";

import { ModalContext } from "../../../../engine/context/modal/ModalProvider";
import { AuthContext } from "../../../../engine/context/auth/AuthProvider";
import { LanguageContext } from "../../../../engine/context/language/LanguageContext";

import { errorForm } from "../../../../data/errorForm/errorForm";
import { accountForm } from "../../../../data/accountForm/accountForm";

function Signup() {
  const { closeModal, openModal } = useContext(ModalContext);
  const { signup } = useContext(AuthContext);
  const { lang } = useContext(LanguageContext);

  const [error, setError] = useState("");
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
    openModal("signin");
  }

  //firebase signin
  async function handleSubmit(e) {
    e.preventDefault();
    if (inputs.current[1].value !== inputs.current[2].value) {
      setError("Les mots de passe doivent êtres identiques");
      return;
    }

    try {
      await signup(inputs.current[0].value, inputs.current[1].value);

      formRef.current.reset();
      setError("");
      closeModal();
    } catch (err) {
      console.dir(err);
      if (err.code === "auth/invalid-email") {
        setError(errorForm.firebase.invalidMail[lang]);
      }
      if (err.code === "auth/email-already-in-use") {
        setError(errorForm.firebase.alreadyUse[lang]);
      }
      if (err.code === "auth/weak-password") {
        setError(errorForm.firebase.weakPassword[lang]);
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
        <label htmlFor="email">{accountForm.signup.email[lang]}</label>
        <input type="text" ref={addInputs} name="email" id="email" />
      </div>

      {/* Field PWD */}

      <div className="bloc_input">
        <label htmlFor="pwd">{accountForm.signup.pwd[lang]}</label>
        <input type="password" ref={addInputs} name="pwd" id="pwd" />
      </div>

      {/* Confirm  PWD */}

      <div className="bloc_input">
        <label htmlFor="confirmPsw">
          {accountForm.signup.confirmPwd[lang]}
        </label>
        <input
          type="password"
          ref={addInputs}
          name="confirmPsw"
          id="confirmPsw"
        />
      </div>

      {/* Error message */}

      <div className={S.errorMessage}>
        <p className="textWarning">{error}</p>
      </div>

      {/* Sub button */}
      <button className="btn_sub btn_big" type="submit">
        {accountForm.signup.button[lang]}
      </button>
      <p
        onClick={(e) => {
          switch_modal(e);
        }}
        className="text_switch"
      >
        {accountForm.signup.alReadyAccount[lang]}
      </p>
    </form>
  );
}

export default Signup;
