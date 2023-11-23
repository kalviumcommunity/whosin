import React from 'react'
import './css/create.css'
import {useForm} from 'react-hook-form'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function CreateSession() {
    const token = process.env.REACT_APP_TOKEN
    const {
        register,
        handleSubmit
        
      } = useForm();

      const navigate = useNavigate()
    
      const onSubmit = async (data) => {
        const mode = "MANUAL"
        const participants = data.participants.split(",");
        const facilitators = data.facilitators.split(",");
        const callback = "http://localhost:3000/sessions";
        const start_time = data.start_time.replace("T"," ")
        const end_time = data.end_time.replace("T"," ")
        await axios.post(process.env.REACT_APP_BASE_URL,{
            "mode" : mode,
            "start_time" : start_time,
            "end_time" : end_time,
            "participants" : participants,
            "callback" : callback,
            "metadata" : {
                "facilitators" : facilitators
            }
        },{headers : {"Authorization" : `${token}`}}).then((res)=>{
            alert(`Succesfully Created Session With ID : ${res.data.session_id}`)
            localStorage.setItem(res.data.session_id,JSON.stringify(res.data))
            navigate('/')
        }).catch((err) =>{
            console.log(err);
        })
        
        
      };

  return (
    <div className='formContainer'>
    <h1>Create Session</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        
        <div className="form-control">
          <label>Start time</label>
          <input type="datetime-local"  name="start_time" {...register("start_time")}/>
        </div>
        <div className="form-control">
          <label>End time</label>
          <input type="datetime-local"  name="end_time" {...register("end_time")}/>
        </div>
        <div className="form-control">
          <label>Partcipants</label>
          <input type="text"  name="participants" {...register("participants")}/>
        </div>
        <div className="form-control">
          <label>Facilitators</label>
          <input type="text"  name="facilitators" {...register("facilitators")}/>
        </div>
        <div className="form-control">
          <label></label>
          <button type="submit">Submit</button>
        </div>
        
      </form>
    </div>
  )
}

export default CreateSession