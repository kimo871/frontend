

const Login_Success_Authorize =  (data)=>{
    return {
        type:"FETCH_LOGIN_SUCCESS_AUTHORIZED",
        payload: data
    }
}

const Login_Success_NotAuthorized = (data)=>{
    return {
        type:'FETCH_LOGIN_SUCCESS_NOTAUTHORIZED',
        payload:data
    }
}


const Login_Failure = (err=[])=>{
    return {
        type:"FETCH_LOGIN_FAILURE",
        payload:err
    }
}

const Fetch_Request = ()=>{
    return {
        type:"FETCH_REQUEST"
    }
}


const Signup_Failure = (err)=>{
    return {
        type:"FETCH_SIGNUP_FAILURE",
        payload:err
    }
}


const Signup_Success = (data)=>{
    return {
        type:"FETCH_SIGNUP_SUCCESS",
        payload:data
    }
}



const Fetch_Login = (email,password,navigate)=>{
    return (dispatch)=>{
        fetch("https://codsoft-1.onrender.com/auth/SignIn",{
            method:"POST",
            credentials:"include",
            headers:{
                "Content-Type":"application/json"
            },
            body : JSON.stringify({email:email,password:password})
        }).then(res => {
            console.log(document.cookie)
          return Promise.all([res.status,res.json()]);
        }).then(([status,res])=>{
            //console.log(status,res)
           if(status==200) {
            dispatch(Login_Success_Authorize(res.user))
         }
           else {dispatch(Login_Failure(res.err)); return false}
        })
    }
}


const Fetch_Signup = ({Name , Email , Phone , Password  , DOB , Type,Image})=>{
    console.log(Email)
    return (dispatch)=>{
        fetch("https://codsoft-1.onrender.com/auth/SignUp",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body : JSON.stringify({Email:Email,Password:Password,Name:Name,Phone:Phone,DOB:DOB,Type:Type,Image:Image})
        }).then(res => {
          return Promise.all([res.status,res.json()]);
        }).then(([status,res])=>{
            console.log(status,res)
           if(status==200) {dispatch(Signup_Success(res.user)); setTimeout(()=>{window.location="/auth/SignIn"},500)}
           else dispatch(Signup_Failure(res.err))
        })
    }
}


const fetch_categories = ()=>{
    return (dispatch)=>{
        fetch("https://codsoft-1.onrender.com/categories").then(res=>res.json()).then((res)=>{const map = new Map(Object.entries(res.categories));  dispatch({
            type:"FETCH_CATEGORIES_ALL",
            payload:map
    })})
    }
}


const fetch_job_titles = (obj)=>{
    return (dispatch)=>{
        fetch(`https://codsoft-1.onrender.com/job-titles/`).then(res=> res.json()).then((res)=> {const map = new Map(Object.entries(res.jobs)); dispatch({
            type:"FETCH_JOBS_ALL",
            payload:map
        })})
    }
}

const fetch_jobs_request = ()=>{
    return {
        type:"FETCH_JOBS"
    }
}

const fetch_jobs = (page_no=1,obj)=>{
    return (dispatch)=>{
        dispatch(fetch_jobs_request())
        fetch(`https://codsoft-1.onrender.com/jobs?page_no=${page_no}&${obj ? 'Country='+obj.Country+ '&City='+ obj.City+'&Title='+obj.Title+'&Category='+obj.Category:'/'  }`).then(res=> res.json()).then((res)=> {
         setTimeout(()=>{
            dispatch({
                type:"GET_JOBS",
                payload:{records:res.jobs,pagination:res.total_no_pages}
            })
         },1000)
         })
    }
}

const fetch_job = (job_id)=>{
  return (dispatch)=>{
    dispatch(fetch_jobs_request());
    fetch(`https://codsoft-1.onrender.com/job/?id=${job_id}`).then((res)=>res.json()).then((res)=>{
        dispatch({
            type:"GET_JOBS",
            payload:{records:res.jobs}
        })
     
  }).catch((err)=> dispatch(Error_Handler(["Sorry"])))
}
}



const fetch_my_jobs = (userID)=>{ 
    return (dispatch)=>{
    dispatch(fetch_jobs_request())
    fetch(`https://codsoft-1.onrender.com/jobs/app/?id=${userID}`).then(res=> Promise.all([res.status,res.json()])).then(([status,res])=> {
     if(status==200){
        setTimeout(()=>{
           dispatch({
             type:"GET_JOBS",
             payload:{records:res.jobs}
                 })
        },1000)}

    else{
        setTimeout(()=>{
            dispatch(Error_Handler(res.err))
             },1000)
    }

     }).catch(err=> alert(err))
}
}

const clear_jobs = ()=>{
    return {
        type:"CLEAR_JOBS"
    }
}

const fetch_countries = ()=>{
    return (dispatch) =>{
        fetch("https://codsoft-1.onrender.com/countries").then(res=>res.json()).then(res=>{const map = new Map(Object.entries(res.countries));
            dispatch({
                type:"FETCH_COUNTRIES",
                payload:map
            })
        })
    }
}


const fetch_cities = (country)=>{
    return (dispatch)=>{
        fetch(`https://codsoft-1.onrender.com/cities/?country=${country}`).then(res=> res.json()).then(res=>{
            const map = new Map(Object.entries(res.cities));
            dispatch({
                type:"FETCH_CITIES",
                payload:map
            })
        })
    }
}

const Change_data = (obj)=>{
    return (dispatch)=>{
        fetch("https://codsoft-1.onrender.com/role/Edit/Profile",{
            method:"POST",
            credentials:"include",
            headers:{
                "Content-Type":"application/json"
            },
            body : JSON.stringify(obj)
        }).then((res)=>{
           if(res.status==200) {dispatch(Success_Handler(["Profile Edited Successfully"])) }
           else if(res.status==409){
            dispatch(Error_Handler(["Phone or Email Already Exists For Another one !"]))
           }
           else{
            dispatch(Error_Handler(["Error ! Try Again"]))
           }
        })
    }
} 

const Error_Handler = (err)=>{
    return {
        type:"SET_ERROR",
        payload:err
    }
}

const Success_Handler = (success)=>{
    return {
        type:"SET_SUCCESS",
        payload:success
    }
}

const Clear = ()=>{
    return {
        type:"CLEAR"
    }
}



const logger = (url,navigate)=>{
    return (dispatch)=>{
        fetch(url,{credentials:"include",withCredentials:true}).then(res => { 
            return Promise.all([res.status,res.json()])}).then(([status,res])=>{
           if(status==200){
            dispatch(Login_Success_Authorize(res.user));
           }  
           else if(status==401){navigate("/")} else dispatch(Login_Failure()); 
          }).catch(err=> console.log("error"))
    }
}


const LOGOUT = ()=>{
    return {
        type:"LOGOUT"
    }
}


const  FETCH_AUTHORIZE_SUCCESS = ()=>{
    return {
        type:"FETCH_AUTHORIZE_SUCCESS"
    }
}

const FETCH_AUTHORIZE_FAILURE = ()=>{
    return {
        type:"FETCH_AUTHORIZE_FAILURE"
    }
}

const post_application = (obj,job_id)=>{
    return (dispatch)=>{
        dispatch(Fetch_Request());
        fetch(`https://codsoft-1.onrender.com/role/Apply/?id=${job_id}`,{method:"POST",credentials:"include",headers:{'Content-Type':"application/json"},body:JSON.stringify(obj)})
        .then(res=> Promise.all([res.status,res.json()]))
        .then(([status,res])=>{
            if(status==200){
                console.log("gg")
                dispatch(Success_Handler(res.msg))
            }
            else if(status==403){
                console.log("la")
                dispatch(Error_Handler(res.err))
            }
        }).catch(err=> dispatch(Error_Handler(["Internal Server Error !"])))
    }
}

const fetch_applications = (job_id)=>{
    return (dispatch)=>{
        fetch(`https://codsoft-1.onrender.com/role/job/app/?id=${job_id}`).then(res=>Promise.all([res.status,res.json()])).then(([status,res])=>{
       if(status==200){
        dispatch({
            type:'FETCH_APPLICATIONS',
            payload:{records:res.applications}
        })
    }
    
    }
        
        )
    }
}

const handle_application = (app_id,Type,obj)=>{
    return (dispatch)=>{
        console.log(obj)
        fetch(`https://codsoft-1.onrender.com/role/Application/${Type}/?id=${app_id}`,{method:"PUT",credentials:"include",headers:{"Content-Type":"application/json"},body:JSON.stringify(obj)}).then(res=>{
            if(res.status==200){
                dispatch(Success_Handler(["Application Approved"]))
            }
            else{
                dispatch(Error_Handler("Error"))
            }
        })
    }
}




// validation

const convertToBase64 = (file,Type)=>{
    return new Promise((res,rej)=>{
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = ()=>{
      if(reader.result.includes(Type)) res(reader.result)
      else rej(`Wrong Format Only ${Type} Allowed !`)}

      reader.onerror = rej
    })
  }

  function validatePhoneNumber(input_str) {
    let re = /^\(?(\d{3})\)?[- ]?(\d{4})[- ]?(\d{4})$/;
  
    return re.test(input_str);
  }

  function validatePassword(input_str){
    let re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return re.test(input_str)
  }

  function validateEmail(input_str){
    let re = /(?:[a-z0-9+!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/gi
    return re.test(input_str)
  }








export {Login_Failure  , Login_Success_Authorize , Login_Success_NotAuthorized , Signup_Failure , Signup_Success  , handle_application , clear_jobs , fetch_job , Fetch_Request,Fetch_Login , fetch_my_jobs,post_application ,fetch_applications ,  Fetch_Signup , Change_data , LOGOUT , FETCH_AUTHORIZE_FAILURE , FETCH_AUTHORIZE_SUCCESS , fetch_categories , fetch_job_titles , fetch_jobs , fetch_countries ,  fetch_cities ,  logger , Error_Handler , Clear  , Success_Handler , convertToBase64 , validatePhoneNumber , validateEmail , validatePassword }

