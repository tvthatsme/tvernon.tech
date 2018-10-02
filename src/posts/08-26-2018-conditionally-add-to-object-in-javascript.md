---
path: "/blog/conditionally-add-to-object-in-javascript"
date: "2018-08-26"
title: "Conditionally Add to Object in Javascript"
description: "Dissect conditionally adding to an object in javascript. Learn about short-circuit evaluation, spread syntax and how they can help you write more elegant es6+."
---

I have recently been using a certain Javascript pattern to conditionally add to an object based on whether some conditions are true or not. Here’s what it looks like:

```js
const a = {
  b: 10,
  ...(someTruthyCondition && { c: 5 }),
}
```

If you are new to modern Javascript this might look really confusing but let’s take a minute to break down what is happening. It is far too easy to find some snippet of code on Stack Overflow or elsewhere on the internet and use it without understanding how it works. Being able to understand how each little section of code is evaluated is important for mastering the Javascript language as well as generally helpful for debugging or writing new code. When evaluating Javascript statements, it is often to helpful to look at the inner-most operations and work outwards and that’s what we will do with this example.

## Short-Circuit Evaluation

```js
someTruthyCondition && { c: 5 }
```

In this case, we are using what is referred to as [short-circuit evaluation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_Operators#Short-circuit_evaluation). Short-circuiting means that when Javascript evaluates an AND expression (&&), if the first operand is false, Javascript will short-circuit and not even evaluate the second operand. You can think of a short-circuit as Javascript operating as lazily as possible. If the first operand is false, why even bother to evaluate the second? This is exactly what an electrical circuit does when it is shorted - take the path of least resistance to ground. Javascript (and other programming languages) operate in the same way when evaluating boolean expressions and thus the term short-circuit evaluation is used for what we are doing here.

So now we know that the expression `someTruthyCondition && {c: 5}` will either evaluate to return `false` or `true && {c:5}`. In reality though, if you type `true && {c:5}` into the console and hit enter, it will just return an object literal `{c: 5}`. The short-circuit expression then is useful here because we get either `false` or an object that contains whatever we might want to add to the object that we are building. This is the beginning of our pattern.

## Spread Syntax

The [spread syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax#Spread_in_object_literals) has been in the language since the introduction of EMCAScript2015 for array initialization and argument lists. However, the spread syntax for object literals is a new feature being proposed for introduction into the language ([currently at stage 4](https://github.com/tc39/proposal-object-rest-spread)). It copies the the objects’s enumerable properties into a new object. To support old browsers while using the spread syntax, make sure to compile your code with Babel or something similar. We’ve now reviewed the spread syntax and we are evaluating this part of the code which uses the spread feature:

```js
...(someTruthyCondition && {c: 5}),
```

Given what we now know about short-circuits and the spread syntax, let’s look at what will be spread to the object literal `a` that we are creating. If the `someTruthyCondition` is false, the short-circuit will evaluate to `false`. If you spread `false` into an new object, nothing is copied because `false` is not an object and does not have enumerable properties. In the case that `someTruthyCondition` is true, the statement will not short-circuit and the object with its enumerable property `c` will be copied to the object literal `a` that we are creating.

## Putting it all together

We now have all the pieces of this little pattern to conditionally add to an object. Its really a simple pattern but understanding its building blocks will help you as a developer see and understand other places that these evaluations are used. For example, short-circuit evaluation is a common pattern for [conditionally rendering in React](https://reactjs.org/docs/conditional-rendering.html#inline-if-with-logical--operator). Knowing its name and how it is used will help make you a better developer and give you a common vocabulary for communicating with other developers. I think the spread syntax and its benefits are even more widely known so I won’t go into those here.

If you’ve found this useful or you’ve spotted a mistake anywhere, please reach out and let me know. I’d love to know in either case :)

## But what about readability?

Glad you asked. If you are worried that those who come after you (or even a 3-month older you) won’t be able to understand what is going on, you might object to all this “obtuse” syntax and ask for something simpler. I might agree to a point, and yet I would disagree too. Boolean expressions are a fundamental pillar of computer science - you really need to understand deeply how they work. Short-circuit and spread operators are a little more tricky and require a fuller understanding of how Javascript works. However, I would argue that if you want to write and understand modern Javascript, you really need to understand ECMAScript2015 and later. These syntax updates and improvements are for the good of the language. If you want to become a great Javascript developer, you really need to know and embrace these changes.

If you really feel strongly against the approach that I have written about here, you can consider achieving the same result with a statement that would look like this:

```js
const a = Object.assign({ b: 10 }, someTruthyCondition ? { c: 5 } : null)
```

This approach relies the EMCAScript2015 [Object.assign](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign) feature to conditionally combine multiple objects. If the `someTruthyCondition` is false, nothing is copied to the new object because `null` and `undefined` are ignored by `Object.assign`. For some certain cases you might find that this approach is more readable that the previously covered example. It probably really depends on what you are writing and how you are structuring things. If you have another approach that you think is anymore clear, I’d love to see it, and I will append it here!
