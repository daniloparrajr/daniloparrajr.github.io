---
title: Create and dispatch custom events in JavaScript
description: Learn how to create and dispatch custom events in JavaScript
date: 2022-06-11
tags: ["JavaScript"]
---

All events that take place in the DOM are based on the [**`Event`**](https://developer.mozilla.org/en-US/docs/Web/API/Event) interface which we can also use to create our own custom event.

To do so use the [**`Event`**](https://developer.mozilla.org/en-US/docs/Web/API/Event/Event) constructor that accepts two parameters the `type` and `options`.

- **type**: accepts a string which acts as the name of the event
- **options**: accepts an object that can have three properties `bubbles`, `cancelable`, and `composed`.

  - **bubbles**: A boolean value indicating whether the event bubbles. The default is `false`
  - **cancelable**: A boolean value indicating whether the event can be cancelled. The default is `false`
  - **composed**: A boolean value indicating whether the event will trigger listeners outside the shadow root. The default is `false`

```javascript
/**
 * Create a userIsAdded custom event
 * that bubbles up and can be canceled
 */
const evt = new Event("userIsAdded", {
  bubbles: true,
  cancelable: true,
});

/**
 * Events can be dispatched from
 * any element, not only the document
 */
document.querySelector("#myDiv").dispatchEvent(evt);
```

## Adding custom data using CustomEvent

Most of the time we would like to add more information to the custom event, that's when the [**`CustomEvent`**](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent) interface is for.

CustomEvent is an interfaced based from the main Event interface, which also accepts the same parameters but also have the **detail** property in the **options** parameter where we can add more information.

```javascript
const button = document.querySelector("button");

const evt = new CustomEvent("userIsAdded", {
  bubbles: true,
  cancelable: true,
  detail: {
    firstName: "John",
    lastName: "Doe",
  },
});

/**
 * Dispatched the event on the document
 * when a button is clicked.
 */
button.addEventListener("click", function () {
  document.dispatchEvent(evt);
});

/**
 * Listed to the userIsAdded event and
 * print the welcome message.
 */
document.addEventListener("userIsAdded", function (e) {
  alert(`User ${e.detail.firstName} ${e.detail.lastName} is added!`);
});
```
