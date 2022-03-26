import Header from './Header'
import Footer from './Footer'

const Layout = ({children}: {children: any}) => {
  return (
    <>
      <Header/>

      <main>
        {children}
      </main>

      <Footer/>
    </>
  )
}

export default Layout