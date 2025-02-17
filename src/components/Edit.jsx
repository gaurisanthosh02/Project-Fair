import { useContext, useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap"
import SERVER_URL from "../services/serverURL";
import { updateProjectAPI } from "../services/allAPI";
import { editProjectResponseContext } from "../contexts/ContextAPI";
// import React from 'react'

const Edit = ({project}) => {

  const {editProjectResponse, setEditProjectResponse} = useContext(editProjectResponseContext)
  const [preview, setPreview] = useState("")
  const [imageFileStatus, setImageFileStatus] = useState(false)

  const [projectDetails, setProjectDetails]= useState({
    id:project._id, title:project.title, languages:project.languages, overview:project.overview, github:project.github, website:project.website, projectImg:""
  })

  console.log(projectDetails);

  const [show, setShow] = useState(false);

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
  
    const handleClose = () => {
      setShow(false);
      setProjectDetails({
        id:project._id, title:project.title, languages:project.languages, overview:project.overview, github:project.github, website:project.website, projectImg:""
      })
    }
    const handleShow = () => setShow(true);

    const handleUpdateProject = async () => {
      const {id, title, languages, overview, github, website, projectImg} = projectDetails
      if(title && languages && overview && github && website){
        const reqBody = new FormData()
        reqBody.append("title",title),
        reqBody.append("languages",languages),
        reqBody.append("overview",overview),
        reqBody.append("github",github),
        reqBody.append("website",website),
        preview ? reqBody.append("projectImg", projectImg) : reqBody.append("projectImg", project.projectImg)
        const token = sessionStorage.getItem("token")
        if(token){ 
          const reqHeaders = {
            "Content-Type":"multipart/form-data",
            "Authorization":`Bearer ${token}`
          }

          //api call
          try{
            const result = await updateProjectAPI(id, reqBody, reqHeaders)
            if(result.status == 200){
              alert("Project Updated Successfully")
              handleClose()
              setEditProjectResponse(result)
            }
          }catch(err){
            console.log(err);
            
          }
        }
      }else{
        alert("Please fill the form completely!!!")
      }
    }

  return (
    <>
    
    <button onClick={handleShow} className='btn'><i className="fa-regular fa-pen-to-square"></i></button>

    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>New Project Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col lg={6}>
            <label>
              <input onChange={e=>setProjectDetails({...projectDetails, projectImg:e.target.files[0]})} type="file" style={{display:'none'}}/>
              <img height={'200px'} className="img-fluid" src={preview?preview: `${SERVER_URL}/uploads/${project.projectImg}`} alt="" />
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
        <Button onClick={handleUpdateProject} variant="primary">Update</Button>
      </Modal.Footer>
    </Modal>
    
    </>
  )
}

export default Edit