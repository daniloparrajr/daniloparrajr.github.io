const removeActiveMenuItem = (nav) => {
  const menuItems = nav.querySelectorAll("a");
  menuItems.forEach((menuItem) => {
    menuItem.classList.remove("active");
  });
};

const setActiveMenuItem = (nav) => {
  const menuItems = nav.querySelectorAll("a");
  menuItems.forEach((menuItem) => {
    if (menuItem.getAttribute("href") === window.location.pathname) {
      menuItem.classList.add("active");
    }
  });
};

export const updateActiveMenuItem = () => {
  const navs = document.querySelectorAll(".site-nav");

  navs.forEach((nav) => {
    removeActiveMenuItem(nav);
    setActiveMenuItem(nav);
  });
};
