import Image from "next/image";
import React, { useContext } from "react";
import { ModalContext } from "../../context/modal/ModalProvider";
import Modal_body from "../modal/Modal_body";

import S from "./Image_WITH_Lightbox.module.scss";

export default function Image_WITH_Lightbox({
  src,
  lightbox,
  src_ligthbox,
  css_src = {},
  css_lightbox = {},
}) {
  const { modal, setModal, openModal } = useContext(ModalContext);
  return (
    <>
      <div className={S.content_target} style={css_src}>
        <Image
          src={src}
          width={src.width}
          height={src.height}
          alt="src en forme de pendule"
          blurDataURL={src.blurDataURL}
          placeholder="blur"
          onClick={(e) => {
            openModal("ligthbox");
          }}
        />
      </div>

      {modal.ligthbox && (
        <Modal_body>
          <div className={S.container_ligthbox} style={css_lightbox}>
            <Image
              src={src_ligthbox}
              width={src_ligthbox.width}
              height={src_ligthbox.height}
              alt="src en forme de pendule"
              blurDataURL={src_ligthbox.blurDataURL}
              placeholder="blur"
              onClick={(e) => {
                openModal("ligthbox");
              }}
            />
          </div>
        </Modal_body>
      )}
    </>
  );
}
