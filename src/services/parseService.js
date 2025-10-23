import { baseUrl } from '../configs/apiconfig';
export async function parseContent(content) {

  console.log('Sending email content :', content);
  try {
    const res = await fetch(`${baseUrl}/api/MailParse/parsecontent`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content }),
    });

    const contentType = res.headers.get('content-type');
    const responseBody = contentType?.includes('application/json')
      ? await res.json()
      : await res.text();
     console.log(JSON.stringify(responseBody))
      
    if (!res.ok) {
      // Handle Badrequest error from api
      let errorMessage = '';
       
      if (responseBody?.error) {
        throw new Error(responseBody?.error + '. Request failed!');
      }
      throw new Error(errorMessage || 'Request failed! for unknown reason, need investigation');
    }
    
    console.log('Success response:', responseBody);
    return responseBody; //return parsed response

  } catch (err) {
    console.error('Error from service ', err.message);
    throw err; // re-throw for component to handle
  }
}
