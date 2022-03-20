import React, { useState, useEffect, useContext } from "react";
import { SubDotMenuContext } from "../../../../engine/context/subDotMenu/SubdotMenu";
import useFirestore from "../../../../engine/hooks/firestore/useFirestore";
import { useClickOutside } from "../../../../engine/hooks/useClickOutside";
import { convertTimestamp } from "../../../../engine/utils/utils";

import S from "./Handle_review.module.scss";

export default function Handle_review(props) {
  const { active } = { ...props };
  const [loading, setLoading] = useState(true);
  const [currentCollection, , , , getDocumentByQuery] = useFirestore(
    "user_review",
    {}
  );

  const [listCollection, setlistCollection] = useState();

  function showUserReview(list) {
    return listCollection.map((el, idx) => {
      return <Review key={el.id} review={el} {...props}></Review>;
    });
  }

  useEffect(async () => {
    async function callApi() {
      console.log("What", currentCollection);
      setLoading(true);
      try {
        const res = await getDocumentByQuery("user_review", "active", active);
        if (res) {
          setlistCollection(res);
          setLoading(false);
        }
      } catch (error) {
        alert(error);
      }
    }

    return callApi();
  }, [currentCollection]);

  return (
    <>
      {loading ? (
        <p>Loading ...</p>
      ) : !loading && listCollection.length > 0 ? (
        <>
          <div className={S.content_review}>
            <div className={S.select}>
              <label>Trier par : </label>
              <select defaultValue="5">
                <option value="all">All</option>
                <option value="1">1</option>
                <option value="5">5</option>
                <option value="10">10</option>
              </select>
              <p> Avis</p>
            </div>
            <p>{Object.keys(listCollection).length} avis.</p>
          </div>
          {showUserReview()}
        </>
      ) : (
        <p>Aucun nouvelle a valider</p>
      )}
    </>
  );
}

function Review({ review, active }) {
  const [, setDocument, , delete_doc, getDocumentByQuery] = useFirestore(
    "user_review",
    {}
  );

  const date = convertTimestamp(review.createAt);
  const [showDotMenu, setShowDotMenu, refOutsideClick] = useClickOutside(false);
  const { isSub, setIsSub, refSub } = useContext(SubDotMenuContext);

  function toggle_dotMenu(e, toggle) {
    !isSub && setShowDotMenu(toggle);
  }

  function toggle_subMenu(e, toggle) {
    setIsSub(toggle);
  }

  //Handle Click

  function delReview() {
    delete_doc("user_review", review.id);
  }
  function setReview(review) {
    const payload = { ...review, active: !active };
    setDocument("user_review", payload);
  }

  useEffect(() => {
    setIsSub(false);
  }, []);
  return (
    <div
      className={S.wrapper}
      onMouseOver={(e) => toggle_dotMenu(e, true)}
      onMouseLeave={(e) => toggle_dotMenu(e, false)}
    >
      <div className="dotMenu_container">
        {showDotMenu && (
          <span
            className={`dotMenu ${S.dotMenu}`}
            onClick={(e) => {
              toggle_subMenu(e, true);
            }}
            ref={refOutsideClick}
          >
            <span className={`dotMenu_item dot_left`}></span>
            <span className={`dotMenu_item dot_right`}></span>
            {isSub && (
              <div className="dotMenu_sub" ref={refSub}>
                <button onClick={() => delReview()}>Supprimer</button>
                <button onClick={() => setReview(review)}>
                  {active === true ? "Désactiver" : "Activer"}
                </button>
              </div>
            )}
          </span>
        )}
      </div>

      <div className={S.content}>
        <p>{review.rate}</p>
        <p className={S.review}>{review.comment}</p>
        <p className={S.date}>{date}</p>
      </div>
    </div>
  );
}
