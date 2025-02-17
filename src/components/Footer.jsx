import { Link } from "react-router-dom"

// import React from 'react'

const Footer = () => {
  return (
    <div style={{height:'300px'}} className="container w-100 mt-5">

      {/* part1 */}
      <div className="d-flex justify-content-between">

        {/* intro */}
        <div style={{width:'400px'}}>
          <h5> <i className="fa-brands fa-docker me-2"></i>
          Project Fair</h5>
          <p>Designed and built with all the love in the world by the Bootstrap team with the help of our contributors.</p>
          <p>Code licensed MIT, docs CC BY 3.0.</p>
          <p>Currently v5.3.w.</p>
        </div>
        {/* links */}
        <div className="d-flex flex-column">
          <h5>Links</h5>
          <Link to={'/'} style={{textDecoration:'none', color:'white'}}>Home Page</Link>
          <Link to={'/login'} style={{textDecoration:'none', color:'white'}}>Login Page</Link>
          <Link to={'/register'} style={{textDecoration:'none', color:'white'}}>Register Page</Link>

        </div>
        {/* Guides */}
        <div className="d-flex flex-column">
          <h5>Guides</h5>
          <a target="_blank" style={{textDecoration:'none', color:'white'}} href="https://react.dev/">React</a>
          <a target="_blank" style={{textDecoration:'none', color:'white'}} href="https://react-bootstrap.netlify.app/">React Bootstrap</a>
          <a target="_blank" style={{textDecoration:'none', color:'white'}} href="https://www.npmjs.com/">React Router DOM</a>

        </div>
        {/* Contacts */}
        <div className="d-flex flex-column">
          <h5>Contact Us</h5>
          <div className="d-flex justify-content mt-3">
            <input type="text" placeholder="Email..." className="form-control me-2"/>
            <button className="btn btn-info"><i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
          {/* icons */}
          <div className="d-flex justify-content-between mt-3">
            <a target="_blank" style={{textDecoration:'none', color:'white'}} href="https://x.com/?lang=en"><i className="fa-brands fa-twitter"></i></a>

            <a target="_blank" style={{textDecoration:'none', color:'white'}} href="https://www.instagram.com/"><i className="fa-brands fa-instagram"></i></a>

            <a target="_blank" style={{textDecoration:'none', color:'white'}} href="https://www.facebook.com/"><i className="fa-brands fa-facebook"></i></a>

            <a target="_blank" style={{textDecoration:'none', color:'white'}} href="https://x.com/?lang=en"><i className="fa-brands fa-github"></i></a>
            <a target="_blank" style={{textDecoration:'none', color:'white'}} href="https://x.com/?lang=en"><i className="fa-brands fa-twitter"></i></a>
            <a target="_blank" style={{textDecoration:'none', color:'white'}} href="https://github.com/"><i className="fa-brands fa-youtube"></i></a>
          </div>

        </div>

      </div>

      {/* part2 */}
      <div>
        <p className="text-center mt-3">Copyright &#xA9;
           January 2025, Project Fair. Built with React.</p>
      </div>
    </div>
  )
}

export default Footer