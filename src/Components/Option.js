import  {useRef,useEffect} from 'react'

function Option({key2,value,updateValue,selected}){

    useEffect(()=>{
        if(selected){
            updateValue(key2)
        }
    },[selected])
   
    
    return (
       <option  value={value} key={key2}>{value}</option>
    )
}

export default Option