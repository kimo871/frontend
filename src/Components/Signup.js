import { useEffect } from "react";
import Alert from '@mui/material/Alert';
import "../Styling/Nav.css"
import "../Styling/Footer.css"
import "../Styling/Signup.css"
import { useDispatch , useSelector } from "react-redux";

import {useRef , useState} from 'react'

import Navbar from './Navbar'

import {Fetch_Signup , convertToBase64 , Error_Handler , validatePhoneNumber , validateEmail , validatePassword , Clear} from "../redux/actions"




function SignUp(){


  let user = useSelector( (state)=> state.user)

  const dispatch = useDispatch()

  useEffect(()=>{
    return ()=>{
     dispatch(Clear())
    }
   },[])

    const val = useRef();
    const val2 = useRef();

    const ValidateByEntry = async (obj,entry1,entry2,error)=>{
      switch(entry1){
        case 'Phone':
          if(validatePhoneNumber(entry2)) obj[entry1]=entry2
          else error.push("Invalid Phone Number !")
          break;

        case 'Image':
         if((entry2.size)/1000 > 700)error.push("File Too Large !")

         else{

           try{
             const dataurl = await convertToBase64(entry2,"image")
             obj[entry1]=dataurl;
           }
           catch(err){
             error.push(err)
           }

          }

          break;

        case 'DOB':
          if (new Date().getFullYear()-new Date(entry2).getFullYear() >= 18)obj[entry1]=entry2;
          else error.push(" User Must Be 18 or Older ! ")
          break;

        case 'Password':
          if(validatePassword(entry2)) obj[entry1]=entry2
          else error.push("Invalid Password !");
          break;

        case 'Email':
          if(validateEmail(entry2)) obj[entry1]=entry2
          else error.push("Invalid Email Format !")
 
        default:
          obj[entry1]=entry2;
          break;
      }
    }

    

     const formHandler= async function (e){
      e.preventDefault();
      let form = new FormData(val.current)

      let obj={};
      let error=[];

      for(let entry of form){
   
        await ValidateByEntry(obj,entry[0],entry[1],error)

      }

      console.log(obj)
 
    obj['Type'] = val2.current.selectedOptions[0].value;
    console.log(error)
    
    if(!error.length) dispatch(Fetch_Signup(obj))
    else dispatch(Error_Handler(error))
     }

      
    

   

     
    return (<div className="parent">
             
             <Navbar logged={false}/>

            <div className="Content-Signup">
              

              <div className="col-6">
              <div className="form-wrapper-signup">
            <form className="Form-Signup" ref={val} onSubmit={formHandler} method="POST" >
                <h3>Welcome Back , Folk  !</h3><br/>

            {user.error.length>0 && user.error.map((item)=>{return <Alert variant="filled" severity="error">{item}</Alert>
            
            })  }
            

              {Object.keys(user.data).length>0 &&(
               <Alert variant="filled" severity="success">
                Valid
               </Alert>
              )}

              
              


                <label >Full Name</label>
                <input required name="Name" type="text" placeholder="Enter Your First Name....."/>
                
                <label >Email</label>
                <input required name="Email" type="text" placeholder="Enter Your Email....."/>
                <label>Password</label>
                <input required name="Password" type="password" placeholder="Enter Your Password"/>
                <label >Phone</label>
                <input required name="Phone" type="number" placeholder="Enter Your Phone Number....."/>
                <label>Date Of Birth</label>
                <input required name="DOB" type="date"/>
                <label>Choose Account Type</label>
                <select ref={val2}>
                    <option value="Company">Company</option>
                    <option value="Employee">Employee</option>
                </select>
                <label>Upload Profile Photo</label>
                <input type="file" name="Image" accept="image/*" required/>
                <br/>
                <input type="submit" value="SignUp"/>
            </form>
         </div>
              </div>

              <div className="col-6">
                 <div className="content">
                 <div className="back-wrapper"></div>
                    <div className="f">
                   <h1 style={{'fontSize':"40px",'marginBottom':"30px"}}>Sign up and be a part of <br/> the movement for change!</h1>
                    </div>
               </div>
              </div>
            </div>
     
      </div>
    )
}



export default SignUp ;