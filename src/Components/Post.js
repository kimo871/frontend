import Alert from '@mui/material/Alert';
import "../Styling/Nav.css"
import "../Styling/Footer.css"
import "../Styling/Jobs.css"
import "../Styling/Profile.css"
import "../Styling/post.css"
import Navbar from "./Navbar"
import Footer from './Footer'
import {useEffect,useRef,useState} from 'react'
import {useCookies } from 'react-cookie'
import {useNavigate} from 'react-router-dom'
import {useSelector , useDispatch} from 'react-redux'
import {logger , Clear ,fetch_categories , fetch_job_titles , fetch_countries , fetch_cities, Success_Handler, Error_Handler} from '../redux/actions'
import Option from './Option'
function Post({cookies , setCookie , removeCookie}){

    
    let navigate = useNavigate()
    let obj = useSelector((state)=> state)
    let dispatch= useDispatch();
    let val = useRef();
    let [category,setCategory] = useState("none")
    let [country , setCountry]= useState("none")

    useEffect(()=>{
       if(!cookies.email || !cookies["access_token"] || !cookies["refresh_token"] || !cookies["user_id"])navigate("/auth/SignIn")
       else{
        console.log(obj)
        dispatch(logger("http://localhost:8000/role/jobs/post",navigate))
        dispatch(fetch_job_titles())
        dispatch(fetch_categories())
        dispatch(fetch_countries())
       } 
       return ()=>{
        dispatch(Clear())
       }
    },[cookies])

    let dispatch_by_country = (country)=>{
        dispatch(fetch_cities(country))
     }

    const formHandler= function (e){
        e.preventDefault();
        let form = new FormData(val.current)
  
        let object={};
        console.log(form)
  
        for(let entry of form){
            if(entry[0]=="Country" || entry[0]=="City" || entry[0]=="Title" || entry[0]=="Category")object[entry[0]]=obj[entry[0]].get(entry[1])._id
            else object[entry[0]]=entry[1]
        }
        object["No_Vacancies"]=parseInt(object["No_Vacancies"])
        object["Company"]=cookies["user_id"]
        console.log(object)

        fetch("http://localhost:8000/role/jobs/post",{method:"POST",credentials:"include",headers:{"Content-Type":"application/json"},body:JSON.stringify(object)}).then(res=>{
            if(res.status==200){
                dispatch(Success_Handler(["Job Posted !"]))
            }
            else{
                dispatch(Error_Handler(["Error Try Again"]))
            }
        })
  
        //custom validation 
  
       
      }

      let CountryHandler = (e)=> {
        setCountry(e.target.selectedOptions[0].value)
        }

    return(
    <div className="parent">


        {obj.user.logged &&  (<>
         
            <Navbar logged={true} cookies={cookies} removeCookie={removeCookie} setCookie={setCookie} Role="Company" />
         <div className="Content-Jobs">
         {obj.user.error && obj.user.error.map((item)=>{return <Alert variant="filled" severity="error">{item}</Alert>})}
           {obj.user.success && obj.user.success.map((item)=>{return <Alert variant="filled" severity="success">{item}</Alert>})}
           <br/>
         <div class="content-post">
                   <h3>Post Job Applicaton</h3>
                   <form  onSubmit={formHandler} ref={val} class="Form-Signup" method="POST">

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
            

            
            <label>Select Job </label>
            <select name="Title">
            <option value="none">none</option>
            {obj.Title.size > 0 && category!=="none" &&(
                    Array.from(obj.Title).map((item)=>  item[1].Category == category ? <option key={item[1]._id} value={item[0]} >{item[0]}</option>: <></>)
                )}

              {obj.Title.size > 0 && category=="none" &&(
                    Array.from(obj.Title).map((item)=>  <option key={item[1]._ID} value={item[0]}>{item[0]}</option>)
                 )}
            </select>
                
                
                <label >Job Description</label>
                <textarea minLength="250" maxLength="350" name="Description" required placeholder="Enter Job Description"/>

                <label>Job Requirements</label>
                <textarea minLength="150" maxlength="200" name="Requirements" placeholder="Enter Job Requirements"/>

                <label>Number of Vacancies</label>
                <input name="No_Vacancies" type="number" min="1"  placeholder="Enter Job Requirements"/>

                <label>Choose Job Type</label>
                <select name="Type">
                    <option value="Internship">Internship</option>
                    <option selected  value="Full_Time">Full_Time</option>
                    <option value="Part_Time">Part_Time</option>
                </select>
 
                
            <label>Select Country </label>
            <select name="Country" onInput={CountryHandler} >
            <option value="none">none</option>
            

              {obj.Country.size > 0 &&(
                    Array.from(obj.Country).map((item)=> <Option key2={item[1]._id} value={item[0]} selected={country == item[0] ? true : false} updateValue={dispatch_by_country}/> )
                 )}
            </select>
           

            
            <label>Select City </label>
            <select name="City" >
            <option value="none">none</option>

              {obj.City.size > 0 && country!="none" &&(
                    Array.from(obj.City).map((item)=>  <option key={item[1]._id} value={item[0]}>{item[0]}</option>)
                 )}
            </select>
                <br/>
                <input type="submit" value="Post" />
                   </form>
               </div>
         </div>
        <Footer/>
       
        </>

        )}
       
    </div>
    )
}

export default Post;