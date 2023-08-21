import { SITE } from "@config";

export const resetDisqus = () => {
  DISQUS.reset({
    reload: true,
    config: function () {
      this.page.identifier = location.pathname;
      this.page.url = `${SITE.website}${location.pathname}#!newthread`;
    },
  });
};

export const initDisqus = () => {
  if (!document.documentElement.classList.contains("disqus-init")) {
    window.disqus_config = function () {
      this.page.identifier = location.pathname;
      this.page.url = `${SITE.website}${location.pathname}`;
    };

    (function () {
      // DON'T EDIT BELOW THIS LINE
      var d = document,
        s = d.createElement("script");
      s.src = "https://daniloparrajr.disqus.com/embed.js";
      s.setAttribute("data-timestamp", +new Date());
      (d.head || d.body).appendChild(s);
    })();
    document.documentElement.classList.add("disqus-init");
  }

  // Disqus theme switching
  document.addEventListener("themeChanged", function (e) {
    if (document.readyState == "complete") {
      DISQUS.reset({
        reload: true,
        config: function () {
          this.page.identifier = location.pathname;
          this.page.url = `${SITE.website}${location.pathname}#!newthread`;
        },
      });
    }
  });
};
