import Lenis from "@studio-freight/lenis";

import barba from "@barba/core";

import { updateActiveMenuItem } from "@utils/menu";
import { fadeInContents, hideContents } from "@utils/animations";
import { resetDisqus, initDisqus } from "@utils/disqus";

const lenis = new Lenis();

barba.init({
  views: [
    {
      namespace: "article",
      beforeEnter() {
        initDisqus();
        resetDisqus();
      },
    },
  ],
  transitions: [
    {
      name: "default-transition",
      once(data) {
        hideContents(data.next.container);
        fadeInContents(data.next.container);
      },
      afterLeave(data) {
        hideContents(data.next.container);
      },
      enter(data) {
        fadeInContents(data.next.container);
      },
    },
  ],
});

// Global hooks
barba.hooks.beforeEnter((data) => {
  updateActiveMenuItem(data.next.namespace);
});

barba.hooks.afterLeave(() => {
  lenis.scrollTo("top");
});

function raf(time: any) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);
