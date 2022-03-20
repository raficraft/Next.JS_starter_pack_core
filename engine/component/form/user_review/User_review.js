import React, { useRef, useState, useLayoutEffect, useEffect } from "react";
import { Exclamation, Star } from "../../../../assets/icons/Icon_svg";
import { reg } from "../../../../data/regex";
import useFirestore from "../../../hooks/firestore/useFirestore";

import S from "./User_review.module.scss";

export default function User_review() {
  const [rate, setRate] = useState(0);
  const inputs = {
    form: useRef(),
    name: useRef(),
    email: useRef(),
    comment: useRef(),
    btn: useRef(),
  };

  const [error, setError] = useState({
    rate: false,
    name: false,
    email: false,
    comment: false,
  });

  const [successMessage, setSuccessMessage] = useState(false);

  const [, , createDocument] = useFirestore("user_review", {});

  function handleRate(e) {
    if (parseInt(e.target.value) > 0) {
      return setRate(parseInt(e.target.value));
    }
  }

  function handleInput(e) {
    e.preventDefault();

    let name = e.target.name;
    const target = inputs[name].current;
    const format =
      e.target.tagName === "TEXTAREA"
        ? "textarea"
        : target.getAttribute("type");

    if (format === "text" && !target.value.match(reg.alpha.rules)) {
      setError((S) => ({ ...S, [name]: reg.alpha.error.FR }));
      return;
    } else {
      setError((S) => ({ ...S, [name]: false }));
    }

    if (format === "textarea" && !target.value.match(reg.text.rules)) {
      setError((S) => ({ ...S, [name]: reg.text.error.FR }));
      return;
    } else {
      setError((S) => ({ ...S, [name]: false }));
    }

    if (format === "email" && !target.value.match(reg.email.rules)) {
      setError((S) => ({ ...S, [name]: reg.email.error.FR }));
      return;
    } else {
      setError((S) => ({ ...S, [name]: false }));
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (rate < 1) {
      setError((S) => ({ ...S, rate: "Veuillez choisir une note" }));
      return;
    } else {
      setError((S) => ({ ...S, rate: false }));
      setSuccessMessage(true);
    }

    const payload = {
      createAt: Date.now(),
      rate: rate,
      name: inputs.name.current.value,
      email: inputs.email.current.value,
      comment: inputs.comment.current.value,
      active: false,
    };

    try {
      await createDocument("user_review", payload);
      inputs.form.current.reset();
      setRate(0);
    } catch (error) {
      alert(error);
    }
  }

  return (
    <div className={S.wrapper}>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
        ref={inputs.form}
      >
        <div>
          <div className={`bloc_input ${S.bloc_ratings}`}>
            <label>Votre note :</label>
            <div className={S.ratings}>
              <input
                type="radio"
                id="star1"
                name="rate"
                value="5"
                onClick={(e) => {
                  handleRate(e);
                }}
              />
              <label htmlFor="star1" title="text">
                <Star></Star>
              </label>
              <input
                type="radio"
                id="star2"
                name="rate"
                value="4"
                onClick={(e) => {
                  handleRate(e);
                }}
              />
              <label htmlFor="star2" title="text">
                <Star></Star>
              </label>
              <input
                type="radio"
                id="star3"
                name="rate"
                value="3"
                onClick={(e) => {
                  handleRate(e);
                }}
              />
              <label htmlFor="star3" title="text">
                <Star></Star>
              </label>
              <input
                type="radio"
                id="star4"
                name="rate"
                value="2"
                onClick={(e) => {
                  handleRate(e);
                }}
              />
              <label htmlFor="star4" title="text">
                <Star></Star>
              </label>
              <input
                type="radio"
                id="star5"
                name="rate"
                value="1"
                onClick={(e) => {
                  handleRate(e);
                }}
              />
              <label htmlFor="star5" title="text">
                <Star></Star>
              </label>
            </div>
            {/*Manage error or info message */}
            {error.rate && (
              <div className="errorText input_infoBubble">
                <span className="icon">
                  <Exclamation></Exclamation>
                </span>
                <p>{error.rate}</p>
              </div>
            )}
          </div>

          <div className={`bloc_input ${S.bloc_input}`}>
            <label htmlFor="name">Votre nom</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Votre Nom"
              required
              ref={inputs.name}
              onInput={(e) => {
                handleInput(e);
              }}
            />
            {/*Manage error or info message */}
            {error.name && (
              <div className="errorText input_infoBubble">
                <span className="icon">
                  <Exclamation></Exclamation>
                </span>
                <p>{error.name}</p>
              </div>
            )}
          </div>

          <div className={`bloc_input ${S.bloc_input}`}>
            <label htmlFor="email">Votre e-mail</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Votre E-mail"
              required
              ref={inputs.email}
              onInput={(e) => {
                handleInput(e);
              }}
            />
            {/*Manage error or info message */}
            {error.email && (
              <div className="errorText input_infoBubble">
                <span className="icon">
                  <Exclamation></Exclamation>
                </span>
                <p>{error.email}</p>
              </div>
            )}
          </div>
          <div className={`bloc_input ${S.bloc_input}`}>
            <label htmlFor="email">Votre commentaire</label>
            <textarea
              name="comment"
              required
              spellCheck="true"
              placeholder="Votre commentaire"
              ref={inputs.comment}
              onInput={(e) => {
                handleInput(e);
              }}
            ></textarea>
            {/*Manage error or info message */}
            {error.comment && (
              <div className="errorText input_infoBubble">
                <span className="icon">
                  <Exclamation></Exclamation>
                </span>
                <p>{error.comment}</p>
              </div>
            )}
          </div>
          {successMessage && (
            <p className="text_green">
              Message envoyé. Il sera affiché quand notre équipe l'aura validé.
            </p>
          )}
        </div>
        <button className="btn_sub btn_primary" type="submit" ref={inputs.btn}>
          Envoyer
        </button>
      </form>
    </div>
  );
}
