
import Alert from '@mui/material/Alert';
import Navbar from './Navbar'
import {useEffect} from 'react'
import Footer from './Footer'
import {useParams} from 'react-router-dom'
import {useSelector , useDispatch} from 'react-redux'
import {useNavigate } from 'react-router-dom'
import { logger  , Fetch_Request ,fetch_applications ,  Clear, handle_application} from '../redux/actions'
function Applications ({setCookie , cookies}){
  
  let {id} = useParams();
  let dispatch = useDispatch();
  let obj = useSelector(state=>state)
  const navigate = useNavigate()


  useEffect(()=>{
    if(!cookies["email"]  || !cookies["access_token"] || !cookies["refresh_token"] || !cookies["user_id"])navigate("/auth/SignIn")
    else{
    dispatch(logger("http://localhost:8000/role/MyJobs",navigate))
    dispatch(fetch_applications(id))
    return ()=>{
      dispatch(Clear())
    }
    }
    },[cookies])

  const ApplicationHandler = (id,type,obj)=>{
    dispatch(handle_application(id,type,obj))
    dispatch(fetch_applications(id))
  }

  
  return(
    
    <div className="parent">
      {console.log(obj.Applications)}
    <Navbar logged={obj.user.logged} setCookie={setCookie} Role={obj.user ? obj.user.data.Role : null} cookies={cookies}/>
    <div className="Content-Jobs">
    {obj.user.error && obj.user.error.map((item)=>{return <Alert variant="filled" severity="error">{item}</Alert>})}
           {obj.user.success && obj.user.success.map((item)=>{return <Alert variant="filled" severity="success">{item}</Alert>})}
        <br/>
      <div className="jobs">
        {console.log(obj.Jobs.data)}
      <h3>Applications</h3>
      {obj.Applications && obj.Applications.data.map((item)=>{
        {console.log(item)}
        return(
          <div  style={{flexDirection:"column",cursor:"auto"}} className="job">
        
          <div style={{display:"flex",gap:"1.5%"}} class="">
          <div className="">
            <div style={{width:"50px",height:"50px"}} className="img-container">
              <img src={item.Owner.Image}/>
            </div>
          </div>
          <div className="beside-profile ">
          <h3>{item.Owner.Name}</h3>
          <p style={{fontSize:"14px"}}>{item.Owner.Email}</p>
          </div>
          </div>
          <br/>
          <h4>Cover Letter</h4>
          <div className="letter">
          <p style={{padding:"10px"}}>{item.Cover_Letter}</p>
            </div>

            <div className="rest">
              <p style={{textDecoration:"underline"}}><a download href={item.Cv}>Download Cv</a></p>
              <div style={{display:"flex",gap:"2%"}}>
                <button onClick={(e)=> ApplicationHandler(item._id,"Accept",item)} className="basic">Accept</button>
                <button onClic={(e)=> ApplicationHandler(item._id,"Reject",item)} className="basic">Reject</button>
              </div>
            </div>
          
          </div>
        )
      })
          
        
      }
      

              
            
      </div>
    </div>
    <Footer/>
    </div>

  )

}


export default Applications