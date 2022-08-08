var axios = require('axios');

exports.sendSMS = async (to, message) => {
  const userId = 104555;
  const apiKey = 'oi7jg4s0dv0jcs5sb';
  const senderId = 'ozoneDEMO';

  const URL = `http://send.ozonedesk.com/api/v2/send.php?user_id=${userId}&api_key=${apiKey}&sender_id=${senderId}&to=${to}&message=${message}`;

  const request = {
    'method': 'get',
    'url': URL,
    'headers': {
    }
  };

  axios(request).then(function (response) {
    console.log(JSON.stringify(response.data));
    return response.data;
  })
    .catch(function (error) {
      console.log(error);
    });
}
