import {createStore , combineReducers , applyMiddleware  } from 'redux'
import thunk from 'redux-thunk'
let user_initial = {
    data :{},
    loading:false,
    error:[],
    success:[],
    logged:false,
    authorized:false
}
let user = (state=user_initial,action)=>{
    
    switch(action.type){
        case 'FETCH_REQUEST':
            console.log("h3333")
          return {...state,loading:true}
        case 'FETCH_LOGIN_SUCCESS_AUTHORIZED' :
          return {...state,data:action.payload, error:[] , loading:false, logged:true , authorized:true }
        
          case 'FETCH_LOGIN_SUCCESS_NOTAUTHORIZED':
          return {...state , data:action.payload,error:[],loading:false,logged:true,authorized:false}

        case 'FETCH_LOGIN_FAILURE':
          console.log("noo")
          return {...state , error:action.payload, loading:false , logged:false}

        case 'FETCH_SIGNUP_SUCCESS':
            console.log({...state , data : action.payload , error:[]})
         return {...state , data : action.payload , error:[]}

         case 'FETCH_SIGNUP_FAILURE':
         return {...state , error:action.payload  }

         case 'FETCH_AUTHORIZE_SUCCESS':
            return {...state , authorized:true , loading:false , logged:true}

        case 'FETCH_AUTHORIZE_FAILURE':
            return {...state , authorized:false , loading:false}

        case 'SET_ERROR':
           return {...state , error:action.payload,success:[]}
        
        case 'SET_SUCCESS':
           return {...state , success:action.payload,error:[]}

        case 'CLEAR':
           return {...state , success:[],error:[]}

         case 'LOGOUT':
        return {...state , error:[],data:{},logged:false,loading:false}
        
        default :
          return state
    }

}

let Category =(state=new Map(),action)=>{
  switch(action.type){
    case 'FETCH_CATEGORIES_ALL':
        console.log(action.payload)
        return new Map(action.payload)
    default:
        return state
  }

}
/*

let Handler = (state={Error:[],Success:[]},action)=>{
  switch(action.type){
    case 'ERROR':
      return {...state , Success:[],Error:action.payload}
    case 'Success':
      return {...state , Error:[],Success:action.payload}

    case 'CLEAR':
      return {Error:[],Success:[]}

    default :
    return state;
  }
}

*/






let Title = (state=new Map(),action)=>{
    switch(action.type){
        case 'FETCH_JOBS_ALL':
            console.log(action.payload)
            return new Map(action.payload)
        default :
        return state;
    }
}

let Jobs = (state={data:[],pagination:{total_page_number : 1},loading:false},action)=>{
  switch(action.type){
    case 'FETCH_JOBS':
      console.log(action.payload)
      return {...state,loading:true}
    case 'GET_JOBS':
      return {...state , data:action.payload.records , pagination:(action.payload.pagination) ? (action.payload.pagination) : {total_page_number : 1} , loading:false}
    case 'CLEAR_JOBS':
      return {...state , data:[]}
    default:
      return state;
  }
}

let Applications = (state={data:[],loading:false},action)=>{
   switch(action.type){
    case 'FETCH_APPLICATIONS':
      return {...state , data:action.payload.records,loading:false}
    default :
    return state;
   }
}


let Country = (state=new Map(),action)=>{
  switch(action.type){
      case 'FETCH_COUNTRIES':
          console.log(action.payload)
          return new Map(action.payload)
      default :
      return state;
  }
}

let City= (state=new Map(),action)=>{
  switch(action.type){
      case 'FETCH_CITIES':
          console.log(action.payload)
          return new Map(action.payload)
      default :
      return state;
  }
}
let rootReducer = combineReducers({user,Category,Title,Country,City,Jobs,Applications});

let store = createStore(rootReducer,applyMiddleware(thunk))




export default store;

