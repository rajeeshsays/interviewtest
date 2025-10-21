import {React,ReactDom,useEffect,useState} from 'react'
import { parsedata } from '../services/parseService'
import './parse-mail.css'
export default function Parsemail()
{
const[data,setData] = useState('')
const[resj,setResj] = useState('')
var submit = async ()=>{
    try{
        console.log(data);
  
  const resp = await  parsedata(data);
     setResj(resp);
    }
    catch(err) {
        alert('❌ ' + err.message);
    }
   
  
}

var clear = async ()=>{
setData('')
setResj('')     
}

useEffect(()=>{
alert(resj)
},[resj])

return <>
<p>Parse Mail</p>
<textarea value={data} onChange={(e)=>setData(e.target.value)}/>
<textarea disabled value={resj} onChange={(e)=>setData(e.target.value)}/>
<button onClick={clear}>Clear</button>
<button onClick={submit}>Submit</button>
</>

}

 