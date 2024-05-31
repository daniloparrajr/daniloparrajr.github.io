import Lenis from "@studio-freight/lenis";

import { fadeInContents, hideContents } from "@utils/animations";

const lenis = new Lenis();

const removeUrlHash = () => {
  history.pushState(
    "",
    document.title,
    window.location.pathname + window.location.search,
  );
};

const updateUrlHash = (hash) => {
  console.log(hash);
  history.pushState(
    "",
    document.title,
    window.location.pathname + window.location.search + hash,
  );
};

const scrollToHashLinks = () => {
  const hashLinks = document.querySelectorAll('a[href^="#"]');

  hashLinks?.forEach((hashLink) => {
    hashLink.addEventListener("click", (e) => {
      const hash = e?.target?.getAttribute("href");

      if (!hash) {
        return;
      }

      lenis.scrollTo(hash);
      updateUrlHash(hash);
    });
  });
};

document.addEventListener("DOMContentLoaded", (ev) => {
  hideContents(window.document);
  fadeInContents(window.document);
});

document.addEventListener("astro:before-swap", (ev) => {
  hideContents(ev.newDocument);
});

document.addEventListener("astro:page-load", (ev) => {
  fadeInContents(window.document);
  lenis.scrollTo("top");
  scrollToHashLinks();
  removeUrlHash();
});

function raf(time: any) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);
