import Image from "next/image";
import React, { useState, useContext, useEffect } from "react";
import { ModalContext } from "../../context/modal/ModalProvider";
import useGetimage from "../../hooks/files/useGetimage";
import Carousel from "../carousel/Carousel";
import Modal_body from "../modal/Modal_body";
import S from "./Masonry.module.scss";

export default function Masonry({
  dir = null,
  masonry,
  remSizing = 16,
  horizontalPadding = "0",
  verticalPadding = "0",
}) {
  const [filesInfo, loading] = useGetimage(dir);
  const { modal, openModal } = useContext(ModalContext);
  const [currentFile, setCurrentFile] = useState({
    current: {},
    idx: 0,
  });

  function handleClick(file, idx) {
    setCurrentFile((s) => ({ ...s, current: file, idx: idx }));
    openModal("embed");
  }

  const masonryStyles = {
    gridTemplateColumns: `repeat(auto-fit , minMax(${Math.floor(
      (parseInt(masonry.width) -
        parseInt(horizontalPadding) * remSizing * 2 -
        (masonry.column - 1) * parseFloat(masonry.gap) * remSizing) /
        masonry.column
    )}px, 1fr))`,
    gridGap: `${masonry.gap ? masonry.gap : "1rem"}`,
    display: "grid",
    gridAutoRows: masonry.autoRows ? masonry.autoRows : "0",
    width: masonry.width
      ? `calc(${masonry.width} - ${masonry.gridGap})`
      : `calc(960px - ${masonry.gridGap})`,
  };

  function createGallery() {
    if (dir && dir !== null && filesInfo !== []) {
      return filesInfo.map((file, idx) => {
        return (
          <span
            key={idx}
            data-selector="masonry_item"
            style={{ overflow: "hidden" }}
          >
            <Image
              src={file.src}
              width={file.width}
              height={file.height}
              blurDataURL={file.blurDataURL}
              placeholder="blur"
              onClick={() => {
                handleClick(file, idx);
              }}
              alt=""
              data-selector="masonry_img"
            ></Image>
          </span>
        );
      });
    }
  }

  function resizeGridItem(item) {
    const rowGap = parseFloat(masonryStyles.gridGap);

    const rowSpan = Math.ceil(
      item
        .querySelector('[data-selector="masonry_img"]')
        .getBoundingClientRect().height /
        (remSizing * rowGap)
    );
    item.style.gridRowEnd = "span " + rowSpan;
  }

  function getItems() {
    if (!loading) {
      const items = document.querySelectorAll('[data-selector="masonry_item"]');

      for (const item of items) {
        resizeGridItem(item);
      }
    }
  }

  useEffect(() => {
    getItems();
    window.addEventListener("resize", getItems, true);

    return () => {
      getItems();
      window.removeEventListener("resize", getItems, true);
    };
  }, [filesInfo, masonryStyles]);

  return (
    <>
      {!loading ? (
        <section
          className={S.masonry_container}
          style={{
            maxWidth: masonry.width ? masonry.width : "960px",
            width: "100%",
          }}
          data-selector="masonry_container"
        >
          <div style={masonryStyles}>{createGallery()}</div>
        </section>
      ) : (
        <p>Loading</p>
      )}

      {modal.embed && filesInfo.length && (
        <Modal_body addContainer={false}>
          <Carousel
            currentFile={currentFile.current}
            idx={currentFile.idx}
            array={filesInfo}
            isVisible={1}
          ></Carousel>
        </Modal_body>
      )}
    </>
  );
}
