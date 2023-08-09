import { gsap } from "gsap";

export const fadeInContent = (container) => {
  const contents = container.querySelectorAll(".js-animate-content");
  const timeline = gsap.timeline();

  contents.forEach((content) => {
    if (content.children) {
      timeline.add(
        gsap.fromTo(
          content.children,
          { y: -20, opacity: 0 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: {
              each: 0.1,
            },
          },
          "-=2",
        ),
      );
    }
  });
};
