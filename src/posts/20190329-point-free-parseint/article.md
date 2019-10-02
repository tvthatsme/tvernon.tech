---
path: '/blog/point-free-parseint'
date: '2019-03-29'
title: 'A use case for point-free programming'
description: 'A shallow dive into the world of functional programming, currying, and point-free functions in JavaScript and explain one use case where functional programming improves the readability of a simple function.'
---

There’s a lot to love about functional programming. While this isn’t the place to layout the benefits or tradeoffs of the functional programming style, its safe to say that the concepts can bring a lot of order, power, and simplicity to your code. However, in all of that, it’s also easy to get lost in the weeds of terminology and mathematical jargon. My goal in this post is to take a shallow dive into the world of functional programming, currying, and point-free functions in JavaScript and explain one use case where functional programming improves the readability of a simple function.

## Motivation

I was working on a JavaScript function this week that takes a timestamp and converts it to a date object in order to compare different dates. The original function looked like this:

```js
/**
 * Take a string with the format "22-03-2019 16:17" and create a new date object with it.
 *
 * @param {String} dateString - The string representation of the date.
 * @returns {Date} - The date represented by the string.
 */
function createDateObjectFromString(dateString) {
  // Destructure both the date and time parts
  const [dateStr, timeStr] = dateString.split(' ')

  // Get the individual parts from each section
  const timeParts = timeStr.split(':')
  const dateParts = dateStr.split('-')

  // Get all the parts needed to create the new date object
  const year = parseInt(dateParts[2], 10)
  const month = parseInt(dateParts[1], 10) - 1
  const day = parseInt(dateParts[0], 10)
  const hours = parseInt(timeParts[0], 10)
  const minutes = parseInt(timeParts[1], 10)

  // Return the new date
  return new Date(year, month, day, hours, minutes, 0, 0)
}
```

## Can we clean this up a bit?

Not terrible, but there are 5 `parseInt` calls on sections of the array, its not super readable, and there are a lot of arbitrary numbers to keep track of. Would there be a way to clean this up a bit?

One of the first things I thought about when trying to simplify this was asking myself if there was a way to perform the `parseInt` operations in a loop. But there is a problem with this: you can't directly use `parseInt` while `array.map`ing over an array as explained in [this article](https://raddevon.com/articles/cant-use-parseint-map-javascript).

### Functions that take too many arguments

As explained in the above linked article, each iteration of map provides [3 arguments](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map#Syntax) to the callback function. However, `parseInt` accepts one, and optionally two, arguments. This leaves us with some weird cases where, if not capped to one argument, `parseInt` would be called with radix values of 0, 1, 2, 3, etc. This is why NaN is returned on the second iteration because 1 is not a valid radix value for `parseInt`.

Okay, so that is why `parseInt` doesn’t work for us out of the box in mapping over an array of strings. What can we do about it?

### The power of tacit programming

There is a paradigm in computer science called [tacit-programming](https://en.wikipedia.org/wiki/Tacit_programming) (sometimes referred to as "point-free") that is commonly employed in functional programming. Similarly to how UNIX pipes work, each function accepts only one argument but then can composed together to form more complex functions. If employed right, this paradigm can really simplify things.

Now that we know why we can't just `parseInt` on every mapped value of the string array, we recognize that maybe a point-free approach might help us here. After all when calling `array.map`, the first argument passed to the callback is the current value that we are interested in sending on to `parseInt`. We don't care about the array's index or the array itself - just the current value.

### Currying to the rescue

[Currying](https://medium.com/javascript-scene/curry-and-function-composition-2c208d774983) in programming is the creation of a function that requires multiple arguments but at the time of creation, not all the arguments are known. To create a curried function, you define a function that accepts one argument and then returns another function that requires additional arguments. When you finally have all the arguments needed for the calculation, you can call the curried function and have all the arguments in the lexical scope of the function. This works because of JavaScript’s [closure](https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-closure-b2f0d2152b36) concept.

```js
function getIntWithRadix(radix) {
  return function parseIntWithRadix(stringParam) {
    return parseInt(stringParam, radix)
  }
}
```

By wrapping the `parseInt` function in a curried function, it is then possible to predefine the radix and create a new function that we could just call `getBase10Int`.

```js
const getBase10Int = getIntWithRadix(10)
```

See what we did there? We created a function for `parseInt` that has the radix predefined so now we only need to provide one argument to the function. Once we do this, we can then provide this curried function to the map and receive only one argument, the value at the index, which will result in the expected behavior of mapping through an array of numbers in string format and then being able to call a type of `parseInt` function on each string.

## Putting it all together

```js
//////// Setup

/**
 * Create a curried function to get an integer from a string with a specified radix.
 *
 * @param {Number} radix - An integer between 2 and 36 that represents the radix of the string.
 * @returns {(stringParam: String) => Number} - The curried function with one argument.
 */
function getIntWithRadix(radix) {
  return function parseIntWithRadix(stringParam) {
    return parseInt(stringParam, radix)
  }
}

// Define a function to get the integer value from a string with a base 10 radix
const getBase10Int = getIntWithRadix(10)

//////// Usage

/**
 * Take a string with the format "22-03-2019 16:17" and create a new date object with it.
 *
 * @param {String} dateString - The string representation of the date.
 * @returns {Date} - The date represented by the string.
 */
function createDateObjectFromString(dateString) {
  // Destructure both the date and time parts from the string
  const [dateStr, timeStr] = dateString.split(' ')

  // Get the individual parts from each section
  const [hours, minutes] = timeStr.split(':').map(getBase10Int)
  const [day, month, year] = dateStr.split('-').map(getBase10Int)

  // Return the new date (with zero-indexed month)
  return new Date(year, month - 1, day, hours, minutes, 0, 0)
}
```

## Conclusion

By creating a point-free function that wraps `parseInt`, we can now map over the `string.split` and use array destructuring to grab the parts of the string that we are interested in.

## Libraries and resources

In the chapter [Managing Function Inputs](https://github.com/getify/Functional-Light-JS/blob/master/manuscript/ch3.md/#no-points) of his book "Functional-Light JavaScript", Kyle Simpson actually uses a similar use case of point-free functions for `parseInt`. His explanation is worth reading but his solution is implemented with a functional-programming library of his creation. The solution presented here can be implemented with no external dependencies and is useful for a quick win. If you are seeing multiple use cases for point-free functions in your codebase, Kyle's library might be worth checking out.

This post has been intentionally written without the use of popular utility libraries that provide unary functionality. This lets us look at the simplest why and how instead of just "install this library and you're good to go". That being said, there is a good chance that you might already be using [Lodash](https://lodash.com/), [Ramda](https://ramdajs.com/), or another function library elsewhere in your application. If that's the case, Lodash has a [similar example](https://github.com/lodash/lodash/wiki/FP-Guide#capped-iteratee-arguments) for `parseInt` and Ramda has a [unary function](https://ramdajs.com/docs/#unary) as well. I'm sure there are other functional libraries that provide similar solutions.
