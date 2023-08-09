import { gsap } from "gsap";

export const fadeInPostContents = (container) => {
  const content = container.querySelector("#content");
  if (content.children) {
    gsap.fromTo(
      content.children,
      { y: -20, opacity: 0 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: {
          each: 0.1,
        },
      },
    );
  }
};
