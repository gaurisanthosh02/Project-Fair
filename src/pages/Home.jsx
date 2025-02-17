import { Link, useNavigate } from "react-router-dom"
import landingImage from '../assets/image2.png'
import ProjectCard from "../components/ProjectCard"
import { Card } from "react-bootstrap"
import { addHomeProjectAPI } from "../services/allAPI"
import { useEffect, useState } from "react"
// import React from 'react'

const Home = () => {

  const [allHomeProjects, setAllHomeProjects] = useState([])

  const navigate = useNavigate();

  useEffect(()=>{
    getAllHomeProject()
  },[])

  const getAllHomeProject = async () => {
    try {
      const result = await addHomeProjectAPI()
      if(result.status == 200){
        setAllHomeProjects(result.data)
      }

    } catch (err) {
      console.log(err);
      
    }
  }

  const handleProjects = () => {
    if(sessionStorage.getItem('token')){
      navigate('/projects')
    }else{
      alert("Please login to get full access")
    }
  }


  return (
   <>
   <div style={{minHeight:'100vh'}} className="d-flex justify-content-center align-items-center rounded shadow w-100">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <h1 style={{fontSize:'80px'}}><i className="fa-brands fa-docker"></i>Project Fair</h1>
            <p style={{textAlign:'justify'}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis dolore dolorum consequatur debitis amet hic eius dolor porro ipsum corporis?</p>
            {
              sessionStorage.getItem('token') ?
              <Link to={'/dashboard'} className="btn btn-warning">Manage Your Projects</Link>
              :
              <Link to={'/login'} className="btn btn-warning">Start to Explore</Link>
            }
          </div>
          <div className="col-lg-6">
            <img className="img-fluid" src={landingImage} alt="" />
          </div>

        </div>
      </div>
    </div>

    <div className="mt-5 text-center">
      <h1>Explore Our Projects</h1>
      <marquee>
        <div className="d-flex">
          {
            allHomeProjects?.map(project=>(
              <div key={project._id} className="me-5">
                <ProjectCard displayData={project}/>
              </div>
            ))
          }
        </div>
      </marquee>
      <button onClick={handleProjects} className="btn btn-link mt-5">CLICK Here to view more projects</button>
    </div>

    <div className="d-flex justify-content-center align-items-center mt-5 flex-column">
      <h1>Our Testimonials</h1>
      <div className="d-flex justify-content-evenly align-items-center mt-3 w-100">
      <Card style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title className="d-flex justify-content-center align-items-center flex-column ">
              <img width={'60px'} height={'60px'} className="rounded-circle img-fluid" src="https://w7.pngwing.com/pngs/4/736/png-transparent-female-avatar-girl-face-woman-user-flat-classy-users-icon.png" alt="" />
              <span>Monica</span>
            </Card.Title>
            <Card.Text>
              <div className="mt-2 d-flex justify-content-center">
                <i className="fa-solid fa-star text-warning"></i>
                <i className="fa-solid fa-star text-warning"></i>
                <i className="fa-solid fa-star text-warning"></i>
                <i className="fa-solid fa-star text-warning"></i>
                <i className="fa-solid fa-star text-warning"></i>
              </div>
              <p style={{textAlign:'justify'}}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellat, qui.</p>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </div>


   </>

  )
}

export default Home