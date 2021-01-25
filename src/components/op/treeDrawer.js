
const drawLine = (ctx, info, style = {}) => {
  const { x, y, x1, y1 } = info;
  let { color = '#4446b7', width = 5 } = style;

  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x1, y1);
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.stroke();
}

export const draw = ctx => {
  ctx.fillStyle = '#171769';
  let startY = 55
  // top
  drawLine(ctx, {x: 400, y: startY, x1: 400, y1: startY + 90})

  // Executive assistant line
  drawLine(ctx, {x: 400, y: startY + 40, x1: 550, y1: startY + 40})

  // top horizontal bar
  drawLine(ctx, {x: 100, y: startY + 90, x1: 700, y1: startY + 90})

  // department lines
  drawLine(ctx, {x: 92, y: startY + 90, x1: 92, y1: startY + 400})
  drawLine(ctx, {x: 290, y: startY + 90, x1: 290, y1: startY + 500})
  drawLine(ctx, {x: 495, y: startY + 90, x1: 495, y1: startY + 500})
  drawLine(ctx, {x: 688, y: startY + 90, x1: 688, y1: startY + 400})
}