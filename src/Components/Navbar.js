import {useEffect} from 'react'
import {useSelector , useDispatch} from 'react-redux'
import {useState} from 'react'
import {FETCH_AUTHORIZE_SUCCESS, Fetch_Request, LOGOUT  } from  '../redux/actions'
import {Link} from 'react-router-dom'
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';


function Navbar({logged , cookies , removeCookie , setCookie , Role}){
    let user = useSelector((state)=> state.user)
    let [show,setShow]  = useState(false)
    let dispatch = useDispatch()


    let Logout = ()=>{
      console.log(cookies)
      if(cookies){
           setCookie("email","",{path:"/"});
           setCookie("user_id","",{path:"/"});
           setCookie("access_token","",{path:"/"});
           setCookie("refresh_token","",{path:"/"});
          dispatch(LOGOUT())
        }
        }

       
    return (
        <div className="Wrapper">
        <nav className="nav bg-light">
          <div className="nav-wrapper">
            <div className="logo-section">
              <div className="img-wrapper"><h2 style={{fontSize:"25px"}} className="Logo">JOBFINDER</h2></div>
            </div>

            <div className="rest-section">
            {!logged && (<>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/auth/SignIn">Login</Link></li>
                <li><Link to="/auth/SignUp">SignUp</Link></li>
                </>
            )}

            

              
              <div className="mob-div">
            
             <li onClick={(e)=>setShow(!show)}><FormatAlignJustifyIcon></FormatAlignJustifyIcon></li>
              </div>

              {logged && (<>
      
                <span>Welcome&nbsp;{user.data.Name}</span>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/Profile">Profile</Link></li>
                {Role=="Company" &&(<>
                  <li ><Link to="/jobs/create">PostJob</Link></li>
                  <li ><Link to="/MyJobs/">MyJobs</Link></li>
                  </>
                )}

             
                <li onClick={Logout}>Logout</li>
                </>
                )}
            </div>
            </div>

            <div className="nav-mob">
            {logged && show && (<>
              <span>Welcome&nbsp;{user.data.Name}</span>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/Profile">Profile</Link></li>
                {Role=="Company" &&(<>
                  <li ><Link to="/jobs/create">PostJob</Link></li>
                  <li ><Link to="/MyJobs/">MyJobs</Link></li>
                  <li onClick={Logout}>Logout</li>
                  </>)}
            </>
            )}

            {!logged && show &&  (<>
              <li><Link to="/">Home</Link></li>
                <li><Link to="/auth/SignIn">Login</Link></li>
                <li><Link to="/auth/SignUp">SignUp</Link></li>
            </>)}
            
            </div>
            
        </nav>
        
      </div>
    )
}


export default Navbar