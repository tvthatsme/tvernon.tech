---
path: '/blog/react-custom-hook-for-forms'
date: '2019-07-27'
title: 'Writing your own React custom hooks'
description: 'Any time you use a React hook method in a local component, it is a potential oppurtunity to create a custom hook function if that logic can be reused elsewhere. This article walks through the motivation and process of writing your own React custom hooks.'
---

Hooks are hot right now in React. You might be writing your React components now using the hooks `useState`, `useEffect`, `useRef`, and others but the real power of hooks is being able to extract logic from one component and share that logic in other components across your application. Understanding how and when to write your own custom React hooks will enable you to extract reusable logic and even clean up your code a bit.

Let's look at some code and explore how a custom React hook can help.

## The problem with forms in React

Forms in React are a well-known source of frustration. As a library, React does not have a goal to solve this necessarily. There is [some documentation](https://reactjs.org/docs/forms.html) provided but it really just demonstrates the most simple case of handling changes on input elements and managing those updates in local state. This absence of a thorough solution from React is actually an invitation for the community to work out best practices according to the varied needs of diverse projects. The React docs themselves mention that if you are looking for ["fully-fledged" solutions](https://reactjs.org/docs/forms.html#fully-fledged-solutions) to forms, it might be better to turn to other 3rd-party libraries to use along with React. These additional libraries are some of the best practices the community has converged on when implementing forms in React.

The fully-fledged solutions to forms available today are great, but sometimes its not worth the trouble to set up [Formik](https://jaredpalmer.com/formik), [Final Form](https://github.com/final-form/final-form), or [insert your form library of choice here]. Depending on your project needs or bundle budget it might not make sense to use anything other than React for handling forms. You might also just be hacking out a proof of concept and aren't sure yet if you want to over-engineer the solution yet. This article is my attempt to show that React (and some custom hooks) might be all that you need - even for more complicated form logic!

## The multi-step forms example

Consider the case of a multi-step form where one section is required before the next section can be seen or filled in. The button to advance to the next stage of the form should not be clickable until the all the required inputs are filled. Note that this functionality is not possible with HTML5 `required` attributes on the inputs alone. Here's what that component could look like without any state to control the buttons:

```js
function MultiStepForm() {
  const [formIndex, setFormIndex] = useState(0)

  // Advance through the multiple stages of the signup
  function handleFormSubmit(event) {
    event.preventDefault()
    setFormIndex(formIndex + 1)
  }

  return (
    <>
      {/* First section of the form */}
      {formIndex === 0 && (
        <form onSubmit={handleFormSubmit} autoComplete="off">
          <p>Your name</p>
          <div className="input-row">
            <label htmlFor="first-name">First Name</label>
            <input id="first-name" type="text" />
          </div>
          <div className="input-row">
            <label htmlFor="last-name">Last Name</label>
            <input id="last-name" type="text" />
          </div>
          <div>
            <button type="submit">Continue</button>
          </div>
        </form>
      )}

      {/* Second section of the form */}
      {formIndex === 1 && (
        <form onSubmit={handleFormSubmit} autoComplete="off">
          <p>Your social profiles</p>
          <div className="input-row">
            <label htmlFor="github">GitHub Username</label>
            <input id="github" type="text" />
          </div>
          <div className="input-row">
            <label htmlFor="twitter">Twitter Username</label>
            <input id="twitter" type="text" />
          </div>
          <div className="input-row">
            <label htmlFor="codepen">Codepen Username</label>
            <input id="codepen" type="text" />
          </div>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      )}

      {/* Thank you message */}
      {formIndex === 2 && (
        <div>
          <p>Thanks!</p>
          <button type="button" onClick={() => setFormIndex(0)}>
            Back to start
          </button>
        </div>
      )}
    </>
  )
}
```

The code above is two panels presenting different aspects of user data that are required for a signup. Once both panels are filled, there is a "thank you" message and the user is returned to the start. This is just an example. The problem with this code is that we'd like to disable the "Continue" and "Submit" buttons until each input field has been filled by the user. We need to add some local state.

If you'd like to follow along in the code (along with example), I've created a CodeSandbox [demo here](https://codesandbox.io/s/agitated-goldberg-rbkzm).

## Feeling the pain of forms in React

There are two approaches to input elements in React: controlled and uncontrolled. With the controlled approach, there is an `onChange` listener attached to each input element and the handler updates the `value` attribute of that element. Each change is handled by React in local state. On the other hand, uncontrolled inputs are just as the name suggests: all the changes are handled by the DOM like it would on any website and React has no control over what is happening. In order for the React application to see the values, there is typically an `onSubmit` handler attached to the form so that React can then get the values of the inputs and decide what to do.

The controlled inputs approach has a lot more power because React sees each update event as it comes through and has full control of how to process that event. It's also the approach generally recommended by the React documentation. However, it also requires a lot more code to get working which can be tedious. For this example and for the number of inputs, it might be simpler to apply the uncontrolled inputs approach. If you'd like to read further on this, the [official React documentation](https://reactjs.org/docs/uncontrolled-components.html) on uncontrolled components is a good place to start.

Here is an implementation of the multi-step form, now with semi-uncontrolled checks around disabling the buttons that move the user to the next part. (I say semi-uncontrolled because there is still a `onChange` listener on each input but only to set a boolean state.) There's a lot of code here so just pay attention to the highlighted lines for what has been added.

```js
function MultiStepForm() {
  const [formIndex, setFormIndex] = useState(0)

  // highlight-start
  const [firstNameFilled, setFirstNameFilled] = useState(false)
  const [lastNameFilled, setLastNameFilled] = useState(false)
  const [githubFilled, setGithubFilled] = useState(false)
  const [twitterFilled, setTwitterFilled] = useState(false)
  const [codepenFilled, setCodepenFilled] = useState(false)

  const disableNameSection = !firstNameFilled || !lastNameFilled
  const disableSocialSection = !githubFilled || !twitterFilled || !codepenFilled
  // highlight-end

  // Advance through the multiple stages of the signup
  function handleFormSubmit(event) {
    event.preventDefault()
    setFormIndex(formIndex + 1)
  }

  return (
    <>
      {/* First section of the form */}
      {formIndex === 0 && (
        <form onSubmit={handleFormSubmit} autoComplete="off">
          <p>Your name</p>
          <div className="input-row">
            <label htmlFor="first-name">First Name</label>
            <input
              id="first-name"
              type="text"
              onChange={() => setFirstNameFilled(true)} // highlight-line
            />
          </div>
          <div className="input-row">
            <label htmlFor="last-name">Last Name</label>
            <input
              id="last-name"
              type="text"
              onChange={() => setLastNameFilled(true)} // highlight-line
            />
          </div>
          <div>
            <button
              type="submit"
              disabled={disableNameSection} // highlight-line
            >
              Continue
            </button>
          </div>
        </form>
      )}

      {/* Second section of the form */}
      {formIndex === 1 && (
        <form onSubmit={handleFormSubmit} autoComplete="off">
          <p>Your social profiles</p>
          <div className="input-row">
            <label htmlFor="github">GitHub Username</label>
            <input
              id="github"
              type="text"
              onChange={() => setGithubFilled(true)} // highlight-line
            />
          </div>
          <div className="input-row">
            <label htmlFor="twitter">Twitter Username</label>
            <input
              id="twitter"
              type="text"
              onChange={() => setTwitterFilled(true)} // highlight-line
            />
          </div>
          <div className="input-row">
            <label htmlFor="codepen">Codepen Username</label>
            <input
              id="codepen"
              type="text"
              onChange={() => setCodepenFilled(true)} // highlight-line
            />
          </div>
          <div>
            <button
              type="submit"
              disabled={disableSocialSection} // highlight-line
            >
              Submit
            </button>
          </div>
        </form>
      )}

      {/* Thank you message */}
      {formIndex === 2 && (
        <div>
          <p>Thanks!</p>
          <button type="button" onClick={() => setFormIndex(0)}>
            Back to start
          </button>
        </div>
      )}
    </>
  )
}
```

The added code is simple enough. Anytime there is a change event to any input element, mark that part "filled". Disable the "next" button until all the required inputs are filled. However, we've added a lot of code for a partial implementation of this feature. What happens if the user enters some text in an input, but then immediately clears it? We've already marked that input as "filled". In order to correct that, it might be a good idea to write some function that could handle this case for every input to keep things a little more [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself).

Taking the time to write a function that can handle the input change event for every input is an oppurtunity to step back a bit and think about reusability. This might not be the only form in the project nor component to want a check that all required inputs have been filled.

_Any time you use a React hook method in a local component, it is a potential oppurtunity to create a custom hook function if that logic can be reused elsewhere._

Please note that this does not necessarily mean that you always should! Premature optimizations have a negative impact and can cost you or your team different ways. However, being able to see a pattern forming across several components and being able to extract that logic into a custom React hook function is very powerful. That's what we will do in this case.

## Writing the custom hook

Boiling down the functionality from the last code example, for each input element we need to:

- Keep a record the "filled" state of the input
- Keep a record of the disabled state of corresponding "continue" button for the section the input belongs to

We can accomplish all this by writing a custom React hook who's one parameter is an array of the ids of the required fields. The function can then keep a record of the fields by providing an event handler that looks at the event, determines if the event's target id matches one of the require fields, and then adds that id to an array of "filled fields". Here's what an implementation of that could look like for text input fields.

Not shown here but also good to keep in mind: there might be some cases where the form is pre-filled and the user is just editing. An effect hook could be used here to check what fields are filled on load.

```js
// useRequiredFields.js
import { useState } from 'react'

function useRequiredFields(requiredIds) {
  // have all the required fields been filled?
  const [requirementsFilled, setRequirementsFilled] = useState(false)

  // keep an array of the field ids that have been filled
  const [fieldsFilled, setFieldsFilled] = useState([])

  // Handle any onChange events for any of the inputs
  function handleChange(event) {
    const { id, value } = event.target

    if (!fieldsFilled.includes(id) && value.length) {
      // The field hasn't previously been filled
      setFieldsFilled([...fieldsFilled, id])

      // Check if all the fields have been filled
      if (requiredIds.length - 1 === fieldsFilled.length) {
        setRequirementsFilled(true)
      }
    } else if (value.length === 0 && fieldsFilled.includes(id)) {
      // The fields previously was filled but now has been cleared
      const newFieldsFilled = fieldsFilled.filter(field => field !== id)
      setFieldsFilled([...newFieldsFilled])
      setRequirementsFilled(false)
    }
  }

  return [requirementsFilled, handleChange]
}
```

We've now extracted logic from the form itself and added better functionality to respond to the input being cleared. If there comes a time to revisit the logic of "required" and what meets that criteria, changing this code will update the functionality for every input field that we apply this custom hook to.

## Using the custom hook

Now that we've extracted the repeated code into a custom React hook, we can now return to our form and apply the new functionality. For each form section, we just need to provide the id's of the input fields to our `useRequiredFields`. The hook returns a boolean value of if all the fields are filled as well as an onChange handler to updating the hook's internal state.

Once again, there's a lot of code here so just pay attention to the highlighted lines for what has been changed.

```js
import useRequiredFields from './useRequiredFields' // highlight-line

function MultiStepForm() {
  const [formIndex, setFormIndex] = useState(0)

  // highlight-start
  const [namesFilled, updateNames] = useRequiredFields([
    'first-name',
    'last-name',
  ])
  const [socialsFilled, updateSocials] = useRequiredFields([
    'github',
    'twitter',
    'codepen',
  ])
  // highlight-end

  // Advance through the multiple stages of the signup
  function handleFormSubmit(event) {
    event.preventDefault()
    setFormIndex(formIndex + 1)
  }

  return (
    <>
      {/* First section of the form */}
      {formIndex === 0 && (
        <form onSubmit={handleFormSubmit} autoComplete="off">
          <p>Your name</p>
          <div className="input-row">
            <label htmlFor="first-name">First Name</label>
            <input
              id="first-name"
              type="text"
              onChange={updateNames} // highlight-line
            />
          </div>
          <div className="input-row">
            <label htmlFor="last-name">Last Name</label>
            <input
              id="last-name"
              type="text"
              onChange={updateNames} // highlight-line
            />
          </div>
          <div>
            <button
              type="submit"
              disabled={!namesFilled} // highlight-line
            >
              Continue
            </button>
          </div>
        </form>
      )}

      {/* Second section of the form */}
      {formIndex === 1 && (
        <form onSubmit={handleFormSubmit} autoComplete="off">
          <p>Your social profiles</p>
          <div className="input-row">
            <label htmlFor="github">Github Username</label>
            <input
              id="github"
              type="text"
              onChange={updateSocials} // highlight-line
            />
          </div>
          <div className="input-row">
            <label htmlFor="twitter">Twitter Username</label>
            <input
              id="twitter"
              type="text"
              onChange={updateSocials} // highlight-line
            />
          </div>
          <div className="input-row">
            <label htmlFor="codepen">Codepen Username</label>
            <input
              id="codepen"
              type="text"
              onChange={updateSocials} // highlight-line
            />
          </div>
          <div>
            <button
              type="submit"
              disabled={!socialsFilled} // highlight-line
            >
              Submit
            </button>
          </div>
        </form>
      )}

      {/* Thank you message */}
      {formIndex === 2 && (
        <div>
          <p>Thanks!</p>
          <button type="button" onClick={() => setFormIndex(0)}>
            Back to start
          </button>
        </div>
      )}
    </>
  )
}
```

## Final considerations

If you've gotten this far, you may be thinking: "Just use HTML5 required attributes on the input elements and even min/max attributes as well to make all the fields required". That is true and would work for simple cases. However, in the use case presented in this article, we want to completely disable/hide the submit button until all the required fields are filled. This functionality could be expanded further and, to my knowledge, is not something that required attributes on their own can account for. Required attributes are a good starting point for semantic HTML but for rich user experiences JavaScript is required.

Another thing worth mentioning is that the implementation discussed in this article only checks if any value is in the input field. An even better experience could be provided by composing hooks together to provide regex/pattern matching or helpful messages to the user if something is missing. However, that is a design tradeoff to be considered and might be an appropriate point to reach for a "full-fledged" solution like [Formik](https://jaredpalmer.com/formik).

Once again, if you'd like to see all the code as well as the demo, I have a CodeSandbox [here](https://codesandbox.io/s/agitated-goldberg-rbkzm). If you've spotted an error in this article or feel like I've made a mistake in explain things, please [raise a pull request](https://github.com/tvthatsme/tvernon.tech/blob/master/src/posts/07-27-2019-react-custom-hook-for-forms.md). Thanks for reading!
