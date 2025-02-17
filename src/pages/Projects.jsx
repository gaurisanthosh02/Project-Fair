// import React from 'react'

import { Col, Row } from "react-bootstrap"
import Header from "../components/Header"
import ProjectCard from "../components/ProjectCard"
import { useEffect, useState } from "react"
import { allProjectAPI } from "../services/allAPI"

const Projects = () => {

  const [searchKey, setSearchKey] = useState("")
  const [allProjects, setAllProjects] = useState([])
  console.log(allProjects);

  useEffect(()=>{
    getAllProjects()
  },[searchKey])

  const getAllProjects = async () => {
    const token = sessionStorage.getItem("token")
    console.log("token is:",token);

    if(token){
      const reqHeader = {
        "Authorization":`Bearer ${token}`
      }
      try {
        const result = await allProjectAPI(searchKey, reqHeader)
        console.log("allProjectAPI result:",result);
        
        if(result.status == 200){
          setAllProjects(result.data)
        }
        
      } catch (err) {
        console.log(err); 
      }
  }
}
  
  return (
    <>
      <Header/>
      <div style={{paddingTop:'100px'}}>
        <div className="d-flex justify-content-between">
          <h1>All Projects</h1>
          <input onChange={e=>setSearchKey(e.target.value)} type="text" placeholder="Search Projects by their Language" className="form-control w-25"/>
        </div>
        <Row className="mt-3">
          {
            allProjects?.length>0 ? 
              allProjects?.map(projects => (
                <Col key={projects.id} className="mb-3" sm={12} md={6} lg={4}>
                  <ProjectCard displayData={projects}/>
                </Col>
              ))
            :
            <div className="text-danger fw-bolder">Projects Not Found !!!</div>  
          }
        </Row>
      </div>
    </>
  )
}

export default Projects