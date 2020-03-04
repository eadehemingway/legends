export default function getSvgWidth() {
  const windowWidth = window.innerWidth;
  const isDesktop = windowWidth > 768;
  const outerMargin = isDesktop ? 100 : 50;
  const maxWidth = 800;
  const svgWidth = Math.min(windowWidth - outerMargin, maxWidth);
  return svgWidth;
}
