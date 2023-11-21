import React, { useState } from 'react'
import './css/create.css'
import {useForm} from 'react-hook-form'
import axios from 'axios'

function CreateSession() {
    const token = process.env.REACT_APP_TOKEN
    const [participantsList,setParticipantsList] = useState([]);
    const [facilitatorsList,setFacilitatorsList] = useState([]);
    const[sessionId,setSessionId] = useState('');
    const {
        register,
        handleSubmit
        
      } = useForm();
    
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
          console.log(data)
            setParticipantsList(res.data.participants)
            setFacilitatorsList(res.data.metadata.facilitators)
            setSessionId(res.data.session_id)
        }).catch((err) =>{
            console.log(err);
        })
        
        
      };

      function ParticipantDetail(){
        return(
            <div>
                <h3>Session Id : {sessionId}</h3>
                <h3>participants list</h3>
                <div className='participantContainer'>
                {participantsList.map((partcipant) =>{
                    return(
                        <div className='participantDetail'>
                            <div>{partcipant.id}</div>
                            <div>{partcipant.key}</div>
                        </div>
                    )
                })}
                </div>
                <h3>Facilitators List</h3>
                <div className='participantContainer'>
                {facilitatorsList.map((facilitator) =>{
                    return(
                        <div className='participantDetail'>
                            <div>{facilitator.id}</div>
                            <div>{facilitator.key}</div>
                        </div>
                    )
                })}
                </div>
            </div>
        )
    }

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
        <div>
          {(participantsList.length > 0 || facilitatorsList.length > 0) &&
          <ParticipantDetail />
          }
        </div>
      </form>
    </div>
  )
}

export default CreateSession