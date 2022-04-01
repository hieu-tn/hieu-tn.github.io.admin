import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { ILayoutProps } from '@models/common.models'


const Layout = ({metadata, children}: ILayoutProps) => {
  return (
    <div id="page" className="site">
      <div className="site__inner">
        <Header metadata={metadata}/>

        <main className="site-content">
          {children}
        </main>

        <Footer/>
      </div>
    </div>
  )
}

export default Layout
