---
path: '/blog/data-flow-in-svelte-components'
date: '2019-01-14'
title: 'Data flow in Svelte components'
description: 'Passing data to svelte components and notifying parent components of changes explained with simple examples. Learn how to get up and running with Svelte.'
---

Svelte handles passing data between components much like React or Vue. If you have experience with either of these frameworks, understanding what is happening should be pretty straight forward for you. One of the important concepts that React has brought to frontend development over the last couple years is that components are best understood as functions of state. Given a specific state, the component will always render this particular way. When state is passed down to a component, either from a parent or a store, developing that component in isolation to everything around it is much easier. This philosophy can be applied with Svelte components as well.

## Putting everything together

When I first started learning about Svelte, I had a lot of trouble figuring out how to pass data between parent and child components. The documentation available is not organized very well at the moment and I wasn't able to find many examples of single file components arranged in the way I was used to working in from React and Vue projects. I wanted to write this post to hopefully help others understand how Svelte works quicker than I was able to. If you'd like to see full code that is explained in this post, you can follow along [here](https://github.com/tvthatsme/svelte-demo/). I hope that this is helpful for you!

## Passing state down in Svelte components

Passing state down to components in Svelte is much the same as any other framework. Just define the component in the template/jsx/html (depending on the framework) and provide a attribute with the data. In the case of Svelte, this will be defined in the html section of the application or single file component. The actual value of these properties is defined in the app.html data method in the script definition of the component.

```html
<!-- app.html -->
<Search data="{data}" search="{selected}"></Search>
```

In this example we will see a `data` prop and a `search` prop being passed to the Search component. The Search component is then able to use the properties as regular JavaScript properties. Here are some ways these properties can be used:

The search property bound to the value of the input field.

```html
<!-- search.html -->
<input
  class="search__input"
  type="text"
  bind:value="search"
  on:focus="openDropdown()"
  placeholder="Select a fruit"
/>
```

Both the data and search properties are deconstructed from the properties here to be used in a computed method to filter a list.

```js
// search.html
computed: {
  /**
   * Filter the list of results based on the search input.
   * Both data and search properties are destructured here
   * from the search component properties to be used in a
   * computed method.
   */
  searchResults: ({ data, search }) => {
    return data.filter(item =>
      item.label.toLowerCase().includes(search.toLowerCase())
    )
  }
}
```

## Passing changes up to Svelte parent components

Passing data down to child components only does so much for the logic of an application. At some point you will need to pass information or changes back up to the parent as the user interacts with the application. Imagine a search component needing to pass the selected value back to the main application so that some new information can be shown. To pass information up to parent components, Svelte uses a method `this.fire(eventname, {})`. Use the first parameter of the fire to name the custom event that the parent should listen for. Use the second parameter to pass a JavaScript object of information that is useful for the parent when handling this custom event.

```js
// search.js

// Select an item from the dropdown and set the event up
selectItem(text) {
  this.set({ search: text, showResults: false });
  this.fire('select', { text });
}
```

In the above example, the search component fires a custom 'select' event with an object with one property 'text' that contains the text that was selected. The parent component can then listen for this event and respond as needed.

```html
<Search data="{data}" search="{selected}" on:select="setSearch(event)"></Search>
```

## Stay away from bindings

If you read through the Svelte documentation, you might come across an alternate way of passing data up to parent components. This was the first approach I was exploring how things worked: "Occasionally, you need to get data back up; for that we use bindings" (see [here](https://svelte.technology/guide#bindings)). While this is technically supported and might have some valid use cases (I'm struggling to think of any at this moment), this approach should be avoided and there is thankfully a warning in the documentation against using this approach too liberally.

It's probably best that you don't use bindings between Svelte components at all. Going back to the philosophy that components should be a function of state, if you let a child change parent state through bindings, you lose the ability to define the relationship and control between the state and functionality. It makes it harder to reason about data flow within your application if you use bindings this way. The preferred approach is to fire events from the child component and define a listener on the parent. This way each component can be easily reasoned about and will result in a lot less crazy debugging.

## Resources and example repo

For more information on Svelte and passing properties between components, please check out the official documentation [here](https://svelte.technology/guide#props) and [here](https://svelte.technology/guide#component-events). If you'd like to read more about developing user interfaces as a function of state and why this is a helpful approach, I'd recommend reading [these](http://beletsky.net/2016/04/the-functional-approach-to-ui.html) [articles](http://nicolashery.com/describing-ui-state-with-data/) which are a bit old but the principles remain.

All the code in this article is part of a small repository that I've put on Github to demonstrate how props are handled in Svelte. Please check out the [repo](https://github.com/tvthatsme/svelte-demo/) for the full code and a [live demo](https://tvthatsme.github.io/svelte-demo). If you're a Svelte pro and notice anything that I could improve, I'd love to receive a Pull Request with an explanation.

Thanks for reading!
