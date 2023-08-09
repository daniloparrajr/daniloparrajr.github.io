import barba from "@barba/core";

import { updateActiveMenuItem } from "../utils/menu.ts";
import { fadeInContent } from "../utils/animations.ts";

barba.init({
  transitions: [
    {
      name: "animate-contents",
      once(data) {
        fadeInContent(data.next.container);
      },
      enter(data) {
        fadeInContent(data.next.container);
      },
    },
  ],
});

barba.hooks.beforeEnter((data) => {
  updateActiveMenuItem(data.next.namespace);
});
