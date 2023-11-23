
import React, {  useState } from 'react'
import { useNavigate, useParams} from 'react-router-dom'
import axios from 'axios'
import './css/indsession.css'
import { useForm } from 'react-hook-form';


function IndSession() {
    const params = useParams();
    const token = process.env.REACT_APP_TOKEN
    const navigate = useNavigate()
    const keyData = JSON.parse(localStorage.getItem(params.id))
    
    const {
        register,
        handleSubmit,
        
      } = useForm();
    const [data,setData] = useState([])
    const [value,setValue] = useState("")
 
    
    const querysearch = async () =>{
         var facilitator_name = document.getElementById("query").value;
         keyData.metadata.facilitators.forEach(facilitator_info => {
            if(facilitator_info.id === facilitator_name){
                setValue(facilitator_info.key);
            }
         });
        await axios.get(process.env.REACT_APP_BASE_URL+ params.id,{
            params : {
                key : value
            }
        }).then((res)=>{
            setData(res.data.participants);
            
        }).catch((err) => {
            console.log(err)
        })
    }

    const onSubmit = async (data) =>{
        var paramsdata = {}
        const presentData = data.present.split(",");
        const absentData = data.absent.split(",")
        
        for(let i = 0;i<presentData.length;i++){
            keyData.participants.forEach(partcipant_info => {
                if(partcipant_info.id === presentData[i]){
                    presentData[i] = partcipant_info.key
                }
             });
        }
        for(let i = 0;i<absentData.length;i++){
            keyData.participants.forEach(partcipant_info => {
                if(partcipant_info.id === absentData[i]){
                    absentData[i] = partcipant_info.key
                }
             });
        }

        if(presentData[0] !== ""){
            for(var i = 0;i<presentData.length;i++){
                paramsdata[presentData[i]] = "present";
            }
        }

        if(absentData[0] !== ""){
            for(var j = 0;j<absentData.length;j++){
                paramsdata[absentData[j]] = "absent";
            }
        }

        
        const body = {
            action : 'mark',
            params : paramsdata
        }

        await axios.post(process.env.REACT_APP_BASE_URL+ params.id,body,{
            params : {
                key : value
            }
        }).then((res) => {
            setData(res.data.participants)
        }).catch((err) =>{
            console.log(err)
        })

    }

    const deleteSession = async () =>{
        await axios.delete(process.env.REACT_APP_BASE_URL+ params.id,{
            headers : {
                "Authorization" : `${token}`
            }
        }).then(()=>{
            navigate('/')
        }).catch((err) =>{
            console.log(err)
        })
    }

    function Form() {
        return (<form onSubmit={handleSubmit(onSubmit)}>
        
        <div className="form-control">
          <label>Present</label>
          <input type="text"  name="present" {...register("present")}/>
        </div>
        <div className="form-control">
          <label>Absent</label>
          <input type="text"  name="absent" {...register("absent")}/>
        </div>
        <div className="form-control">
          <label></label>
          <button className = "btn btn-primary" type="submit">Submit</button>
        </div>
      </form>)
    }

    function ParticipantDetail(){
        return(
            <div>
            <div>
                <h3>participants list</h3>
                <div className='participantContainer'>
                {data.map((partcipant) =>{
                    return(
                        <div className='participantDetail'>
                            <div>{partcipant.id}</div>
                            <div>{partcipant.status}</div>
                        </div>
                    )
                })}
                </div>
            </div>
            <div className='form-container'>
                <Form />
                
            </div>
            </div>
        )
    }


  return (
    <div>
        <h1>Session Id : {params.id}</h1>
        <div className='queryContainer'>
        <label>Facilitator's Key</label>
        <input type='text' id="query" ></input>
        <button onClick={()=>querysearch(this)}>Submit</button>

        {data.length > 0 && 
            <ParticipantDetail />
        }
        
        </div>
        <button className='btn btn-danger' onClick={()=>{deleteSession()}}>Delete Session</button>
    </div>
  )
}

export default IndSession