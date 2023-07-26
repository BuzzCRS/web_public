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

  const primaryColorRGB = hexToRgb(primaryColor);

  if (!primaryColorRGB) {
    return null; // Invalid input color
  }

  const secondColorRGB = {
    r: clamp(primaryColorRGB.r + 100, 0, 255),
    g: clamp(primaryColorRGB.g - 100, 0, 255),
    b: clamp(primaryColorRGB.b + 100, 0, 255),
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

const clamp = (value, min, max) => {
  return Math.min(Math.max(value, min), max);
};

export const getDynamicStyles = (color = "#002a4d") => {
  // const accent = generateGradientColor(color);

  return {
    // background: `linear-gradient(to bottom, ${color}, ${accent})`,
    background: `${color}`,
  };
};
