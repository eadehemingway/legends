export default function getSvgWidth(isDesktop, windowWidth) {
  const outerMargin = isDesktop ? 100 : 50;
  const maxWidth = 800;
  const svgWidth = Math.min(windowWidth - outerMargin, maxWidth);
  return svgWidth;
}
