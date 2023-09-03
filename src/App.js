import logo from './logo.svg';
import './App.css';
import {useEffect} from 'react'
import { BrowserRouter , Routes , Route } from 'react-router-dom';
import Login from './Components/Login'
import SignUp from './Components/Signup'
import Profile from './Components/Profile'
import Jobs from './Components/Jobs'
import Post from './Components/Post'
import JobDetails from "./Components/jobDetails"
import Apply from './Components/Apply'
import MyJobs from './Components/MyJobs'
import Applications from './Components/Applications'
import {useCookies} from 'react-cookie'

function App() {

  let [cookies , setCookie , removeCookie] = useCookies(["email"]);

  useEffect(()=>{
  console.log("BR")
  setCookie("email","",{ sameSite: 'none', secure: true , domain:"codsoft-1.onrender.com" })
  },[])



  return (<>
  {console.log(cookies)}
    <BrowserRouter>
     <Routes>
       <Route path="/"  default element={<Jobs cookies={cookies} removeCookie={removeCookie}  setCookie={setCookie}/>}/>
       <Route path="/auth" >
        <Route  path="SignIn" element={<Login cookies={cookies}/>}/>
        <Route path="SignUp" element={<SignUp/>}/>
       </Route>
       <Route exact path="Profile" element={<Profile cookies={cookies} removeCookie={removeCookie}  setCookie={setCookie}/>}/>
       <Route path="/jobs" >
        <Route path="create"  element={<Post cookies={cookies} removeCookie={removeCookie}  setCookie={setCookie} />}/>
       </Route>
       <Route path="/job" >

        <Route path=":id" element={<JobDetails/>}/>
        <Route path="apply/:id" element={<Apply cookies={cookies} removeCookie={removeCookie}  setCookie={setCookie}/>}/>

       </Route>

       <Route path="/MyJobs" >
        <Route path="" element={<MyJobs cookies={cookies} removeCookie={removeCookie}  setCookie={setCookie}/>}/>
        <Route path="Applications/:id" element={<Applications cookies={cookies} removeCookie={removeCookie}  setCookie={setCookie}/>}/>
       </Route>


      

     </Routes>
    </BrowserRouter>

    </>
  
    
  );
}

export default App;
