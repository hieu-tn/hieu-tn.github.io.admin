const Header = () => {

  const moveTo = (target: string) => {
    console.log('click', target)
  }

  return (
    <header>
      <div className="container">
        <nav>
          <a onClick={() => moveTo('about')}>It's me</a>
          <a onClick={() => moveTo('resume')}>Resume</a>
          <a onClick={() => moveTo('portfolio')}>Portfolio</a>
          <a onClick={() => moveTo('contact')}>Contact</a>
          <a href="linkedin url">linkedin</a>
          <a href="github url">github</a>
        </nav>
      </div>
    </header>
  )

}

export default Header