---
path: '/blog/automating-netlify-deployments'
date: '2019-02-26'
title: 'Automating Netlify Deployments'
description: 'Is it possible to automatically rebuild a static site when external data changes? Using a collection of serverless services, I explain one approach to keeping data fresh.'
---

Serverless has been a hot topic recently, and for good reason. Chris Coyier has a talk called “[The All Powerful Front End Developer](https://www.youtube.com/watch?v=vXJpOHz3_sY)" about how this serverless approach is empowering frontend developers to accomplish more than was previously possible with the same skills. While the title of Chris’ talk sounds a bit audacious, the premise is becoming very true as JavaScript developers are discovering that their skills are reaching further than ever before.

If serverless is a new concept for you, or even if its not, I’d recommend that you check out [The Power of Serverless](https://thepowerofserverless.info/), a website put together by Chris to catalog the different services and resources available to developers to use traditionally frontend-only skills to build complete, dynamic solutions on the web. One of the services listed on The Power of Serverless is [Netlify](https://www.netlify.com), a service that helps build, deploy, and manage modern web projects. As a frontend developer, I have enjoyed using Netlify for the past year to build and host static sites for my personal website and hobby projects. The integration with GitHub has allowed me to painlessly get a website set up with continuous integration and automatic HTTPS on custom domains. It’s been really great! But this past month I ran into a small issue with this serverless approach to building web projects.

## The problem

I have a hobby project (hosted on Netlify) called [All the Highlights](https://allthehighlights.com/) which uses APIs from the NBA and YouTube to put together a static site of full-game highlights and scores from each night’s NBA basketball games. The idea is that many people aren’t able to watch the games live but would like to catch up on the action after the fact. You could maybe think of it as a Netflix for basketball highlights. In order to make this work well, my site needed a way to automatically fetch the scores and videos each day once the games had finished.

**_How could I automatically rebuild my static site once all the basketball games have finished?_**

Coming back to the serverless architecture part of this, Netlify offers seamless [continuous deployment](https://www.netlify.com/docs/continuous-deployment/) by connecting a git repository hosted on GitHub, GitLab, or Bitbucket to a Netlify site and keeping the two in sync. Netlify will run your build command and deploy the result whenever you push to your Git repo. This works great for development and release cycles but does not address the issue of updating data from external sources (outside of the git repository).

Beside continuous deployment, Netlify offers a couple other ways to automatically rebuild a site. [Functions](https://www.netlify.com/docs/functions/) (think lambdas) and [Webhooks](https://www.netlify.com/docs/webhooks/) can both trigger new builds based on either a user hitting a url or a by sending a POST request to a specific url that you can configure. These features are really powerful and make a static site feel a lot more interactive. However, this still doesn’t solve the problem of data from outside the website updating.

So at this point, it seems like Netlify doesn’t offer a feature that handles my use case. I need a way to schedule a rebuild on a periodic basis or at least whenever I think there might be new data to show.

## Serverless cron jobs

Before serverless computing, you would deploy your site on a server that you owned, or rented. By having access to that server, you also had the ability to configure system tasks as well as [cron jobs](https://opensource.com/article/17/11/how-use-cron-linux) which could run any task you wanted on a frequency determined by you ahead of time. Think of it like a recurring calendar event, but for code, that can be scheduled down to the second. These cron jobs are really useful and enable for all kinds of work to be automated.

However, when building out a solution in a serverless environment, you lose direct access to the server. In my case of hosting code on GitHub and deploying with Netlify, there was no way for me to schedule cron jobs to regularly rebuild the site after the basketball games were finished. I needed some type of cron-as-a-service solution.

## Using Zapier as a serverless cron job

I looked around online for a while searching for “cron job as a service”, and I came across [Zapier](https://zapier.com/), which is a service that connects apps together and offers automation for all kinds of tasks. You can use Zapier “Zaps” to trigger an action in another service on every successful deploy, or start a new deploy of your site in response to a trigger from another service. I signed up for the service to see what was available and realized that Zapier has a Netlify integration. One of the integration triggers was a timer - exactly what I was looking for!

I ended up setting 3 daily timer triggers that will build my static site at 7am, 9am, and 12 noon CEST. By 7am CEST all the NBA games should be finished and some content is already on YouTube. I regenerate the site twice more daily at 9 and 12 CEST to get any other YouTube content that might have be published since 7. The site then serves this data for users to catch up on NBA action until the next morning when I regenerate it all again. Having Zapier integrate with Netlify automates this all for me so that I can focus on using the site or improving the experience.

Zapier makes it simple to set the build to trigger daily at a certain time:
<br/>
<br/>
<img src="https://res.cloudinary.com/vernon-cloud/image/upload/v1551214823/zapier-zap-config_hplsko.png" alt="My Zapier Zap configuration" width="100%">

I can have three daily zaps set up like this:
<br/>
<br/>
<img src="https://res.cloudinary.com/vernon-cloud/image/upload/v1551214829/zapier-zaps-overview_g96tzt.png" alt="My Zapier configuration overview" width="100%">

## Wrapping up

Besides Zapier, I also found [cron-job.org](https://cron-job.org/en/) which seemed like a viable solution to what I was looking for. They offer a free service to execute cron jobs up to 60 times an hour. There is also [webtask.io](https://webtask.io) by Auth0 which does just about the same thing. However the integration with Zapier was a matter of clicking a couple of buttons versus writing some code with cron-job to hit the Netlify build hook.

If your external data can easily be observed for changes, you might want to look into [If This Then That](https://ifttt.com/) which is another service that helps connect parts of the internet. [Phil Hawksworth](https://twitter.com/philhawksworth) has an [interesting article](https://www.hawksworx.com/blog/keeping-a-jamstack-site-feeling-fresh-with-recent-tweets/) using IFTTT to regenerate his static site hosted every time he tweets. There are a lot more possibilities with this service.

I hope this article was interesting for you and helped to demonstrate some of the possibilities that are available using a serverless approach. One of the great things about serverless is the ability to select services that suit your needs very specifically. In my case, I am using GitHub, Netlify, and Zapier all in sync to deliver a great experience to my users that updates with fresh content every day. I believe that projects like these are just the low-hanging fruit of what is possible with building static sites in a serverless context.

A special thank you to [Phil Hawksworth](https://twitter.com/philhawksworth) of Netlify for reviewing this for me!
