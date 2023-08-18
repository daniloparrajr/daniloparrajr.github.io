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

/**
 * Only allow elements with text content and images
 *
 * @param elements
 * @returns
 */
const filterElements = (elements) => {
  const elementsWithTextContent = [];
  for (const element of elements) {
    if (
      (element.textContent &&
        element.tagName !== "STYLE" &&
        element.tagName !== "SCRIPT") ||
      element.tagName === "IMG"
    ) {
      elementsWithTextContent.push(element);
    }
  }
  return elementsWithTextContent;
};

export const fadeInContents = (container) => {
  const contents = container.querySelectorAll(".js-animate-content");
  const timeline = gsap.timeline();
  const elements = [];

  timeline.delay(0.3);

  contents.forEach((content) => {
    if (content.children) {
      elements.push(filterElements(content.children));
    }
  });

  timeline.to(elements, {
    opacity: 1,
    y: 0,
    duration: 0.8,
    stagger: {
      each: 0.2,
    },
  });

  return timeline;
};
