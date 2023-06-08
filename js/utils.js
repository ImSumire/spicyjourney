const drawBox = (context, { x, y, z, w, h }, colors) => {
  context.save();
  context.translate(((x - y) * w) / 2, ((x + y) * h) / 2);

  // Top
  context.beginPath();
  context.moveTo(0, -z * h);
  context.lineTo(w / 2, h / 2 - z * h);
  context.lineTo(0, h - z * h);
  context.lineTo(-w / 2, h / 2 - z * h);
  context.closePath();

  context.fillStyle = colors.top;
  context.fill();

  // Left
  context.beginPath();
  context.moveTo(-w / 2, h / 2 - z * h);
  context.lineTo(0, h - z * h);
  context.lineTo(0, h);
  context.lineTo(-w / 2, h / 2);
  context.closePath();

  context.fillStyle = colors.left;
  context.fill();

  // Right
  context.beginPath();
  context.moveTo(w / 2, h / 2 - z * h);
  context.lineTo(0, h - z * h);
  context.lineTo(0, h);
  context.lineTo(w / 2, h / 2);
  context.closePath();

  context.fillStyle = colors.right;
  context.fill();

  context.restore();
};
