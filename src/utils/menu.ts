const removeActiveMenuItem = (nav) => {
  const menuItems = nav.querySelectorAll("a");
  menuItems.forEach((menuItem) => {
    menuItem.classList.remove("active");
  });
};

const setActiveMenuItem = (nav, namespace) => {
  const menuItems = nav.querySelectorAll("a");
  menuItems.forEach((menuItem) => {
    if (menuItem.dataset.namespace === namespace) {
      menuItem.classList.add("active");
    }
  });
};

export const updateActiveMenuItem = (namespace) => {
  const navs = document.querySelectorAll(".site-nav");

  navs.forEach((nav) => {
    removeActiveMenuItem(nav);
    setActiveMenuItem(nav, namespace);
  });
};
