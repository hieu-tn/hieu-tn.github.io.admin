import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { ILayoutProps } from '@models/common.models'


const Layout = ({metadata, children}: ILayoutProps) => {
  return (
    <>
      <Header metadata={metadata}/>

      <main id="site-content">
        {children}
      </main>

      <Footer/>
    </>
  )
}

export default Layout
