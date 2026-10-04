import React from 'react'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import { Outlet } from 'react-router-dom'

function UserLayout() {
  return (
    <div className='flex flex-col min-h-screen'>
        <Header/>

        <main className='flex-1'>
            <Outlet/>
        </main>

        <Footer/>
    </div>
  )
}

export default UserLayout