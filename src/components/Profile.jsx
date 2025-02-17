import { useEffect, useState } from "react";
import { Collapse } from "react-bootstrap"
import profileImg from '../assets/profile.png'
import SERVER_URL from "../services/serverURL";
import { updateUserProfileAPI } from "../services/allAPI";
// import React from 'react'

const Profile = () => {

  const [userDetails, setUserDetails] = useState({
    username:'', email:'', password:'', github:"", linkedin:"", profilePic:""
  })
  const [preview, setPreview] = useState("")
  const [existingProfileImg, setExistingProfileImg] = useState("")

  const [open, setOpen] = useState(false);

  useEffect(()=>{
    if(sessionStorage.getItem("user")){
      const user = JSON.parse(sessionStorage.getItem('user'))
      setUserDetails({...userDetails, username:user.username, email:user.email, password:user.password, github:user.github, linkedin:user.linkedin})
      setExistingProfileImg(user.profilePic)
    }
  },[open])

  useEffect(() => {
    if(userDetails.profilePic){
      setPreview(URL.createObjectURL(userDetails.profilePic))
    }else{
      setPreview()
    }
  },[userDetails.profilePic])

  const handleEditProfile = async () =>{
    const {username, email, password, github, linkedin, profilePic} = userDetails
    if(linkedin && github){
      const reqBody = new FormData()
      reqBody.append("username",username)
      reqBody.append("email",email)
      reqBody.append("password",password)
      reqBody.append("github",github)
      reqBody.append("linkedin",linkedin)
      preview ? reqBody.append("profilePic",profilePic) : reqBody.append("profilePic",existingProfileImg)

      const token = sessionStorage.getItem("token")
      if(token){

        const reqHeaders = {
          "Content-Type":"multipart/form-data",
          "Authorization":`Bearer ${token}`
        }

        try {
          const result = await updateUserProfileAPI(reqBody, reqHeaders)
          if(result.status == 200){
            alert("user profile updated successfully")
            sessionStorage.setItem("user", JSON.stringify(result.data))
            setOpen(!open)
          }else{
            console.log(result);
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
      <div className="d-flex justify-content-evenly">
        <h3 className="text-warning">Profile</h3>
        <button onClick={() => setOpen(!open)}
         className="btn text-warning"><i className="fa-solid fa-angle-down"></i></button>
      </div>

      <Collapse in={open}>
        <div id="example-collapse-text" className="row container-fluid shadow p-2 rounded">
          <label className="text-center">
            <input onChange={e => setUserDetails({...userDetails, profilePic:e.target.files[0]})} type="file" style={{display:'none'}}/>
            {
              existingProfileImg=="" ?
                <img height={'200px'} src={preview ? preview : profileImg} alt="" className="rounded-circle" />
              :
              <img height={'200px'} src={preview ? preview : `${SERVER_URL}/uploads/${existingProfileImg}`} alt="" className="rounded-circle" />
            }
          </label>
          <div className="mb-2 w-100">
            <input value={userDetails.github} onChange={e => setUserDetails({...userDetails, github:e.target.value})} type="text" placeholder="Github Link" className="form-control"/>
          </div>
          <div className="mb-2 w-100">
            <input value={userDetails.linkedin} onChange={e=> setUserDetails({...userDetails, linkedin:e.target.value})} type="text" placeholder="Linkedin Link" className="form-control"/>
          </div>
          <div className="grid text-center">
            <button onClick={handleEditProfile} type="text" className="btn btn-warning">Update Profile</button>
          </div>
        </div>
      </Collapse>
    </>
  )
}

export default Profile