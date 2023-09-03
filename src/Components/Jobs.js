import { useEffect , useState } from "react";
import Alert from '@mui/material/Alert';
import "../Styling/Nav.css"
import "../Styling/Footer.css"
import "../Styling/Jobs.css"
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Navbar from './Navbar'
import Footer from './Footer'
import Option from './Option'
import {useNavigate} from 'react-router-dom'
import {useSelector , useDispatch} from 'react-redux'
import PaginationControlled  from "./pagination";
import { Fetch_Request, fetch_jobs_request ,fetch_categories, fetch_jobs , fetch_job_titles , fetch_countries , logger, fetch_cities , Clear} from "../redux/actions";
import { NestCamWiredStandTwoTone } from "@mui/icons-material";
function Jobs ({setCookie,cookies}){
    let [category,setCategory] = useState("none")
    let [country , setCountry]= useState("none")
    const [page, setPage] = useState(1);
    let [searchData , setData] = useState({Country:"none",City:"none",Category:"none",Title:"none"})
    let obj = useSelector((state)=> state)
    let dispatch = useDispatch();
    let navigate = useNavigate()
    useEffect(()=>{
      dispatch(Clear())
       dispatch(Fetch_Request())
       dispatch(logger("http://localhost:8000/auth/login"))
       dispatch(fetch_categories())
       dispatch(fetch_job_titles())
       dispatch(fetch_countries())
       dispatch(fetch_jobs(1))
       console.log(obj)
       
    },[cookies])

    

    

    let CountryHandler = (e)=> {
      setCountry(e.target.selectedOptions[0].value)
      }

    let dispatch_by_country = (country)=>{
       dispatch(fetch_cities(country))
    }

    let handleSearch = (e)=>{
      e.preventDefault();
      let data = new FormData(e.target);
      let formData={};
      for(let entry of data){let data1 = (obj[entry[0]].get(entry[1]))
      if(data1)formData[entry[0]]=data1._id
      else formData[entry[0]] = entry[1]
      }
      
      dispatch(fetch_jobs(1,formData))
      setData(formData)
      setPage(1)
      console.log(formData)
    }


return(
    <div className="parent">
    
    <Navbar logged={(obj.user.logged)} setCookie={setCookie} Role={obj.user.data ? obj.user.data.Role : ""} cookies={cookies}/>
    {obj.user.error && obj.user.error.map((item)=>{return <Alert variant="filled" severity="error">{item}</Alert>})}
    <div className="Content-Jobs">
     <div class="wrapper-flex ">
      <div style={{flexFlow:'column nowrap',lineHeight:2,padding:'30px',justifyContent:'center'}}className="col-6 d-flex  align-center xs-col12">
         <h1 style={{fontSize:'40px'}}>Welcome To Job Opportunities , Search For Yours now !</h1>
         <h4 style={{color:'rgb(0 0 0 / 53%)'}}>In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without
          relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.</h4>
          <form onSubmit={handleSearch} class="form-jobs" method="POST">
            <div>
            <label>Select Category</label>
            <select  name="Category" onInput={(e)=> {if(e.target.selectedIndex==0){

                  setCategory(e.target.selectedOptions[0].value)
                }
                  else setCategory(e.target.selectedOptions[0].value)
                  }} >
            <option  value="none">none</option>
                {obj.Category.size > 0 &&(
                   Array.from(obj.Category).map((item)=> <Option key2={item[1]._id} value={item[0]} selected={category == item[0] ? true : false}  updateValue={setCategory}/>)
                )}
            </select>
            </div>

            <div>
            <label>Select Job </label>
            <select name="Title">
            <option value="none">none</option>
            {obj.Title.size > 0 && category!=="none" &&(
                    Array.from(obj.Title).map((item)=>  item[1].Category == category ? <option key={item[1]._id} value={item[0]} >{item[0]}</option>: <></>)
                )}

              {obj.Title.size > 0 && category=="none" &&(
                    Array.from(obj.Title).map((item)=>  <option key={item[1]._id} value={item[0]}>{item[0]}</option>)
                 )}
            </select>
            </div>


            <div>
            <label>Select Country </label>
            <select name="Country" onInput={CountryHandler} >
            <option value="none">none</option>
            

              {obj.Country.size > 0 &&(
                    Array.from(obj.Country).map((item)=> <Option key2={item[1]._id} value={item[0]} selected={country == item[0] ? true : false} updateValue={dispatch_by_country}/> )
                 )}
            </select>
            </div>

            <div>
            <label>Select City </label>
            <select name="City" >
            <option value="none">none</option>

              {obj.City.size > 0 && country!="none" &&(
                    Array.from(obj.City).map((item)=>  <option key={item[1]._id} value={item[0]}>{item[0]}</option>)
                 )}
            </select>
            </div>

                <div>
                <input  type="submit" value="search"/>
                </div>
            
          </form>
      </div>

      <div className="col-6 img-content">
        <div className="img-wrapper">
        <img src="/search.png"/>
        </div>
      </div>

      </div>
      
      <div className="jobs">
         {obj.Jobs.loading &&(
          <Box sx={{ display: 'flex',justifyContent:'center',alignItems:'center' }}>
          <CircularProgress />
        </Box>
         )
           }

           {obj.Jobs.data.length > 0 && (<>
           <h3>Explore Opportunities</h3>
            {obj.Jobs.data.map((item)=>{
              let diff = parseInt(new Date(new Date().getTime()-new Date(item.PostedAt).getTime()).getTime()/1000);
              let dt;
              if(diff >= 60 && diff < 3600 ){dt=parseInt(diff/60)+" minutes ago"}
              else if(diff >= 3600 && diff < 86400 ){dt=parseInt(diff/(60*60))+" hours ago"}
              else if(diff >=86400){dt=parseInt(diff/(60*60*24))+" days ago"}
              else dt=(diff)+ " seconds ago"
              return(
              <div onClick={(e)=> navigate(`/job/${item._id}`)}className="job">
                <div class="col-6-">
                <h3>{item.Title.Title} </h3> <span>{item.Type}</span>
                
                <h4>{item.Company.Name} - {item.Country.Name} , {item.City.Name}</h4>
                <p>Posted :{dt} </p>
                </div>
                <div className="col-6-">
                <div className="img-container">
                  <img src={item.Company.Image} alt="image"/>
                </div>
                </div>
                
              </div>)
            })}
            </>
           )}
<center>
  <br/>
 <PaginationControlled data={searchData} page={page} setPage={setPage}></PaginationControlled>

    </center>



      </div>
    
    </div>
    <Footer/>
    </div>
)

}

export default Jobs;