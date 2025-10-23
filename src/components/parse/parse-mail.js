import {useState} from 'react'
import { parseContent } from '../../services/parseService'
import './parse-mail.css'

export default function Parsemail()
{
const[content,setContent] = useState('')
const[resj,setResj] = useState('')
var submit = async ()=>{
    setResj('')
    try {
        console.log(content);
        const resp = await  parseContent(content);
        setResj(JSON.stringify(resp));
    }
    catch(err) {
      alert(err);
    }
}

var clear = async ()=>{
await setContent('')
await setResj('')     
}


return <>
<div class="container">

<span class="form-group">
  <label>Input Content</label>
<textarea id="mailc" aria-label="Input Text" value={content} onChange={(e)=>setContent(e.target.value)}/>
</span>


<span class="form-group">
  <label>Json Output</label>
<textarea disabled value={resj} />
</span>



</div>
<div class="button-group">
<button class="btn clear-btn"  onClick={clear}>Clear</button>
<button class="btn submit-btn" onClick={submit}>Submit</button>
</div>
</>

}

 