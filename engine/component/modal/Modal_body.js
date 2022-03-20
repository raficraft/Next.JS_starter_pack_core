import S from "./Modal.module.scss";
import { useContext } from "react";
import { ModalContext } from "../../../engine/context/modal/ModalProvider";
import Portal from "../../utils/portal";

function Modal_body({
  children,
  title = false,
  css = null,
  addContainer = true,
}) {
  const { closeModal } = useContext(ModalContext);

  //Manage modal
  function close_modals(e) {
    e.stopPropagation();
    if (e.target === e.currentTarget) {
      closeModal();
    }
  }

  return (
    <Portal selector="#__next">
      <section className={` ${S.wrapper} `} onClick={(e) => close_modals(e)}>
        {addContainer && (
          <section className={S.content} style={css}>
            {title && (
              <header className={S.header}>
                <h1>{title}</h1>

                {/* Close BTN */}
                <div
                  tabIndex="0"
                  role="button"
                  className={S.close_modal}
                  onClick={(e) => close_modals(e)}
                  onKeyDown={(e) => close_modals(e)}
                >
                  <span className={S.cross}></span>
                </div>
              </header>
            )}

            {children}
          </section>
        )}

        {!addContainer && children}
      </section>
    </Portal>
  );
}

export default Modal_body;
