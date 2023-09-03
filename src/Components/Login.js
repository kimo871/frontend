import { useEffect } from "react";
import Alert from '@mui/material/Alert';
import "../Styling/Nav.css"
import "../Styling/Footer.css"
import "../Styling/Login.css"
import { useDispatch , useSelector } from "react-redux";
import {useRef , useState} from 'react'
import { useNavigate } from "react-router-dom";
import Footer from './Footer'
import Navbar from './Navbar'
import {Fetch_Login , Clear} from "../redux/actions"

function Login({cookies,setCookie}){


  let obj= useSelector( (state)=> state)

   useEffect(()=>{
     if(!cookies){console.log("f")}
     return ()=>{
      dispatch(Clear())
     }
   },[cookies])

  const navigate = useNavigate()

  const dispatch = useDispatch()

    const val = useRef();

     const formHandler= function (e){
      e.preventDefault();
      let form = new FormData(val.current)

      let obj={};

      for(let entry of form){obj[entry[0]]=entry[1]}

      //custom validation 

      // submit data
      dispatch(Fetch_Login(obj.email,obj.password,navigate))

      
    }
    return (<div className="parent">
            {obj.user.logged && navigate("/Profile")}
             
             <Navbar logged={obj.user.logged} setCookie={setCookie} Role={obj.user ? obj.user.data.Role : null} cookies={cookies}/>

            <div className="Content-Login">
              
             

             {obj.user.error && obj.user.error.map((item)=>{return <Alert variant="filled" severity="error">{item}</Alert>})}
            
             
          

            {obj.user.data && Object.keys(obj.user.data).length>0 &&(
             <Alert variant="filled" severity="success">
              Valid
             </Alert>
            )}

            <br/>
        
         <div className="form-wrapper-login">
            <form className="Form-Login" ref={val} onSubmit={formHandler} method="POST" >
                <h3>Welcome Back , Folk  !</h3><br/>
                <label >Email</label>
                <input name="email" type="text" placeholder="Enter Your Email....."/>
                <label>Password</label>
                <input name="password" type="password" placeholder="Enter Your Password"/>
                <label><a style={{color:'black'}} href="https://www.google.com">Forgot Password?</a></label>
                <input type="submit" value="SignIn"/>
            </form>
         </div>
      </div>

             
     

      <Footer/>
      

             

      </div>
    )
}


export default Login;