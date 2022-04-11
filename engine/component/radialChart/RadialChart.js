import React, { useRef, useEffect, useState } from "react";
import { drawCircle, drawRadial } from "./draw";

import styles from "./RadialChart.module.scss";

/**
 *
 * @param {Number} score
 * @param {String} color
 * @param {String} color
 * @param {Number} size // Size in px
 * @param {Number} min
 * @param {Number} max
 * @param {Number} lineWidth // define in px
 * @param {Number} padding // padding in px
 * @param {Number} padding // padding in px
 * @param {Number} labelPosition // padding in px
 * @param {Number} animationInterval // mutliple of 100ms
 * @returns
 */

export default function RadialChart({
  score = 8,
  min = 0,
  max = 10,
  size = 100,
  color = "black",
  strokeStyle = "red",
  animationInterval = 1,
  lineWidth = 12,
  padding = 9,
  labelPosition = "bottom",
  children,
}) {
  const canvasRef = useRef();
  const colorRef = useRef();
  const inputRef = useRef();
  !color ? (color = "#ff0000") : (color = color);
  const [inputValue, setInputValue] = useState(0);

  const increment = () => {
    return setInputValue((s) => s + 1);
  };

  const getCircle = () => {
    const input = inputRef.current;
    const min = parseInt(input.attributes.min.value);
    const max = parseInt(input.attributes.max.value);

    const colorCircle = colorRef.current;
    const ctx = colorCircle.getContext("2d");
    //draw background circle
    setTimeout(() => {
      for (let index = 0; index <= score * 10; index++) {
        let ratio = (index - min) / (max - min) / 10;

        setTimeout(() => {
          drawCircle({ ctx, size, lineWidth, strokeStyle, padding, ratio });
        }, index * 24);
      }
    }, animationInterval * 100);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    let ctx = canvas.getContext("2d");
    drawRadial({
      ctx,
      size,
      lineWidth,
      padding,
      strokeStyle: "rgba(216,216,216,1)",
    });

    getCircle(inputValue, score);
  }, []);

  return (
    <div className={styles.radialContainer}>
      {children && labelPosition === "top" && children}
      <div className={styles.radialContent}>
        <canvas width={size} height={size} ref={canvasRef}></canvas>
        <canvas width={size} height={size} ref={colorRef}></canvas>
        <input
          type="hidden"
          value={inputValue}
          ref={inputRef}
          min={min}
          max={max}
        />
        <input type="text" value={score} disabled />
      </div>
      {children && labelPosition === "bottom" && children}
    </div>
  );
}

export const LabelChart = ({ label }) => {
  return <label className={styles.radialLabel}>{label}</label>;
};
