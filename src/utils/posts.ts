export function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

export function formatDate(date) {
  return new Date(date).toLocaleDateString("en-US", {
    timeZone: "UTC",
  });
}

export function filterPosts(
  posts,
  {
    filterOutDrafts = true,
    filterOutFuturePosts = true,
    exclude = [],
    tags = [],
    limit = undefined,
  } = {},
) {
  const filteredPosts = posts.reduce((acc, post) => {
    const { date, draft } = post.data;
    // filterOutDrafts if true
    if (filterOutDrafts && draft) return acc;

    // filterOutFuturePosts if true
    if (filterOutFuturePosts && new Date(date) > new Date()) return acc;

    if (exclude.includes(post.slug)) return acc;

    if (tags.length !== 0 && !post.data.tags.some((tag) => tags.includes(tag)))
      return acc;

    // add post to acc
    acc.push(post);

    return acc;
  }, []);

  filteredPosts.sort((a, b) => new Date(b.data.date) - new Date(a.data.date));

  // limit if number is passed
  if (typeof limit === "number") {
    return filteredPosts.slice(0, limit);
  }

  return filteredPosts;
}

export function calcReadingTime(text) {
  // https://dev.to/michaelburrows/calculate-the-estimated-reading-time-of-an-article-using-javascript-2k9l
  const wpm = 265;
  const words = text.trim().split(/\s+/).length;
  const time = Math.ceil(words / wpm);

  return time;
}
