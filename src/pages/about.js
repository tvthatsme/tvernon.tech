import React from 'react'
import Helmet from 'react-helmet'
import Sidebar from '../components/Sidebar'
import { Page, SidebarArea, ContentArea } from '../styles/layout'
import { Global } from '@emotion/core'
import globalStyles from '../styles/global'

export default function About() {
  return (
    <Page>
      <Helmet>
        <title>About Timothy Vernon | Timothy Vernon</title>
        <meta name="description" content="Timothy Vernon About" />
      </Helmet>
      <Global styles={globalStyles} />
      <SidebarArea>
        <Sidebar />
      </SidebarArea>
      <ContentArea>
        <h1>Coming soon...</h1>
      </ContentArea>
    </Page>
  )
}
