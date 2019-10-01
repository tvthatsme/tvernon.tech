import React from 'react'
import Helmet from 'react-helmet'
import Sidebar from '../components/Sidebar'
import ExperienceOverview from '../components/ExperienceOverview'
import { Page, SidebarArea, ContentArea } from '../styles/layout'
import { LargeTextBlock } from '../styles/blog'
import { experience } from '../styles/breakpoints'
import LogoTigerspike from '../assets/experience-logos/tigerspike.png'
import LogoFlowserve from '../assets/experience-logos/flowserve.svg'
import styled from '@emotion/styled'
import { Global } from '@emotion/core'
import globalStyles from '../styles/global'

const TimePeriod = styled('p')`
  font-style: italic;
  margin: -16pt 0 20pt;
  font-size: 12pt;

  @media (max-width: ${experience}) {
    text-align: center;
  }
`

const List = styled('ul')`
  margin-left: 30px;
`

export default function Experience() {
  return (
    <Page>
      <Helmet>
        <html lang="en" />
        <title>Experience | Timothy Vernon</title>
        <meta
          name="description"
          content="Timothy Vernon Experience and Resume"
        />
      </Helmet>
      <Global styles={globalStyles} />
      <SidebarArea>
        <Sidebar />
      </SidebarArea>
      <ContentArea>
        <div className={LargeTextBlock}>
          <h1>Experience</h1>
          <p>
            I am an experienced software developer with five years of software
            design, development, testing, support, and troubleshooting. I have a
            proven ability to quickly implement new languages and technologies
            to fit the unique needs of different projects. I am a skilled
            communicator with presentation, workshop, and tutoring experience.
          </p>
          <p>
            Below is a detailed listing of the places I've worked and the
            projects that I've contributed to:
          </p>
        </div>
        <div className={LargeTextBlock}>
          <ExperienceOverview
            startDate="July 2016"
            endDate="September 2018"
            location="Dubai, United Arab Emirates"
          >
            <img src={LogoTigerspike} alt="Tigerspike" />
          </ExperienceOverview>
          <h3>Senior Software Engineer</h3>
          <TimePeriod>July 2018 – September 2018</TimePeriod>
          <p>
            Building delightful, modern web applications with React and
            Javascript.
          </p>
          <h3>Software Engineer</h3>
          <TimePeriod>July 2016 – July 2018</TimePeriod>
          <p>
            Building responsive, WCAG accessible web experiences with a broad
            range of front-end technologies. Delivering business value fast
            within an Agile team by creating proof-of-concepts for user
            experience designers. Mastering front-end skills in Angular and
            React frameworks as well as modern Javascript best practices.
            Supporting designer colleagues with web performance and responsive
            strategies.
          </p>
          <p>
            My work can be found all over{' '}
            <a
              href="https://www.emirates.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              emirates.com
            </a>
            . I worked with Emirates Airlines on their website as a consultant
            for 2 years - releasing a new homepage, improving booking flows, and
            adding new features for all aspects of managing a flight booking.
          </p>{' '}
          <p>Attended:</p>
          <List>
            <li>
              <a
                href="https://react.amsterdam"
                target="_blank"
                rel="noopener noreferrer"
              >
                React Amsterdam 2017
              </a>
            </li>
            <li>
              <a
                href="https://www.react-europe.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                React Europe 2018
              </a>
            </li>
          </List>
        </div>
        <div className={LargeTextBlock}>
          <ExperienceOverview
            startDate="February 2011"
            endDate="June 2016"
            location="Lynchburg, Virginia, USA"
          >
            <img src={LogoFlowserve} alt="Flowserve" />
          </ExperienceOverview>
          <h3>Electrical Engineer</h3>
          <TimePeriod>June 2013 – June 2016</TimePeriod>
          <p>
            Served as the primary engineer on an embedded Java application for
            monitoring, controlling, and configuring industrial network
            equipment. Bolstered project with development, testing, and support
            skills while releasing progressive improvements to customers
            worldwide. Led several training workshops on the product and
            supported commissioning and troubleshooting efforts internationally.
          </p>
          <p>
            Developed a web application for embedded devices using node.js and
            various JavaScript technologies. Learned and implemented HTML, CSS,
            and modern web development tooling to create a dynamic, single-page
            application for an industrial, controls-focused experience.
          </p>
          <p>
            Built a proof-of-concept for a hybrid desktop/mobile application
            using HTML, CSS, and JavaScript technologies linked to a C++ backend
            for configuration and diagnostics of Flowserve products over serial
            or ethernet communications.
          </p>
          <p>Attended:</p>
          <List>
            <li>Java Technologies for Real-time and Embedded Systems 2013</li>
            <li>
              <a
                href="https://conferences.oreilly.com/fluent"
                target="_blank"
                rel="noopener noreferrer"
              >
                O'Reilly Fluent Conference
              </a>{' '}
              (2014, 2015, 2016)
            </li>
          </List>
          <h3>Engineering Intern</h3>
          <TimePeriod>February 2011 - June 2013</TimePeriod>
          <p>
            Started intern/co-op experience with Flowserve Limitorque in the
            Product Management Division with responsibilities in product
            documentation and support, marketing products, and assisting in
            product management. Implemented and conducted a corporate customer
            survey, compiled and analyzed results and presented findings to
            management. Handled product documentation revisions and new
            releases.
          </p>
          <p>
            While under the Product Management umbrella also assisted the
            Research and Development Department in PCB prototyping for
            inter-board communication and motor controller applications.
          </p>
          <p>
            In December of 2011 transferred to the Applications Engineering
            Department to join a product development team. Largely involved in
            Java applications development and software testing. Lead programmer
            on web application addition to controls and automation project which
            features intranet status, control, and configuration of networked
            hardware.
          </p>
        </div>
      </ContentArea>
    </Page>
  )
}
