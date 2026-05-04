import { useEffect } from 'react'
import Home from './Home'
import About from './About'
import Services from './Services'
import Products from './Products'
import Repairs from './Repairs'
import Contact from './Contact'

const ScrollableHome = () => {
  // Smooth scroll behavior
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth'
    return () => {
      document.documentElement.style.scrollBehavior = 'auto'
    }
  }, [])

  return (
    <div className="w-full">
      {/* Home Section */}
      <section id="home">
        <Home />
      </section>

      {/* About Section */}
      <section id="about">
        <About />
      </section>

      {/* Services Section */}
      <section id="services">
        <Services />
      </section>

      {/* Products Section */}
      <section id="products">
        <Products />
      </section>

      {/* Repairs Section */}
      <section id="repairs">
        <Repairs />
      </section>

      {/* Contact Section */}
      <section id="contact">
        <Contact />
      </section>
    </div>
  )
}

export default ScrollableHome

