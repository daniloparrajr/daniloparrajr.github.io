---
title: How to prevent flex items to overflow its flex container
description: Provide a solution and explanation on preventing flex items to overflow its flex container.
date: 2022-05-05
tags: ["CSS"]
---

## Solution

Add `min-width: 0;` to the overflowing flex item.

```css
.overflowing-flex-item {
  min-width: 0;
}
```

## Explanation

By default `min-width` is set to `0`, this changes to `auto` when the element become **flex items**.

This will cause an overflow if the flex item is wider than the flex container e.g. flex item have wide tables.

Because `min-width` will be the flex item's width if the `min-width` value is greater than the `width` and `max-width`.

By setting the `min-width` to `0`, this tells the browser that the flex item has no right to take up any minimum width, and now it will be rendered properly, taking up only as much width as is available.

# Source

[Prevent flex items from overflowing a container](https://stackoverflow.com/questions/36230944/prevent-flex-items-from-overflowing-a-container#answer-66689926)
[MDN min-width](https://developer.mozilla.org/en-US/docs/Web/CSS/min-width)
