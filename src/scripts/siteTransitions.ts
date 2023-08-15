import barba from "@barba/core";

import { updateActiveMenuItem } from "@utils/menu.ts";
import { fadeInContents, hideContents } from "@utils/animations.ts";

barba.init();

// Global hooks
barba.hooks.beforeEnter((data) => {
  window.scrollTo({ top: 0, behavior: "smooth" });
  updateActiveMenuItem(data.next.namespace);
});

barba.hooks.once((data) => {
  hideContents(data.next.container);
});

barba.hooks.afterOnce((data) => {
  fadeInContents(data.next.container);
});

barba.hooks.beforeEnter((data) => {
  hideContents(data.next.container);
});

barba.hooks.enter((data) => {
  fadeInContents(data.next.container);
});
