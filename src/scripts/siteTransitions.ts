import barba from "@barba/core";

import { updateActiveMenuItem } from "@utils/menu";
import { fadeInContents, hideContents } from "@utils/animations";
import { resetDisqus, initDisqus } from "@utils/disqus";

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
  window.scrollTo({ top: 0, behavior: "smooth" });
  updateActiveMenuItem(data.next.namespace);
});
