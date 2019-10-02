---
path: '/blog/javascript-strict-mode'
date: '2019-05-18'
title: 'Does modern JavaScript need strict mode?'
description: 'Is strict mode in JavaScript a thing of the past? It was once recommended to "use strict" everywhere but it seems much less common today. This article addresses when you need to consider turning strict mode on in modern JavaScript and why you might have seen less of it recently.'
---

I was modifying some legacy code this past week, as most developers find themselves doing at some point in their employment. Now when I say legacy - it's pretty legacy. There was no build process, transpilation, or minification and all the JavaScript files were just imported one by one at the bottom of the index.html file. Remember those days? One of the things I noticed when getting familiar with the code was that for each function there was a “use strict” statement at the very beginning. Now I have to be honest, but the “use strict” statement at the beginning of a function or JavaScript file isn’t something that I’ve thought much about in the past few years. My recent professional work has been primarily in the Angular, React, and Vue frameworks and I haven't dealt with strict mode in JavaScript in any of the those projects to my memory. So I began thinking: does modern JavaScript need strict mode anymore? Why haven’t I been needing to add the `'use strict';` statement to my code recently? This article explains what I found:

## Why strict mode is a thing

During the evolution of JavaScript, there were certain parts of the language that were discovered to be troublesome or error prone. However, to preserve backwards compatibility, these parts couldn't just be removed from the language. Strict mode was [introduced in ES5](http://ecma-international.org/ecma-262/5.1/#sec-10.1.1) to solve this problem. By introducing strict mode, the code author is able to tell the JavaScript engine to run a particular section of the JavaScript code with stricter rules. There are three categories of changes to normal JavaScript semantics when introducing strict mode but the biggest incentive is that it can identify some previously silent errors and change them to throw errors. The intention of this is that thrown errors are a lot easier to spot during development and therefore fix before the application gets into the hands of end users.

For the sake of brevity, this article won’t address the specific cases that strict mode fixes, but if you’d like to dig further, [Flavio Copes](https://twitter.com/flaviocopes) has a nice article on [the specifics](https://flaviocopes.com/javascript-strict-mode/) and, of course, the [MDN article](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode) is always a great place to read more. If you google “JavaScript strict mode”, you will find many other articles about the specific cases that strict mode protects against. It has become a popular question to ask in technical interviews and many developers have therefore taken that opportunity to write articles explaining the answers.

It's worthwhile to mention that just a couple of years ago it was common advice to [use strict mode everywhere](https://gomakethings.com/javascript-strict-mode-and-why-you-should-always-use-it/). If I were to dig up old projects that I wrote, I know that those `'use strict';` statements were carefully placed at the top of each function or immediately invoked function expression. So what happened to all those `'use strict';`s?

## You probably have strict mode already turned on

So here is what I found: for much of modern JavaScript development, specifically the approach of organizing code into modules, strict mode is automatically enabled. Since the introduction of ECMAScript 2015, you don’t have to include the `'use strict';` statement when writing JavaScript modules to enable [strict mode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode#Strict_mode_for_modules). This is why for the bulk of modern frontend development, you probably aren’t typing out `'use strict';` much (if at all) anymore. By developing components using modules and then composing those components together to form the application, the code is inherently in strict mode. Think about it: much of your day to day work is probably working on components (think something along the lines create-react-app, gatsby, vue,... pick your framework) or modularized code. All that code is automatically in strict mode without you having to do anything special. This is a great application of the philosophy “make the right things easy to do”. As long as you are writing your JavaScript in modules, you are good to go and don’t need to concern yourself with turning strict mode on.

You could probably stop reading here, but there are a couple more points that I’d like to make while on the topic.

## Defining a JavaScript module

The fact the modules automatically turn strict mode on begs the question of what exactly constitutes a JavaScript module. How can you be sure that the code you are writing is classified as a module? Let’s take a brief aside to dig a little deeper into exactly what we mean when we talk about modules in JavaScript.

Before the introduction of ES6, there were a couple competing approaches to modularizing code. The three main approaches were Asynchronous Module Definition (AMD), RequireJS Modules, and CommonJS Modules. If you’ve done any work with NodeJS you’ve probably been using the CommonJS approach to organize code. But when there are many competing approaches, people start looking for ways to come to a common consensus. ES6 addressed this by defining [a common pattern](http://exploringjs.com/es6/ch_modules.html#ch_modules) for modules in JavaScript.

What makes a module in ES6? Unfortunately, it's [more complicated than you might think](https://humanwhocodes.com/blog/2016/04/es6-module-loading-more-complicated-than-you-think/). At the same time, it is pretty simple and there are some [basic features](https://leanpub.com/understandinges6/read#leanpub-auto-what-are-modules) that identify a module - specifically that modules must export anything that should be available to code outside the module. So think about a simple React component:

```js
// imports
import React from 'react'

// code
const SimpleComponent = () => {
  return <div>Here's a simple component</div>
}

// exports
export default SimpleComponent
```

The code above imports react at the top of the file and then exports the SimpleComponent at the bottom. This is a basic example of a JavaScript module and all the code within it will be run in strict mode. If you’d like to read further into modules, I’d recommend [this article](https://hacks.mozilla.org/2015/08/es6-in-depth-modules/) from Mozilla or [this one](https://tylermcginnis.com/javascript-modules-iifes-commonjs-esmodules/) from [Tyler McGinnis](https://twitter.com/tylermcginnis).

While on the subject of modules in JavaScript, there is a small caveat to be aware of.

## NodeJS modules are not in strict mode by default

This article is written focusing on native EcmaScript (I'm using this term here to help communicate trueness to the specification) and has not necessarily looked at Node’s concept of modules. [NodeJS is not JavaScript](https://blog.author.io/the-many-flavors-of-javascript-ba4a076ada29). While node does have a concept for “modules”, it was mentioned earlier that it uses the CommonJS approach which [does not follow the EcmaScript standard](http://imaginativethinking.ca/what-the-heck-is-node-modules-strict-by-default/). However, there is now an experimental flag that you can set in recent NodeJS versions in order to [import EcmaScript modules in within the NodeJS runtime](https://nodejs.org/api/esm.html#esm_ecmascript_modules) similarly to how it has been explained in this article.

In fact, this might have been the most important part of what I learned during my investigation. Node is still working to implement native module import and exports and therefore, unless you are running in the new experimental mode, you still need to ensure that you turn strict mode on in your different ‘modules’.

## Where do you need to explicitly turn on strict mode?

If you do any research online about strict mode in JavaScript, you will find many articles explaining what it is and examples of problems that it protects against. But while there are plenty of what and why explanations out there, there don’t seem to be many articles that cover when you need to turn strict mode on. We’ve already seen where strict mode is automatically turned on for EcmaScript modules, but this doesn’t cover every case of where you might be writing JavaScript.

_Are you working on some legacy (non-ES6+) code?_

Take the opportunity to learn from the past and understand how JavaScript worked in its past life. Maybe you weren’t in the industry when we used `'use strict';` in just about every file or function. This is your chance to dig into the some of the “gotchas” that JavaScript could have in its “sloppy mode”.

_Are you writing some NodeJS code?_

Hopefully you now understand why strict mode is still a thing. Its very standard to see `'use strict';` at the top of every NodeJs file in an application.

_Are you working on a react single page application?_

You’re most likely completely in strict mode without you needing to do anything. Check out the [very base JavaScript file](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/src/index.js) in create-react-app. This index.js file is a module which is consumed by webpack and then injected into index.html. Everything for strict mode is handled automatically for you, not by React, but by modern JavaScript. It turns out there was a good reason that I wasn’t thinking about `'use strict';` recently!

## Conclusion

Modern JavaScript does a lot to ensure that strict mode is turned on by default. Due to JavaScript always ensuring backwards compatibility, strict mode is still both useful and valid. However, you probably don’t have to think about it as much anymore unless you are working in a NodeJS environment. Just because JavaScript modules turn strict mode on automatically, it isn’t an excuse not to be familiar with the intricacies of the language and why strict mode is helpful and needed. I hope this article has been useful to you in understanding a bit more about JavaScript.
