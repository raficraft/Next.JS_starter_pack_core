import Link from "next/link";
import React, { useContext, useEffect, useRef } from "react";

import { nav } from "../../../data/nav/nav";
import { useClickOutside } from "../../hooks/useClickOutside";
import { ModalContext } from "../../context/modal/ModalProvider";
import { useRouter } from "next/router";
import { ArrowDown } from "../../../public/assets/icons/Icon_svg";

export default function Navigation({ css }) {
  const S = css;

  const router = useRouter();

  function getCurrentPath() {
    //URL "/categories/produtcs"  return "categories" for define the currentPath/item of page if this link have a child element (nested)
    const path = router.pathname.split("/");
    return path[1];
  }

  //Consumes the import of the nav file and loops to create the navigation items with another component

  function createNav() {
    return nav.map((item, key) => {
      return (
        <Nav_item
          item={item}
          key={key}
          css={css}
          currentPath={getCurrentPath()}
        ></Nav_item>
      );
    });
  }

  return (
    <>
      <nav className={S.nav}>
        <ul className={S.navList}>{createNav()}</ul>
      </nav>
    </>
  );
}

//Embed component

function Nav_item({ item, css, currentPath }) {
  const [isOpen, setIsOpen, nestedRef] = useClickOutside(false);
  const { modal, setModal, closeModal, openModal } = useContext(ModalContext);
  const S = css;

  const linkRef = useRef();

  //Opening nested Nav. Nested nav is closing with hooks UseClickOutside
  function openNested(e, toggle) {
    e.preventDefault(e);
    setIsOpen(toggle);
  }

  // Use the data-arttibutes for define a props for the current Link
  // And styling this element with css.

  function defineCurrentLink(e) {
    const allLink = document.querySelectorAll('[data-selector="link"]');
    if (e) {
      for (const link of allLink) {
        link.dataset.currentpath = false;
      }
      if (e.target === linkRef.current) {
        linkRef.current.dataset.currentpath = true;
      }
    }
  }
  // Use the data-arttibutes for define a props for the current Link on load
  // And styling this element with css.

  function defineCurrentOnLoad() {
    const allLink = document.querySelectorAll('[data-selector="link"]');
    for (const link of allLink) {
      link.dataset.currentpath = false;

      if (link.dataset.path === "/" + currentPath) {
        link.dataset.currentpath = true;
      }
    }
  }

  useEffect(() => {
    defineCurrentOnLoad();
  }, []);

  // The JSX construct the items nav and if an element have a child. It construct the nested nav UL

  return (
    <Link href={item.link}>
      <li className={S.navList_item}>
        <a
          ref={linkRef}
          className={`${S.navList_link}`}
          onClick={
            item.child
              ? (e) => {
                  openNested(e, true);
                  defineCurrentLink(e);
                }
              : (e) => {
                  closeModal("nav_alt");
                  defineCurrentLink(e);
                }
          }
          data-path={item.link}
          data-selector="link"
          data-currentpath="false"
          data-isdropdown={item.child ? isOpen : false}
        >
          {item.icon}
          {item.title}
          {item.child ? (
            <span className={S.dropArrow}>
              <ArrowDown></ArrowDown>
            </span>
          ) : null}
        </a>
        {item.child && isOpen && (
          <ul ref={nestedRef} className={S.navList_nested}>
            {item.child.map((nestedLink, nestedKey) => {
              return (
                <Link href={nestedLink.link} key={nestedKey}>
                  <li className={S.navList_nested_item}>
                    <a
                      className={S.navList_nested_link}
                      onClick={(e) => {
                        closeModal("nav_alt");
                      }}
                      data-isopen={isOpen}
                    >
                      {nestedLink.title}
                    </a>
                  </li>
                </Link>
              );
            })}
          </ul>
        )}
      </li>
    </Link>
  );
}
