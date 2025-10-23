import {React,ReactDom,useEffect,useState} from 'react'
import { parsedata } from '../../services/parseService'
import './parse-mail.css'
export default function Parsemail()
{
const[data,setData] = useState('')
const[resj,setResj] = useState('')
var submit = async ()=>{
    setResj('')
    try{
        console.log(data);
  
  const resp = await  parsedata(data);
     setResj(JSON.stringify(resp));
    }
    catch(err) {
        alert(err.message);
    }
   
  
}

var clear = async ()=>{
setData('')
setResj('')     
}

useEffect(()=>{
//alert(resj)
},[resj])

return <>
<div class="container">

<span class="form-group">
  <label>Input Content</label>
<textarea id="mailc" aria-label="Input Text" value={data} onChange={(e)=>setData(e.target.value)}/>
</span>


<span class="form-group">
  <label>Json Output</label>
<textarea disabled value={resj} onChange={(e)=>setData(e.target.value)}/>
</span>



</div>
<div class="button-group">
<button class="btn clear-btn"  onClick={clear}>Clear</button>
<button class="btn submit-btn" onClick={submit}>Submit</button>
</div>
</>

}

 