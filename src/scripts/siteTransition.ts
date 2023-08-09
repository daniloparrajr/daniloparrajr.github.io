import barba from "@barba/core";

import { updateActiveMenuItem } from "../utils/menu.ts";
import { fadeInPostContents } from "../utils/animations.ts";

barba.init({
  transitions: [
    {
      name: "animate-contents",
      once(data) {
        fadeInPostContents(data.next.container);
      },
      enter(data) {
        fadeInPostContents(data.next.container);
      },
      to: {
        namespace: ["article"],
      },
    },
  ],
});

barba.hooks.beforeEnter((data) => {
  updateActiveMenuItem(data.next.namespace);
});
