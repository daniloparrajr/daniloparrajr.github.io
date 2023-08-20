import barba from "@barba/core";

import { SITE } from "@config";

import { updateActiveMenuItem } from "@utils/menu.ts";
import { fadeInContents, hideContents } from "@utils/animations.ts";

barba.init({
  views: [
    {
      namespace: "article",
      afterEnter(data) {
        DISQUS.reset({
          reload: true,
          config: function () {
            this.page.identifier = data.next.url.path.substring(1);
            this.page.url = `${SITE.website}${data.next.url.path}#!newthread`;
          },
        });
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
