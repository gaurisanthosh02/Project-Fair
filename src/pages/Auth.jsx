// import React from 'react'
import { FloatingLabel, Form } from 'react-bootstrap'
import authImg from '../assets/auth.png'
import { Link, useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react'
import { loginAPI, registerAPI } from '../services/allAPI'
import Spinner from 'react-bootstrap/Spinner';
import { tokenAuthContext } from '../contexts/AuthContentAPI.JSX'

const Auth = ({insideRegister}) => {

  const {isAuthorized, setIsAuthorized} = useContext(tokenAuthContext)

  const navigate = useNavigate()

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [inputData, setInputData] = useState({
    username:'', email:'', password:''
  })
  console.log(inputData);

  const handleRegister = async (e) => {
    e.preventDefault();
    console.log("inside handle register");
    if(inputData.password && inputData.email && inputData.username){
      // alert("Make api call")
      try{
        const result = await registerAPI(inputData)
        console.log(result);

        if(result.status == 200){
          alert(`Welcome ${result.data?.username}, Please login to explore our website`)
            navigate('/login')
            setInputData({username:'', email:'', password:''}) 
        }else{
          if(result.response.status === 406){
            alert(result.response.data)
            setInputData({username:'', email:'', password:''}) 
          }
        }
        
      }catch(err){
       console.log(err);
      }

    } else{
      alert("Please fill data")
    }
    
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    if(inputData.email && inputData.password){
      try {
        const result = await loginAPI(inputData)
        if(result.status == 200){
          sessionStorage.setItem("user",JSON.stringify(result.data.user))
          sessionStorage.setItem("token",result.data.token)
          setIsAuthorized(true)
          setIsLoggedIn(true)
          setTimeout(() => {
            setInputData({username:'', email:'', password:''})
            navigate('/')
            setIsLoggedIn(false)
          }, 2000);
        }else{
          if(result.response.status == 404){
            alert(result.response.data)
          }
        }
      } catch (err) {
        console.log(err);
        
      }
    }else{
      alert("Please fill the form")
    }
  }

  return (
    <div className="d-flex justify-content-center align-items-center" style={{minHeight:'100vh', width:'100%'}}>
      <div className="container w-75">
        <div className="shadow card p-2">
          <div className="row align-items-center">
            <div className="col-lg-6 text-center">
              <img width={'400px'} src={authImg} alt="" />
            </div>

            <div className="col-lg-6">
              <h1 className='mt-2'><i className="fa-brands fa-docker"></i>Project Fair</h1>
              <h5 className='mt-2'>Sign {insideRegister? "Up" : "In"} to your account</h5>

              <Form>
                { 
                  insideRegister &&
                    <FloatingLabel className="mb-3" controlId="floatingInputName">Username
                        <Form.Control onChange={e=>setInputData({...inputData, username: e.target.value})} type="text" placeholder="Username" />
                    </FloatingLabel>
                }     
                 <FloatingLabel className="mb-3" controlId="floatingInputEmail">Email address
                    <Form.Control onChange={e=>setInputData({...inputData, email: e.target.value})} type="email" placeholder="Email" />
                  </FloatingLabel>

                  <FloatingLabel className="mb-3" controlId="floatingPassword">Password
                    <Form.Control onChange={e=>setInputData({...inputData, password: e.target.value})} type="password" placeholder="Password" />
                  </FloatingLabel>
                
                  {
                    insideRegister?
                    <div>
                      <button onClick={handleRegister} className='btn btn-primary'>Register</button>
                      <p>Already a User ? Please click here to <Link to={'/login'}>Login</Link></p>
                    </div> 
                    :
                    <div>
                      <button onClick={handleLogin} className='btn btn-primary'>Login
                        { isLoggedIn && <Spinner animation="border" variant="light" />}
                      </button>
                      <p>New User ? Please click here to <Link to={'/register'}>Register</Link></p>
                    </div> 
                  }
                
              </Form>

            </div>

          </div>

        </div>

      </div>
    </div>
  )
}

export default Auth