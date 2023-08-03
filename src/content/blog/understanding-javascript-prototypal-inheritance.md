---
title: Understanding JavaScript prototypal inheritance
description: Learn how prototypal inheritance works in JavaScript.
date: 2022-06-26
tags: ["JavaScript"]
---

JavaScript by design is a prototype-based programming language, in which every object has a internal `[[Prototype]]` (as named in the specification) property that allows object to inherit features from another object.

That prototype object has a prototype of its own, and so on until an object is reached with null as its prototype. By definition, null has no prototype, and acts as the final link in this **prototype chain.**

To demonstrate, let's create an object without any properties or methods named `emptyObject` and then call the `toString` method.

```javascript
const emptyObject = {};

console.log(emptyObject.toString());
// [object Object]
```

Notice that even though the `emptyObject` doesn't have the `toString` method, we are still able to call the `toString` method.

This is because the `[[Prototype]]` of nearly all objects in JavaScript is the global [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) class which is where the `emptyObject` inherits the `toString()` method.

When we access a property or a method that don't exist in an object, JavaScript will look up to that object's prototype, the prototype of the prototype, and soon until it found the property/method (called **prototypal inheritance**) or `undefined` if not found.

> Since ECMAScript 2015, the `[[Prototype]]` is accessed using the accessors [Object.getPrototypeOf()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getPrototypeOf) and [Object.setPrototypeof()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf). This is equivalent to the JavaScript property `__proto__` which is non-standard but de-facto implemented by many browsers.

Checkout the example below to see how the `fish` object inherits the `eats` property from the `animal` object by setting the `fish` prototype using the `Object.setPrototypeOf()` method.

```javascript
const Animal = {
  eats: true,
};

const Fish = {
  swims: true,
};

Object.setPrototypeOf(Fish, Animal);

console.log(Fish.eats);
```

## References

[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)
[https://javascript.info/prototype-inheritance](https://javascript.info/prototype-inheritance)
