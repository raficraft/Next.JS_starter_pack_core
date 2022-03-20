import React, { useContext } from "react";
import { Check_icon, Language_icon } from "../../../../assets/icons/Icon_svg";
import { LanguageContext } from "../../../../engine/context/language/LanguageContext";
import { useClickOutside } from "../../../hooks/useClickOutside";
import S from "./Lang_select.module.scss";

export default function Lang_select() {
  const { lang, change_lang } = useContext(LanguageContext);
  const { show, setShow, refOutsideClick } = useClickOutside(false);

  //Manage Lang
  function handle_lang(e) {
    change_lang(e.target.value);
    setShow(!show);
  }

  function handle_show() {
    setShow(!show);
  }

  return (
    <div className={S.lang_select}>
      <Language_icon onClick={handle_show} />

      {show && (
        <div className={S.drop_list} ref={refOutsideClick}>
          <button
            type="button"
            className={lang === "FR" && S.active}
            onClick={(e) => handle_lang(e)}
            value={"FR"}
          >
            Français
            {lang === "FR" && <Check_icon />}
          </button>
          <button
            type="button"
            className={lang === "EN" && S.active}
            onClick={(e) => handle_lang(e)}
            value={"EN"}
          >
            Anglais (EN)
            {lang === "EN" && <Check_icon />}
          </button>
        </div>
      )}
    </div>
  );
}
