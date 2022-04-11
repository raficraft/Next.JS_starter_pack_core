export const drawRadial = ({
  ctx,
  size = 100,
  lineWidth = 20,
  padding = 10,
  strokeStyle = "#FF0000",
}) => {
  // default value

  ctx.clearRect(0, 0, size, size);
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size / 2 - padding * 2, 0, 2 * Math.PI);
  ctx.strokeStyle = strokeStyle;
  ctx.lineWidth = lineWidth;
  ctx.shadowOffsetX = 2;
  ctx.shadowBlur = 5;
  ctx.shadowColor = "rgba(35,35,35,0.4)";
  ctx.stroke();
};

export const drawCircle = ({
  ctx,
  size,
  lineWidth,
  strokeStyle,
  padding,
  ratio,
}) => {
  ctx.clearRect(0, 0, 100, 100);
  ctx.beginPath();
  //Full Circle ctx.arc(100, 100, 85, -(1 / 2) * Math.PI, 3/2 Math.PI);
  ctx.arc(
    size / 2,
    size / 2,
    size / 2 - padding * 2,
    -(1 / 2) * Math.PI,
    ratio * 2 * Math.PI - (1 / 2) * Math.PI
  );
  ctx.strokeStyle = strokeStyle;
  ctx.lineWidth = lineWidth;
  ctx.stroke();
};
