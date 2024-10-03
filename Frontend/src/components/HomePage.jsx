import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
function HomePage() {
  return (
      <div className="App">
          <Header/>
          <div className="auth-wrapper">
              <div className="auth-inner">   
                <Outlet />
              </div>
          </div>
          <Footer/>
    </div>
  )
}

export default HomePage
