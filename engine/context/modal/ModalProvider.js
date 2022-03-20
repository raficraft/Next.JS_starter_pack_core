import React, { createContext, useState } from "react";

export const ModalContext = createContext();

export default function ModalProvider({ children }) {
  /**
   * Modal Initial Context
   */
  const [modal, setModal] = useState({
    signin: false,
    signup: false,
    nav_alt: false,
    upload_image: false,
    map: false,
    review: false,
    embed: false,
    ligthbox: false,
  });

  const hiddenScrollBar = () => {
    let htmlElt = document.documentElement;
    let bodyElt = document.body;
    //Enlève la scrollbar lors de l'ouverture du carousel.
    htmlElt.scrollTop = 0;
    bodyElt.scrollTop = 0;
    bodyElt.style.overflow = "hidden";
  };

  const restoreScrollBar = () => {
    let bodyElt = document.body;
    bodyElt.style.overflow = "";
  };

  function openModal(target) {
    for (const key in modal) {
      if (Object.hasOwnProperty.call(modal, key)) {
        if (key !== target) {
          setModal((s) => ({ ...s, [key]: false }));
          hiddenScrollBar();
        }
      }
    }

    setModal((s) => ({ ...s, [target]: true }));
  }

  function closeModal() {
    setModal(() => {
      for (const key in modal) {
        if (Object.hasOwnProperty.call(modal, key)) {
          setModal((s) => ({ ...s, [key]: false }));
          restoreScrollBar();
        }
      }
    });
  }

  return (
    <ModalContext.Provider value={{ modal, setModal, closeModal, openModal }}>
      {children}
    </ModalContext.Provider>
  );
}
