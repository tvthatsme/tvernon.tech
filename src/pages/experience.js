import React from 'react'
import Helmet from 'react-helmet'
import Sidebar from '../components/Sidebar'
import { Page, SidebarArea, ContentArea } from '../styles/layout'

export default function Experience() {
  return (
    <Page>
      <Helmet>
        <meta
          name="description"
          content="Timothy Vernon Experience and Resume"
        />
      </Helmet>
      <SidebarArea>
        <Sidebar />
      </SidebarArea>
      <ContentArea>
        <h1>Coming soon...</h1>
      </ContentArea>
    </Page>
  )
}
