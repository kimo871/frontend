import * as React from 'react';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import {fetch_jobs , clear_jobs} from '../redux/actions'
import {useDispatch , useSelector} from 'react-redux'
export default function PaginationControlled({data,page,setPage}) {
 
  const obj = useSelector(state=>state)
  const dispatch = useDispatch()
  React.useEffect(()=>{
   dispatch(clear_jobs())
   dispatch(fetch_jobs(page,data))
  },[page])
  const handleChange = (e,value) => {
    console.log(value)
    setPage(value);
  };



  return (
    <div style={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}}>
    <Stack spacing={3}>
      
      <Typography>Page: {page}</Typography>
      <Pagination count={obj.Jobs.pagination} page={page} onChange={handleChange} />
      
    </Stack>
    </div>
  );
}