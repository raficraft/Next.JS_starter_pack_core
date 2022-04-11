import React, { useContext, useEffect } from "react";
import {
  Check_icon,
  Language_icon,
} from "../../../../public/assets/icons/Icon_svg";
import { useClickOutside } from "../../../hooks/useClickOutside";
import { LanguageContext } from "../../../context/language/LanguageContext";
import S from "./Lang_select.module.scss";

export default function Lang_select() {
  const { lang, change_lang } = useContext(LanguageContext);
  const { show, setShow, refOutsideClick } = useClickOutside(true);

  //Manage Lang
  function handle_lang(e) {
    change_lang(e.target.value);
    setShow(!show);
  }

  function handle_show() {
    setShow(!show);
  }

  useEffect(() => {
    console.log(show);
    console.log(setShow);
  }, [show]);

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
