import React from "react"
import Header from "./Header"
import Footer from "./Footer"
import { ILayoutProps } from "@models/common.models"
import AgentChat from "@components/AgentChat";


const Layout = ({metadata, children}: ILayoutProps) => {
  return (
    <>
      <Header metadata={ metadata }/>

      <main id="site-content">
        { children }
      </main>

      <Footer/>
      <AgentChat/>
    </>
  )
}

export default Layout
