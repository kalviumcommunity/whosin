import React, { useState } from 'react'
import axios from 'axios'
import './css/session.css'
import { useNavigate } from 'react-router-dom'
function  Sessions() {
    const navigate = useNavigate();
    const token = process.env.REACT_APP_TOKEN
    
    const [sessionList,setSessionList] = useState([]);
    const getdata = async()=>{
        
        await axios.get(process.env.REACT_APP_BASE_URL,{headers : {"Authorization" : `${token}`}}).then((res)=>{
            setSessionList(res.data.sessions)
            console.log(res.data.sessions)
        })
        };
    React.useEffect(() =>{
        
        getdata();
    })
    
    
  return (
    <div>
    <h1 style={{marginBottom : "30px"}}>Sessions</h1>
    <div className='cardContainer'>
    {sessionList.map((session)=>{
        return(

            <div className='card' id = {session} onClick={()=>navigate(`/${session}`)}>{session}</div>
        )
    })}
    </div>
    </div>
  )
}

export default Sessions