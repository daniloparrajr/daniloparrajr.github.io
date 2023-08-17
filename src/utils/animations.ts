import { gsap } from "gsap";

export const hideContents = (container) => {
  const contents = container.querySelectorAll(".js-animate-content");
  const timeline = gsap.timeline();

  contents.forEach((content) => {
    if (content.children) {
      timeline.set(content.children, { y: -20, opacity: 0 });
    }
  });

  return timeline;
};

export const fadeInContents = (container) => {
  const contents = container.querySelectorAll(".js-animate-content");
  const timeline = gsap.timeline();

  timeline.delay(0.3);

  contents.forEach((content) => {
    if (content.children) {
      timeline.to(content.children, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: {
          each: 0.2,
        },
      });
    }
  });

  return timeline;
};
