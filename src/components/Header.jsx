import React from 'react'

const Header = () => {
  return (
   <>
     <header>
      <a href='/' className="logo">ArtVista</a>
      <nav>
        <ul>
            <li>
                <a href="/">home</a>
            </li>
            <li>
                <a href="./Page">Art</a>
            </li>
            <li>
                <a href="#">About</a>
            </li>
             <li>
                <a href="#">contact</a>
            </li>
        </ul>
      </nav>
    </header>
   </>
  )
}

export default Header
