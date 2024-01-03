import Lenis from "@studio-freight/lenis";

import { fadeInContents, hideContents } from "@utils/animations";

const lenis = new Lenis();

document.addEventListener('DOMContentLoaded', ev => {
  hideContents(window.document);
  fadeInContents(window.document);
});

document.addEventListener('astro:before-swap', ev => {
  hideContents(ev.newDocument);
});

document.addEventListener('astro:page-load', ev => {
  fadeInContents(window.document);
  lenis.scrollTo("top");
});

function raf(time: any) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);
