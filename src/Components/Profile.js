
import Alert from '@mui/material/Alert';
import "../Styling/Nav.css"
import "../Styling/Footer.css"
import "../Styling/Profile.css"
import { useDispatch , useSelector } from "react-redux";
import {useRef , useState , useEffect} from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Footer from './Footer'
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {Fetch_Request  ,logger , Error_Handler , Clear, Change_data , validatePhoneNumber , validateEmail } from '../redux/actions'

import EmailIcon from '@mui/icons-material/Email';

function Profile({cookies , setCookie , removeCookie}){

  let obj = useSelector( (state)=> state)

  const dispatch = useDispatch()

  let navigate = useNavigate()

  useEffect(()=>{
    if(!cookies["email"]  || !cookies["access_token"] || !cookies["refresh_token"] || !cookies["user_id"])navigate("/auth/SignIn")
    else{
    dispatch(logger("https://codsoft-1.onrender.com/auth/login"))
    }
    },[cookies])

    let handleData =  async (e)=>{
      e.preventDefault();
      dispatch(Clear())
      let formData={};
      let form = new FormData(e.target)
      let error = [];
      
      for(let entry of form){
        ValidateEntry(form,entry[0],entry[1],error)
      }
         if(!error){
          dispatch(Change_data(formData))
         }
         else{
          dispatch(Error_Handler(error))
         }
  
        console.log(formData)
}

    

    let  ValidateEntry = async (form,entry1,entry2,error)=>{
      switch(entry1){
        

        case "Phone" :
          if(entry2 && !validatePhoneNumber(entry2)){error.push("Phone Number Not Valid !");}
          else form[entry1]=entry2;
          break;

        case "Name":
          if(entry2)form[entry1]=entry2;
          break;

        case "Email":
          if(entry2 && validateEmail(entry2)) form[entry1]=entry2
          else error.push("Invalid Phone Number !")
          form[entry1]=entry2;
          break;

        default :
         break;
        }
    }
   
     

    return (<>
    
       


    <div className="parent">
        
   
         {obj.user.loading &&(
            <Box sx={{ display: 'flex',justifyContent:'center',alignItems:'center' }}>
            <CircularProgress />
          </Box>
         )}

         {obj.user.logged &&(<>
           <Navbar logged={obj.user.logged} cookies={cookies} removeCookie={removeCookie} Role={obj.user.data.Role} setCookie={setCookie} />

            

           <div className="Content-Profile">
           {obj.user.error && obj.user.error.map((item)=>{return <Alert variant="filled" severity="error">{item}</Alert>})}
           {obj.user.success && obj.user.success.map((item)=>{return <Alert variant="filled" severity="success">{item}</Alert>})}
             <div className="Profile-Basic">
              <div className="basic-flex">
               <div class="img-container">
                   <img src={obj.user.data.Image}/>
               </div>
               <div>
                   <h2>{obj.user.data.Name.split(" ").map((item)=> item[0].toUpperCase()+item.slice(1)+" ")}</h2>
                   <h3>{obj.user.data.Role} Account</h3>
                   <span style={{color:"#0000008f"}}>Member Since {obj.user.data. CreatedAt}</span>
               </div>
               </div>
               <div class="contact-info">
                   <h3>Contact Info :</h3>
                   <h4>Email : <span>{obj.user.data.Email}</span></h4>
                    <h4>Phone : <span>{obj.user.data.Phone}</span></h4>
                    <h4>DateOfBirth : <span>{obj.user.data.DateOfBirth}</span></h4>
               </div>
              </div>

              <div class="Edit-Container">
               <form onSubmit ={handleData} class="form-profile" method="POST">
                   <label>Full Name</label>
                   <input type="text" name="Name" placeholder={obj.user.data.Name} />
                   <label>Email</label>
                   <input type="text" name="Email" placeholder={obj.user.data.Email}/>
                   <label>Phone</label>
                   <input type="number" name="Phone" placeholder={obj.user.data.Phone}/>
                   <br/>
                   <input type="submit" value="Save"/>
               </form>
              </div>

          
 
            <br/>

           
       
        
     </div>
    

     <Footer/>
     </>
         )}
             
        

      </div>
     

    
    </>
    )
    
}


export default Profile;