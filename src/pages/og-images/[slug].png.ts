import satori from "satori";
import { html } from "satori-html";
import { Resvg } from "@resvg/resvg-js";
import InterRegular from "@fontsource/inter/files/inter-latin-400-normal.woff";
import InterBold from "@fontsource/inter/files/inter-latin-700-normal.woff";
import { getCollection } from "astro:content";
import type { APIContext } from "astro";

import { formatBlogPosts, formatDate } from "src/js/utils";

const dimensions = {
  width: 1200,
  height: 630,
};

interface Props {
  title: string;
  date: Date;
}

export async function get(context: APIContext) {
  const { title, date } = context.props as Props;
  const formattedDate = formatDate(date);

  const markup = html`<div tw="bg-zinc-900 flex flex-col w-full h-full">
    <div tw="flex flex-col w-full h-4/5 p-10 justify-center">
      <div tw="text-zinc-400 text-2xl mb-6">${formattedDate}</div>
      <div
        tw="flex text-6xl w-full font-bold leading-snug tracking-tight text-transparent bg-red-400"
        style="background-clip: text; -webkit-background-clip: text; background: linear-gradient(90deg, rgb(0, 124, 240), rgb(0, 223, 216));"
      >
        ${title}
      </div>
    </div>
    <div
      tw="w-full h-1/5 border-t border-zinc-700/50 flex p-10 items-center justify-between text-2xl"
    >
      <div tw="flex items-center">
        <img
          src="https://avatars.githubusercontent.com/u/25006926?v=4"
          tw="w-15 h-15 rounded-full"
        />
        <span tw="ml-3 text-zinc-400">daniloparrajr.com</span>
      </div>
    </div>
  </div>`;

  const svg = await satori(markup, {
    fonts: [
      {
        name: "Inter",
        data: Buffer.from(InterRegular),
        weight: 400,
      },
      {
        name: "Inter",
        data: Buffer.from(InterBold),
        weight: 700,
      },
    ],
    height: dimensions.height,
    width: dimensions.width,
  });

  const image = new Resvg(svg, {
    fitTo: {
      mode: "width",
      value: dimensions.width,
    },
  }).render();

  return {
    body: image.asPng(),
    encoding: "binary",
  };
}

export async function getStaticPaths() {
  const blog = await getCollection("blog");
  const posts = formatBlogPosts(blog);

  const paths = posts.map((post) => {
    return {
      params: {
        slug: post.slug,
      },
      props: {
        title: post.data.title,
        date: post.data.date,
      },
    };
  });
  return paths;
}
