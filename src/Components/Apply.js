import Navbar from './Navbar'
import Footer from './Footer'
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import {useDispatch , useSelector} from 'react-redux'
import {convertToBase64 , logger , Clear , Error_Handler,post_application} from '../redux/actions'
import { useEffect } from 'react';
import {useParams , useNavigate, Navigate} from 'react-router-dom'
function Apply ({setCookie , cookies}){
   
   const obj = useSelector(state=>state)
   const dispatch = useDispatch()
   const {id}  = useParams();
   const navigate = useNavigate();

   useEffect(()=>{
      console.log(id)
      dispatch(logger("https://codsoft-1.onrender.com/role/Apply",navigate))
      return ()=>{
         dispatch(Clear())
      }
    },[])

   const formHandler = async(e)=>{
      e.preventDefault();
      let form = new FormData(e.target);

      for(let entry of form){
         if(entry[0]=="Cv" && entry[1].size>0){
           try{
            let dataurl = await convertToBase64(entry[1],"pdf");
            form[entry[0]]=dataurl;
           }
           catch(err){
            dispatch(Error_Handler([err]))
           }
         }

        else form[entry[0]]=entry[1];
      }
      if(Object.keys(form).length==2) dispatch(post_application(form,id))

   }

  

return (
   <div className="parent">
   <Navbar  logged={obj.user.logged} setCookie={setCookie} Role={obj.user ? obj.user.data.Role : null} cookies={cookies}/>
   {!obj.user.authorized && (
    navigate("/")
   )}

   {obj.user.authorized &&(
   <>
   <div style={{alignItems:"center",gap:"30px"}}className="Content-Jobs  ">
   <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert  variant="filled" severity="info">Once Your Application is Approved By Company , We will notify you by mail.</Alert>
    </Stack>
   {obj.user.error && obj.user.error.map((item)=>{
      return (
         <Stack sx={{ width: '100%' }} spacing={2}>
         <Alert  variant="filled" severity="error">{item}</Alert>
       </Stack>
      )
   })}
    
    {obj.user.success && obj.user.success.map((item)=>{
      return (
         <Stack sx={{ width: '100%' }} spacing={2}>
         <Alert  variant="filled" severity="success">{item}</Alert>
       </Stack>
      )
   })}

     <div style={{width:"60%",padding:"20px"}} className="box-shadow ">
     <h1 style={{fontSize:"25px"}}>Application Form</h1>
     <form onSubmit={formHandler} class="Form-Signup" method="POST">
        <label>Cover Letter</label>
        <textarea required minlength="100" maxlength="260" name="Cover"/>
        <label>Cv</label>
        <input required type="file" name="Cv"/><br/>
        <input type="submit" value="Apply"/>
     </form>
     </div>
     </div>
   <Footer/>
   </>

   )}

   </div>
   
)

}

export default Apply