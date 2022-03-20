import React, { useEffect, useState } from "react";

import S from "./Heroes.module.scss";

import Image from "next/image";
import { arrayRemove } from "firebase/firestore";

export default function Heroes({ children }) {
  const [image, setImage] = useState(false);
  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  useEffect(() => {
    async function getRandomImage() {
      const random = getRandomInt(31);

      if (random > 0) {
        try {
          const i = await import(
            `/public/assets/img/illustration/heroes/david_michel (${random}).jpg`
          );

          setImage(i.default);
        } catch (error) {
          console.log(error);
        }
      }
    }

    getRandomImage();

    setInterval(() => {
      getRandomImage();
    }, 10000);

    return () => {
      getRandomImage();
    };
  }, []);

  return (
    <header className={`${S.wrapper}`}>
      <div className={S.content}>
        {image && (
          <Image
            layout="fill"
            objectFit="cover"
            className={S.flex}
            src={image.src}
            blurDataURL={image.blurDataURL}
            placeholder="blur"
            alt=""
          ></Image>
        )}

        {children}
      </div>
    </header>
  );
}
