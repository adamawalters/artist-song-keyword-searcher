import Header from './components/Header'
import Footer from './components/Footer'
import AppRoutes from './components/AppRoutes'
import { BrowserRouter as Router } from 'react-router-dom'
import { useEffect } from 'react'

const App = () => {

  return ( 
    <>
        <Header />
        <AppRoutes />
        <Footer />
    </>
  )
}

export default App