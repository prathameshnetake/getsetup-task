import * as chroma from "chroma-js";

export function generateExtraLightColor() {
  const hue = Math.random() * 360;
  const color = chroma.hsl(hue, 0.5, 0.5);
  const [h, s, l] = color.hsl();
  const newLightness = Math.min(l + 0.3, 1);

  const lightColor = chroma.hsl(h, s, newLightness);

  return lightColor.hex();
}
