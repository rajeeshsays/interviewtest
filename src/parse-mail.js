import {React,ReactDom,useState} from 'react'
import { parsedata } from './services/parseService'
import './parse-mail.css'
export default function Parsemail()
{
const[data,setData] = useState('');
var submit = ()=>{
    console.log(data);
    parsedata(data)
}

return <>
<p>Parse Mail</p>
<textarea onChange={(e)=>setData(e.target.value)}/>
<button onClick={submit}>Submit</button>
</>

}

 