---
path: '/blog/visual-regression-testing-with-jest'
date: '2020-04-23'
title: 'Visual regression testing with Jest'
description: 'Visual regression testing has traditionally been a manual process to go through the application to confirm that the application appears as your designers intended. This article looks at new approaches to automating visual regression tests and unlocking greater confidence in releasing.
'
---

Developers write tests to gain confidence.

Confidence that their application or site is working as expected for every user. Confidence that every logical flow has a proper ending. And confidence that when they modify existing code, they aren’t accidentally breaking something else.

Of all the different testing strategies, one of the least mentioned methods is that of visually confirming that the design looks as intended. It’s much easier to write unit, integration, or end-to-end tests to confirm that user flows are functional. All these tests are written with more code, and as developers, we’re comfortable with this.

But it’s traditionally been a manual process to go through the application to visually check that the application appears as your designers intended. This article looks at new approaches to automating visual regression tests and unlocking greater confidence in releasing.

## Why you’d want to do this

Unit, integration, and end-to-end testing are all necessary elements in confidently updating or releasing new code, but there is an important part that is normally missing in these implementations: the visuals.

If you think about it, most queries for these tests go something like ` findByTestId(``'``submit-button') ` or `findByLabelText('email-address')`, to the point where you could successfully step through your entire application with the functionality working but the presentational styles completely wrong.

This possibility is a bit overblown, but some package update, new component, or refactor can and sometimes does change the appearance of your application in a way that you didn’t expect. As developers, it is our job to ensure that our users get the same experience that our UX colleagues design and trust us to implement.

So how can we make sure that the visuals are always correct? You could manually click through every possible user journey, but there has to be a better way.

The documentation on Storybook’s page for Automated Visual Testing includes a section discussing [the challenges](https://storybook.js.org/docs/testing/automated-visual-testing/#challenges) of automating visual tests — especially the issue of one-to-one pixel matching being difficult to achieve across different machines.

They are quick to then suggest a number of paid services that offer visual testing with machine learning capabilities that are able to detect one-to-one pixel differences and understand that the images compared are equal enough to pass a human-eye test.

While these paid services might be nice, I felt that the recommendation to turn to services might be premature when you could set up your own process without too much effort.

This article is my research and solution to rolling your own simple visual regression tests and should give you everything you need to successfully start automating the visual regression tests for your application.

## Follow along with an example project

In order to highlight only the testing parts of the code, I will refer to some steps of this article with only a link to a git commit. For your reference, [the full project is available on GitHub](https://github.com/tvthatsme/visual-regression-jest).

## Setting up the basics

The steps we will take in creating an automated way of visually testing regressions will be the following:

1. [Create a simple React application](https://github.com/tvthatsme/visual-regression-jest/commit/0a024fd823f4741c04ef8864af15a3549e7b1e6c). This could really be any flavor of modern JavaScript application, existing project or not. If you’ve read much on this subject, you might have assumed that you’d need to [eject from a create-react-app project in order to run visual tests](https://gist.github.com/dferber90/6fe76cde582b8746191478fac34c8b7d#set-up-create-react-app), but there’s actually no need to change either the `setupTestFrameworkScriptFile` or `testEnvironment` of your Jest config, neither of which are supported by create-react-app.
2. [Add Jest and an initial test](https://github.com/tvthatsme/visual-regression-jest/commit/22bda8234fb02abc0a7ea542acfd385d48064b1e). This is pretty standard, and you can find many great articles outside the scope of this one about how to get set up with Jest tests.
3. [Set up visual testing with screenshots](https://github.com/tvthatsme/visual-regression-jest/commit/f6cc68c3ac2f159d22feca1502794f1f53b563c5). This is the part that might be new to you, but with the help of a couple libraries, we will be up and running soon.

The first part is to install the libraries we need:

    npm i --save-dev jest-image-snapshot jest-transform-css jest-transform-file jsdom-screenshot

We’ll also need to update the Jest configuration so that Jest knows how to use the image snapshot tools.

    // jest.config.js
    module.exports = {
      verbose: true,
      setupFilesAfterEnv: ['./setupTests.js'],
      transform: {
        '^.+\\.js$': 'babel-jest',
        '^.+\\.css$': 'jest-transform-css',
        '\\.(jpg|jpeg|png|gif|webp|svg)$': 'jest-transform-file'
      }
    };

`[setupFilesAfterEnv](https://jestjs.io/docs/en/configuration#setupfilesafterenv-array)` gives Jest a path(s) for setup procedures to run immediately after the test framework has been installed in the environment. By default, Jest doesn’t know anything about the assertion `toMatchImageSnapshot` that jest-image-snapshot gives us. So we’ll need to extend Jest in the setup file to understand how to use this new assertion.

    // setupTests.js
    import { toMatchImageSnapshot } from 'jest-image-snapshot';
    expect.extend({ toMatchImageSnapshot });

Once we’ve done that, we’re all set to add visual regression testing to our tests!

    // src/App.test.js
    import React from 'react';
    import { generateImage } from 'jsdom-screenshot';
    import { render } from '@testing-library/react';
    import App from './App';

    it('has no visual regressions', async () => {
      render(<App />);

      const screenshot = await generateImage();
      expect(screenshot).toMatchImageSnapshot();
    });

What’s going on here? We import `generateImage` from jsdom-screenshot and then render the application with the [React flavor of testing-library](https://testing-library.com/docs/react-testing-library/intro). Once we do that, we can await the generated image and use the `toMatchImageSnapshot` assert that we set up to assert that the visuals match.

Running the tests now, you’ll see that a `__image_snapshots__` directory is created where an image for each `generateImage` call is stored. You’ll want to make sure that these files are committed in your source control so that they are shared between other developers and CI environments.

If you now make a visual change to your component or application and rerun the tests, you’ll get an error message for the failing tests that looks something like this:

    Expected image to match or be a close match to snapshot but was 0.12333333333333332% different from snapshot (592 differing pixels).

Excellent! We now have a way of being alerted any time we make a change in code that affects the visual appearance of the application.

## The problem of “works on my machine”

If your project will only ever be developed on your computer, you aren’t collaborating with any team members, and you don’t want to use any CI approaches to deploy your project, then what has been covered above is probably enough.

However, chances are, you are pushing your code to a centralized place to be shared by other developers, and you are using some types of CI to automate tests at least before deployment or before merging to master. With all of these different compute environments, our pixel-for-pixel testing for visual regressions is going to run into serious problems because every environment has slightly different ways of rendering the same application.

For example, suppose that we want to run our tests as a [GitHub Action](https://github.com/features/actions) every time we create a pull request to the master branch in GitHub. Without any modifications to the code from the previous section, we end up with a failure and a message like this:

    Expected image to match or be a close match to snapshot but was 0.12333333333333332% different from snapshot (592 differing pixels).

Locally, everything is passing the test. However, the version of Linux the tests are running is probably different than what you are using in your development environment. So when this test runs in the CI environment, the resulting image doesn’t quite match the expected one from the `__image_snapshots__` directory saved in source control, and the test fails.

You could try modifying the `toMatchImageSnapshot` assertion in the test and provide a percentage threshold where anything less than 0.5 percent difference passes as the same:

    // src/App.test.js
    // ..
    expect(screenshot).toMatchImageSnapshot({
      failureThreshold: 0.005,
      failureThresholdType: 'percent'
    });
    // ..

But this is only a Band-Aid for a bigger problem. The “app” for this article is merely a paragraph. If diffing an image of a paragraph results in this much difference between local and CI environments, imagine what a real application, with pictures or many components, would do. You’d have to bump up the failure threshold to a point where it would also be impossible to even detect visual regressions.

There has to be a better way to solve this problem.

Well, yes — that’s the problem Docker solves. If you run your tests in a container, the tests will always produce the same images, provided the code doesn’t introduce any visual regressions. With some [new configuration files added to the project](https://github.com/tvthatsme/visual-regression-jest/commit/ca8862c2ef986a375729d856e3cbb0a927ec126b), the app can be tested in a Docker container and the problem is solved!

The specifics of configuring Jest to work inside a Docker container is too much for this article, so please refer to the demo GitHub project for the code or this great reference by [Alan Foster](https://twitter.com/alanfosterdev) on [running React unit tests within Docker.](https://www.alanfoster.me/posts/running-react-unit-tests-within-docker/)

## Adding CI testing with GitHub Actions

Now that we have the tests running in a container, it’s time to test it out in an actual constant integration environment. For the purposes of this article and demo project, GitHub Actions is the best place to demonstrate that, but for your particular needs, GitHub, GitLab, Jenkins, or whatever flavor of CI/CD you are using should work just fine. It’s a container, after all!

    # .github/workflows/test.yml
    name: Test
    on: [push]
    jobs:
      build:
        runs-on: ubuntu-latest
        steps:
        - uses: actions/checkout@v2
        - uses: actions/setup-node@v1
        - name: Run the containerized tests
          run: npm run test-in-docker:ci
        - name: Archive visual regression failures
          uses: actions/upload-artifact@v1
          if: failure()
          with:
            name: visual-regression-report
            path: /home/runner/work/visual-regression-jest/visual-regression-jest/src/__image_snapshots__/__diff_output__

The interesting parts here are setting off the tests to run in the Docker environment with `npm run test-in-docker:ci`, and in the case that the tests fail, the job will upload the images showing the failure diff as an artifact of that job. That way you can get an idea of what went wrong with the tests even after the container and job have been shut down.

## Final thoughts on Storybook integration

When I initially started researching this topic, using Storybook seemed like a good option. They had content about visual regression testing, and it is a tool that is familiar to many developers.

However, in looking through their content on visual regressions, I hesitated in going straight to the Storybook solution because of their strong warnings about one-to-one pixel matching problems. With some more research, I ended up with the solution that has been covered in this article, but I still thought about coming back to Storybook as a testing strategy: Maybe you could use either Jest or Storybook to test?

So I started following the [steps that Storybook provides](https://storybook.js.org/docs/testing/automated-visual-testing/#custom-solutions) to implement a custom solution for visually testing for regressions with Storybook. Halfway through their instructions (which don’t seem to work out of the box), I realized that Storybook isn’t necessary at all for visual regression testing. The approach given suggests starting a Storybook server and then figuring out a way to get an iframe of only the component that is needed for the test.

But we can already do that — more easily — with the Jest testing approach covered in this article. Trying to add Storybook as an option for these kinds of tests adds unneeded complexity.

This post [Automated visual regression testing with Jest](https://blog.logrocket.com/automated-visual-regression-testing-with-jest/) appeared first on [LogRocket Blog](https://blog.logrocket.com/).
