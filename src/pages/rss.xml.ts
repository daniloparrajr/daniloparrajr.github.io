import { SITE } from "@config";
import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { formatDate, filterPosts } from "@utils/posts";

export async function GET(context: { site: string }) {
  const blog = await getCollection("blog");
  const posts = filterPosts(blog);

  return rss({
    stylesheet: "/rss/styles.xsl",
    // `<title>` field in output xml
    title: SITE.author,
    // `<description>` field in output xml
    description: SITE.description,
    // Pull in your project "site" from the endpoint context
    // https://docs.astro.build/en/reference/api-reference/#contextsite
    site: context.site,
    // Array of `<item>`s in output xml
    items: posts.map(
      (post: {
        data: {
          title: string;
          description: string;
          date: string;
          customData: object;
        };
        slug: string;
      }) => ({
        title: post.data.title,
        description: post.data.description,
        pubDate: formatDate(post.data.date),
        customData: post.data.customData,
        link: `/${post.slug}/`,
      }),
    ),
    // (optional) inject custom xml
    customData: `<language>en-us</language>`,
  });
}
