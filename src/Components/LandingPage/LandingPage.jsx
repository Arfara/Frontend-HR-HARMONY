import React, { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Link } from 'react-scroll';
import './LandingPage.css';
import fluid1 from '../Assets/fluid1.png';
import fluidbottom1 from '../Assets/fluid-bottom-1.png';
import fluidbottom2 from '../Assets/fluid-bottom-2.png';
import fluidleft from '../Assets/fluid-left.png';
import fluidright from '../Assets/fluid-right.png';
import initParallax from '../Assets/script';
import logo from '../Assets/comp_logo.png';
import absen from '../Assets/absen.png';
import payroll from '../Assets/payroll.png';
import training from '../Assets/training.png';
import arfara from '../Assets/arfara.png';
import fakhri from '../Assets/fakhri.png';
import aimar from '../Assets/aimar.png';

const LandingPage = () => {
  useEffect(() => {
    initParallax();
  }, []);

  return (
    <div>
      <header>
        <img src={logo} alt='company logo' className='company-logo'/>
        <nav>
          <Link to="home" smooth={true} duration={500}>Home</Link>
          <Link to="about" smooth={true} duration={500}>About</Link>
          <Link to="featured-products" smooth={true} duration={500}>Products</Link>
          <Link to="contact-us" smooth={true} duration={500}>Contact Us</Link>
          <RouterLink to="/login">Sign In</RouterLink>
        </nav>
      </header>

      <section className='home' id='home'>
        <img src={fluid1} alt='fluid1' className='fluid1'/>
        <img src={fluidbottom2} alt='fluid bottom 2' className='fluidbottom2'/>

        <h1 className='title'>HR Harmony</h1>
        
        <img src={fluidbottom1} alt='fluid bottom 1' className='fluidbottom1'/>
        <img src={fluidright} alt='fluid right' className='fluidright'/>
        <img src={fluidleft} alt='fluid left' className='fluidleft'/>
      </section>

      <section className='about' id='about'>
        <div className='about-text'>
          <h1>HR Harmony</h1>
          <p>Welcome to HR Harmony, where innovation meets human resource seamlessly. It is not just a platform. We are architects of organizational efficiency, weaving a symphony of solutions to elevate your HR experience. Our journey began with a simple vision – to redefine how businesses approach human resource management.</p>

          <h2>Why HR Harmony?</h2>

          <div className="advantage-container">
            <div className="advantage-card">
              <h3>Complete HR Solutions, No Server Hassles</h3>
              <p>Embrace a seamless HR journey with our comprehensive suite of features. From attendance management to AI-driven training, HR Harmony provides an all-encompassing HR solution, eliminating the need for server worries. Your HR operations just got smoother!</p>
            </div>

            <div className="advantage-card">
              <h3>Cloud-Powered Efficiency</h3>
              <p>Experience the power of the cloud! HR Harmony leverages cloud technology, ensuring accessibility from anywhere, anytime. Say goodbye to traditional limitations and hello to a new era of flexible and efficient HR management.</p>
            </div>

            <div className="advantage-card">
              <h3>Pay As You Go</h3>
              <p>Your success is our priority, and we believe in flexibility. With HR Harmony's "Pay As You Go" model, you only pay for what you use. Enjoy cost-effectiveness without compromising on the robust features that make HR Harmony exceptional.</p>
            </div>

            <div className="advantage-card">
              <h3>Innovative and Future-Ready</h3>
              <p>We don't just keep up with trends; we set them. HR Harmony is not just a software; it's a forward-thinking solution designed to evolve with the dynamic landscape of HR management. Stay ahead of the curve with innovation at your fingertips.</p>
            </div>

            <div className="advantage-card">
              <h3>User-Friendly Interface</h3>
              <p>Navigating through HR processes has never been this intuitive. Our user-friendly interface ensures a smooth onboarding process and a delightful experience for every user. No steep learning curves, just intuitive HR management.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="featured-products" id='featured-products'>
        <h1>Featured Products</h1>
        <div className="product-container">
          <div className="product">
            <img src={absen} alt="Manajemen Absensi" />
            <h2>Attendances Management</h2>
          <div className="learn-more-button">
              <div className="learn-more">Learn More</div>
          </div>
          </div>
      
          <div className="product">
            <img src={payroll} alt="Payroll" />
            <h2>Payroll Management</h2>
          <div className="learn-more-button">
              <div className="learn-more">Learn More</div>
          </div> 
          </div>

          <div className="product">
            <img src={training} alt="AI & Pelatihan" />
            <h2>AI & Training</h2>
          <div className="learn-more-button">
              <div className="learn-more">Learn More</div>
          </div> 
          </div>
        </div>
      </section>

      <section className="our-team">
        <h1>Our Team</h1>
          <div className="our-team-container">
            <div className="our-team">
              <img src={arfara} alt="arfara" />
              <h2>Arfara Yema Samgusdian</h2>
              <p>Front-end Developer</p>
            </div>

            <div className="our-team">
              <img src={fakhri} alt="fakhri" />
              <h2>Fakhrity Hikmawan</h2>
              <p>Cloud Engineer</p> 
            </div>

            <div className="our-team">
              <img src={aimar} alt="aimar" />
              <h2>Aimar Rizki Utama</h2>
              <p>Back-end Developer</p>
            </div>
          </div>
      </section>

      <section className='contact-us' id='contact-us'>
        <h2>Need More Information? Contact Us</h2>
        <div className='contact-container'>
          <form className='form-container'>
            <div className='name-group'>
              <div className='form-group'>
                <label htmlFor='firstName'>First Name</label>
                <input type='text' id='firstName' name='firstName' />
              </div>
              <div className='form-group'>
                <label htmlFor='lastName'>Last Name</label>
                <input type='text' id='lastName' name='lastName' />
              </div>
            </div>
            <div className='contact-info-group'>
              <div className='form-group'>
                <label htmlFor='email'>Email</label>
                <input type='email' id='email' name='email' />
              </div>
              <div className='form-group'>
                <label htmlFor='phoneNumber'>Phone Number</label>
                <input type='tel' id='phoneNumber' name='phoneNumber' />
              </div>
            </div>
            <div className='form-group'>
              <label htmlFor='message'>Message</label>
              <textarea id='message' name='message'></textarea>
            </div>
            <button className='submit-button' type='submit'>Submit</button>
          </form>
        </div>
      </section>

      <footer className="footer-section">
          <div className="footer-container">
            <img src={logo} alt="Company Logo" className="company-logo" />
            <p>© 2024 HR Harmony. All rights reserved.</p>
          </div>
      </footer>

      <script src="script.js"></script>
    </div>
  )
}

export default LandingPage