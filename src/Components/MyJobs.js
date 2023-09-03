import Navbar from './Navbar'
import {useEffect} from 'react'
import Footer from './Footer'
import {useSelector , useDispatch} from 'react-redux'
import {useNavigate } from 'react-router-dom'
import {fetch_my_jobs, logger , Clear , Fetch_Request} from '../redux/actions'
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

function MyJobs ({cookies , setCookie , removeCookie}){

    let obj = useSelector((state)=> state)
    let dispatch = useDispatch();
    let navigate = useNavigate()

    useEffect(()=>{
      if(!cookies["email"]  || !cookies["access_token"] || !cookies["refresh_token"] || !cookies["user_id"])navigate("/auth/SignIn")
      else{
      dispatch(logger("https://codsoft-1.onrender.com/role/MyJobs",navigate))
      dispatch(fetch_my_jobs(cookies["user_id"]))
      return ()=>{
        dispatch(Clear())
      }
      }
      },[cookies])

   /* useEffect(()=>{
         dispatch(logger("http://localhost:8000/role/MyJobs"))
         if(!obj.user.logged){alert("Not Authorized"); navigate("/jobs/search")}
         console.log(cookies["user_id"])
        dispatch(fetch_my_jobs(cookies[undefined]))

        return ()=>{
          dispatch(Clear())
         }

         
         
      },[])

      */

return (
        <div className="parent">
        
        <Navbar logged={obj.user.logged} setCookie={setCookie} Role={obj.user ? obj.user.data.Role : null} cookies={cookies}/>
        
        {obj.user.error && obj.user.error.map((item)=>{
      return (
         <Stack sx={{ width: '100%' }} spacing={5}>
         <Alert  variant="filled" severity="error">{item}</Alert>
       </Stack>
      )
         })}

        <div className="Content-Jobs">

        <div className="jobs">
         <h3>My Jobs</h3>
        
              {obj.Jobs.data.map((item,index)=> {return (
                <div className="job">
                <div class="col-6-">
                <h3>{item.Title.Title}</h3> <span>{item.Type}</span>
                
                <h4>{item.Company.Name} - {item.Country.Name} , {item.City.Name}</h4>
                <p>{item.Description}</p>
                <p>Posted At  : {item.PostedAt}</p>
                <button onClick={(e)=>navigate(`/MyJobs/Applications/${item._id}`)}>View Applications</button>
                </div>
                <div className="col-6-">
                <div className="img-container">
                  <img   src={item.Company.Image}alt="image"/>
                </div>
                </div>
                
              </div>
              )})}



             
        </div>

        </div>
        <Footer/>
        </div>
  )
}

export default MyJobs;