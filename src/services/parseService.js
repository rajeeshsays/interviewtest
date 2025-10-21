import { baseUrl } from '../configs/apiconfig';

export async function parsedata(data) {
  console.log('📤 Sending data:', data);

  try {
    const res = await fetch(`${baseUrl}/api/MailParse/parsedata`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data }),
    });

    const contentType = res.headers.get('content-type');
    const responseBody = contentType?.includes('application/json')
      ? await res.json()
      : await res.text();

    if (!res.ok) {
      // Handle ASP.NET Core model validation errors
      let errorMessage = '';

      if (responseBody?.errors) {
        const firstKey = Object.keys(responseBody.errors)[0];
        errorMessage = responseBody.errors[firstKey][0];
      } else if (responseBody?.title) {
        errorMessage = responseBody.title;
      } else if (typeof responseBody === 'string') {
        errorMessage = responseBody;
      }

      throw new Error(errorMessage || 'Request failed');
    }

    console.log('✅ Success response:', responseBody);
    console.log('📦 Data is parsed...');
    return responseBody; // ✅ return parsed response

  } catch (err) {
    console.error('❌ Error:', err.message);
    alert(err.message);
    throw err; // ✅ rethrow for component to handle
  }
}
