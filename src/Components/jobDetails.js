import {useParams , useNavigate} from 'react-router-dom'
import {useEffect} from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import {useSelector , useDispatch} from 'react-redux'
import { Fetch_Request, fetch_categories, fetch_job , fetch_job_titles , fetch_countries , logger, fetch_cities } from "../redux/actions";
import 'tailwindcss/tailwind.css'
function JobDetails({cookies , setCookie , removeCookie}){
    let obj = useSelector((state)=> state)
    let dispatch = useDispatch();
    let navigate = useNavigate()
    const {id}=useParams();
    useEffect(()=>{
      dispatch(logger("http://localhost:8000/auth/login"))
      dispatch(fetch_job(id))
      console.log(obj) 
    },[])
    

    let check_log = (e,id)=>{
      if(!Object.keys(obj.user.data).length)return navigate("/auth/SignIn")
      return navigate(`/job/apply/`)
    }
    return (<div className="parent">
           
             <Navbar  logged={obj.user.logged} setCookie={setCookie} Role={obj.user ? obj.user.data.Role : null} cookies={cookies}/>
             <div style={{alignItems:"center",gap:"30px"}}className="Content-Jobs  ">
             {obj.Jobs.data.map((item)=>{
              return (
                <>
                <div className="box-shadow ">
            
                <div style={{lineHeight:"2.3"}} className="flex flex-row gap-2  ">
                  <div className="col-6-">
                  <h1 style={{fontSize:"25px"}}>{item.Title.Title}</h1>
                  <span style={{backgroundColor:"black", color:"white",width:"fit-content"}}>{item.Type}</span>
                  <h4>{item.Company.Name} - {item.Country.Name}, {item.City.Name} </h4>
                  <p style={{color:"#00000087;"}}>Posted At : {item.PostedAt}</p>
                  <p style={{color:"#00000087;"}}>{item.Applications.length} Applications</p>
                  </div>
                  <div className="col-6-">
                      <div className="img-container">
                          <img src={item.Company.Image}/>
                      </div>
                  </div>
                  </div>
                  <hr/>
                  <button className="basic" onClick={(e)=>{
                    navigate(`/job/apply/${item._id}`)
                  }}>Apply</button>
                
               </div>

              <div className="box-shadow ">
    
              <div style={{lineHeight:"1.9"}} className="  ">
              <h1 style={{fontWeight:"bold"}}>Job Description</h1>
                  <p style={{padding:"20px"}}>{item.Description}</p>
                  </div>
                 </div>

           <div className="box-shadow ">
    
           <div style={{lineHeight:"1.9"}} className="  ">
           <h1 style={{fontWeight:"bold"}}>Job Requirements</h1>
          <p style={{padding:"20px"}}>{item.Requirements}</p>
        </div>
        </div>
        </>
                  )
                 })}
           
            
            

                
              
             


             </div>
             <Footer/>

           </div>
    )
}

export default JobDetails;