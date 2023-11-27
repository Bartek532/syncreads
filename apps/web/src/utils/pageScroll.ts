const getScrollbarWidth = () =>
  window.innerWidth - document.documentElement.clientWidth;

export const lockScroll = () => {
  const scrollbarWidth = getScrollbarWidth();

  document.body.style.overflow = "hidden";
  document.body.style.paddingRight = `${scrollbarWidth}px`;
};

export const unlockScroll = () => {
  document.body.style.overflow = "";
  document.body.style.paddingRight = ``;
};
