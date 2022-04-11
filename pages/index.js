import React, { useState, useEffect } from "react";
import Head from "next/head";
import { projectData } from "../data/projets/projets";
import Image from "next/image";
import useGetImage from "../engine/hooks/files/useGetimage";

import S from "./Home.module.scss";

export default function Home() {
  function createCard(type) {
    const filterData = projectData.filter((data) => data.type === type);

    return filterData.map((project, key) => {
      return <Card data={project} key={`${key}_${project.type}}`} />;
    });
  }

  return (
    <>
      <Head>
        <title>Raphaêl parodi - developpeur front-end React.js </title>
        <meta
          name="description"
          content="Portfolio de raphaël parodi développeur front-end. Spécialisé en javascript avec react"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="mainContent">
        <h1>Contenue</h1>

        <section>
          <h2>Liste des projets</h2>
          <p>
            Qui sit duis aliquip ea irure tempor ad labore. Irure exercitation
            sit officia cillum aliqua ea. Consequat aliquip proident magna
            officia Lorem enim.
          </p>

          <article>
            <h2>Projets perso</h2>
          </article>

          <article>
            <h2>Projets OpenClassRooms</h2>
            {createCard("ocr")}
          </article>
        </section>
      </main>
    </>
  );
}

function Card({ data }) {
  console.log("WWWWWWWWWWWWWWW", data);

  const [img, loading] = useGetImage([data.img]);

  console.log("yolo", img);

  useEffect(() => {
    console.log("!!!!!!!!!!!!!!!", img);
    console.log(loading);
  }, [img]);

  return (
    <>
      {!loading ? (
        <p>...Loading</p>
      ) : (
        <div className={S.test}>
          <Image
            src={img[0].src}
            width={img[0].width}
            height={img[0].height}
            style={{ width: "300px" }}
          ></Image>
        </div>
      )}
    </>
  );
}
