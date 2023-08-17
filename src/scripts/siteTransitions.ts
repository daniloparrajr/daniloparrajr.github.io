import barba from "@barba/core";

import { updateActiveMenuItem } from "@utils/menu.ts";
import { fadeInContents, hideContents } from "@utils/animations.ts";

barba.init({
  transitions: [
    {
      name: "default-transition",
      once(data) {
        hideContents(data.next.container);
        fadeInContents(data.next.container);
      },
      beforeEnter(data) {
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
  window.scrollTo({ top: 0, behavior: "smooth" });
  updateActiveMenuItem(data.next.namespace);
});
