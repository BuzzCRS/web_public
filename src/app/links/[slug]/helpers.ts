export const generateGradientColor = (primaryColor) => {
  const hexToRgb = (hex) => {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  };

  const primaryColorRGB: any = hexToRgb(primaryColor);

  const secondColorRGB = {
    r: primaryColorRGB.r + 20,
    g: primaryColorRGB.g - 20,
    b: primaryColorRGB.b + 20,
  };

  const rgbToHex = (r, g, b) =>
    "#" +
    [r, g, b]
      .map((x) => {
        const hex = x.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      })
      .join("");

  return rgbToHex(secondColorRGB.r, secondColorRGB.g, secondColorRGB.b);
};

export const getDynamicStyles = (color = "#002a4d") => {
  const accent = generateGradientColor(color);

  return {
    background: `linear-gradient(to bottom, ${color}, ${accent})`,
  };
};
