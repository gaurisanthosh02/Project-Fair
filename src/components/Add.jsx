import { useContext, useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import cameraImg from '../assets/camera.png'
import { addProjectAPI } from "../services/allAPI";
import { addProjectResponseContext } from "../contexts/ContextAPI";
// import React from 'react'

const Add = () => {

  const {addProjectResponse, setAddProjectResponse} = useContext(addProjectResponseContext)
  const [preview, setPreview] = useState("")
  const [imageFileStatus, setImageFileStatus] = useState(false)

  const [projectDetails, setProjectDetails]= useState({
    title:"", languages:"", overview: "", github:"", website:"", projectImg:""
  })

  console.log(projectDetails);

  useEffect(()=>{
    if(projectDetails.projectImg.type == 'image/png' || projectDetails.projectImg.type == 'image/jpg' || projectDetails.projectImg.type == 'image/jpeg'){
      //valid image
      setImageFileStatus(true)
      setPreview(URL.createObjectURL(projectDetails.projectImg))
    }else{
      //invalid image
      setImageFileStatus(false)
      setPreview("")
      setProjectDetails({...projectDetails,projectImg:""})  
    }
  },[projectDetails.projectImg])

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setPreview("")
    setImageFileStatus(false)
    setProjectDetails({title:"", languages:"", overview: "", github:"", website:"", projectImg:""})
    setShow(false)
  };
  const handleShow = () => setShow(true);

  const handleAddProject = async () => {
    const {title, languages, overview, github, website, projectImg} = projectDetails
    if(title && languages && overview && github && website && projectImg){
      // alert("API Call")
      const reqBody = new FormData()
      reqBody.append("title",title),
      reqBody.append("languages",languages),
      reqBody.append("overview",overview),
      reqBody.append("github",github),
      reqBody.append("website",website),
      reqBody.append("projectImg",projectImg)

      // console.log("projectImg:", projectImg);
      
      const token = sessionStorage.getItem("token")
      if(token){
        const reqHeaders = {
          "Content-Type":"multipart/form-data",
          "Authorization":`Bearer ${token}`
        }
        // make api call
        try {
          const result = await addProjectAPI(reqBody, reqHeaders)
          console.log("addProjectApi response",result);
          
          if(result.status==200){
            alert("Project added successfully")
            setAddProjectResponse(result)
            handleClose()
          }else{
            alert(result.response.data)
          }
        } catch (err) {
          console.log(err);
          
        }
      }

    }else{
      alert("Please fill the whole form")
    }
  }

  return (
    <>
      <button onClick={handleShow} className='btn btn-primary'>+ New Project</button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>New Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col lg={6}>
              <label>
                <input onChange={e=>setProjectDetails({...projectDetails, projectImg:e.target.files[0]})} type="file" style={{display:'none'}}/>
                <img height={'200px'} className="img-fluid" src={preview?preview:cameraImg} alt="" />
              </label>
              {
                !imageFileStatus && <div className="text-warning fw-bolder my-2">Upload only the following types (JPEG, JPG, PNG)</div>
              }
            </Col>
            <Col lg={6}>
            <Form>
                <Form.Control value={projectDetails.title} onChange={e=>setProjectDetails({...projectDetails, title:e.target.value})} className="mb-3" controlId="formTitle" type="text" placeholder="Project Title" /> 
                <Form.Control value={projectDetails.languages} onChange={e=>setProjectDetails({...projectDetails, languages:e.target.value})} className="mb-3" controlId="formLanguage" type="text" placeholder="Languages used in project" /> 
                <Form.Control value={projectDetails.overview} onChange={e=>setProjectDetails({...projectDetails, overview:e.target.value})} className="mb-3" controlId="formOverview" type="text" placeholder="Project Overview" /> 
                <Form.Control value={projectDetails.github} onChange={e=>setProjectDetails({...projectDetails, github:e.target.value})} className="mb-3" controlId="formGithubLink" type="text" placeholder="Github Link" /> 
                <Form.Control value={projectDetails.website} onChange={e=>setProjectDetails({...projectDetails, website:e.target.value})} className="mb-3" controlId="formWebsiteLink" type="text" placeholder="Website Link" /> 

              {/* <Button variant="primary" type="submit">
                Submit
              </Button> */}
            </Form>
            </Col>
          </Row>
            
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleAddProject} variant="primary">Add</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Add