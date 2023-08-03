import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { formatDate, formatBlogPosts } from "src/js/utils";

export async function get(context) {
  const blog = await getCollection("blog");
  const posts = formatBlogPosts(blog);

  return rss({
    stylesheet: "/rss/styles.xsl",
    // `<title>` field in output xml
    title: "Danilo Parra Jr",
    // `<description>` field in output xml
    description: "A humble Astronaut’s guide to the stars",
    // Pull in your project "site" from the endpoint context
    // https://docs.astro.build/en/reference/api-reference/#contextsite
    site: context.site,
    // Array of `<item>`s in output xml
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: formatDate(post.data.date),
      customData: post.data.customData,
      link: `/${post.slug}/`,
    })),
    // (optional) inject custom xml
    customData: `<language>en-us</language>`,
  });
}
