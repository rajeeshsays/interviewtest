import {baseUrl, basseUrl} from '../configs/apiconfig'

export function parsedata(data)
{
console.log(data);
fetch(baseUrl+'/api/MailParse/parsedata',{
 method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({data : data})
})
.then((res)=> console.log(JSON.stringify(res)))
.catch((err)=> console.error(err))
console.log(data,'data is parsed...')
}