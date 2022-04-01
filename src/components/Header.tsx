import { IHeaderProps } from '@models/common.models'
import Link from 'next/link'
import { activeMenu, scrollToTarget } from '@lib/utils.lib'
import { useEffect } from 'react'


const Header = ({metadata}: IHeaderProps) => {

  // useEffect(() => {
  //   if (window.location.hash) {
  //     activeMenu(window.location.hash)
  //     scrollToTarget(window.location.hash)
  //   } else {
  //     activeMenu('#about')
  //   }
  //
  //   // change menu active when scrolling
  //   let sectionAboutPos = document.getElementById('about')?.offsetTop || 0
  //   let sectionResumePos = document.getElementById('resume')?.offsetTop || 0
  //   let sectionPortfolioPos = document.getElementById('portfolio')?.offsetTop || 0
  //   // let sectionBlogPos = document.getElementById('blog').offsetTop
  //   let sectionContactPos = document.getElementById('contact')?.offsetTop || 0
  //   let viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
  //
  //   window.onscroll = () => {
  //     let currentViewport = window.pageYOffset + viewportHeight / 4
  //     let arr = [
  //       sectionAboutPos - currentViewport,
  //       sectionResumePos - currentViewport,
  //       sectionPortfolioPos - currentViewport,
  //       // sectionBlogPos - currentViewport,
  //       sectionContactPos - currentViewport,
  //     ]
  //     let curr: number[] = []
  //     for (let i = 0; i < arr.length; i += 1) {
  //       if (arr[i] < 0) curr.push(arr[i])
  //     }
  //     let index = arr.indexOf(curr[curr.length - 1])
  //
  //     switch (index) {
  //       case 0:
  //         activeMenu('#about')
  //         break
  //
  //       case 1:
  //         activeMenu('#resume')
  //         break
  //
  //       case 2:
  //         activeMenu('#portfolio')
  //         break
  //
  //       case 3:
  //         activeMenu('#contact')
  //         break
  //
  //       // case 3:
  //       //   activeMenu('#blog')
  //       //   break
  //       //
  //       // case 4:
  //       //   activeMenu('#contact')
  //       //   break
  //
  //       default:
  //         break
  //     }
  //   }
  // }, [])

  const menuToggle = () => {
    let siteHeader = document.getElementsByClassName('site-header')
    if (typeof siteHeader !== 'undefined')
      siteHeader[0].classList.toggle('mobile-open')
  }

  const handleClick = (e: any) => {
    let element = e.currentTarget
    let href = element.dataset.href

    if (window.location.pathname !== '/') {
      window.location.href = '/' + href
    }

    activeMenu(href)
    scrollToTarget(href)
    window.history.replaceState(null, '', href)
  }

  return (
    <>
      <header className="site-header">
        <div className="logo">
          <Link href="/">
            <img src="images/logo.jpg" alt="logo" width="80"/>
          </Link>
        </div>
        <div className="site-title">
          <h2><Link href="/">{metadata.author}</Link></h2>
        </div>
        <div className="site-nav">
          <nav className="navigation">
            <ul>
              <li className="nav-item">
                <button className="nav-link" data-href="#about" onClick={handleClick}>It's me</button>
              </li>
              <li className="nav-item">
                <button className="nav-link" data-href="#resume" onClick={handleClick}>Resume</button>
              </li>
              <li className="nav-item">
                <button className="nav-link" data-href="#portfolio" onClick={handleClick}>Portfolio</button>
              </li>
              {/*<li className="nav-item"><button className="nav-link" data-href="#blog" onClick={handleClick}>Blog</button></li>*/}
              <li className="nav-item">
                <button className="nav-link" data-href="#contact" onClick={handleClick}>Contact</button>
              </li>
            </ul>
          </nav>
        </div>
        <div className="social-links">
          <a href={metadata.linkedin} target="_blank" rel="noopener noreferrer"><i className="icon-linkedin"></i></a>
          <a href={metadata.github} target="_blank" rel="noopener noreferrer"><i className="icon-github2"></i></a>
        </div>
      </header>

      <header className="mobile-visible">
        <div className="container">
          <div className="mobile-visible__inner">
            <div className="logo">
              <Link href="/">
                <>
                  <img src="images/logo.jpg" alt="logo" width="31"/>
                  <span>{metadata.title}</span>
                </>
              </Link>
            </div>
            <div className="cta">
              <span className="helper"></span>
              <button className="menu-toggle" onClick={menuToggle}><i className="icon-menu"></i></button>
            </div>
          </div>
        </div>
      </header>
    </>
  )

}

export default Header
