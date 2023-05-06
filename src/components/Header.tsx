import React, { SyntheticEvent, useEffect, useState } from "react"
import Image from "next/image"
import { IHeaderProps } from "@models/common.models"
import { customLoader, scrollToTarget } from "@lib/utils.lib"
import styles from "@styles/components/header.module.scss"


const Header = ({metadata}: IHeaderProps) => {

  const [isMenuMobileOpen, setIsMenuMobileOpen] = useState(false)
  const [activeMenu, setActiveMenu] = useState("about")

  useEffect(() => {
    // change menu active when scrolling
    const sectionAboutPos = document.getElementById("about")?.offsetTop || 0
    const sectionResumePos = document.getElementById("resume")?.offsetTop || 0
    const sectionPortfolioPos = document.getElementById("portfolio")?.offsetTop || 0
    // const sectionBlogPos = document.getElementById('blog').offsetTop
    const sectionContactPos = document.getElementById("contact")?.offsetTop || 0
    const viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)

    window.onscroll = () => {
      const currentViewport = window.scrollY + viewportHeight / 4

      const arr = [
        sectionAboutPos - currentViewport,
        sectionResumePos - currentViewport,
        sectionPortfolioPos - currentViewport,
        // sectionBlogPos - currentViewport,
        sectionContactPos - currentViewport,
      ]
      const curr: number[] = []
      arr.map(ele => {
        if (ele < 0) curr.push(ele)
      })
      switch (arr.indexOf(curr[curr.length - 1])) {
        case 0:
          setActiveMenu("about")
          break

        case 1:
          setActiveMenu("resume")
          break

        case 2:
          setActiveMenu("portfolio")
          break

        case 3:
          setActiveMenu("contact")
          break

        default:
          break
      }
    }
  })

  const menuToggle = (e: SyntheticEvent) => {
    setIsMenuMobileOpen(!isMenuMobileOpen)
  }

  const handleClick = (e: SyntheticEvent, target: string) => {
    scrollToTarget("#" + target)
    window.history.replaceState(null, "", "#" + target)
  }

  return <>
    <header id="site-header" className={ `${ styles.header } ${ isMenuMobileOpen ? styles.active : "" }` }>
      <div className={ `container ${ styles.container }` }>
        <Image
          loader={ customLoader }
          src="/images/logo.jpg"
          alt="logo"
          width="40"
          height="40"
          unoptimized={ true }
          priority={ true }/>
        <div className={ styles.hamburger } onClick={ menuToggle }>
          <i className="icon-menu"></i>
        </div>
        <nav className={ `${ styles.navigation } ${ isMenuMobileOpen ? styles.active : "" }` }>
          <a className={ activeMenu == "about" ? styles.active : "" } onClick={ e => handleClick(e, "about") }>
            It&apos;s me
          </a>
          <a className={ activeMenu == "resume" ? styles.active : "" } onClick={ e => handleClick(e, "resume") }>
            Resume
          </a>
          <a className={ activeMenu == "portfolio" ? styles.active : "" } onClick={ e => handleClick(e, "portfolio") }>
            Portfolio
          </a>
          <a className={ activeMenu == "contact" ? styles.active : "" } onClick={ e => handleClick(e, "contact") }>
            Contact
          </a>
        </nav>
      </div>
    </header>
  </>

}

export default Header
